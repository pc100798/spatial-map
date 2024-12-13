import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "../data/data.js";

const StateMap = () => {
  const [popupInfo, setPopupInfo] = useState(null);
  const center = [40.63463151377654, -97.89969605983609];

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {statesData.features.map((state, index) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        return (
          <Polygon
            key={index}
            pathOptions={{
              fillColor: "#FD8D3C",
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: "white",
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#BD0026",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: "white",
                  fillColor: "#FD8D3C",
                });
              },
              click: (e) => {
                const layer = e.target;
                const { name, density } = state.properties;
                const center = layer.getBounds().getCenter();
                setPopupInfo({
                  name: name,
                  density,
                  position: [center.lat, center.lng],
                });
              },
            }}
          />
        );
      })}
      {popupInfo && (
        <Popup position={popupInfo.position}>
          <h3>US Population Density</h3>
          <h3>{popupInfo.name}</h3>
          <p>Density: {popupInfo.density}</p>
        </Popup>
      )}
    </MapContainer>
  );
};

export default StateMap;
