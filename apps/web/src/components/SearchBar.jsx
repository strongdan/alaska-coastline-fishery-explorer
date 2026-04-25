import { useState, useMemo } from "react";

export default function SearchBar({ regions, communities, contextLayers, envLayers, onSelect }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    
    const q = query.toLowerCase();
    const matches = [];

    // 1. Search Regions
    regions.forEach(r => {
      if (r.name.toLowerCase().includes(q)) {
        matches.push({ type: "Region", label: r.name, id: r.id, data: r });
      }
    });

    // 2. Search Communities
    if (communities?.features) {
      communities.features.forEach(f => {
        const name = f.properties.RESCOMM;
        if (name && name.toLowerCase().includes(q)) {
          matches.push({ type: "Community", label: name, id: f.properties.LOC_CODE, data: f.properties });
        }
      });
    }

    // 3. Search Context Layers
    contextLayers.forEach(cl => {
      if (cl.name.toLowerCase().includes(q) || cl.subject?.toLowerCase().includes(q)) {
        matches.push({ type: "Federal Context", label: cl.name, id: cl.id, data: cl });
      }
    });

    // 4. Search Environmental Layers
    envLayers.forEach(el => {
      if (el.name.toLowerCase().includes(q)) {
        matches.push({ type: "Environmental", label: el.name, id: el.id, data: el });
      }
    });

    return matches.slice(0, 10); // Limit results
  }, [query, regions, communities, contextLayers, envLayers]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        placeholder="Search regions, communities..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        style={{
          width: "100%",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "0.9rem",
          outline: "none",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)"
        }}
      />
      
      {isOpen && results.length > 0 && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "white",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          marginTop: "4px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 2000,
          maxHeight: "300px",
          overflowY: "auto"
        }}>
          {results.map((result, idx) => (
            <div
              key={`${result.type}-${result.id}-${idx}`}
              onClick={() => {
                onSelect(result);
                setQuery("");
                setIsOpen(false);
              }}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom: idx === results.length - 1 ? "none" : "1px solid #f3f4f6",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>{result.label}</span>
              <span style={{ fontSize: "0.7rem", color: "#6b7280", textTransform: "uppercase" }}>{result.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
