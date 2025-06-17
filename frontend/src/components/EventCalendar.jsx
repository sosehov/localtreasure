import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Calendar } from '@/components/ui/calendar';

const EventCalendar = () => {
  const { makeAuthenticatedRequest } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);

  useEffect(() => {
    if (!selectedDate) return;

    const dateStr = selectedDate.toISOString().split("T")[0];

    makeAuthenticatedRequest(`/api/events?date=${dateStr}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, [selectedDate, makeAuthenticatedRequest]);

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // JS months are 0-based

    makeAuthenticatedRequest(`/api/events/month?year=${year}&month=${month}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch monthly events');
        return res.json();
      })
      .then(data => {
        const dates = data.map(event => new Date(event.date));
        setHighlightedDates(dates);
      })
      .catch(err => console.error("Failed to fetch monthly events", err));
  }, [selectedDate, makeAuthenticatedRequest]);
  
  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
      {/* Calendar */}
      <div className="bg-white shadow-md rounded-md p-6 max-w-md mx-auto">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={{
            hasEvent: highlightedDates
          }}
          modifiersClassNames={{
            hasEvent: "bg-yellow-200"
          }}
        />

        <div className="mt-6">
          <h2 className="text-lg font-semibold">
            Events on {selectedDate?.toDateString()}
          </h2>
          {events.length === 0 ? (
            <p className="text-muted-foreground mt-2">No events.</p>
          ) : (
            <ul className="list-disc list-inside mt-2">
              {events.map((event) => (
                <li key={event.event_id}>
                  <strong>{event.title}</strong> – {" "}
                  {event.start_time} to {event.end_time}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  )
}

export default EventCalendar;