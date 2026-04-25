/**
 * Service to fetch official Census place boundaries from TIGERweb.
 */
const BASE_URL = "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/MapServer";

async function getPlaceBoundary(fipsCode) {
  // We'll check both Incorporated Places (28) and CDPs (30)
  const layers = [28, 30];
  
  for (const layerId of layers) {
    const url = `${BASE_URL}/${layerId}/query?where=STATE='02'+AND+PLACE='${fipsCode}'&outFields=NAME,GEOID,AREALAND,AREAWATER&f=geojson`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      
      const geojson = await response.json();
      if (geojson.features && geojson.features.length > 0) {
        // Found a match!
        return {
          layerId,
          geojson: geojson.features[0] // Return the single feature
        };
      }
    } catch (error) {
      console.error(`[${new Date().toISOString()}] TIGER FETCH ERROR for layer ${layerId}:`, error.message);
    }
  }
  
  return null;
}

module.exports = { getPlaceBoundary };
