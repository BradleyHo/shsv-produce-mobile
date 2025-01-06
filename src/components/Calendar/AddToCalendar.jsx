import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const AddToCalendar = ({ event, language }) => {
  const createGoogleCalendarUrl = () => {
    const { location, date } = event;
    const startTime = new Date(date);
    const [hours, minutes] = location.schedule.time.start.split(':');
    startTime.setHours(parseInt(hours), parseInt(minutes));
    
    const endTime = new Date(startTime);
    if (location.schedule.time.end !== location.schedule.time.start) {
      const [endHours, endMinutes] = location.schedule.time.end.split(':');
      endTime.setHours(parseInt(endHours), parseInt(minutes));
    } else {
      endTime.setHours(startTime.getHours() + 1);
    }

    const params = {
      action: 'TEMPLATE',
      text: `Second Harvest Food Bank - ${location.baseText}`,
      dates: `${startTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${
        endTime.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
      }`,
      details: `Free produce distribution. Bring your own bags.\n\nAddress: ${location.address}`,
      location: location.address
    };

    const baseUrl = 'https://www.google.com/calendar/render';
    return `${baseUrl}?${new URLSearchParams(params).toString()}`;
  };

  const createICSContent = () => {
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

    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(startTime)}`,
      `DTEND:${formatICSDate(endTime)}`,
      `SUMMARY:Second Harvest Food Bank - ${location.baseText}`,
      `DESCRIPTION:Free produce distribution. Bring your own bags.\\n\\nAddress: ${location.address}`,
      `LOCATION:${location.address}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    return URL.createObjectURL(blob);
  };

  const texts = {
    button: {
      en: 'Add to Calendar',
      es: 'Agregar al Calendario',
      zh: '添加到日历',
      'zh-tw': '添加到日曆',
      tl: 'Idagdag sa Kalendaryo',
      vi: 'Thêm vào Lịch',
      ko: '캘린더에 추가'
    }
  };

  return (
    <div className="inline-flex gap-2">
      <a
        href={createGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
      >
        <CalendarIcon className="w-4 h-4" />
        <span className="hidden sm:inline">{texts.button[language]}</span>
      </a>
      <a
        href={createICSContent()}
        download="event.ics"
        className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
      >
        <CalendarIcon className="w-4 h-4" />
        <span className="hidden sm:inline">iCal</span>
      </a>
    </div>
  );
};

export default AddToCalendar;