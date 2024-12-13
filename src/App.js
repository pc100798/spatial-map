import React, { useState } from "react";
import PointMap from "./components/PointMap";
import StateMap from "./components/StateMap";

const App = () => {
  const [view, setView] = useState("points");

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          padding: "10px 15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#007bff",
          color: "#fff",
          flexShrink: 0,
        }}
      >
        <h1 style={{ margin: 0, fontSize: "20px" }}>Spatial Map Viewer</h1>
        <button
          onClick={() => setView(view === "points" ? "polygons" : "points")}
          style={{
            padding: "8px 15px",
            fontSize: "14px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#ffffff",
            color: "#007bff",
            cursor: "pointer",
          }}
        >
          Switch to {view === "points" ? "Polygon Map" : "Point Map"}
        </button>
      </header>

      <main style={{ flex: 1, overflow: "hidden", padding: "10px" }}>
        {view === "points" ? <PointMap /> : <StateMap />}
      </main>
    </div>
  );
};

export default App;
