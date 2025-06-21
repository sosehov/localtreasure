import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from "react-router-dom";

import L from 'leaflet';

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
  const navigate = useNavigate();
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
    <div style={{ 
      height: '100vh', 
      width: 'calc(100vw - 150px)',  // Take full screen width minus sidebar space
      marginLeft: '150px'            // Push away from sidebar
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        gap: '15px'
      }}>
        <button onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Back to Home
        </button>

        <h2 style={{ margin: 0, color: '#333' }}> Local Treasure Map</h2>
      </div>

      <div style={{ 
        height: '90%', width: 'calc(100vw - 150px)',  // Full width minus sidebar width
        marginLeft: '-150px'           // Pull the map back to touch the sidebar
      }}>
        <MapContainer
          center={[49.2827, -123.1207]} // default starting view (vancouver)
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
            console.log('Rendering marker for:', place);
            if (!place || !place.location || !place.location.coordinates || !Array.isArray(place.location.coordinates) ||
              place.location.coordinates.length < 2) {
              console.log('Invalid location:', place);
              return null;
            }

            const coordinates = place.location.coordinates;
            const position = [coordinates[1], coordinates[0]]; 
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
    </div>
  );
}

export default MapView;