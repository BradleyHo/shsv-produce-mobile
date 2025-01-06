import React, { useState } from 'react';
import { Calendar, MapPin, List, HelpCircle, BookOpen } from 'lucide-react';
import CalendarView from './components/Calendar/CalendarView';
import MapView from './components/Map/MapView';
import ListView from './components/List/ListView';
import FAQSection from './components/FAQ/FAQSection';
import RecipesView from './components/Recipes/RecipesView';
import DigitalClock from './components/common/DigitalClock';
import LanguageSelector from './components/common/LanguageSelector';
import BackgroundAnimation from './components/common/BackgroundAnimation';

// Constants for URLs
const URLS = {
  PRODUCE_PDF: 'https://www.shfb.org/docs/getfood/producemobile_santaclara.pdf',
  SHFB_FOOD: 'https://www.shfb.org/get-food/',
  BRADLEY_HO: 'https://www.bradleyho.com'
};

const App = () => {
  const [view, setView] = useState('calendar');
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const navItems = [
    { id: 'calendar', Icon: Calendar, labelEn: 'Calendar', labelEs: 'Calendario' },
    { id: 'map', Icon: MapPin, labelEn: 'Map', labelEs: 'Mapa' },
    { id: 'list', Icon: List, labelEn: 'List', labelEs: 'Lista' },
    { id: 'recipes', Icon: BookOpen, labelEn: 'Recipes', labelEs: 'Recetas' },
    { id: 'faq', Icon: HelpCircle, labelEn: 'FAQ', labelEs: 'FAQ' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-orange-500 text-white shadow-lg relative overflow-hidden">
        <BackgroundAnimation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            {/* Top bar with clock and language selector */}
            <div className="flex items-center justify-between">
              <DigitalClock />
              <LanguageSelector 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold">Second Harvest Produce Mobile</h1>
              <p className="mt-1 text-orange-100">
                {language === 'en' ? 'Free Fresh Produce in Your Neighborhood' : 'Frutas y Verduras Frescas Gratis en su Vecindario'}
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap gap-2">
              {navItems.map(({ id, Icon, labelEn, labelEs }) => (
                <button
                  key={id}
                  onClick={() => setView(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105
                    ${view === id 
                      ? 'bg-white text-orange-500' 
                      : 'bg-orange-600 hover:bg-orange-700 text-white'}`}
                >
                  <Icon size={20} />
                  <span>{language === 'en' ? labelEn : labelEs}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-opacity duration-200">
          {view === 'calendar' && <CalendarView language={language} />}
          {view === 'map' && <MapView language={language} />}
          {view === 'list' && <ListView language={language} />}
          {view === 'recipes' && <RecipesView language={language} />}
          {view === 'faq' && <FAQSection language={language} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 mt-auto border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center sm:items-start">
              <a 
                href={URLS.BRADLEY_HO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-orange-500"
              >
                Created by Bradley Ho
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Data from: <a 
                  href={URLS.PRODUCE_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-600"
                >
                  Second Harvest Food Bank
                </a>
              </p>
            </div>
            <a 
              href={URLS.SHFB_FOOD}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              {language === 'en' ? 'More Food Resources' : 'Más Recursos de Alimentos'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;