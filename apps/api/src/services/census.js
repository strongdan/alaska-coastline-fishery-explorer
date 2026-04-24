/**
 * Service to fetch socioeconomic data from the U.S. Census ACS API.
 */
const API_BASE = "https://api.census.gov/data/2022/acs/acs5";

async function getCommunityData(fipsCode) {
  const apiKey = process.env.CENSUS_API_KEY;
  const url = `${API_BASE}?get=NAME,B01003_001E,B19013_001E&for=place:${fipsCode}&in=state:02${apiKey ? `&key=${apiKey}` : ""}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Census API error: ${response.statusText}`);
    }
    const data = await response.json();
    
    // Census returns data as an array of arrays: [["NAME", "B01003_001E", "B19013_001E", "state", "place"], ["...", "..."]]
    if (data.length < 2) return null;

    return {
      name: data[1][0],
      population: parseInt(data[1][1], 10),
      medianIncome: parseInt(data[1][2], 10),
      fips: fipsCode
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] CENSUS FETCH ERROR for ${fipsCode}:`, error.message);
    return null;
  }
}

module.exports = { getCommunityData };
