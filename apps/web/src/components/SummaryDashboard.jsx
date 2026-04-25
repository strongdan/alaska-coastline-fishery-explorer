export default function SummaryDashboard({ 
  region, 
  layer, 
  selectedCommunity, 
  communityCount, 
  contextLayers, 
  envLayers,
  isComparison = false
}) {
  const containerStyle = {
    padding: "12px",
    background: isComparison ? "#f8fafc" : "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "0.85rem",
    lineHeight: "1.5",
    color: "#334155",
    marginTop: "12px"
  };

  const headerStyle = {
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "4px"
  };

  const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px"
  };

  const labelStyle = {
    color: "#64748b",
    fontWeight: "500"
  };

  const valueStyle = {
    fontWeight: "600",
    textAlign: "right"
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span>{isComparison ? "Comparison" : "Current Context"}</span>
        {!isComparison && <span style={{fontSize: "0.7rem", color: "#94a3b8"}}>LIVE</span>}
      </div>

      <div style={itemStyle}>
        <span style={labelStyle}>Region</span>
        <span style={valueStyle}>{region.name}</span>
      </div>

      <div style={itemStyle}>
        <span style={labelStyle}>Management Layer</span>
        <span style={valueStyle}>{layer?.name || "None"}</span>
      </div>

      <div style={itemStyle}>
        <span style={labelStyle}>Places</span>
        <span style={valueStyle}>{communityCount} Communities</span>
      </div>

      {selectedCommunity && (
        <div style={{ ...itemStyle, borderTop: "1px solid #f1f5f9", marginTop: "4px", paddingTop: "4px" }}>
          <span style={labelStyle}>Focus</span>
          <span style={valueStyle}>{selectedCommunity.RESCOMM}</span>
        </div>
      )}

      {(contextLayers.length > 0 || envLayers.length > 0) && (
        <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #f1f5f9" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#64748b", marginBottom: "4px", textTransform: "uppercase" }}>
            Active Overlays
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {contextLayers.map(cl => (
              <span key={cl.id} style={{ padding: "2px 6px", background: "#f5f3ff", color: "#7c3aed", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "bold", border: "1px solid #ddd6fe" }}>
                {cl.name}
              </span>
            ))}
            {envLayers.map(el => (
              <span key={el.id} style={{ padding: "2px 6px", background: "#f0f9ff", color: "#0ea5e9", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "bold", border: "1px solid #bae6fd" }}>
                {el.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {!isComparison && (contextLayers.length > 0 || envLayers.length > 0) && (
        <div style={{ marginTop: "8px", fontStyle: "italic", fontSize: "0.75rem", color: "#64748b" }}>
          Explore the intersection of management, environment, and habitat.
        </div>
      )}
    </div>
  );
}
