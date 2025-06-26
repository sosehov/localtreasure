import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from "react-router-dom";

import L from 'leaflet';

// red marker icon 
let RedMarkerIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [28, 45], //size of the icons
  iconAnchor: [14, 45], // actual map location point
  popupAnchor: [1, -38],
  shadowSize: [45, 45]
});

L.Marker.prototype.options.icon = RedMarkerIcon;

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

  //---------------------------Helper functions-------------------------
  // function to find event details by event_id
  const findEventById = (eventId) => {
    if (!Array.isArray(events)) return null;
    return events.find(event => event.event_id === eventId);
  };
  //----------------------------------------------------------
  // Helper function to format time for display
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };
  //----------------------------------------------------------
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
      marginTop: '15px',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
    }}>
      <div style={{
        display: 'flex',
        height: '90%',
        width: 'calc(100vw - 150px)',
        marginLeft: '-150px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}>


        <MapContainer // container that has marker, popup and details
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
              return null;
            }

            const coordinates = place.location.coordinates;
            const position = [coordinates[1], coordinates[0]];

            return (
              <Marker key={place.id} position={position}>
                <Popup
                  maxWidth={350}
                  className="modern-popup"
                >
                  <style>
                    {`
                      .leaflet-popup-content-wrapper {
                        background: transparent !important;
                        padding: 0 !important;
                        border-radius: 16px !important;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
                      }
                      .leaflet-popup-content {
                        margin: 0 !important;
                        padding: 0 !important;
                        border-radius: 16px !important;
                        overflow: hidden !important;
                      }
                      .leaflet-popup-tip {
                        background: #4a90e2 !important;
                        border: none !important;
                      }
                      .leaflet-popup-close-button {
                        background: rgba(255, 255, 255, 0.9) !important;
                        color: #333 !important;
                        border: 2px solid rgba(0, 0, 0, 0.1) !important;
                        border-radius: 50% !important;
                        width: 28px !important;
                        height: 28px !important;
                        font-size: 18px !important;
                        font-weight: bold !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
                        transition: all 0.2s ease !important;
                        top: 8px !important;
                        right: 8px !important;
                        z-index: 1000 !important;
                      }
                      .leaflet-popup-close-button:hover {
                        background: white !important;
                        transform: scale(1.1) !important;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
                      }
                    `}
                  </style>
                  <div style={{
                    minWidth: '300px',
                    background: '#4a90e2',
                    borderRadius: '16px',
                    padding: '0',
                    margin: '0',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '120px',
                      height: '120px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      transform: 'translate(40px, -40px)'
                    }}></div>

                    <div style={{ padding: '24px', position: 'relative', zIndex: 2 }}>
                      {(() => {
                        // Find the event associated with this location
                        const eventDetails = findEventById(place.event_id);

                        if (eventDetails) {
                          return (
                            <div>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '16px'
                              }}>
                                <div style={{
                                  background: 'rgba(255, 255, 255, 0.2)',
                                  borderRadius: '12px',
                                  padding: '8px',
                                  fontSize: '20px'
                                }}>
                                  📅
                                </div>
                                <h3 style={{
                                  margin: 0,
                                  fontSize: '18px',
                                  fontWeight: '600',
                                  lineHeight: '1.3'
                                }}>
                                  {eventDetails.title}
                                </h3>
                              </div>

                              <div style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '12px',
                                backdropFilter: 'blur(10px)'
                              }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  marginBottom: '8px'
                                }}>
                                  <span style={{ fontSize: '14px' }}>🕒</span>
                                  <span style={{
                                    fontSize: '14px',
                                    fontWeight: '500'
                                  }}>
                                    {formatDate(eventDetails.date)}
                                    {eventDetails.start_time && (
                                      <span> at {formatTime(eventDetails.start_time)}</span>
                                    )}
                                    {eventDetails.end_time && (
                                      <span> - {formatTime(eventDetails.end_time)}</span>
                                    )}
                                  </span>
                                </div>

                                <div style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '8px'
                                }}>
                                  <span style={{ fontSize: '14px', marginTop: '2px' }}>📍</span>
                                  <span style={{
                                    fontSize: '14px',
                                    lineHeight: '1.4',
                                    flex: 1
                                  }}>
                                    {place.address}
                                  </span>
                                </div>
                              </div>

                              {eventDetails.description && (
                                <div style={{
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  borderRadius: '8px',
                                  padding: '12px',
                                  marginBottom: '12px'
                                }}>
                                  <div style={{
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                    opacity: '0.95'
                                  }}>
                                    {eventDetails.description}
                                  </div>
                                </div>
                              )}

                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '12px',
                                opacity: '0.8',
                                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                                paddingTop: '12px'
                              }}>
                                <span>👤</span>
                                <span>Organized by {eventDetails.name}</span>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div style={{ textAlign: 'center' }}>
                              <div style={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px auto',
                                fontSize: '24px'
                              }}>
                                📍
                              </div>
                              <h3 style={{
                                margin: '0 0 8px 0',
                                fontSize: '16px',
                                fontWeight: '600'
                              }}>
                                Location
                              </h3>
                              <p style={{
                                margin: 0,
                                fontSize: '14px',
                                opacity: '0.9',
                                lineHeight: '1.4'
                              }}>
                                {place.address}
                              </p>
                            </div>
                          );
                        }
                      })()}
                    </div>
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