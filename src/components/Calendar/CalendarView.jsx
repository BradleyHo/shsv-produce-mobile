import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { getEventsForMonth } from '../../utils/dateUtils';
import EventCard from './EventCard';

const CalendarView = ({ language }) => {
  // Set initial date to January 2025 since we know Jan 1 is Wednesday
  const [currentMonth, setCurrentMonth] = useState(() => new Date(2025, 0));
  const [events, setEvents] = useState([]);
  
  // Fetch events for current month on mount and month change
  useEffect(() => {
    const monthEvents = getEventsForMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    setEvents(monthEvents);
  }, [currentMonth]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  // Get all days in the month plus padding days
  const startDay = new Date(monthStart);
  startDay.setDate(startDay.getDate() - startDay.getDay()); // Roll back to Sunday
  const endDay = new Date(monthEnd);
  endDay.setDate(endDay.getDate() + (6 - endDay.getDay())); // Forward to Saturday
  
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const getEventForDay = (day) => {
    return events.find(event => {
      const eventDate = event.date;
      return eventDate.getDate() === day.getDate() && 
             eventDate.getMonth() === day.getMonth() &&
             eventDate.getFullYear() === day.getFullYear();
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {format(currentMonth, 'MMMM yyyy', { locale: language === 'es' ? es : undefined })}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentMonth(prev => 
                new Date(prev.getFullYear(), prev.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentMonth(prev => 
                new Date(prev.getFullYear(), prev.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div 
              key={day} 
              className="text-center p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {language === 'en' ? day : day.substring(0, 1)}
            </div>
          ))}

          {/* Calendar days */}
          {days.map(day => {
            const event = getEventForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isTodays = isToday(day); // This will highlight Jan 6, 2025
            
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[120px] p-2 relative border dark:border-gray-700
                  ${!isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}
                  ${isTodays ? 'ring-2 ring-orange-500' : ''}`}
              >
                <div className={`text-sm font-semibold ${
                  isCurrentMonth 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-400 dark:text-gray-600'
                }`}>
                  {format(day, 'd')}
                </div>
                {event && (
                  <div className="mt-1">
                    <EventCard event={event} language={language} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;