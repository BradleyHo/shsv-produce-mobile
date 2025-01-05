// src/components/List/ListView.jsx
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CalendarDays, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { locations, getLocationsByRegion } from '../../data/locations';

const ListView = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('region'); // 'region' | 'time' | 'day'
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedLocation, setExpandedLocation] = useState(null);

  const filteredLocations = locations.filter(location => {
    const searchLower = searchTerm.toLowerCase();
    return (
      location.name[language].toLowerCase().includes(searchLower) ||
      location.address.toLowerCase().includes(searchLower) ||
      location.city.toLowerCase().includes(searchLower)
    );
  });

  const getDayName = (day) => {
    const days = {
      en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    };
    return days[language][day];
  };

  const getWeekText = (week) => {
    const weeks = {
      en: ['1st', '2nd', '3rd', '4th'],
      es: ['1er', '2do', '3er', '4to']
    };
    return weeks[language][week - 1];
  };

  const formatSchedule = (location) => {
    const dayName = getDayName(location.schedule.day);
    const weekText = getWeekText(location.schedule.week);
    const { start, end } = location.schedule.time;
    const time = start === end ? start : `${start} - ${end}`;
    
    return `${weekText} ${dayName}, ${time}`;
  };

  const sortLocations = (locations) => {
    return [...locations].sort((a, b) => {
      let compareResult = 0;
      
      switch (sortBy) {
        case 'region':
          compareResult = a.city.localeCompare(b.city);
          break;
        case 'time':
          compareResult = a.schedule.time.start.localeCompare(b.schedule.time.start);
          break;
        case 'day':
          compareResult = a.schedule.day - b.schedule.day || 
                         a.schedule.week - b.schedule.week;
          break;
        default:
          compareResult = 0;
      }
      
      return sortOrder === 'asc' ? compareResult : -compareResult;
    });
  };

  const sortedLocations = sortLocations(filteredLocations);
  const locationsByRegion = getLocationsByRegion();

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'en' ? "Search locations..." : "Buscar ubicaciones..."}
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              <option value="region">{language === 'en' ? 'Region' : 'Región'}</option>
              <option value="time">{language === 'en' ? 'Time' : 'Hora'}</option>
              <option value="day">{language === 'en' ? 'Day' : 'Día'}</option>
            </select>
            <button
              onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sortOrder === 'asc' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Location List */}
      <div className="grid gap-4">
        {sortedLocations.map((location) => (
          <div 
            key={location.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
          >
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setExpandedLocation(
                expandedLocation === location.id ? null : location.id
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {location.name[language]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {location.city}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600 dark:text-gray-300">
                  {formatSchedule(location)}
                </div>
              </div>

              {expandedLocation === location.id && (
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <MapPin size={18} />
                    <span>{location.address}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-300">
                    <Clock size={18} />
                    <span>{formatSchedule(location)}</span>
                  </div>
                  <div className="mt-4">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <MapPin size={18} />
                      {language === 'en' ? 'Get Directions' : 'Obtener Direcciones'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
