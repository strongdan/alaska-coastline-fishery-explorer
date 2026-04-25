import { useEffect, useState } from "react";

export default function CommunityDetail({ community, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!community.LOC_CODE) return;

    setLoading(true);
    setError(null);
    
    const locCode = community.LOC_CODE;
    const name = encodeURIComponent(community.RESCOMM);

    fetch(`http://localhost:3002/api/community/enrich/${locCode}?name=${name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Enrichment service unavailable.");
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
  }, [community]);

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

  const getStatusBadge = (status) => {
    const colors = {
      confirmed: { bg: "#dcfce7", text: "#166534" },
      unmatched: { bg: "#f3f4f6", text: "#4b5563" },
      ambiguous: { bg: "#fef9c3", text: "#854d0e" }
    };
    const style = colors[status] || colors.unmatched;
    return (
      <span style={{
        fontSize: "0.7rem",
        fontWeight: "bold",
        padding: "2px 6px",
        borderRadius: "4px",
        backgroundColor: style.bg,
        color: style.text,
        textTransform: "uppercase"
      }}>
        {status}
      </span>
    );
  };

  return (
    <div style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px" }}>
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold" }}>{community.RESCOMM}</h2>
        <button 
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#9ca3af" }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
        {data && getStatusBadge(data.match_status)}
        {data?.match_status === "confirmed" && (
          <span style={{ fontSize: "0.7rem", color: "#10b981", fontWeight: "bold" }}>
            ✓ BOUNDARY LOADED
          </span>
        )}
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
        
        {!loading && !error && data && data.match_status === "confirmed" && data.census_data && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Total Population</div>
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{data.census_data.population.toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Median Household Income</div>
              <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>${data.census_data.medianIncome.toLocaleString()}</div>
            </div>
          </div>
        )}

        {!loading && data && data.match_status !== "confirmed" && (
          <div style={{ fontSize: "0.85rem", color: "#6b7280", fontStyle: "italic" }}>
            No confirmed Census FIPS match found for this community location. Socioeconomic enrichment is unavailable.
          </div>
        )}

        {data?.match_status === "confirmed" && (
          <div style={{ marginTop: "20px", fontSize: "0.8rem", fontStyle: "italic", color: "#9ca3af" }}>
            Data sourced from U.S. Census Bureau ACS 5-Year Estimates (2022) & TIGERweb.
          </div>
        )}
      </div>
    </div>
  );
}
