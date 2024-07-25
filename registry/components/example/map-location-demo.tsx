import MapLocation from "../backend/map/maplocation";

const MapLocationDemo: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <MapLocation
        title="Map/Location"
        description="Displays maps and location data"
        api="update your API"
        features="Map embedding, geolocation, route planning"
      />
    </div>
  );
};

export default MapLocationDemo;
