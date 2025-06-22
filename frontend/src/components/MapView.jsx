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


//Helper functions
//-----------------------------------------------------------
const findEventById = (eventId) => {
  return events.find(event => event.event_id === eventId);
};

//-----------------------------------------------------------
const findSaleById = (saleId) => {
  return sales.find(sale => sale.id === saleId);
};

//-----------------------------------------------------------
// This will format to properly fit the popup
const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}: ${minutes} ${ampm}`;
};
//-----------------------------------------------------------
const formateDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};


//----------------------------------------------------------------------
function MapView() {
  const [locations, setLocations] = useState([]); // will contain the coordinate numbers
  const [events, setEvents] = useState([]); // contain event details 
  const [sales, setSales] = useState([]); //contain details on individual sales
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const [error, setError] = useState(null);
  // IMPLEMENT AFTER

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        // These will grab coordinates from map table in DB
        const locationsResponse = await fetch('/api/locations');
        const locationsData = await locationsResponse.json(); // parse data into json 

        // Grab all event details to show in popup
        const eventResponse = await fetch('/api/users-event/allEvents');
        const eventsData = await eventResponse.json();


        //test logs 
        console.log('Fetched map location successfully:', locationsData);
        console.log('Fetched events successfully:', eventsData);


        setLocations(locationsData);
        setEvents(eventsData.events || []); // ?? 

      } catch (err) {
        console.error('Error occured when fetching map data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      marginLeft: '150px',            // Push away from sidebar
      marginTop: '15px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        gap: '15px'
      }}>
      </div>

      <div style={{
        height: '90%',
        width: 'calc(100vw - 150px)',  // Full width minus sidebar width
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
            if (!place || !place.location || !place.location.coordinates || !Array.isArray(place.location.coordinates) ||
              place.location.coordinates.length < 2) {
              console.log('Invalid location:', place);
              return null;
            }

            const coordinates = place.location.coordinates;
            const position = [coordinates[1], coordinates[0]];

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