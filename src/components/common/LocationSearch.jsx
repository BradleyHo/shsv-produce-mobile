import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const LocationSearch = ({ onSearch, language }) => {
  const [input, setInput] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleLocationSearch = async () => {
    if (!input) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)},Santa Clara County,CA`
      );
      const data = await response.json();
      
      if (data && data[0]) {
        onSearch({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        });
      }
    } catch (error) {
      console.error('Location search error:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUseCurrentLocation(true);
          onSearch({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder={language === 'en' ? "Enter ZIP code or address" : "Ingrese código postal o dirección"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full pl-10 pr-20 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <button
          onClick={handleLocationSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          {language === 'en' ? 'Search' : 'Buscar'}
        </button>
      </div>
      <button
        onClick={getCurrentLocation}
        className="mt-2 flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600"
      >
        <MapPin size={16} />
        {language === 'en' ? 'Use my current location' : 'Usar mi ubicación actual'}
      </button>
    </div>
  );
};

export default LocationSearch;