param(
  [string]$SupabaseUrl = "https://czseqghbzfmfwsbrytab.supabase.co",
  [string]$SupabasePublishableKey = "",
  [string]$Namespace = "multiapps"
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectsRoot = Resolve-Path (Join-Path $scriptDir "..\..")

$trikernelRoot = Join-Path $projectsRoot "Trikernel"
$agropulsePath = Join-Path $trikernelRoot "agropulse"
$dietPath = Join-Path $projectsRoot "AI Based Diet Planner"
$campusPath = Join-Path $projectsRoot "CampusIQ"
$pollingPath = Join-Path $projectsRoot "Online-Polling-System-main"
$pennyflowPath = Join-Path $projectsRoot "PennyFlow-Personal-Finance-Tracker"

Write-Host "Building Docker images..." -ForegroundColor Cyan

docker build -t agropulse:local $agropulsePath
docker build -t diet-planner:local $dietPath
docker build -t campusiq:local $campusPath
docker build -t online-polling:local $pollingPath

docker build -t pennyflow:local `
  --build-arg VITE_SUPABASE_URL=$SupabaseUrl `
  --build-arg VITE_SUPABASE_PUBLISHABLE_KEY=$SupabasePublishableKey `
  $pennyflowPath

$currentContext = ""
try {
  $currentContext = (kubectl config current-context).Trim()
} catch {
  $currentContext = ""
}

if (-not $currentContext) {
  throw "No Kubernetes context is configured. Configure kubectl first."
}

Write-Host "Current Kubernetes context: $currentContext" -ForegroundColor Yellow

$clusterReachable = $true
try {
  kubectl version --request-timeout=10s | Out-Null
} catch {
  $clusterReachable = $false
}

if (-not $clusterReachable -and $currentContext -eq "minikube") {
  $hasMinikube = $null -ne (Get-Command minikube -ErrorAction SilentlyContinue)
  if ($hasMinikube) {
    Write-Host "Cluster not reachable. Starting minikube..." -ForegroundColor Yellow
    minikube start
  } else {
    $hasDockerDesktopContext = $false
    $contexts = kubectl config get-contexts -o name
    if ($contexts -contains "docker-desktop") {
      $hasDockerDesktopContext = $true
    }

    if ($hasDockerDesktopContext) {
      Write-Host "minikube is not available. Switching context to docker-desktop..." -ForegroundColor Yellow
      kubectl config use-context docker-desktop | Out-Null
      $currentContext = "docker-desktop"
    } else {
      throw "Current context is unreachable and minikube is unavailable. Please start a Kubernetes cluster."
    }
  }
}

if ($currentContext -eq "minikube") {
  Write-Host "Loading images into minikube..." -ForegroundColor Cyan
  minikube image load agropulse:local
  minikube image load diet-planner:local
  minikube image load campusiq:local
  minikube image load online-polling:local
  minikube image load pennyflow:local
}

Write-Host "Applying Kubernetes manifests..." -ForegroundColor Cyan
kubectl apply -f (Join-Path $scriptDir "all-apps.yaml")

Write-Host "Waiting for deployments to be ready..." -ForegroundColor Cyan
kubectl -n $Namespace rollout status deployment/agropulse-db --timeout=240s
kubectl -n $Namespace rollout status deployment/agropulse-app --timeout=240s
kubectl -n $Namespace rollout status deployment/diet-planner-app --timeout=240s
kubectl -n $Namespace rollout status deployment/campusiq-app --timeout=240s
kubectl -n $Namespace rollout status deployment/polling-db --timeout=240s
kubectl -n $Namespace rollout status deployment/online-polling-web --timeout=240s
kubectl -n $Namespace rollout status deployment/pennyflow-app --timeout=240s

Write-Host "\nServices exposed via NodePort:" -ForegroundColor Green
kubectl -n $Namespace get svc

Write-Host "\nURLs:" -ForegroundColor Green
Write-Host "AgroPulse:       http://localhost:30000"
Write-Host "PennyFlow:       http://localhost:30080"
Write-Host "CampusIQ:        http://localhost:30081"
Write-Host "Online Polling:  http://localhost:30082"
Write-Host "Diet Planner:    http://localhost:30050"
