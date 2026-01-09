## DevOps with Kubernetes

Kubernetes is an open source container orcherstration tool that's used to manage
containers.

## Exercises

### Part 1 - Kubernetes Fundamentals

[1.1](./0x3-logger): Random Log Generator

[1.2](./project/backend/): First Steps on the Project

[1.3](./project/k8s): Declarative approach with yaml

[1.4](./project/k8s/): Declative deployment.yaml

[1.5](./0x2-networking/dwk/): Networking for external and internal communication

[1.6](./0x2-networking/dwk/): Service to simplify Networking

[1.7](./0x2-networking/dwk/): External access with ingress

[1.8](./project/k8s/ingress/): Ingress for main project

[1.9](./gke/pingpong/): Setup Pingpong appplication

[1.10](./0x3-logger/): Split Log generator into two seperate applications

[1.11](./gke/pingpong/manifests/): Persist data in pingpong application

[1.12](./project/frontend/): Add picture to project

[1.13](./project/frontend/): Add todo lists to frontend

### Part 2 - Networking, Storage & Jobs

[2.1](./gke/pingpong/): Connecting pingpong and logger pods

[2.2](./project/backend/): Add Backend for the todo project

[2.5](./gke/pingpong/manifests/): Documentation and Configmaps

[2.7](./gke/pingpong/manifests/): Add postresql as a statefulset

[2.8](./project/): Save todo items to postgres

[2.9](./0x6-jobs): Add a job to create todos

### Part 3 - Monitoring

[2.10](./project/backend/): Add logging to the project

### Part 4 - Google Kubernetes Engine (GKE)

[3.1](./gke/pingpong/manifests/): Deploy Pingpong application to GKE

[3.2](https://github.com/Itsfoss0/withk8s/tree/3.2): From Ingress to Gateway

[3.3](https://github.com/Itsfoss0/withk8s/tree/3.3): Replace Ingress with Gateway

[3.4](https://github.com/Itsfoss0/withk8s/tree/3.4): Rewritting HTTP rules on the http-route

[3.5](https://github.com/Itsfoss0/withk8s/tree/3.5): Deployment Pipeline with Kustomize to GKE

[3.6](https://github.com/Itsfoss0/withk8s/tree/3.6): Automatic Deployment of the 'main project' with Github Actions

[3.7](https://github.com/Itsfoss0/withk8s/tree/3.7): Deploy to seperate environments

[3.8](https://github.com/Itsfoss0/withk8s/tree/3.8): Delete environment when branch is deleted

[3.9](https://github.com/Itsfoss0/withk8s/tree/3.9): DBaaS vs DIY

[3.10](https://github.com/Itsfoss0/withk8s/tree/3.10): Backup Databases

[3.11](https://github.com/Itsfoss0/withk8s/tree/3.11): Scalling

[3.12](https://github.com/Itsfoss0/withk8s/tree/3.12): Monitoring in GKE

### Part 5 - GitOps and Friends

[4.1](https://github.com/Itsfoss0/withk8s/tree/4.1): Add probes to application

[4.2](https://github.com/Itsfoss0/withk8s/tree/4.2): Setup endpoints for probes and DB readiness checks

[4.3](https://github.com/Itsfoss0/withk8s/tree/4.3): More prometheus

[4.4](https://github.com/Itsfoss0/withk8s/tree/4.4): Canary release application

[4.5](https://github.com/Itsfoss0/withk8s/tree/4.5): Mark todo tasks as done

[4.6](https://github.com/Itsfoss0/withk8s/tree/4.6): Add nats message broker

[4.7](https://github.com/Itsfoss0/withk8s/tree/4.7): First steps with GitOps

[4.8](https://github.com/Itsfoss0/withk8s/tree/4.8): Configure the project to use gitops with argocd

[4.9](https://github.com/Itsfoss0/devops-withk8s-config/tree/4.9): Preview Environments with ArgoCD

[4.10](https://github.com/Itsfoss0/devops-withk8s-config/tree/4.10): Seperate application code and kubernetes manifests into different repos
