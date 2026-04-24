import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import InfoPanel from "./components/InfoPanel";
import CommunityDetail from "./components/CommunityDetail";
import { REGIONS, DEFAULT_REGION, DEFAULT_LAYER_INDEX, COMMUNITIES } from "./lib/datasets";

function App() {
  const [regionId, setRegionId] = useState(DEFAULT_REGION);
  const [layerIndex, setLayerIndex] = useState(DEFAULT_LAYER_INDEX);
  const [data, setData] = useState(null);
  const [communityData, setCommunityData] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const region = REGIONS.find(r => r.id === regionId) || REGIONS[0];
  const layer = region.layers[layerIndex] || region.layers[0];

  useEffect(() => {
    setData(null);
    setError(null);

    if (!region.available || !layer || !layer.geojsonUrl) {
      setLoading(false);
      if (!region.available) {
        setError("Region " + region.name + " is coming soon.");
      } else {
        setError("Layer data not available.");
      }
      return;
    }

    setLoading(true);
    fetch(layer.geojsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch management data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [regionId, layerIndex, region, layer]);

  useEffect(() => {
    fetch(COMMUNITIES.geojsonUrl)
      .then((res) => res.json())
      .then((json) => setCommunityData(json))
      .catch((err) => console.error("Communities fetch error:", err));
  }, []);

  const handleRegionChange = (newRegionId) => {
    setRegionId(newRegionId);
    setLayerIndex(0);
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <InfoPanel 
        name={region.name} 
        description={layer?.description || ""}
        layerType={layer?.layerType || ""}
      >
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "4px", fontWeight: "bold" }}>
              Select Region:
            </label>
            <select 
              value={regionId} 
              onChange={(e) => handleRegionChange(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                backgroundColor: "white",
                fontSize: "0.9rem"
              }}
            >
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id} disabled={!r.available}>
                  {r.name} {!r.available ? "(coming soon)" : ""}
                </option>
              ))}
            </select>
          </div>

          {region.available && region.layers.length > 1 && (
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "4px", fontWeight: "bold" }}>
                Select Layer:
              </label>
              <select 
                value={layerIndex} 
                onChange={(e) => setLayerIndex(parseInt(e.target.value))}
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "4px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "white",
                  fontSize: "0.9rem"
                }}
              >
                {region.layers.map((l, index) => (
                  <option key={l.id} value={index}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
            Showing <strong>{communityData?.features?.length || 0}</strong> communities statewide. Click a point to see census data.
          </div>
        </div>
      </InfoPanel>

      {selectedCommunity && (
        <CommunityDetail 
          community={selectedCommunity} 
          onClose={() => setSelectedCommunity(null)} 
        />
      )}

      <MapView 
        data={data} 
        communityData={communityData}
        loading={loading} 
        error={error} 
        propertyMap={layer?.propertyMap || {}}
        communityPropertyMap={COMMUNITIES.propertyMap}
        onCommunityClick={setSelectedCommunity}
      />
    </div>
  );
}

export default App;
