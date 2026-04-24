# CloudWatch Observability

## Log Groups
- `/ecs/fishery-api`: Main API logs (structured JSON).
- `/ecs/fishery-cache-warmer`: Background worker logs.

## Custom Metrics (Namespace: `FisheryExplorer`)
- `CacheHits` (Count)
- `CacheMisses` (Count)
- `UpstreamFetchErrors` (Count)
- `ResponseTime` (Milliseconds)

## Example CloudWatch Dashboard Setup
1. Go to CloudWatch -> Dashboards -> Create dashboard (`Fishery-Overview`).
2. Add a Line widget for `ResponseTime` (average).
3. Add a Stacked Area widget for `CacheHits` vs `CacheMisses`.
4. Add a Number widget for `UpstreamFetchErrors`.

## Alarms
- **High Fetch Errors**: Trigger if `UpstreamFetchErrors` > 5 within 5 minutes.
- **API Latency**: Trigger if Average `ResponseTime` > 2000ms for 3 consecutive data points.

*Resource Status*: **Required now** (Dashboards and custom metrics cost a few dollars a month but provide massive operational value. Keep them active).
