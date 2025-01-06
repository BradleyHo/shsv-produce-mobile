import React from 'react';
import { Calendar, Download } from 'lucide-react';

const AddToCalendarButton = ({ event, language }) => {
  const createGoogleCalendarUrl = () => {
    const { location, date } = event;
    const startTime = new Date(date);
    const [hours, minutes] = location.schedule.time.start.split(':');
    startTime.setHours(parseInt(hours), parseInt(minutes));
    
    const endTime = new Date(startTime);
    if (location.schedule.time.end !== location.schedule.time.start) {
      const [endHours, endMinutes] = location.schedule.time.end.split(':');
      endTime.setHours(parseInt(endHours), parseInt(endMinutes));
    } else {
      endTime.setHours(startTime.getHours() + 1);
    }

    const params = {
      action: 'TEMPLATE',
      text: `Second Harvest Food Bank - ${location.baseText}`,
      dates: `${startTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${
        endTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
      }`,
      details: `Free produce distribution. Please bring your own bags.\nLocation: ${location.address}, ${location.city}, CA ${location.zipCode}`,
      location: `${location.address}, ${location.city}, CA ${location.zipCode}`
    };

    return `https://www.google.com/calendar/render?${new URLSearchParams(params).toString()}`;
  };

  return (
    <div className="grid grid-cols-2 gap-1 text-[10px]">
      <a
        href={createGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 px-1 py-0.5 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
      >
        <Calendar className="w-3 h-3" />
        <span>Google</span>
      </a>
      <button
        onClick={() => {/* iCal download logic */}}
        className="flex items-center justify-center gap-1 px-1 py-0.5 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
      >
        <Download className="w-3 h-3" />
        <span>iCal</span>
      </button>
    </div>
  );
};

export default AddToCalendarButton;