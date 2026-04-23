export default function InfoPanel({ name, description, children }) {
  const panelStyle = {
    position: "absolute",
    top: 16,
    left: 60,
    zIndex: 1000,
    background: "rgba(255, 255, 255, 0.95)",
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    maxWidth: "320px",
    color: "#1f2937",
  };

  const titleStyle = {
    margin: "0 0 8px",
    fontSize: "1.2rem",
    lineHeight: 1.2,
    color: "#111827",
  };

  const textStyle = {
    margin: "0 0 12px",
    fontSize: "0.95rem",
    lineHeight: 1.4,
    color: "#374151",
  };

  return (
    <div style={panelStyle}>
      <h1 style={titleStyle}>Fishery Explorer</h1>
      <div style={textStyle}>
        <strong>{name}</strong>
        <p style={{ marginTop: "4px" }}>{description}</p>
      </div>
      {children}
    </div>
  );
}
