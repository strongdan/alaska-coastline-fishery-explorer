# RDS PostgreSQL Plan

## Purpose
This managed PostgreSQL database will serve as the foundation for:
- **Dataset Registry**: Tracking available datasets and their upstream URLs.
- **Cache Metadata**: Storing cache invalidation rules and timestamps.
- **Snapshot Metadata**: Tracking S3 static exports.
- **Future Normalized Feature Metadata**: Storing parsed GeoJSON properties for advanced querying.

## Console Runbook: Creating an RDS Instance
1. Navigate to the **RDS Console** in `us-east-2`.
2. Click **Create database**.
3. Choose **Standard create** and **PostgreSQL** (latest 15.x or 16.x).
4. Select the **Free tier** or **Dev/Test** template (depending on credit usage goals).
5. Set DB instance identifier (e.g., `fishery-explorer-db`).
6. Configure Master username (e.g., `postgres`) and a secure password.
7. Choose a Burstable class (e.g., `db.t3.micro` or `db.t4g.micro`).
8. Under Connectivity, ensure it's in the same VPC as your ECS Fargate tasks. Set **Public access** to **No**.
9. Create a new VPC security group or select an existing one that allows inbound TCP 5432 from your ECS security group.
10. Click **Create database**.

*Resource Status*: **Optional but useful** (Keep running for learning, easy to snapshot and destroy later to save costs).

## Environment Variables
Once created, the API will need:
- `DATABASE_URL`: `postgresql://username:password@host:5432/dbname`
