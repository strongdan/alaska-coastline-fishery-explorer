# Alaska Coastal Fishery Explorer

An interactive map application for exploring Alaska coastline fishery data and its intersection with communities, environment, and federal management. This project proxies and caches real-time data from state and federal agencies (ADF&G, NOAA, USGS, Census) to provide a high-performance, context-rich experience.

**Live Site:** [Explorer App](http://alaska-coastline-fishery-explorer-625978481175-us-east-2-an.s3-website.us-east-2.amazonaws.com/)  
**Live API:** [API Health](http://fishery-api-alb-526406090.us-east-2.elb.amazonaws.com/health)

## 🚀 Architecture Summary
- **Frontend:** React + Vite + Leaflet, hosted on **AWS S3** (Static Website Hosting).
- **Backend:** Express.js Proxy/Cache, running on **AWS ECS Fargate** behind an **Application Load Balancer (ALB)**.
- **Data Integrations:** ADF&G (Fisheries), NOAA (Habitat), USGS (Water), U.S. Census Bureau (Socioeconomics/Geography).

For more details, see [Architecture Documentation](docs/architecture.md).

## ✨ Key Features
- **Hierarchical Management Geography:** Navigate Alaska fisheries by region, then toggle between Districts, Sections, and Statistical Areas for precise context.
- **Community Context:** Explore 200+ Alaska communities with enriched U.S. Census ACS socioeconomic data (Population, Median Income).
- **Place Geography:** View official Census place boundaries (TIGER/TIGERweb) for matched communities to see their geographic footprint.
- **Ecological & Environmental Overlays:** 
  - **NOAA Habitat:** Integrated Cook Inlet Beluga Critical Habitat with built-in management interpretation.
  - **USGS Water Data:** Real-time streamflow and level data from major salmon river gages (Copper, Kenai, Nushagak).
- **Unified Discovery:** Integrated search bar to quickly find regions, villages, or specific context layers.
- **Summary & Comparison:** Compact dashboard for real-time state tracking and side-by-side regional geography comparisons.

## 🛠 Local Development
### Prerequisites
- Node.js 20+
- pnpm
- Census API Key (optional, for enrichment)

### Setup
1. **Clone the repo**
2. **Backend:**
   ```bash
   cd apps/api
   npm install
   npm start # API runs on http://localhost:3001
   ```
3. **Frontend:**
   ```bash
   cd apps/web
   pnpm install
   pnpm dev # Web runs on http://localhost:5173
   ```

## 📦 Deployment
See [Deployment Guide](docs/deployment.md) for instructions on building and pushing updates to AWS.

## 🗺 Roadmap
- [x] Hierarchical management layers (SEAK Districts/Sections/Stat Areas).
- [x] Community points and Census ACS enrichment.
- [x] Federal (NOAA) and Environmental (USGS) context layers.
- [x] Unified search workflow.
- [x] Summary and comparison dashboard.
- [ ] Add Kodiak and Alaska Peninsula management layers.
- [ ] Implement persistent PostgreSQL/RDS storage for community mapping.
- [ ] Expand USGS integration with automated temperature alerts.
