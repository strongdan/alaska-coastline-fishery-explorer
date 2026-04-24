/**
 * Central configuration for all datasets.
 * Pointing to the local proxy API on port 3002 for verification.
 */
const API_BASE = "http://localhost:3002";

export const REGIONS = [
  {
    id: "pws",
    name: "Prince William Sound",
    available: true,
    layers: [
      {
        id: "pws_salmon_districts",
        name: "Districts",
        layerType: "Districts",
        description: "Management units for Prince William Sound and Copper River.",
        geojsonUrl: `${API_BASE}/api/geojson/pws`,
        propertyMap: {
          name: "DISTRICT_NAME",
          code: "DISTRICT_CODE",
          region: "REGION_CODE",
          group: "FISHERY_GROUP_CODE"
        }
      }
    ]
  },
  {
    id: "bristol_bay",
    name: "Bristol Bay",
    available: true,
    layers: [
      {
        id: "bristol_bay_districts",
        name: "Districts",
        layerType: "Districts",
        description: "Management units for Bristol Bay commercial salmon fisheries.",
        geojsonUrl: `${API_BASE}/api/geojson/bristol-bay`,
        propertyMap: {
          name: "DISTRICT_NAME",
          code: "DISTRICT_CODE",
          region: "REGION_CODE",
          group: "FISHERY_GROUP_CODE"
        }
      }
    ]
  },
  {
    id: "upper_cook_inlet",
    name: "Upper Cook Inlet",
    available: true,
    layers: [
      {
        id: "upper_cook_inlet_districts",
        name: "Districts",
        layerType: "Districts",
        description: "Management units for Upper Cook Inlet commercial salmon fisheries.",
        geojsonUrl: `${API_BASE}/api/geojson/upper-cook-inlet`,
        propertyMap: {
          name: "DISTRICT_NAME",
          code: "DISTRICT_CODE",
          region: "REGION_CODE",
          group: "FISHERY_GROUP_CODE"
        }
      }
    ]
  },
  {
    id: "southeast",
    name: "Southeast Alaska",
    available: true,
    layers: [
      {
        id: "seak_salmon_districts",
        name: "Districts",
        layerType: "Districts",
        description: "Primary management units for Southeast Alaska commercial salmon fisheries.",
        geojsonUrl: `${API_BASE}/api/geojson/southeast-districts`,
        propertyMap: {
          name: "DISTRICT_NAME",
          code: "DISTRICT_CODE",
          region: "REGION_CODE",
          group: "FISHERY_GROUP_CODE"
        }
      },
      {
        id: "seak_salmon_sections",
        name: "Sections",
        layerType: "Sections",
        description: "Finer subdivisions within districts used for precise fishery management.",
        geojsonUrl: `${API_BASE}/api/geojson/southeast-sections`,
        propertyMap: {
          name: "SECTION_NAME",
          code: "SECTION_CODE",
          district: "DISTRICT_NAME"
        }
      },
      {
        id: "seak_salmon_stat_areas",
        name: "Statistical Areas",
        layerType: "Statistical Areas",
        description: "Reporting and analysis areas used for catch documentation and research.",
        geojsonUrl: `${API_BASE}/api/geojson/southeast-stat-areas`,
        propertyMap: {
          name: "STAT_AREA_NAME",
          code: "STAT_AREA",
          district: "DISTRICT_NAME",
          section: "SECTION_NAME"
        }
      }
    ]
  },
  {
    id: "kodiak",
    name: "Kodiak",
    available: false,
    layers: []
  }
];

export const DEFAULT_REGION = "pws";
export const DEFAULT_LAYER_INDEX = 0;

export const COMMUNITIES = {
  id: "alaska_communities",
  name: "Communities",
  description: "Alaska cities, villages, and census-designated places.",
  geojsonUrl: `${API_BASE}/api/geojson/alaska-communities`,
  propertyMap: {
    name: "RESCOMM",
    code: "LOC_CODE",
    region: "REGION"
  }
};
