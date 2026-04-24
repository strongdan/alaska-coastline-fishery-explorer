import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import InfoPanel from "./components/InfoPanel";
import { DATASETS } from "./lib/datasets";

function App() {
  const [selectedKey, setSelectedKey] = useState("pws_salmon_districts");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dataset = DATASETS[selectedKey];

  useEffect(() => {
    setData(null);
    setError(null);

    if (!dataset.available || !dataset.geojsonUrl) {
      setLoading(false);
      setError(\`Dataset "\${dataset.name}" is coming soon.\`);
      return;
    }

    setLoading(true);
    fetch(dataset.geojsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data from ArcGIS");
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
  }, [selectedKey, dataset.geojsonUrl, dataset.available, dataset.name]);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <InfoPanel 
        name={dataset.name} 
        description={dataset.description}
        layerType={dataset.layerType}
      >
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "12px" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "4px", fontWeight: "bold" }}>
            Select Region:
          </label>
          <select 
            value={selectedKey} 
            onChange={(e) => setSelectedKey(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              backgroundColor: "white",
              fontSize: "0.9rem"
            }}
          >
            {Object.keys(DATASETS).map((key) => {
              const d = DATASETS[key];
              return (
                <option key={key} value={key} disabled={!d.available}>
                  {d.name} {!d.available ? "(coming soon)" : ""}
                </option>
              );
            })}
          </select>
        </div>
      </InfoPanel>
      <MapView 
        data={data} 
        loading={loading} 
        error={error} 
        propertyMap={dataset.propertyMap}
      />
    </div>
  );
}

export default App;
