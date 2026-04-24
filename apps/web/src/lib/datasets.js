/**
 * Central configuration for all datasets.
 * Pointing to the new AWS Fargate Proxy API.
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://3.144.126.172:3001";

export const DATASETS = {
  pws_salmon_districts: {
    id: "pws_salmon_districts",
    name: "Prince William Sound & Copper River",
    description: "Commercial salmon districts for PWS and Copper River.",
    layerType: "Districts",
    geojsonUrl: `${API_BASE}/api/geojson/pws`,
    sourcePageUrl: "https://soa-adfg.opendata.arcgis.com/datasets/c24e3c99c3904233bba565255d54701c_0/about",
    available: true,
    status: "ready",
    propertyMap: {
      name: "DISTRICT_NAME",
      code: "DISTRICT_CODE",
      region: "REGION_CODE",
      group: "FISHERY_GROUP_CODE"
    }
  },
  bristol_bay_districts: {
    id: "bristol_bay_districts",
    name: "Bristol Bay",
    description: "Commercial salmon districts for Bristol Bay.",
    layerType: "Districts",
    geojsonUrl: `${API_BASE}/api/geojson/bristol-bay`,
    sourcePageUrl: "https://data-adfg.opendata.arcgis.com/datasets/ADFG::commercial-fisheries-bristol-bay-salmon-districts/about",
    available: true,
    status: "ready",
    propertyMap: {
      name: "DISTRICT_NAME",
      code: "DISTRICT_CODE",
      region: "REGION_CODE",
      group: "FISHERY_GROUP_CODE"
    }
  },
  upper_cook_inlet_districts: {
    id: "upper_cook_inlet_districts",
    name: "Upper Cook Inlet",
    description: "Commercial salmon districts for Upper Cook Inlet.",
    layerType: "Districts",
    geojsonUrl: `${API_BASE}/api/geojson/upper-cook-inlet`,
    sourcePageUrl: "https://geodata.alaska.gov/datasets/ADFG::commercial-fisheries-upper-cook-inlet-salmon-districts/about",
    available: true,
    status: "ready",
    propertyMap: {
      name: "DISTRICT_NAME",
      code: "DISTRICT_CODE",
      region: "REGION_CODE",
      group: "FISHERY_GROUP_CODE"
    }
  },
  seak_salmon_districts: {
    id: "seak_salmon_districts",
    name: "Southeast Alaska",
    description: "Commercial salmon districts for Southeast Alaska (Simplified).",
    layerType: "Districts",
    geojsonUrl: `${API_BASE}/api/geojson/southeast`,
    sourcePageUrl: "https://soa-adfg.opendata.arcgis.com/datasets/adfg::seak-salmon-districts-simplified/about",
    available: true,
    status: "ready",
    propertyMap: {
      name: "DISTRICT_NAME_1",
      code: "DISTRICT_CODE_1",
      region: "REGION_CODE",
      group: "FISHERY_GROUP_CODE"
    }
  },
  kodiak_salmon_districts: {
    id: "kodiak_salmon_districts",
    name: "Kodiak",
    description: "Commercial salmon districts for Kodiak.",
    layerType: "Districts",
    geojsonUrl: "",
    sourcePageUrl: "https://soa-adfg.opendata.arcgis.com/datasets/adfg::kodiak-salmon-commercial-fishing-districts/about",
    available: false,
    status: "todo",
    propertyMap: {
      name: "DISTRICT_NAME",
      code: "DISTRICT_CODE",
      region: "REGION_CODE",
      group: "FISHERY_GROUP_CODE"
    }
  }
};

export const DEFAULT_DATASET = "pws_salmon_districts";
