import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from "react-router-dom";

import L from 'leaflet';

let RedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],  //size of the icons
  iconAnchor: [12, 41], // actual map location point
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = RedIcon;

function MapView() {
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        // Get map locations (coordinates from map table)
        const locationsResponse = await fetch('/api/locations');
        const locationsData = await locationsResponse.json();
        
        // Get all events (for details to show in popups)
        const eventsResponse = await fetch('/api/user-events/allEvents');
        const eventsData = await eventsResponse.json();

        console.log('✅ Fetched map locations:', locationsData);
        console.log('✅ Fetched events:', eventsData);

        setLocations(locationsData);
        setEvents(eventsData.events || []);
        
      } catch (err) {
        console.error('❌ Error fetching map data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  // -----------------------Helper functions----------------------------------
  //  function to find event details by event_id
  const findEventById = (eventId) => {
    if (!Array.isArray(events)) return null;
    return events.find(event => event.event_id === eventId);
  };
//--------------------------------------------------------
  // function to format time for display
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };
//--------------------------------------------------------
  // function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };



  // loading map text
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
      marginLeft: '150px',
      marginTop: '15px'
    }}>
      <div style={{
        display: 'flex',
        height: '90%',
        width: 'calc(100vw - 150px)',
        marginLeft: '-150px'
      }}>

        <MapContainer // The container that has marker, popup and details
          center={[49.2827, -123.1207]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((place) => {
            if (!place || !place.location || !place.location.coordinates || 
                !Array.isArray(place.location.coordinates) ||
                place.location.coordinates.length < 2) {
              console.log('❌ Invalid location data:', place);
              return null;
            }

            const coordinates = place.location.coordinates;
            const position = [coordinates[1], coordinates[0]];

            return (
              <Marker key={place.id} position={position}>
                <Popup maxWidth={300}>
                  <div style={{ minWidth: '250px' }}>
                    {(() => {
                      // Find the event associated with this location
                      const eventDetails = findEventById(place.event_id);

                      if (eventDetails) {
                        return (
                          <div>
                            <strong style={{ color: '#007bff', fontSize: '16px' }}>
                              📅 {eventDetails.title}
                            </strong>
                            <br />
                            <div style={{ marginTop: '8px' }}>
                              <strong>When:</strong> {formatDate(eventDetails.date)}
                              {eventDetails.start_time && (
                                <span> at {formatTime(eventDetails.start_time)}</span>
                              )}
                              {eventDetails.end_time && (
                                <span> - {formatTime(eventDetails.end_time)}</span>
                              )}
                            </div>
                            <div style={{ marginTop: '5px' }}>
                              <strong>Where:</strong> {place.address}
                            </div>
                            {eventDetails.description && (
                              <div style={{ marginTop: '5px' }}>
                                <strong>About:</strong> {eventDetails.description}
                              </div>
                            )}
                            <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
                              Organized by: {eventDetails.name}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            <strong>📍 Location</strong>
                            <br />
                            {place.address}
                          </div>
                        );
                      }
                    })()}
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
