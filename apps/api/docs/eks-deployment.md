# EKS Deployment Track

## Prerequisites
- `aws-cli` configured
- `kubectl` installed
- `eksctl` installed (recommended for cluster creation)

## 1. Create EKS Cluster
Run the following command to create a small cluster in `us-east-2`:
```bash
eksctl create cluster \
  --name fishery-cluster \
  --region us-east-2 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 3 \
  --managed
```
*Resource Status*: **Optional but useful** (Significant credit burn. Destroy when not actively learning).

## 2. Configure kubectl
`eksctl` automatically updates your kubeconfig. Verify with:
```bash
kubectl get nodes
```

## 3. Deploy the API
Apply the manifests:
```bash
kubectl apply -f deploy/eks/configmap.yaml
kubectl apply -f deploy/eks/deployment.yaml
kubectl apply -f deploy/eks/service.yaml
```

## 4. Verify Deployment
```bash
kubectl get pods
kubectl get svc fishery-api-svc
```
Wait for the `EXTERNAL-IP` to be provisioned, then test:
```bash
curl http://<EXTERNAL-IP>/health
```

## 5. Teardown
To stop credit burn:
```bash
kubectl delete -f deploy/eks/
eksctl delete cluster --name fishery-cluster --region us-east-2
```
