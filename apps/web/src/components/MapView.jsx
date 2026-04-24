import { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function FitBounds({ data }) {
  const map = useMap();
  useEffect(() => {
    if (data && data.features && data.features.length > 0) {
      const layer = L.geoJSON(data);
      map.fitBounds(layer.getBounds(), { padding: [20, 20] });
    }
  }, [data, map]);
  return null;
}

export default function MapView({ data, loading, error, propertyMap }) {
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

  const onEachFeature = (feature, layer) => {
    const props = feature.properties || {};
    const map = propertyMap || {};
    
    const name = props[map.name] || "Unknown area";
    const code = props[map.code] || "—";
    const region = props[map.region] || "—";
    const group = props[map.group] || "—";

    const popupHtml = `
      <div style="font-family: sans-serif;">
        <strong style="font-size: 1.1rem; display: block; margin-bottom: 4px;">${name}</strong>
        <div style="font-size: 0.9rem;">
          <div><strong>Area:</strong> ${name}</div>
          <div><strong>Area code:</strong> ${code}</div>
          <div><strong>Region code:</strong> ${region}</div>
          <div><strong>Fishery group:</strong> ${group}</div>
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
      </MapContainer>
    </div>
  );
}
