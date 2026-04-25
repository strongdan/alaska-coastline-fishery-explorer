# Alaska Coastal Fishery Explorer

A high-performance geospatial data exploration tool that bridges the gap between state fishery management, local communities, and federal ecological context. This application serves as a unified proxy and visualization platform for disparate data from ADF&G, NOAA, USGS, and the U.S. Census Bureau.

**Live Site:** [Explorer App](http://alaska-coastline-fishery-explorer-625978481175-us-east-2-an.s3-website.us-east-2.amazonaws.com/)  
**Live API:** [API Health](http://fishery-api-alb-526406090.us-east-2.elb.amazonaws.com/health)

## 🚀 Stack Summary
- **Frontend:** React + Vite + Leaflet (hosted on AWS S3).
- **Backend:** Node.js + Express Proxy/Cache (running on AWS ECS Fargate).
- **Infrastructure:** AWS Application Load Balancer (ALB), CloudWatch Metrics, RDS PostgreSQL (Scaffolded).
- **Data Integrations:** ArcGIS REST Services (ADF&G, NOAA, Census), USGS NWIS (Water Data).

## ✨ Key Features
- **Multi-Agency Data Fusion:** Overlays state management boundaries (Sections/Districts) with federal critical habitat (NOAA) and real-time environment data (USGS).
- **Socioeconomic Enrichment:** Dynamically links 200+ Alaska communities to real-time Census ACS data and official place boundaries.
- **Hierarchical Geography:** Drill down from broad management regions to specific statistical reporting areas.
- **Unified Discovery:** Global search for instant navigation across regions, villages, and context layers.
- **Performance Proxy:** custom Node.js proxy with in-memory caching to bypass slow upstream GIS servers.

## 💡 Why This App Matters
Managing Alaska's vast coastline requires understanding the complex overlap between regulatory lines, human settlements, and a changing environment. This tool allows analysts and researchers to instantly answer questions like: *"How does endangered Beluga habitat intersect with commercial salmon sections?"* or *"What is the economic profile of the village nearest to this high-water river gage?"*

## 🎬 Demo Workflows
### 1. The Socioeconomic Connection
*   Search for **"Akhiok"**.
*   Select the community result to zoom and load its official Census boundary.
*   Review the population and income profile in the detail panel to understand the human scale of the Kodiak region.

### 2. Ecological Overlap
*   Select **Upper Cook Inlet** region.
*   Toggle **"NOAA Beluga Critical Habitat"** under Federal Context.
*   Note how the endangered species habitat (purple dash) perfectly overlaps with the Northern District management units, highlighting a primary conservation-management challenge.

### 3. Environmental Real-Time
*   Select **Prince William Sound** region.
*   Toggle **"USGS River Gages"**.
*   Click the gage at the **Copper River** to see real-time flow and level data, critical context for the season's first salmon run.

---

## 🛠 Local Development
See the [Setup Guide](docs/deployment.md) for local installation instructions.

## 📦 Deployment
See the [Deployment Guide](docs/deployment.md) for instructions on building and pushing updates to AWS.

## 🗺 Roadmap
- [x] Hierarchical management layers & Unified search.
- [x] Census ACS enrichment & TIGERweb boundaries.
- [x] NOAA/USGS context layers & interpretation.
- [x] Add Yakutat and granular management layers for PWS, BB, and UCI.
- [ ] Deploy RDS PostgreSQL for persistent community mapping.
