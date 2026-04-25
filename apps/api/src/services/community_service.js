const mapping = require("../lib/community_mapping.json");
const census = require("./census");

/**
 * Normalizes a community name for lookup.
 */
function normalizeName(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\b(city|cdp|village|borough)\b/g, "")
    .trim();
}

/**
 * Enriches community data by looking up the Census FIPS code from the mapping layer.
 */
async function enrichCommunity(locCode, name) {
  const normalized = normalizeName(name);
  
  // 1. Try to find by LOC_CODE (most reliable)
  let match = mapping.find(m => String(m.loc_code) === String(locCode));
  
  // 2. Fallback to normalized name match if no LOC_CODE match (for manual entries)
  if (!match && normalized) {
    match = mapping.find(m => m.normalized_name === normalized);
  }

  if (!match || match.status !== "confirmed") {
    return {
      loc_code: locCode,
      name: name,
      match_status: match ? match.status : "unmatched",
      census_data: null
    };
  }

  // 3. Fetch from Census if confirmed
  const censusData = await census.getCommunityData(match.census_fips);

  return {
    loc_code: locCode,
    name: name,
    match_status: "confirmed",
    census_fips: match.census_fips,
    census_data: censusData
  };
}

module.exports = {
  enrichCommunity,
  normalizeName
};
