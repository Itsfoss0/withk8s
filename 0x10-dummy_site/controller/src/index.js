const mustache = require("mustache");
const k8s = require("@kubernetes/client-node");
const fs = require("fs").promises;
const JSONStream = require("json-stream");
const requests = require("request");
const path = require("path");

const timeouts = {};
const opts = {};

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
kc.applyToRequest(opts);

const client = kc.makeApiClient(k8s.CoreV1Api);

const sendRequestToApi = async (api, method = "get", options = {}) =>
  new Promise((resolve, reject) =>
    requests[method](
      `${kc.getCurrentCluster().server}${api}`,
      { ...opts, ...options, headers: { ...options.headers, ...opts.headers } },
      (err, res) => (err ? reject(err) : resolve(JSON.parse(res.body)))
    )
  );

const fieldsFromDummySite = (object) => ({
  website_url: object.spec.website_url,
  dummysite_name: object.metadata.name,
  namespace: object.metadata.namespace,
  deployment_name: `${object.metadata.name}-dep`,
  service_name: `${object.metadata.name}-svc`,
});

const fieldsFromDep = (object) => ({
  dummysite_name: object.metadata.labels.dummysite,
  deployment_name: `${object.metadata.name}-dep`,
  namespace: object.metadata.namespace,
  website_url: object.metadata.annotations?.website,
  image: object.spec.template.spec.containers[0].image,
  ports: object.spec.template.spec.containers[0].ports[0],
  service_name: `${object.metadata.name}-svc`,
});

const getYamlDef = async (filePath, fields) => {
  const templatePath = path.join(__dirname, `${filePath}.mustache`);
  const template = await fs.readFile(templatePath, "utf-8");
  return mustache.render(template, fields);
};

const deploymentForDummySiteAlreadyExists = async (fields) => {
  const { website_url, namespace } = fields;
  const { items } = await sendRequestToApi(
    `/apis/apps/v1/namespaces/${namespace}/deployments`
  );
  return items.find(
    (item) => item.metadata.annotations?.website === website_url
  );
};

const createDeployment = async (fields) => {
  console.log(
    `scheduling new deployment ${fields.deployment_name} for ${fields.dummysite_name} to namespace ${fields.namespace}`
  );

  const yamlDefinition = await getYamlDef("deployment", fields);

  try {
    const res = await sendRequestToApi(
      `/apis/apps/v1/namespaces/${fields.namespace}/deployments`,
      "post",
      {
        headers: {
          "Content-Type": "application/yaml",
        },
        body: yamlDefinition,
      }
    );
    console.log("Deployment created:", res.metadata.name);
  } catch (err) {
    console.error("Deployment create failed:", err);
  }
};

const createServiceForDummySite = async (fields) => {
  console.log(
    `creating service for ${fields.deployment_name} in namespace ${fields.namespace}`
  );

  const yamlDef = await getYamlDef("service", fields);
  try {
    sendRequestToApi(
      `/api/v1/namespaces/${fields.namespace}/services`,
      "post",
      {
        headers: {
          "Content-Type": "application/yaml",
        },
        body: yamlDef,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const removePod = async ({ namespace, pod_name }) => {
  const resp = await sendRequestToApi(
    `/api/v1/namespaces/${namespace}/pods/${pod_name}`,
    "delete"
  );
  console.log(`pod ${resp.metadata.name} deleted`);
};

const removeDeploymentForDummySite = async ({ namespace, website_url }) => {
  const pods = await sendRequestToApi(`/api/v1/namespaces/${namespace}/pods`);
  pods.items
    .filter((pod) => pod.metadata.annotations?.website === website_url)
    .forEach((pod) => removePod({ namespace, pod_name: pod.metadata.name }));

  const deployments = await sendRequestToApi(
    `/apis/apps/v1/namespaces/${namespace}/deployments`,
    "get"
  );
  deployments.items
    .filter((dep) => dep.metadata.annotations?.website === website_url)
    .forEach((dep) => {
      sendRequestToApi(
        `/apis/apps/v1/namespaces/${namespace}/deployments/${dep.metadata.name}`,
        "delete"
      );
    });
};

const removeService = async ({ namespace, service_name }) => {
  const resp = await sendRequestToApi(
    `/api/v1/namespaces/${namespace}/services/${service_name}`,
    "delete"
  );
  console.log(`service ${resp.metadata.name} deleted`);
};

const removeDummySite = async ({ namespace, dummysite_name }) => {
  const resp = await sendRequestToApi(
    `/apis/dummysites.dwk.io/v1/namespaces/${namespace}/dummysites/${dummysite_name}`,
    "delete"
  );
  console.log(`dummysite ${resp.metadata.name} deleted`);
};

const cleanUpForDummySite = async ({ namespace, dummysite_name }) => {
  console.log(`doing cleanup for ${dummysite_name}`);
  clearTimeout(timeouts[dummysite_name]);

  const deployments = await sendRequestToApi(
    `/apis/apps/v1/namespaces/${namespace}/deployments`,
    "get"
  );

  deployments.items.forEach((deployment) => {
    if (deployment.metadata.labels.dummysite !== dummysite_name) return;
    removeDeploymentForDummySite({
      namespace,
      website_url: deployment.metadata.annotations?.website,
    });
    removeDummySite({
      namespace,
      dummysite_name: deployment.metadata.labels.dummysite,
    });
    removeService({
      namespace,
      service_name: `${deployment.metadata.labels.dummysite}-svc`,
    });
  });
};

const maintainStatus = async () => {
  console.log("operator is on site, ready for tasking.");
  (await client.listPodForAllNamespaces()).body;

  const dummyStream = new JSONStream();

  dummyStream.on("data", async ({ type, object }) => {
    const fields = fieldsFromDummySite(object);

    if (type === "ADDED") {
      if (await deploymentForDummySiteAlreadyExists(fields)) return;
      await createDeployment(fields);
      await createServiceForDummySite(fields);
    }
    if (type === "DELETED") {
      cleanUpForDummySite(fields);
    }
  });
  requests
    .get(
      `${
        kc.getCurrentCluster().server
      }/apis/dummysites.dwk.io/v1/namespaces/default/dummysites?watch=true
`,
      opts
    )
    .pipe(dummyStream);
};

maintainStatus();
