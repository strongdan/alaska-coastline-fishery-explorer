# Alaska Coastal Fishery Explorer

An interactive map application for exploring Alaska coastline fishery data. This project proxies and caches real-time ArcGIS data from the Alaska Department of Fish and Game (ADF&G) to provide a high-performance experience for analysts and researchers.

**Live Site:** [Explorer App](http://alaska-coastline-fishery-explorer-625978481175-us-east-2-an.s3-website.us-east-2.amazonaws.com/)  
**Live API:** [API Health](http://fishery-api-alb-526406090.us-east-2.elb.amazonaws.com/health)

## 🚀 Architecture Summary
- **Frontend:** React + Vite + Leaflet, hosted on **AWS S3** (Static Website Hosting).
- **Backend:** Express.js Proxy/Cache, running on **AWS ECS Fargate** behind an **Application Load Balancer (ALB)**.
- **Data Source:** ADF&G ArcGIS REST Services.

For more details, see [Architecture Documentation](docs/architecture.md).

## ✨ Key Features
- **Multi-Region Support:** Toggle between PWS, Bristol Bay, Upper Cook Inlet, and SE Alaska.
- **Interactive Mapping:** Hover highlights, auto-fit bounds, and detailed district popups.
- **Server-Side Caching:** Backend proxy reduces load on ArcGIS services and improves speed.
- **AWS Ready:** Fully containerized and deployed using modern cloud patterns.

## 🛠 Local Development
### Prerequisites
- Node.js 20+
- pnpm

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
- [ ] Add Kodiak and Alaska Peninsula datasets.
- [ ] Implement S3-backed persistent caching.
- [ ] Add layer opacity controls and legends.
- [ ] CI/CD automation via GitHub Actions.
