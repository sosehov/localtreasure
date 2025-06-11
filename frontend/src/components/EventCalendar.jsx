import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!selectedDate) return;

    const dateStr = selectedDate.toISOString().split("T")[0];

    fetch(`/api/events?date=${dateStr}`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events:", err));
  }, [selectedDate]);

  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-md mx-auto">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
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
  )
}

export default EventCalendar;