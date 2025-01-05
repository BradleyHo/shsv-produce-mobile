import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { getEventsForMonth } from '../../utils/dateUtils';
import EventCard from './EventCard';

const CalendarView = ({ language }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  
  // Get days for current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  useEffect(() => {
    const monthEvents = getEventsForMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    setEvents(monthEvents);
  }, [currentMonth]);

  const previousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const formatDate = (date) => {
    return format(date, 'MMMM yyyy', {
      locale: language === 'es' ? es : undefined
    });
  };

  const getEventForDay = (day) => {
    return events.find(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth()
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatDate(currentMonth)}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={language === 'en' ? 'Previous month' : 'Mes anterior'}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={language === 'en' ? 'Next month' : 'Mes siguiente'}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div 
              key={day} 
              className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 p-2"
            >
              {language === 'en' ? day : day.substring(0, 1)}
            </div>
          ))}

          {days.map(day => {
            const event = getEventForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            
            return (
              <div
                key={day.toISOString()}
                className={`
                  min-h-32 p-2 border border-gray-200 dark:border-gray-700
                  ${!isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900' : ''}
                  ${isToday(day) ? 'bg-orange-50 dark:bg-orange-900/20' : ''}
                `}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(day, 'd')}
                </div>
                {event && <EventCard event={event} language={language} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;