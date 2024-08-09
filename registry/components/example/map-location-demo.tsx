"use client";

import MapLocation from "../backend/map/map";

const MapLocationDemo: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <MapLocation
        title="Map/Location"
        description="Displays maps and location data"
        api="update your API key to display map"
        features="Map embedding, geolocation, route planning"
      />
    </div>
  );
};

export default MapLocationDemo;
