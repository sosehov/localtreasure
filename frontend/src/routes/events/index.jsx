import React from 'react';
import EventCalendar from '../../components/EventCalendar';
import UpcomingEvents from '@/components/UpcomingEvents';

const EventsRoute = () => {
  return (
    <div className="p-4 w-auto mx-auto overflow-hidden">
      <h1 className="text-2xl font-bold mb-6">My Events</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <EventCalendar />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default EventsRoute;