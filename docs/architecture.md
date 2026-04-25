# Architecture: Alaska Coastal Fishery Explorer

## Overview
This application follows a modern cloud-native architecture designed for data fusion and high availability. It integrates multiple government data sources (ADF&G, NOAA, USGS, Census) into a unified high-performance platform.

## Component Breakdown

### Frontend (apps/web)
- **Framework:** React 19 + Vite.
- **Map Library:** React Leaflet (Leaflet).
- **Hosting:** AWS S3 Static Website Hosting.
- **Features:** Unified Discovery (Search), Context Layering, Hierarchical Selectors, and Summary Dashboard.

### Backend (apps/api)
- **Runtime:** Node.js 20 (Express).
- **Compute:** AWS ECS Fargate (Serverless Containers).
- **Security:** Census API Key management via `.env` (AWS Secret Manager in production).
- **Services:**
  - `CommunityService`: Explicit mapping of state `LOC_CODE` to federal FIPS.
  - `CensusService`: On-demand socioeconomic enrichment.
  - `TigerService`: Official place boundary retrieval.
  - `UsgsService`: Real-time river flow/level data.
- **Caching:** In-memory with TTL to minimize upstream API pressure.

## Data Integration Flow
1. **State Management Geography**: Proxied from ADF&G ArcGIS REST.
2. **Community Context**: Points from ADF&G, socioeconomic enrichment from Census ACS 5-Year Estimates.
3. **Federal Habitat**: ESA Critical Habitat layers from NOAA NMFS.
4. **Environmental Monitoring**: Real-time river gages from USGS NWIS.

## Why this Architecture?
- **S3 Hosting:** Near-zero cost for static assets.
- **Fargate:** Serverless scaling; only pay for what is used.
- **Data Proxy:** Solves CORS issues, provides a stable metadata schema across disparate agency sources, and implements critical performance caching.
