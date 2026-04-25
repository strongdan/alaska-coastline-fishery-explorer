import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import InfoPanel from "./components/InfoPanel";
import CommunityDetail from "./components/CommunityDetail";
import SearchBar from "./components/SearchBar";
import SummaryDashboard from "./components/SummaryDashboard";
import { REGIONS, DEFAULT_REGION, DEFAULT_LAYER_INDEX, COMMUNITIES, CONTEXT_LAYERS, ENVIRONMENT_LAYERS } from "./lib/datasets";

function App() {
  const [regionId, setRegionId] = useState(DEFAULT_REGION);
  const [layerIndex, setLayerIndex] = useState(DEFAULT_LAYER_INDEX);
  const [data, setData] = useState(null);
  const [communityData, setCommunityData] = useState(null);
  const [contextData, setContextData] = useState({});
  const [envData, setEnvData] = useState({});
  const [visibleContextLayers, setVisibleContextLayers] = useState([]);
  const [visibleEnvLayers, setVisibleEnvLayers] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedCommunityBoundary, setSelectedCommunityBoundary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stage 2: Comparison Mode
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [compareRegionId, setCompareRegionId] = useState("");

  const region = REGIONS.find(r => r.id === regionId) || REGIONS[0];
  const layer = region.layers[layerIndex] || region.layers[0];
  const compareRegion = REGIONS.find(r => r.id === compareRegionId);

  // Fetch management layer
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

  // Fetch communities once
  useEffect(() => {
    fetch(COMMUNITIES.geojsonUrl)
      .then((res) => res.json())
      .then((json) => setCommunityData(json))
      .catch((err) => console.error("Communities fetch error:", err));
  }, []);

  // Fetch context layers on demand
  useEffect(() => {
    visibleContextLayers.forEach(layerId => {
      if (!contextData[layerId]) {
        const cl = CONTEXT_LAYERS.find(c => c.id === layerId);
        if (cl) {
          fetch(cl.geojsonUrl)
            .then(res => res.json())
            .then(json => {
              setContextData(prev => ({ ...prev, [layerId]: json }));
            })
            .catch(err => console.error(`Context layer fetch error (${layerId}):`, err));
        }
      }
    });
  }, [visibleContextLayers, contextData]);

  // Fetch env layers on demand
  useEffect(() => {
    visibleEnvLayers.forEach(layerId => {
      if (!envData[layerId]) {
        const el = ENVIRONMENT_LAYERS.find(e => e.id === layerId);
        if (el) {
          fetch(el.geojsonUrl)
            .then(res => res.json())
            .then(json => {
              setEnvData(prev => ({ ...prev, [layerId]: json }));
            })
            .catch(err => console.error(`Env layer fetch error (${layerId}):`, err));
        }
      }
    });
  }, [visibleEnvLayers, envData]);

  const handleRegionChange = (newRegionId) => {
    setRegionId(newRegionId);
    setLayerIndex(0);
  };

  const handleContextLayerToggle = (layerId) => {
    setVisibleContextLayers(prev => 
      prev.includes(layerId) ? prev.filter(id => id !== layerId) : [...prev, layerId]
    );
  };

  const handleEnvLayerToggle = (layerId) => {
    setVisibleEnvLayers(prev => 
      prev.includes(layerId) ? prev.filter(id => id !== layerId) : [...prev, layerId]
    );
  };

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
    setSelectedCommunityBoundary(null);
    
    const locCode = community.LOC_CODE;
    fetch(`http://localhost:3002/api/community/enrich/${locCode}`)
      .then(res => res.json())
      .then(data => {
        if (data.match_status === "confirmed" && data.census_fips) {
          return fetch(`http://localhost:3002/api/community/boundary/${data.census_fips}`);
        }
        return null;
      })
      .then(res => res ? res.json() : null)
      .then(boundary => {
        if (boundary && boundary.geojson) {
          setSelectedCommunityBoundary(boundary.geojson);
        }
      })
      .catch(err => console.error("Boundary fetch error:", err));
  };

  const handleSearchResult = (result) => {
    if (result.type === "Region") {
      handleRegionChange(result.id);
    } else if (result.type === "Community") {
      handleCommunityClick(result.data);
    } else if (result.type === "Federal Context") {
      if (!visibleContextLayers.includes(result.id)) {
        handleContextLayerToggle(result.id);
      }
      if (result.id === "noaa_beluga_ch") {
        handleRegionChange("upper_cook_inlet");
      }
    } else if (result.type === "Environmental") {
      if (!visibleEnvLayers.includes(result.id)) {
        handleEnvLayerToggle(result.id);
      }
    }
  };

  const getRegionCommunities = (rid) => {
    if (!communityData?.features) return 0;
    // Simple filter by region code or similar if available, otherwise return total for now
    // In a real app we'd use spatial filtering
    return communityData.features.filter(f => f.properties.REGION === rid.toUpperCase()).length || communityData.features.length;
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <InfoPanel 
        name={region.name} 
        description={layer?.description || ""}
        layerType={layer?.layerType || ""}
      >
        <div style={{ borderBottom: "1px solid #e5e7eb", marginBottom: "12px", paddingBottom: "12px" }}>
          <SearchBar 
            regions={REGIONS} 
            communities={communityData} 
            contextLayers={CONTEXT_LAYERS}
            envLayers={ENVIRONMENT_LAYERS}
            onSelect={handleSearchResult} 
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
              Region:
            </label>
            <button 
              onClick={() => setIsComparisonMode(!isComparisonMode)}
              style={{
                fontSize: "0.7rem",
                padding: "2px 8px",
                borderRadius: "4px",
                border: "1px solid #005bbb",
                background: isComparisonMode ? "#005bbb" : "transparent",
                color: isComparisonMode ? "white" : "#005bbb",
                cursor: "pointer"
              }}
            >
              {isComparisonMode ? "EXIT COMPARISON" : "COMPARE"}
            </button>
          </div>
          
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

          {isComparisonMode && (
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "4px", fontWeight: "bold", color: "#005bbb" }}>
                Compare With:
              </label>
              <select 
                value={compareRegionId} 
                onChange={(e) => setCompareRegionId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "4px",
                  border: "1px solid #005bbb",
                  backgroundColor: "#f0f9ff",
                  fontSize: "0.9rem"
                }}
              >
                <option value="">Select Region...</option>
                {REGIONS.filter(r => r.id !== regionId).map((r) => (
                  <option key={r.id} value={r.id} disabled={!r.available}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!isComparisonMode && region.available && region.layers.length > 1 && (
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

          <SummaryDashboard 
            region={region}
            layer={layer}
            selectedCommunity={selectedCommunity}
            communityCount={communityData?.features?.length || 0}
            contextLayers={CONTEXT_LAYERS.filter(cl => visibleContextLayers.includes(cl.id))}
            envLayers={ENVIRONMENT_LAYERS.filter(el => visibleEnvLayers.includes(el.id))}
          />

          {isComparisonMode && compareRegion && (
            <SummaryDashboard 
              region={compareRegion}
              layer={compareRegion.layers[0]}
              communityCount={communityData?.features?.length || 0}
              contextLayers={[]}
              envLayers={[]}
              isComparison={true}
            />
          )}

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "8px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "4px", fontWeight: "bold" }}>
              Environmental Layers:
            </label>
            {ENVIRONMENT_LAYERS.map(el => (
              <div key={el.id}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                  <input 
                    type="checkbox" 
                    id={el.id}
                    checked={visibleEnvLayers.includes(el.id)}
                    onChange={() => handleEnvLayerToggle(el.id)}
                  />
                  <label htmlFor={el.id}>{el.name}</label>
                </div>
                {visibleEnvLayers.includes(el.id) && (
                  <div style={{ 
                    marginTop: "8px", 
                    padding: "8px", 
                    backgroundColor: "#f0f9ff", 
                    borderRadius: "4px", 
                    border: "1px solid #bae6fd",
                    fontSize: "0.8rem" 
                  }}>
                    <div style={{ color: "#0ea5e9", fontWeight: "bold", marginBottom: "4px" }}>Environmental Context</div>
                    <p style={{ margin: "0", lineHeight: "1.4" }}>{el.interpretation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "8px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "4px", fontWeight: "bold" }}>
              Federal Context:
            </label>
            {CONTEXT_LAYERS.map(cl => (
              <div key={cl.id}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                  <input 
                    type="checkbox" 
                    id={cl.id}
                    checked={visibleContextLayers.includes(cl.id)}
                    onChange={() => handleContextLayerToggle(cl.id)}
                  />
                  <label htmlFor={cl.id}>{cl.name}</label>
                </div>
                {visibleContextLayers.includes(cl.id) && (
                  <div style={{ 
                    marginTop: "8px", 
                    padding: "8px", 
                    backgroundColor: "#f5f3ff", 
                    borderRadius: "4px", 
                    border: "1px solid #ddd6fe",
                    fontSize: "0.8rem" 
                  }}>
                    <div style={{ color: "#7c3aed", fontWeight: "bold", marginBottom: "4px" }}>Interpretation</div>
                    <p style={{ margin: "0 0 8px", lineHeight: "1.4" }}>{cl.interpretation}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px", color: "#6b7280" }}>
                      <strong>Agency:</strong> {cl.sourceAgency}
                      <strong>Subject:</strong> {cl.subject}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </InfoPanel>

      {selectedCommunity && (
        <CommunityDetail 
          community={selectedCommunity} 
          onClose={() => {
            setSelectedCommunity(null);
            setSelectedCommunityBoundary(null);
          }} 
        />
      )}

      <MapView 
        data={data} 
        communityData={communityData}
        communityBoundary={selectedCommunityBoundary}
        contextLayers={CONTEXT_LAYERS.filter(cl => visibleContextLayers.includes(cl.id)).map(cl => ({
          ...cl,
          data: contextData[cl.id]
        }))}
        envLayers={ENVIRONMENT_LAYERS.filter(el => visibleEnvLayers.includes(el.id)).map(el => ({
          ...el,
          data: envData[el.id]
        }))}
        loading={loading} 
        error={error} 
        propertyMap={layer?.propertyMap || {}}
        communityPropertyMap={COMMUNITIES.propertyMap}
        onCommunityClick={handleCommunityClick}
      />
    </div>
  );
}

export default App;
