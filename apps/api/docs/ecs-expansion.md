# ECS/Fargate Expansion

## Design: Scheduled Cache Warmer
We are adding a secondary ECS task that runs on a schedule (via EventBridge) rather than behind an ALB. This task spins up, executes `src/worker.js` to fetch all upstream datasets, and exits.

## Deployment Steps
1. **Register Task Definition**:
   ```bash
   aws ecs register-task-definition --cli-input-json file://deploy/ecs/task-definition-worker.json
   ```
2. **Create EventBridge Rule**:
   In the AWS Console, go to Amazon EventBridge -> Rules. Create a new rule that runs on a schedule (e.g., every 1 hour).
3. **Set Target**:
   Set the target to ECS Task, select your cluster, and choose the `fishery-cache-warmer` task family. Use Fargate launch type and select your VPC subnets.

*Resource Status*: **Optional but useful** (Low cost since it's ephemeral. Easy to disable the EventBridge rule to pause).
