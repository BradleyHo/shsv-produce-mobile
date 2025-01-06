import { locations, getLocationString, getFormattedSchedule } from '../data/locations';
import { commonTranslations } from './translations';

export const getLocationsForLanguage = (language = 'en') => {
  return locations.map(location => ({
    ...location,
    displayName: getLocationString(location, language),
    formattedSchedule: getFormattedSchedule(location.schedule, language),
    region: commonTranslations.regions[language][
      commonTranslations.regions.en.indexOf(location.region)
    ]
  }));
};

export const searchLocations = (query, language = 'en') => {
  const searchTerms = query.toLowerCase().split(' ');
  const translatedLocations = getLocationsForLanguage(language);
  
  return translatedLocations.filter(location => {
    const searchText = [
      location.displayName,
      location.address,
      location.region,
      location.formattedSchedule
    ].join(' ').toLowerCase();
    
    return searchTerms.every(term => searchText.includes(term));
  });
};