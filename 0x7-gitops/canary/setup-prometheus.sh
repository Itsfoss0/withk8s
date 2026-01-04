#!/usr/bin/env bash

# setup kube-prometheus stack with helm

if ! command -v helm >/dev/null 2>&1; then
	echo "Make sure helm is installed before running the script"
	exit 1
fi

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add stable https://charts.helm.sh/stable
helm repo update

kubectl create namespace prometheus
helm install prometheus-community/kube-prometheus-stack kube-prometheus-stack --namespace prometheus
helm upgrade kube-prometheus-stack prometheus-community/kube-prometheus-stack \
	-n prometheus \
	--set admissionWebhooks.enabled=false

k port-forward -n prometheus prometheus-kube-prometheus-stack-1767-prometheus-0 9090
