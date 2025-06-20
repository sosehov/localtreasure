import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let RedIcon = L.icon({ // custom icon
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',  // path to marker image file
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', // path to shadow image
  iconSize: [25, 41], // size of the icons
  iconAnchor: [12, 41], // actual map location
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = RedIcon;

function MapView() {
  const [locations, setLocations] = useState([]); // will contain the coorindate numbers
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // IMPLEMENT AFTER

  useEffect(() => {
    fetch('/api/locations') //temporary route
      .then(res => res.json())
      .then(data => {
        console.log('Fetched locations:', data); // testing log
        setLocations(data);
      })
      .catch(err => console.error('error, did not fetch', err));
  }, []);

  // add error handling once tested

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <MapContainer
        center={[49.2827, -123.1207]} // this should be Toronto,currently hardcoded coordinates
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((place) => {
          // testing code --REMOVE ONCE IT WORKS
          console.log('Rendering marker for:', place)
          if (!place || !place.location || !place.location.coordinates || !Array.isArray(place.location.coordinates) || 
              place.location.coordinates.length < 2) {
            console.log('Invalid location:', place);
            return null;
          }
          
          const coordinates = place.location.coordinates; // [lng, lat]
          const position = [coordinates[1], coordinates[0]]; // [lat, lng] for Leaflet
          console.log('marker position:', position);

          return (
            <Marker key={place.id} position={position}>
              <Popup>
                <div>
                  <strong>Address:</strong><br />
                  {place.address}
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