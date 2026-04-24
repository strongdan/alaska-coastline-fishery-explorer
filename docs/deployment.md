# Deployment Guide

## Frontend (S3)
1. **Build:**
   ```bash
   cd apps/web
   pnpm build
   ```
2. **Sync:**
   ```bash
   aws s3 sync dist/ s3://alaska-coastline-fishery-explorer-625978481175-us-east-2-an --delete --region us-east-2
   ```

## Backend (ECS/ECR)
1. **Authenticate Docker:**
   ```bash
   aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 625978481175.dkr.ecr.us-east-2.amazonaws.com
   ```
2. **Build and Push:**
   ```bash
   cd apps/api
   docker build -t fishery-api .
   docker tag fishery-api:latest 625978481175.dkr.ecr.us-east-2.amazonaws.com/fishery-api:latest
   docker push 625978481175.dkr.ecr.us-east-2.amazonaws.com/fishery-api:latest
   ```
3. **Update ECS Service:**
   ```bash
   aws ecs update-service --cluster fishery-api-cluster --service fishery-api-service-lb --force-new-deployment --region us-east-2
   ```

## Infrastructure
The current setup uses:
- **ECR Repo:** `fishery-api`
- **ECS Cluster:** `fishery-api-cluster`
- **ALB:** `fishery-api-alb`
- **Log Group:** `/ecs/fishery-api`
