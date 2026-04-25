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
    status: "ready",
    layers: [
      {
        id: "pws_salmon_districts",
        name: "Districts",
        layerType: "Districts",
        description: "Primary management units for PWS salmon fisheries.",
        geojsonUrl: `${API_BASE}/api/geojson/pws`,
        propertyMap: {
          name: "DISTRICT_NAME",
          code: "DISTRICT_CODE",
          region: "REGION_CODE"
        }
      },
      {
        id: "pws_stat_areas",
        name: "Statistical Areas",
        layerType: "Statistical Areas",
        description: "Reporting areas for PWS commercial catch.",
        geojsonUrl: `${API_BASE}/api/geojson/pws-stat-areas`,
        propertyMap: {
          name: "STAT_AREA",
          code: "STAT_AREA",
          district: "DISTRICT_NAME"
        }
      },
      {
        id: "pws_subdistricts",
        name: "Subdistricts",
        layerType: "Subdistricts",
        description: "Finer management subdivisions in PWS.",
        geojsonUrl: `${API_BASE}/api/geojson/pws-subdistricts`,
        propertyMap: {
          name: "SUBDISTRICT_NAME",
          code: "SUBDISTRICT_CODE",
          district: "DISTRICT_NAME"
        }
      },
      {
        id: "pws_reg_areas",
        name: "Registration Areas",
        layerType: "Registration Areas",
        description: "High-level administrative areas for PWS.",
        geojsonUrl: `${API_BASE}/api/geojson/pws-registration-areas`,
        propertyMap: {
          name: "REGISTRATION_AREA_NAME",
          code: "REGISTRATION_AREA_CODE"
        }
      }
    ]
  },
  {
    id: "bristol_bay",
    name: "Bristol Bay",
    available: true,
    status: "ready",
    layers: [
      {
        id: "bristol_bay_districts",
        name: "Districts",
        layerType: "Districts",
        description: "Primary management units for Bristol Bay.",
        geojsonUrl: `${API_BASE}/api/geojson/bristol-bay-districts`,
        propertyMap: {
          name: "DISTRICT_NAME",
          code: "DISTRICT_CODE"
        }
      },
      {
        id: "bristol_bay_sections",
        name: "Sections",
        layerType: "Sections",
        description: "Subdivisions within Bristol Bay districts.",
        geojsonUrl: `${API_BASE}/api/geojson/bristol-bay-sections`,
        propertyMap: {
          name: "SECTION_NAME",
          district: "DISTRICT_NAME"
        }
      },
      {
        id: "bristol_bay_stat_areas",
        name: "Statistical Areas",
        layerType: "Statistical Areas",
        description: "Reporting areas for Bristol Bay catch.",
        geojsonUrl: `${API_BASE}/api/geojson/bristol-bay-stat-areas`,
        propertyMap: {
          name: "STAT_AREA_NAME",
          code: "STAT_AREA",
          district: "DISTRICT_NAME"
        }
      },
      {
        id: "bristol_bay_reg_areas",
        name: "Registration Areas",
        layerType: "Registration Areas",
        description: "High-level administrative areas for Bristol Bay.",
        geojsonUrl: `${API_BASE}/api/geojson/bristol-bay-registration-areas`,
        propertyMap: {
          name: "REGISTRATION_AREA_NAME",
          code: "REGISTRATION_AREA_CODE"
        }
      }
    ]
  },
  {
    id: "upper_cook_inlet",
    name: "Upper Cook Inlet",
    available: true,
    status: "ready",
    layers: [
      {
        id: "uci_districts",
        name: "Districts",
        layerType: "Districts",
        description: "Primary management units for Upper Cook Inlet.",
        geojsonUrl: `${API_BASE}/api/geojson/upper-cook-inlet-districts`,
        propertyMap: {
          name: "DISTRICT_NAME",
          code: "DISTRICT_CODE"
        }
      },
      {
        id: "uci_subdistricts",
        name: "Subdistricts",
        layerType: "Subdistricts",
        description: "Subdivisions for targeted UCI management.",
        geojsonUrl: `${API_BASE}/api/geojson/upper-cook-inlet-subdistricts`,
        propertyMap: {
          name: "SUBDISTRICT_NAME",
          district: "DISTRICT_NAME"
        }
      },
      {
        id: "uci_sections",
        name: "Sections",
        layerType: "Sections",
        description: "Finer subdivisions within UCI subdistricts.",
        geojsonUrl: `${API_BASE}/api/geojson/upper-cook-inlet-sections`,
        propertyMap: {
          name: "SECTION_NAME",
          district: "DISTRICT_NAME"
        }
      },
      {
        id: "uci_stat_areas",
        name: "Statistical Areas",
        layerType: "Statistical Areas",
        description: "Detailed reporting areas for UCI catch.",
        geojsonUrl: `${API_BASE}/api/geojson/upper-cook-inlet-stat-areas`,
        propertyMap: {
          name: "STAT_AREA_NAME",
          code: "STAT_AREA",
          district: "DISTRICT_NAME"
        }
      },
      {
        id: "uci_drift_areas",
        name: "Drift Gillnet Areas",
        layerType: "Special Areas",
        description: "Specific management zones for the drift gillnet fleet.",
        geojsonUrl: `${API_BASE}/api/geojson/upper-cook-inlet-drift-gillnet`,
        propertyMap: {
          name: "NAME",
          description: "DESCRIPTIO"
        }
      }
    ]
  },
  {
    id: "southeast",
    name: "Southeast Alaska",
    available: true,
    status: "ready",
    layers: [
      {
        id: "seak_salmon_districts",
        name: "Districts",
        layerType: "Districts",
        description: "Primary management units for Southeast Alaska.",
        geojsonUrl: `${API_BASE}/api/geojson/southeast-districts`,
        propertyMap: {
          name: "DISTRICT_NAME",
          code: "DISTRICT_CODE"
        }
      },
      {
        id: "seak_salmon_sections",
        name: "Sections",
        layerType: "Sections",
        description: "Finer subdivisions within SEAK districts.",
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
        description: "Reporting and analysis areas for SEAK catch.",
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
    id: "yakutat",
    name: "Yakutat",
    available: true,
    status: "ready",
    layers: [
      {
        id: "yakutat_districts",
        name: "Districts",
        layerType: "Districts",
        description: "Salmon management districts for the Yakutat area.",
        geojsonUrl: `${API_BASE}/api/geojson/yakutat-districts`,
        propertyMap: {
          name: "DISTRICT_NAME",
          code: "DISTRICT_CODE"
        }
      },
      {
        id: "yakutat_stat_areas",
        name: "Statistical Areas",
        layerType: "Statistical Areas",
        description: "Reporting areas for Yakutat catch.",
        geojsonUrl: `${API_BASE}/api/geojson/yakutat-stat-areas`,
        propertyMap: {
          name: "STAT_AREA_NAME",
          code: "STAT_AREA",
          district: "DISTRICT_NAME"
        }
      }
    ]
  },
  {
    id: "kodiak",
    name: "Kodiak",
    available: false,
    layers: []
  },
  {
    id: "chignik",
    name: "Chignik",
    available: false,
    layers: []
  },
  {
    id: "alaska_peninsula",
    name: "Alaska Peninsula",
    available: false,
    layers: []
  },
  {
    id: "lower_cook_inlet",
    name: "Lower Cook Inlet",
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

export const CONTEXT_LAYERS = [
  {
    id: "noaa_beluga_ch",
    name: "NOAA Beluga Critical Habitat",
    sourceAgency: "NOAA Fisheries (NMFS)",
    subject: "Cook Inlet Beluga Whale",
    legalStatus: "Endangered (ESA)",
    interpretation: "This habitat overlaps with Upper Cook Inlet salmon fisheries. Management must ensure commercial activities do not adversely modify these critical areas for the endangered beluga population.",
    description: "Designated critical habitat for the endangered Cook Inlet Beluga Whale population.",
    geojsonUrl: `${API_BASE}/api/geojson/noaa-cook-inlet-beluga-ch`,
    propertyMap: {
      common_name: "COMNAME",
      status: "LISTSTATUS",
      habitat_area: "UNIT",
      area_sq_km: "AREASqKm",
      publication_date: "PUBDATE"
    },
    style: {
      color: "#9333ea",
      weight: 3,
      fillColor: "#c084fc",
      fillOpacity: 0.1,
      dashArray: "10, 10"
    }
  }
];

export const ENVIRONMENT_LAYERS = [
  {
    id: "usgs_water_data",
    name: "USGS River Gages",
    description: "Real-time water level and flow data for major salmon rivers.",
    interpretation: "Water level and temperature are critical drivers of salmon migration and spawning success. High flow can impact gear efficiency, while low flow or high temperature can stress returning fish.",
    geojsonUrl: `${API_BASE}/api/environmental/water-data`,
    style: {
      radius: 8,
      fillColor: "#0ea5e9",
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }
  }
];
