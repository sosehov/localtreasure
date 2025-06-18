import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ // custom icon
  iconUrl: icon,  // path to marker image file
  shadowUrl: iconShadow, // path to shadow image
  iconSize: [25, 41], // size of the icons
  iconAnchor: [12, 41] // actual map location
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView() {
  const [locations, setLocations] = useState([]); // will contain the coorindate numbers
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // IMPLEMENT AFTER

  useEffect(() => {
    fetch('/api/locations') //temporary route
      .then(res => res.json())
      .then(setLocations)
      .catch(err => console.error('error, did not fetch', err));
  }, []);

  // add error handling once tested

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={[43.65, -79.38]} // this should be Toronto,currently hardcoded coordinates
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => {
          const coordinates = location.coordinates;
          const position = [coordinates[1], coordinates[0]];

          return (
            <Marker key={location.id} position={position}>
              <Popup>
                <div>
                  <strong>Address:</strong><br />
                  {location.address}
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