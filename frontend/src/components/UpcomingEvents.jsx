import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import ExpandableCardDemoHome from './ExpandableCardDemoHome';

const UpcomingEvents = () => {
  const { makeAuthenticatedRequest } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    makeAuthenticatedRequest('/api/events/upcoming')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch upcoming events');
        return res.json();
      })
      .then(data => setUpcomingEvents(data))
      .catch(err => console.error("Failed to fetch upcoming events", err));
  }, [makeAuthenticatedRequest]);

  return (
    <div className="bg-white shadow-md rounded-md p-6 ">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      {upcomingEvents.length === 0 ? (
        <p className="text-muted-foreground">No upcoming events.</p>
      ) : (
                       <ExpandableCardDemoHome events={upcomingEvents} isCalander={true}/>
      )}
    </div>
  );
};

export default UpcomingEvents;
