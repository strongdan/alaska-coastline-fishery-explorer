/**
 * Service to fetch real-time streamflow and water quality data from USGS NWIS.
 */
const API_BASE = "https://waterservices.usgs.gov/nwis/iv/?format=json";

// Key Salmon River Gages:
// 15214000: Copper River
// 15258000: Kenai River at Cooper Landing
// 15302500: Nushagak River at Ekwok
const DEFAULT_SITES = ["15214000", "15258000", "15302500"];
const PARAMETERS = ["00060", "00065", "00010"]; // Discharge, Gage Height, Temperature

async function getWaterData() {
  const url = `${API_BASE}&sites=${DEFAULT_SITES.join(",")}&parameterCd=${PARAMETERS.join(",")}&siteStatus=all`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`USGS API error: ${response.statusText}`);
    }
    const data = await response.json();
    
    // Flatten USGS complex nested structure into a simpler format for our frontend
    const sitesMap = {};

    data.value.timeSeries.forEach(ts => {
      const siteId = ts.sourceInfo.siteCode[0].value;
      const siteName = ts.sourceInfo.siteName;
      const coords = ts.sourceInfo.geoLocation.geogLocation;
      const parameter = ts.variable.variableCode[0].value; // e.g. 00060
      const unit = ts.variable.unit.unitAbbreviation;
      const latestValue = ts.values[0].value[0];

      if (!sitesMap[siteId]) {
        sitesMap[siteId] = {
          id: siteId,
          name: siteName,
          coordinates: [coords.longitude, coords.latitude],
          readings: []
        };
      }

      sitesMap[siteId].readings.push({
        parameter,
        label: ts.variable.variableName.split(",")[0],
        value: latestValue.value,
        unit,
        dateTime: latestValue.dateTime,
        qualifiers: latestValue.qualifiers
      });
    });

    return Object.values(sitesMap);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] USGS FETCH ERROR:`, error.message);
    return [];
  }
}

module.exports = { getWaterData };
