#!/usr/bin/env bash

# setup nats using helm
if ! command -v helm; then
	echo "helm is not installed......let me show you how to install it!"
	xdg-open "https://google.com/search?q=install+helm" >/dev/null 2>&1 & disown

	exit 1
fi

helm repo add bitnami https://charts.bitnami.com/bitnami
helm install -f values.yaml my-nats oci://registry-1.docker.io/bitnamicharts/nats

# helm install --set auth.enabled=false\
# 	--set metrics.enabled=true \
# 	--set metrics.serviceMonitor.enabled=true\
# 	--set metrics.serviceMonitor.namespace=prometheus\
# 	--set metrics.image.repository=bitnamilegacy/nats-exporter\
# 	--set metrics.image.registry=docker.io\
# 	--set image.registry=docker.io --set image.repository=bitnamilegacy/nats\
# 	--set image.tag=2.11.8-debian-12-r0 my-nats oci://registry-1.docker.io/bitnamicharts/nats\
# 	--set global.security.allowInsecureImages=true
