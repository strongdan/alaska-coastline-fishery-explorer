/**
 * Central configuration for all ArcGIS datasets.
 * URLs can be overridden via environment variables for testing or proxying.
 */
export const DATASETS = {
  pws_salmon_districts: {
    id: "pws_salmon_districts",
    name: "Prince William Sound & Copper River",
    description: "Commercial salmon districts for PWS and Copper River.",
    layerType: "Districts",
    geojsonUrl: import.meta.env.VITE_URL_PWS_SALMON || "https://services.arcgis.com/VdkVOAHovLuozJG4/arcgis/rest/services/Commercial_Salmon_PrinceWilliamSound_Districts/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
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
    geojsonUrl: import.meta.env.VITE_URL_BRISTOL_BAY || "https://gis.adfg.alaska.gov/arcgis/rest/services/CF_public/BristolBaySalmon5AAC_06_200/MapServer/8/query?outFields=*&where=1%3D1&f=geojson",
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
    geojsonUrl: import.meta.env.VITE_URL_UPPER_COOK_INLET || "https://gis.adfg.alaska.gov/arcgis/rest/services/CF_public/CookInlet_5AAC_21_200/MapServer/3/query?outFields=*&where=1%3D1&f=geojson",
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
    geojsonUrl: import.meta.env.VITE_URL_SEAK_SALMON || "https://services.arcgis.com/VdkVOAHovLuozJG4/arcgis/rest/services/SEAK_Salmon_Districts_Simplified/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
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
  },
  chignik_salmon_districts: {
    id: "chignik_salmon_districts",
    name: "Chignik",
    description: "Commercial salmon districts for Chignik.",
    layerType: "Districts",
    geojsonUrl: "",
    sourcePageUrl: "",
    available: false,
    status: "todo",
    propertyMap: {
      name: "DISTRICT_NAME",
      code: "DISTRICT_CODE",
      region: "REGION_CODE",
      group: "FISHERY_GROUP_CODE"
    }
  },
  alaska_peninsula_districts: {
    id: "alaska_peninsula_districts",
    name: "AK Peninsula",
    description: "Commercial salmon districts for AK Peninsula.",
    layerType: "Districts",
    geojsonUrl: "",
    sourcePageUrl: "",
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
