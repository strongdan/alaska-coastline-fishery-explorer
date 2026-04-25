require("dotenv").config();
const express = require("express");
const cors = require("cors");
const datasets = require("./lib/datasets");
const cache = require("./services/cache");
const db = require("./db"); // Optional RDS connection
const census = require("./services/census");
const communityService = require("./services/community_service");
const tiger = require("./services/tiger");
const usgs = require("./services/usgs");
const { CloudWatchClient, PutMetricDataCommand } = require("@aws-sdk/client-cloudwatch");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize CloudWatch
let cwClient = null;
if (process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION) {
  cwClient = new CloudWatchClient({ region: process.env.AWS_REGION || "us-east-2" });
}

// Helper to emit metrics
const emitMetric = async (metricName, value, unit = "Count") => {
  if (!cwClient) return;
  try {
    await cwClient.send(new PutMetricDataCommand({
      Namespace: "FisheryExplorer",
      MetricData: [{ MetricName: metricName, Value: value, Unit: unit }]
    }));
  } catch (err) {
    console.error(JSON.stringify({ level: "error", message: "Failed to emit metric", error: err.message }));
  }
};

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "api", dbConfigured: db.isConfigured() });
});

app.get("/api/datasets", (req, res) => {
  const summary = Object.values(datasets).map(d => ({ id: d.id, name: d.name }));
  res.json(summary);
});

app.get("/api/geojson/:datasetId", async (req, res) => {
  const startTime = Date.now();
  const { datasetId } = req.params;
  const config = datasets[datasetId];

  if (!config) {
    return res.status(404).json({ error: "Dataset not found", datasetId });
  }

  const cachedEntry = cache.get(datasetId);
  if (cachedEntry) {
    emitMetric("CacheHits", 1);
    emitMetric("ResponseTime", Date.now() - startTime, "Milliseconds");

    console.log(JSON.stringify({ level: "info", event: "CACHE_HIT", datasetId }));
    res.setHeader("X-Cache-Status", "HIT");
    res.setHeader("X-Cache-Expires-At", new Date(cachedEntry.expires).toISOString());
    return res.json(cachedEntry.value);
  }

  try {
    const https = require("https");
    const agent = new https.Agent({ rejectUnauthorized: false });
    
    const geojson = await new Promise((resolve, reject) => {
      https.get(config.url, { agent }, (res) => {
        let body = "";
        res.on("data", (chunk) => body += chunk);
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error("Failed to parse upstream JSON"));
          }
        });
      }).on("error", reject);
    });
    
    const expiresAt = cache.set(datasetId, geojson);
    
    emitMetric("CacheMisses", 1);
    emitMetric("ResponseTime", Date.now() - startTime, "Milliseconds");
    
    console.log(JSON.stringify({ level: "info", event: "CACHE_MISS", datasetId }));
    res.setHeader("X-Cache-Status", "MISS");
    res.setHeader("X-Cache-Expires-At", new Date(expiresAt).toISOString());
    res.json(geojson);
  } catch (error) {
    emitMetric("UpstreamFetchErrors", 1);
    console.error(JSON.stringify({ level: "error", event: "FETCH_ERROR", datasetId, error: error.message }));
    res.status(502).json({ error: "Failed to fetch data from upstream source", details: error.message });
  }
});

app.get("/api/census/:fipsCode", async (req, res) => {
  const { fipsCode } = req.params;
  const cacheKey = `census-${fipsCode}`;

  const cachedEntry = cache.get(cacheKey);
  if (cachedEntry) {
    return res.json(cachedEntry.value);
  }

  try {
    const data = await census.getCommunityData(fipsCode);
    if (!data) {
      return res.status(404).json({ error: "Census data not found" });
    }
    cache.set(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: "Failed to fetch from Census API" });
  }
});

app.get("/api/community/enrich/:locCode", async (req, res) => {
  const { locCode } = req.params;
  const { name } = req.query; 
  const cacheKey = `enrich-${locCode}`;

  const cachedEntry = cache.get(cacheKey);
  if (cachedEntry) {
    return res.json(cachedEntry.value);
  }

  try {
    const data = await communityService.enrichCommunity(locCode, name);
    cache.set(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: "Enrichment service error" });
  }
});

app.get("/api/community/boundary/:fipsCode", async (req, res) => {
  const { fipsCode } = req.params;
  const cacheKey = `boundary-${fipsCode}`;

  const cachedEntry = cache.get(cacheKey);
  if (cachedEntry) {
    return res.json(cachedEntry.value);
  }

  try {
    const data = await tiger.getPlaceBoundary(fipsCode);
    if (!data) {
      return res.status(404).json({ error: "Boundary not found" });
    }
    cache.set(cacheKey, data);
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: "TIGERweb service error" });
  }
});

app.get("/api/environmental/water-data", async (req, res) => {
  const cacheKey = "usgs-water-data";
  
  const cachedEntry = cache.get(cacheKey);
  if (cachedEntry) {
    return res.json(cachedEntry.value);
  }

  try {
    const data = await usgs.getWaterData();
    cache.set(cacheKey, data); 
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: "USGS service error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(JSON.stringify({ level: "info", message: `API listening on http://localhost:${PORT}` }));
});
