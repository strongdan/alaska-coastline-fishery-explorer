import { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function FitBounds({ data, extraData }) {
  const map = useMap();
  useEffect(() => {
    let bounds = null;
    if (data && data.features && data.features.length > 0) {
      bounds = L.geoJSON(data).getBounds();
    }
    
    if (extraData) {
      const extraBounds = L.geoJSON(extraData).getBounds();
      if (bounds) {
        bounds.extend(extraBounds);
      } else {
        bounds = extraBounds;
      }
    }

    if (bounds && bounds.isValid()) {
      map.flyToBounds(bounds, { 
        padding: [40, 40], 
        maxZoom: 12,
        duration: 1.5
      });
    }
  }, [data, extraData, map]);
  return null;
}

export default function MapView({ 
  data, 
  communityData, 
  communityBoundary, 
  contextLayers = [],
  envLayers = [],
  loading, 
  error, 
  propertyMap, 
  communityPropertyMap, 
  onCommunityClick 
}) {
  const defaultStyle = {
    color: "#005bbb",
    weight: 2,
    fillColor: "#4da3ff",
    fillOpacity: 0.1,
  };

  const hoverStyle = {
    weight: 4,
    color: "#ff8800",
    fillOpacity: 0.2,
  };

  const communityMarkerStyle = {
    radius: 6,
    fillColor: "#ef4444",
    color: "#fff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  };

  const boundaryStyle = {
    color: "#ef4444",
    weight: 3,
    fillColor: "#ef4444",
    fillOpacity: 0.1,
    dashArray: "5, 5"
  };

  const onEachFeature = (feature, layer, propMap) => {
    const props = feature.properties || {};
    const map = propMap || {};
    
    let propertiesHtml = "";
    Object.entries(map).forEach(([label, propKey]) => {
      const value = props[propKey];
      if (value !== undefined && value !== null) {
        const displayLabel = label.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
        propertiesHtml += `<div><strong>${displayLabel}:</strong> ${value}</div>`;
      }
    });

    const popupHtml = `
      <div style="font-family: sans-serif;">
        <div style="font-size: 0.9rem;">
          ${propertiesHtml || "<div>No properties available</div>"}
        </div>
      </div>
    `;
    layer.bindPopup(popupHtml);

    if (!propMap.context_layer) {
      layer.on({
        mouseover: (e) => { e.target.setStyle(hoverStyle); },
        mouseout: (e) => { e.target.setStyle(defaultStyle); },
      });
    }
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      {loading && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          zIndex: 2000, background: "white", padding: "10px 20px", borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          Loading...
        </div>
      )}
      {error && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          zIndex: 2000, background: "#fee2e2", color: "#b91c1c", padding: "10px 20px",
          borderRadius: "4px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", border: "1px solid #ef4444"
        }}>
          Error: {error}
        </div>
      )}

      <MapContainer
        center={[60.3, -146.5]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {data && (
          <GeoJSON
            key={`mgmt-${data.name || "layer"}`}
            data={data}
            style={() => defaultStyle}
            onEachFeature={(f, l) => onEachFeature(f, l, propertyMap)}
          />
        )}

        {contextLayers.map(cl => cl.data && (
          <GeoJSON 
            key={`context-${cl.id}`}
            data={cl.data}
            style={() => cl.style}
            onEachFeature={(f, l) => onEachFeature(f, l, { ...cl.propertyMap, context_layer: true })}
          />
        ))}

        {communityBoundary && (
          <GeoJSON 
            key={`boundary-${communityBoundary.properties.GEOID}`}
            data={communityBoundary}
            style={() => boundaryStyle}
          />
        )}

        <FitBounds data={data} extraData={communityBoundary} />

        {communityData && communityData.features && communityData.features.map((feature, idx) => {
          const coords = feature.geometry.coordinates;
          const props = feature.properties;
          return (
            <CircleMarker 
              key={`comm-${idx}`}
              center={[coords[1], coords[0]]}
              pathOptions={communityMarkerStyle}
              eventHandlers={{
                click: () => onCommunityClick(props)
              }}
            >
              <Popup>
                <div style={{ fontFamily: "sans-serif" }}>
                  <strong style={{ fontSize: "1.1rem", display: "block", marginBottom: "4px" }}>
                    {props[communityPropertyMap.name]}
                  </strong>
                  <div style={{ fontSize: "0.9rem" }}>
                    <div><strong>Code:</strong> {props[communityPropertyMap.code]}</div>
                    <div><strong>Region:</strong> {props[communityPropertyMap.region]}</div>
                    <div style={{ marginTop: "8px", fontWeight: "bold", color: "#005bbb" }}>
                      Click for Census data ➜
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {envLayers.map(el => el.data && el.data.map((site, sidx) => (
          <CircleMarker 
            key={`env-${el.id}-${sidx}`}
            center={[site.coordinates[1], site.coordinates[0]]}
            pathOptions={el.style}
          >
            <Popup>
              <div style={{ fontFamily: "sans-serif", width: "200px" }}>
                <strong style={{ fontSize: "1rem", display: "block", marginBottom: "4px" }}>{site.name}</strong>
                <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "8px" }}>USGS Site: {site.id}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {site.readings.map((r, ridx) => (
                    <div key={ridx} style={{ padding: "4px 8px", background: "#f0f9ff", borderRadius: "4px" }}>
                      <div style={{ fontSize: "0.75rem", color: "#0369a1", fontWeight: "bold" }}>{r.label}</div>
                      <div style={{ fontSize: "1rem" }}>
                        {r.value === "-999999" ? "Ice / No Data" : `${r.value} ${r.unit || ""}`}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "8px", fontSize: "0.7rem", color: "#9ca3af" }}>
                  Latest: {new Date(site.readings[0]?.dateTime).toLocaleString()}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )))}
      </MapContainer>
    </div>
  );
}
