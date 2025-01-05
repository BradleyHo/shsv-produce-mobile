// src/data/locations.js

export const locations = [
  {
    id: 'mv-catholic-charities',
    name: {
      en: 'Catholic Charities: San Antonio Place',
      es: 'Catholic Charities: San Antonio Place'
    },
    address: '210 San Antonio Circle',
    city: 'Mountain View',
    region: 'Mountain View',
    schedule: {
      week: 4,
      day: 2, // Tuesday
      time: { start: '11:00', end: '11:00' }
    },
    coordinates: { lat: 37.3861, lng: -122.0839 }
  },
  // ... rest of the locations
];

export const regions = [
  'Mountain View',
  'Santa Clara',
  'San Jose (West)',
  'San Jose (Downtown)',
  'San Jose (South)',
  'San Jose (East)'
];

// Add the missing function
export const getLocationsByRegion = () => {
  return locations.reduce((acc, location) => {
    const region = location.region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(location);
    return acc;
  }, {});
};