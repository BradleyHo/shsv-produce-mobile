import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { locations } from '../../data/locations';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Component to handle map center updates
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const MapView = ({ language }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState([37.3382, -121.8863]); // San Jose center

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setCenter([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const formatSchedule = (location) => {
    const days = {
      en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    };
    
    const weeks = {
      en: ['1st', '2nd', '3rd', '4th'],
      es: ['1er', '2do', '3er', '4to']
    };

    const { week, day } = location.schedule;
    const { start, end } = location.schedule.time;
    const time = start === end ? start : `${start} - ${end}`;
    
    return `${weeks[language][week - 1]} ${days[language][day]}, ${time}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {language === 'en' ? 'Distribution Locations' : 'Ubicaciones de Distribución'}
        </h2>
      </div>

      <div className="h-[600px] relative">
        <MapContainer 
          center={center} 
          zoom={11} 
          className="h-full w-full"
          style={{ background: '#f0f0f0' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          <MapUpdater center={center} />
          
          {locations.map((location) => (
            <Marker 
              key={location.id}
              position={[location.coordinates.lat, location.coordinates.lng]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">
                    {location.name[language]}
                  </h3>
                  <p className="text-sm mt-1">
                    {location.address}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatSchedule(location)}
                  </p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <MapPin size={14} />
                    {language === 'en' ? 'Get Directions' : 'Obtener Direcciones'}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {userLocation && (
            <Marker 
              position={userLocation}
              icon={new L.DivIcon({
                html: '<div class="w-4 h-4 bg-blue-500 rounded-full pulse"></div>',
                className: 'custom-div-icon'
              })}
            >
              <Popup>
                {language === 'en' ? 'Your Location' : 'Su Ubicación'}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;