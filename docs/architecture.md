# Architecture: Alaska Coastal Fishery Explorer

## Overview
This application follows a modern cloud-native architecture designed for high availability and low latency.

## Component Breakdown

### Frontend (apps/web)
- **Framework:** React 19 + Vite.
- **Map Library:** React Leaflet (Leaflet).
- **Hosting:** AWS S3 Static Website Hosting.
- **Data Flow:** Fetches GeoJSON from the project's own Proxy API to avoid CORS issues and improve reliability.

### Backend (apps/api)
- **Runtime:** Node.js 20 (Express).
- **Compute:** AWS ECS Fargate (Serverless Containers).
- **Networking:** Application Load Balancer (ALB) provides a stable DNS endpoint.
- **Proxy Logic:** Fetches data from external ADF&G ArcGIS REST endpoints.
- **Caching:** In-memory `Map` with a 1-hour TTL to reduce upstream pressure and speed up responses.

## Data Flow
1. User selects a region in the Frontend.
2. Frontend requests `/api/geojson/:id` from the **ALB**.
3. ALB routes request to a **Fargate Task**.
4. API checks **In-Memory Cache**.
5. If miss: API fetches from **ADF&G ArcGIS**, caches, and returns.
6. Frontend renders GeoJSON onto the **Leaflet Map**.

## Why this Architecture?
- **S3 Hosting:** Cost-effective and scales infinitely for static assets.
- **Fargate:** Zero server management; scales based on demand.
- **ALB:** Enables blue/green deployments and provides a durable URL that doesn't change when containers restart.
- **Proxy/Cache:** Shields the frontend from external service instability and performance bottlenecks.
