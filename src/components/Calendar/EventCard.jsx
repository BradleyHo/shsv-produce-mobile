import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const EventCard = ({ event, language }) => {
  const { location, date } = event;
  
  const formatTime = () => {
    const { start, end } = location.schedule.time;
    return start === end ? start : `${start} - ${end}`;
  };

  return (
    <div className="mt-1 p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-xs">
      <div className="font-medium text-orange-800 dark:text-orange-200">
        {location.name[language]}
      </div>
      <div className="mt-1 flex items-center gap-1 text-orange-700 dark:text-orange-300">
        <MapPin size={12} />
        <span className="truncate">{location.address}</span>
      </div>
      <div className="mt-1 flex items-center gap-1 text-orange-700 dark:text-orange-300">
        <Clock size={12} />
        <span>{formatTime()}</span>
      </div>
    </div>
  );
};

export default EventCard;