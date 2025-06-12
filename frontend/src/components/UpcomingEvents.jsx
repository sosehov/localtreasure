import React, { useState, useEffect } from 'react';

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events/upcoming')
      .then(res => res.json())
      .then(data => setUpcomingEvents(data))
      .catch(err => console.error("Failed to fetch upcoming events", err));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      {upcomingEvents.length === 0 ? (
        <p className="text-muted-foreground">No upcoming events.</p>
      ) : (
        <ul className="list-disc list-inside">
          {upcomingEvents.map(event => (
            <li key={event.event_id}>
              <strong>{event.title}</strong> – {new Date(event.date).toDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents;
