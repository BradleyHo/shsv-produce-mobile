import React, { useState } from 'react';
import { MapPin, Clock, ChevronDown, ChevronUp, Search, MapIcon } from 'lucide-react';
import { locations } from '../../data/locations';

const ListView = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [sortBy, setSortBy] = useState('distance');

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleLocationSearch = async () => {
    if (!searchTerm) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)},Santa Clara County,CA`
      );
      const data = await response.json();
      
      if (data && data[0]) {
        setUserLocation({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        });
      }
    } catch (error) {
      console.error('Location search error:', error);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  };

  const filteredAndSortedLocations = React.useMemo(() => {
    let result = [...locations];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(location => 
        location.baseText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort locations
    if (userLocation && sortBy === 'distance') {
      result.sort((a, b) => {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng);
        return distA - distB;
      });
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.baseText.localeCompare(b.baseText));
    }

    return result;
  }, [locations, searchTerm, userLocation, sortBy]);

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder={language === 'en' ? "Search by location or address..." : "Buscar por ubicación o dirección..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700"
              onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <button
              onClick={handleLocationSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              {language === 'en' ? 'Search' : 'Buscar'}
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleCurrentLocation}
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
            >
              <MapIcon size={18} />
              {language === 'en' ? 'Use my location' : 'Usar mi ubicación'}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 rounded border dark:border-gray-700 dark:bg-gray-700"
            >
              <option value="distance">{language === 'en' ? 'Sort by distance' : 'Ordenar por distancia'}</option>
              <option value="name">{language === 'en' ? 'Sort by name' : 'Ordenar por nombre'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Location List */}
      <div className="space-y-4">
        {filteredAndSortedLocations.map((location) => (
          <div 
            key={location.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
          >
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => setExpandedLocation(expandedLocation === location.id ? null : location.id)}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {location.baseText}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {location.address}
                  </p>
                </div>
                {userLocation && (
                  <div className="text-sm text-gray-500">
                    {`${calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      location.coordinates.lat,
                      location.coordinates.lng
                    ).toFixed(1)} km`}
                  </div>
                )}
              </div>

              {expandedLocation === location.id && (
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Clock size={18} />
                      <span>
                        {location.schedule.time.start}
                        {location.schedule.time.start !== location.schedule.time.end && 
                          ` - ${location.schedule.time.end}`}
                      </span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600"
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