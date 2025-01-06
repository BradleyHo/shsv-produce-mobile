import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language configurations
const resources = {
  en: {
    translation: {
      common: {
        search: 'Search',
        loading: 'Loading...',
        getDirections: 'Get Directions',
        addToCalendar: 'Add to Calendar',
        currentLocation: 'Use my current location',
        enterAddress: 'Enter ZIP code or address',
        darkMode: 'Toggle dark mode',
        moreResources: 'More Food Resources',
        timezone: 'Timezone'
      },
      days: {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'
      }
      // New translations can be added here in sections
    }
  },
  es: {
    translation: {
      common: {
        search: 'Buscar',
        loading: 'Cargando...',
        getDirections: 'Obtener Direcciones',
        addToCalendar: 'Agregar al Calendario',
        currentLocation: 'Usar mi ubicación actual',
        enterAddress: 'Ingrese código postal o dirección',
        darkMode: 'Cambiar modo oscuro',
        moreResources: 'Más Recursos de Alimentos',
        timezone: 'Zona Horaria'
      },
      days: {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo'
      }
    }
  },
  'zh-CN': {
    translation: {
      // Chinese Simplified translations
    }
  },
  'zh-TW': {
    translation: {
      // Chinese Traditional translations
    }
  },
  tl: {
    translation: {
      // Tagalog translations
    }
  },
  vi: {
    translation: {
      // Vietnamese translations
    }
  },
  ko: {
    translation: {
      // Korean translations
    }
  },
  ja: {
    translation: {
      // Japanese translations
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;