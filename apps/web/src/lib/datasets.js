/**
 * Central configuration for all ArcGIS datasets.
 * URLs can be overridden via environment variables for testing or proxying.
 */
export const DATASETS = {
  pws_salmon_districts: {
    id: "pws_salmon_districts",
    name: "Prince William Sound",
    description: "Commercial salmon districts for PWS.",
    url: import.meta.env.VITE_URL_PWS_SALMON || "https://services.arcgis.com/VdkVOAHovLuozJG4/arcgis/rest/services/Commercial_Salmon_PrinceWilliamSound_Districts/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
  },
  bristol_bay_districts: {
    id: "bristol_bay_districts",
    name: "Bristol Bay",
    description: "Commercial salmon districts for Bristol Bay.",
    url: import.meta.env.VITE_URL_BRISTOL_BAY || "https://gis.adfg.alaska.gov/ags/rest/services/CF_public/BristolBaySalmon5AAC_06_200/MapServer/8/query?where=1%3D1&outFields=*&outSR=4326&f=geojson"
  }
};

export const DEFAULT_DATASET = "pws_salmon_districts";
