import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Calendar } from '@/components/ui/calendar';
import { parse, format } from "date-fns";

const EventCalendar = () => {
  const { makeAuthenticatedRequest } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [month, setMonth] = useState(new Date());

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
    if (!selectedDate) return;
  
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
  
    makeAuthenticatedRequest(`/api/events/month?year=${year}&month=${month}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch monthly events');
        return res.json();
      })
      .then(data => {
        const dates = data
          .map(event => new Date(event.date))
          .filter(date => !isNaN(date));
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
          onSelect={(date, selectedDayModifiers) => {
            if (date) {
              setSelectedDate(date);
            }
        
            if (selectedDayModifiers?.outside && date) {
              // Navigate to the month of the clicked outside day
              setMonth(new Date(date));
            }
          }}
          month={month}
          onMonthChange={setMonth}
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
              {events.map((event) => {
                const parsedStart = parse(event.start_time, "HH:mm:ss", new Date());
                const parsedEnd = parse(event.end_time, "HH:mm:ss", new Date());
                return (
                  <li key={event.event_id}>
                    <strong>{event.title}</strong> –{" "}
                    {format(parsedStart, "h:mm a")} to {format(parsedEnd, "h:mm a")}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventCalendar;