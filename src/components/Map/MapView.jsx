import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { locations } from '../../data/locations';
import L from 'leaflet';

// Center Map component for location updates
function MapCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13);
    }
  }, [center, map]);
  return null;
}

const MapView = ({ language }) => {
  const [center, setCenter] = useState([37.3382, -121.8863]); // Default to San Jose
  const [searchInput, setSearchInput] = useState('');
  const [nearestLocations, setNearestLocations] = useState([...locations]);

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

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)},Santa Clara County,CA`
      );
      const data = await response.json();
      
      if (data && data[0]) {
        const searchLat = parseFloat(data[0].lat);
        const searchLng = parseFloat(data[0].lon);
        setCenter([searchLat, searchLng]);

        // Sort locations by distance
        const sortedLocations = [...locations].sort((a, b) => {
          const distA = calculateDistance(searchLat, searchLng, a.coordinates.lat, a.coordinates.lng);
          const distB = calculateDistance(searchLat, searchLng, b.coordinates.lat, b.coordinates.lng);
          return distA - distB;
        });

        setNearestLocations(sortedLocations);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
          
          // Sort locations by distance from current location
          const sortedLocations = [...locations].sort((a, b) => {
            const distA = calculateDistance(latitude, longitude, a.coordinates.lat, a.coordinates.lng);
            const distB = calculateDistance(latitude, longitude, b.coordinates.lat, b.coordinates.lng);
            return distA - distB;
          });

          setNearestLocations(sortedLocations);
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder={language === 'en' ? "Enter ZIP code or address" : "Ingrese código postal o dirección"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            {language === 'en' ? 'Search' : 'Buscar'}
          </button>
          <button
            onClick={handleCurrentLocation}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {language === 'en' ? 'Use Current Location' : 'Usar Ubicación Actual'}
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <MapContainer 
          center={center} 
          zoom={11} 
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapCenter center={center} />
          
          {nearestLocations.map((location, index) => (
            <Marker 
              key={location.id}
              position={[location.coordinates.lat, location.coordinates.lng]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{location.baseText}</h3>
                  <p className="text-sm mt-1">{location.address}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {location.schedule.time.start} - {location.schedule.time.end}
                  </p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-500 hover:text-orange-600 mt-2 inline-block"
                  >
                    {language === 'en' ? 'Get Directions' : 'Obtener Direcciones'}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Nearest Locations List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">
          {language === 'en' ? 'Nearest Locations' : 'Ubicaciones más Cercanas'}
        </h3>
        <div className="space-y-2">
          {nearestLocations.slice(0, 5).map((location, index) => (
            <div key={location.id} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
              <div className="font-medium">{location.baseText}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{location.address}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;