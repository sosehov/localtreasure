import React from 'react';
import { Calendar } from '@/components/ui/calendar'; // or your custom component

const CalendarRoute = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Calendar</h1>
      <Calendar />
    </div>
  );
};

export default CalendarRoute;