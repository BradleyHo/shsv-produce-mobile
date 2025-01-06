import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon, Calendar } from 'lucide-react';

const DigitalClock = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setDateTime(now);
      // Get timezone (PST/PDT)
      const tz = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        timeZoneName: 'short'
      }).split(' ').pop();
      setTimeZone(tz);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex items-center gap-4 text-white/90">
      <div className="flex items-center gap-2">
        <ClockIcon className="w-4 h-4" />
        <span className="font-mono text-lg">
          {formatTime(dateTime)} {timeZone}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(dateTime)}</span>
      </div>
    </div>
  );
};

export default DigitalClock;