# Multi-app Kubernetes deployment

This folder deploys all workspace apps together on one Kubernetes cluster.

## Prerequisites

- Docker Desktop running
- Kubernetes enabled (Docker Desktop or minikube)
- `kubectl` connected to your target cluster

## Deploy everything

From this folder:

```powershell
.\deploy-all.ps1
```

If you want to pass PennyFlow build args:

```powershell
.\deploy-all.ps1 -SupabaseUrl "https://your-project.supabase.co" -SupabasePublishableKey "your-anon-key"
```

## App URLs

- AgroPulse: http://localhost:30000
- PennyFlow: http://localhost:30080
- CampusIQ: http://localhost:30081
- Online Polling: http://localhost:30082
- Diet Planner: http://localhost:30050

## Useful commands

```powershell
kubectl -n multiapps get pods
kubectl -n multiapps get svc
kubectl -n multiapps logs deploy/agropulse-app --tail=100
```

Delete all resources:

```powershell
kubectl delete -f .\all-apps.yaml
```
