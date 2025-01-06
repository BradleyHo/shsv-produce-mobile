// Base location data - single source of truth with all required exports
export const locations = [
  {
    id: 'mv-catholic-charities',
    baseText: 'Catholic Charities: San Antonio Place',
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
  {
    id: 'sc-midpen',
    baseText: 'MidPen Riverwood Grove',
    address: '2150 Tasman Drive',
    city: 'Santa Clara',
    region: 'Santa Clara',
    schedule: {
      week: 3,
      day: 1, // Monday
      time: { start: '16:00', end: '18:00' }
    },
    coordinates: { lat: 37.3996, lng: -121.9667 }
  },
  {
    id: 'sj-bethel',
    baseText: 'Bethel Church',
    address: '1201 South Winchester Blvd.',
    city: 'San Jose',
    region: 'San Jose (West)',
    schedule: {
      week: 3,
      day: 4, // Thursday
      time: { start: '11:30', end: '13:00' }
    },
    coordinates: { lat: 37.3096, lng: -121.9506 }
  },
  {
    id: 'sj-indian-health',
    baseText: 'Indian Health Center',
    address: '602 East Santa Clara Street',
    city: 'San Jose',
    region: 'San Jose (Downtown)',
    schedule: {
      week: 3,
      day: 5, // Friday
      time: { start: '13:00', end: '15:00' }
    },
    coordinates: { lat: 37.3405, lng: -121.8858 }
  },
  {
    id: 'sj-olinder',
    baseText: 'Olinder Neighborhood',
    address: '848 East William Street',
    city: 'San Jose',
    region: 'San Jose (Downtown)',
    schedule: {
      week: 3,
      day: 1, // Monday
      time: { start: '8:00', end: '9:00' }
    },
    coordinates: { lat: 37.3376, lng: -121.8793 }
  },
  {
    id: 'sj-calworks',
    baseText: 'CalWORKS South County',
    address: '1879 Senter Road',
    city: 'San Jose',
    region: 'San Jose (South)',
    schedule: {
      week: 4,
      day: 3, // Wednesday
      time: { start: '9:45', end: '11:00' }
    },
    coordinates: { lat: 37.3162, lng: -121.8628 }
  },
  {
    id: 'sj-meadows',
    baseText: 'Meadows Elementary School',
    address: '1250 Taper Lane',
    city: 'San Jose',
    region: 'San Jose (South)',
    schedule: {
      week: 1,
      day: 3, // Wednesday
      time: { start: '8:30', end: '8:30' }
    },
    coordinates: { lat: 37.2755, lng: -121.8635 }
  },
  {
    id: 'sj-dahl',
    baseText: 'Cpt. Jason Dahl Elementary School',
    address: '3200 Water Street',
    city: 'San Jose',
    region: 'San Jose (South)',
    schedule: {
      week: 3,
      day: 6, // Saturday
      time: { start: '12:00', end: '14:00' }
    },
    coordinates: { lat: 37.2975, lng: -121.8485 }
  },
  {
    id: 'sj-ohlone',
    baseText: 'Ohlone Chynoweth Commons',
    address: '5300 Terner Way',
    city: 'San Jose',
    region: 'San Jose (South)',
    schedule: {
      week: 1,
      day: 4, // Thursday
      time: { start: '14:00', end: '16:00' }
    },
    coordinates: { lat: 37.2565, lng: -121.8885 }
  },
  {
    id: 'sj-kings',
    baseText: 'Catholic Charities: Kings Crossing',
    address: '678 North King Road',
    city: 'San Jose',
    region: 'San Jose (East)',
    schedule: {
      week: 3,
      day: 3, // Wednesday
      time: { start: '13:00', end: '13:00' }
    },
    coordinates: { lat: 37.3688, lng: -121.8997 }
  },
  {
    id: 'sj-valley-medical',
    baseText: 'Santa Clara Valley Medical Center',
    address: '1993 McKee Road',
    city: 'San Jose',
    region: 'San Jose (East)',
    schedule: {
      week: 2,
      day: 6, // Saturday
      time: { start: '9:30', end: '11:00' }
    },
    coordinates: { lat: 37.3496, lng: -121.9096 }
  },
  {
    id: 'sj-pal',
    baseText: 'San Jose Police Activities League',
    address: '680 South 34th Street',
    city: 'San Jose',
    region: 'San Jose (East)',
    schedule: {
      week: 3,
      day: 2, // Tuesday
      time: { start: '15:00', end: '16:00' }
    },
    coordinates: { lat: 37.3506, lng: -121.8785 }
  },
  {
    id: 'sj-health-trust',
    baseText: 'Health Trust-Children\'s Dental Center',
    address: '1153 South King Road',
    city: 'San Jose',
    region: 'San Jose (East)',
    schedule: {
      week: 1,
      day: 3, // Wednesday
      time: { start: '10:00', end: '10:00' }
    },
    coordinates: { lat: 37.3495, lng: -121.8685 }
  },
  {
    id: 'sj-tockna',
    baseText: 'TOCKNA Neighborhood',
    address: '2040 Nassau Drive',
    city: 'San Jose',
    region: 'San Jose (East)',
    schedule: {
      week: 3,
      day: 6, // Saturday
      time: { start: '11:30', end: '13:00' }
    },
    coordinates: { lat: 37.3065, lng: -121.8706 }
  },
  {
    id: 'sj-foothill',
    baseText: 'Foothill Community Health Center',
    address: '1650 South White Road',
    city: 'San Jose',
    region: 'San Jose (East)',
    schedule: {
      week: 3,
      day: 6, // Saturday
      time: { start: '13:00', end: '16:00' }
    },
    coordinates: { lat: 37.3335, lng: -121.8253 }
  }
];

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

export const getLocationString = (location, language) => {
  if (location.translations?.[language]) {
    return location.translations[language];
  }
  return location.baseText;
};

export const getFormattedSchedule = (schedule, language) => {
  const days = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    zh: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    'zh-tw': ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    tl: ['Linggo', 'Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado'],
    vi: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
    ko: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  }[language] || days.en;
  
  const dayName = days[schedule.day];
  
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  return `${dayName}, ${formatTime(schedule.time.start)}${
    schedule.time.start !== schedule.time.end ? ` - ${formatTime(schedule.time.end)}` : ''
  }`;
};