// Lightweight background worker for ECS Scheduled Tasks
const datasets = require("./lib/datasets");

async function runCacheWarmer() {
  console.log(`[${new Date().toISOString()}] Starting scheduled cache warm-up...`);
  for (const key of Object.keys(datasets)) {
    console.log(`Warming dataset: ${key}`);
    try {
      // In a real scenario, this would write to S3 or a shared Redis.
      // For now, we simulate the fetch to burn compute and log metrics.
      const res = await fetch(datasets[key].url);
      if (res.ok) {
        console.log(`Successfully fetched ${key}`);
      } else {
        console.error(`Failed to fetch ${key}: ${res.statusText}`);
      }
    } catch (err) {
      console.error(`Error processing ${key}:`, err.message);
    }
  }
  console.log(`[${new Date().toISOString()}] Cache warm-up complete.`);
}

runCacheWarmer().catch(console.error);
