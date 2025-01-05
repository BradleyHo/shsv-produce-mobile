import { locations } from '../data/locations';

// Get the nth occurrence of a weekday in a month
export const getNthWeekday = (year, month, nth, weekday) => {
  const date = new Date(year, month, 1);
  let count = 0;
  
  // Keep incrementing the date until we find the nth occurrence
  while (date.getMonth() === month) {
    if (date.getDay() === weekday) {
      count++;
      if (count === nth) {
        return new Date(date);
      }
    }
    date.setDate(date.getDate() + 1);
  }
  
  return null;
};

// Get all events for a specific month
export const getEventsForMonth = (month, year) => {
  const events = [];
  
  locations.forEach(location => {
    const { week, day } = location.schedule;
    const eventDate = getNthWeekday(year, month, week, day);
    
    if (eventDate) {
      events.push({
        date: eventDate,
        location
      });
    }
  });
  
  return events.sort((a, b) => a.date - b.date);
};

// Format time in 12-hour format
export const formatTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

// Check if an event is happening now
export const isEventNow = (event) => {
  const now = new Date();
  const { start, end } = event.location.schedule.time;
  
  const [startHour, startMinutes] = start.split(':').map(Number);
  const [endHour, endMinutes] = end.split(':').map(Number);
  
  const eventDate = event.date;
  const startTime = new Date(eventDate).setHours(startHour, startMinutes);
  const endTime = new Date(eventDate).setHours(endHour, endMinutes);
  
  return now >= startTime && now <= endTime;
};

// Get next occurring event
export const getNextEvent = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Get events for current and next month
  const currentMonthEvents = getEventsForMonth(currentMonth, currentYear);
  const nextMonthEvents = getEventsForMonth(currentMonth + 1, currentYear);
  
  const allEvents = [...currentMonthEvents, ...nextMonthEvents]
    .filter(event => event.date > now)
    .sort((a, b) => a.date - b.date);
  
  return allEvents[0] || null;
};

// Format date based on language
export const formatDate = (date, language) => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', options);
};