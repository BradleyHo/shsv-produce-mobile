import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import AddToCalendarButton from './AddToCalendarButton';

const EventCard = ({ event, language }) => {
  const { location, date } = event;

  const getGoogleMapsUrl = () => {
    const fullAddress = `${location.address}, ${location.city}, CA ${location.zipCode}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  };

  return (
    <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded text-xs space-y-1">
      <div className="font-medium text-orange-800 dark:text-orange-200 truncate">
        {location.baseText}
      </div>
      
      <a
        href={getGoogleMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-orange-700 dark:text-orange-300 hover:text-orange-800 dark:hover:text-orange-200"
      >
        <MapPin size={10} className="flex-shrink-0" />
        <span className="truncate underline">
          {`${location.address}, ${location.city}, CA ${location.zipCode}`}
        </span>
      </a>
      
      <div className="flex items-center gap-1 text-orange-700 dark:text-orange-300">
        <Clock size={10} className="flex-shrink-0" />
        <span className="truncate">{location.schedule.time.start}
          {location.schedule.time.start !== location.schedule.time.end && 
            ` - ${location.schedule.time.end}`}
        </span>
      </div>

      <div className="pt-1">
        <AddToCalendarButton event={event} language={language} />
      </div>
    </div>
  );
};

export default EventCard;