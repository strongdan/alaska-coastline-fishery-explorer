const express = require("express");
const cors = require("cors");
const datasets = require("./lib/datasets");
const cache = require("./services/cache");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "api" });
});

app.get("/api/datasets", (req, res) => {
  const summary = Object.values(datasets).map(d => ({
    id: d.id,
    name: d.name
  }));
  res.json(summary);
});

app.get("/api/geojson/:datasetId", async (req, res) => {
  const { datasetId } = req.params;
  const config = datasets[datasetId];

  if (!config) {
    return res.status(404).json({ error: "Dataset not found", datasetId });
  }

  const cachedData = cache.get(datasetId);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await fetch(config.url);
    if (!response.ok) {
      throw new Error(`Upstream ArcGIS error: ${response.statusText}`);
    }
    const geojson = await response.json();
    
    cache.set(datasetId, geojson);
    res.json(geojson);
  } catch (error) {
    console.error(`Error fetching dataset ${datasetId}:`, error);
    res.status(502).json({ 
      error: "Failed to fetch data from upstream source",
      details: error.message 
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
