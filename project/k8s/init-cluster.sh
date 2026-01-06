#!/usr/bin/env bash

# setup a GKE cluster and install all dependencies
# for deploying our applications

if ! command -v kubectl; then
	echo "kubectl is not installed. Please install it first"
	exit 1
fi

if ! command -v gcloud; then
	echo "google cloud cli is not installed. Please install it first"
	exit 1
fi

gcloud container clusters create dwk-prod --zone=europe-north1-b \
	--cluster-version=1.32 \
	--disk-size=32 \
	--num-nodes=3 \
	--machine-type=e2-micro \
	--gateway-api=standard

gcloud container node-pools create medium-pool --cluster=dwk-prod \
	--zone=europe-north1-b \
	--machine-type=e2-medium \
	--disk-size=32 \
	--num-nodes=1

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add bitnami https://charts.bitnami.com/bitnami

helm repo update

helm upgrade --install kube-prometheus \
	prometheus-community/kube-prometheus-stack \
	--namespace prometheus \
	--create-namespace

helm upgrade --install -f nats/values.yaml my-nats oci://registry-1.docker.io/bitnamicharts/nats

kubectl create secret generic broadcaster --from-env-file=../broadcaster/prod.env

kubectl apply -k .
