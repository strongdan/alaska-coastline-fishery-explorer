import { useEffect, useState } from "react";

export default function CommunityDetail({ community, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // We need a mapping from DCRA LOC_CODE to Census FIPS
  // For this prototype, we'll try to find FIPS in properties or use a fallback
  const fips = community.LOC_CODE; // This is a placeholder; real mapping needed

  useEffect(() => {
    if (!fips) return;

    setLoading(true);
    setError(null);
    
    // Attempt to fetch from our new API
    // Note: In a real app, we'd have a robust LOC_CODE -> FIPS lookup
    // For now, we'll try the LOC_CODE directly if it's 5 digits
    const targetFips = String(fips).padStart(5, "0");

    fetch(`http://localhost:3002/api/census/${targetFips}`)
      .then((res) => {
        if (!res.ok) throw new Error("Census data not found for this community.");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [fips]);

  const panelStyle = {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1000,
    background: "rgba(255, 255, 255, 0.98)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    width: "300px",
    color: "#1f2937",
    border: "1px solid #e5e7eb"
  };

  return (
    <div style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold" }}>{community.RESCOMM}</h2>
        <button 
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#9ca3af" }}
        >
          ✕
        </button>
      </div>

      <div style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "16px" }}>
        Community in the <strong>{community.REGION}</strong> Region.
      </div>

      <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
        <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#4b5563", marginBottom: "12px" }}>
          Socioeconomic Profile (Census)
        </h3>
        
        {loading && <div style={{ fontSize: "0.9rem" }}>Loading census data...</div>}
        {error && <div style={{ fontSize: "0.9rem", color: "#b91c1c" }}>{error}</div>}
        
        {data && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Total Population</div>
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{data.population.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Median Household Income</div>
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>${data.medianIncome.toLocaleString()}</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: "20px", fontSize: "0.8rem", fontStyle: "italic", color: "#9ca3af" }}>
          Data sourced from U.S. Census Bureau ACS 5-Year Estimates (2022).
        </div>
      </div>
    </div>
  );
}
