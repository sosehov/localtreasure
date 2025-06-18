import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

function MapView() {
  const [locations, setLocations] = useState([]); // will contain the coorindate numbers

  useEffect(() => {
    fetch('/api/locations') //temporary route
      .then(res => res.json())
      .then(setLocations)
      .catch(err => console.error('error, did not fetch', err));
  }, []);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={[43.65, -79.38]} // this should be Toronto,currently hardcoded coordinates
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((pos) => {
          const [lng, lat] = pos.location.coordinates;
          return (
            <Marker key={pos.id} position={[lat, lng]}>
              <Popup>
                <div>
                  <strong>Address:</strong><br />
                  {pos.address}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;