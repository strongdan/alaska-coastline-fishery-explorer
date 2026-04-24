import { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function FitBounds({ data }) {
  const map = useMap();
  useEffect(() => {
    if (data && data.features && data.features.length > 0) {
      const layer = L.geoJSON(data);
      const bounds = layer.getBounds();
      if (bounds.isValid()) {
        map.flyToBounds(bounds, { 
          padding: [40, 40], 
          maxZoom: 10,
          duration: 1.5
        });
      }
    }
  }, [data, map]);
  return null;
}

export default function MapView({ data, communityData, loading, error, propertyMap, communityPropertyMap, onCommunityClick }) {
  const defaultStyle = {
    color: "#005bbb",
    weight: 2,
    fillColor: "#4da3ff",
    fillOpacity: 0.25,
  };

  const hoverStyle = {
    weight: 4,
    color: "#ff8800",
    fillOpacity: 0.4,
  };

  const communityMarkerStyle = {
    radius: 6,
    fillColor: "#ef4444",
    color: "#fff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  };

  const onEachFeature = (feature, layer) => {
    const props = feature.properties || {};
    const map = propertyMap || {};
    
    const name = props[map.name] || props.NAME || "Unknown area";
    
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
        <strong style="font-size: 1.1rem; display: block; margin-bottom: 4px;">${name}</strong>
        <div style="font-size: 0.9rem;">
          ${propertiesHtml || "<div>No properties available</div>"}
        </div>
      </div>
    `;
    layer.bindPopup(popupHtml);

    layer.on({
      mouseover: (e) => { e.target.setStyle(hoverStyle); },
      mouseout: (e) => { e.target.setStyle(defaultStyle); },
    });
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
          <>
            <GeoJSON
              key={data.name || "geojson-layer"}
              data={data}
              style={() => defaultStyle}
              onEachFeature={onEachFeature}
            />
            <FitBounds data={data} />
          </>
        )}

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
      </MapContainer>
    </div>
  );
}
