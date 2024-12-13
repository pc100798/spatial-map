import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchPointData } from "../data/spatialAPI";
import L from "leaflet";

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PointMap = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const loadPoints = async () => {
      const data = await fetchPointData();
      setPoints(data);
    };
    loadPoints();
  }, []);

  return (
    <div style={{ width: "80%", margin: "0 auto", border: "2px solid #ccc", borderRadius: "10px", padding: "10px" }}>
      <MapContainer center={[38.8951, -77.0364]} zoom={13} style={{ height: "600px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
          >
            <Popup>
              <h3>{point.info}</h3>
              <p>{point.description}</p>
              <img
                src={point.imageUrl}
                alt={point.info}
                style={{
                  maxWidth: "200px",
                  maxHeight: "120px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PointMap;
