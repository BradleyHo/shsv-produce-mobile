// src/App.jsx
import React, { useState } from 'react';
import { Calendar, MapPin, List } from 'lucide-react';
import CalendarView from './components/Calendar/CalendarView';
import MapView from './components/Map/MapView';
import ListView from './components/List/ListView';

const App = () => {
  const [view, setView] = useState('calendar');
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-orange-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                Second Harvest Produce Mobile
              </h1>
              <p className="mt-1 text-orange-100">
                Free Fresh Produce in Your Neighborhood
              </p>
            </div>
            <button 
              onClick={() => setLanguage(lang => lang === 'en' ? 'es' : 'en')}
              className="px-4 py-2 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
            >
              {language === 'en' ? 'Español' : 'English'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex gap-4">
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${view === 'calendar' 
                  ? 'bg-white text-orange-500' 
                  : 'bg-orange-600 hover:bg-orange-700'}`}
            >
              <Calendar size={20} />
              <span>{language === 'en' ? 'Calendar' : 'Calendario'}</span>
            </button>
            <button
              onClick={() => setView('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${view === 'map' 
                  ? 'bg-white text-orange-500' 
                  : 'bg-orange-600 hover:bg-orange-700'}`}
            >
              <MapPin size={20} />
              <span>{language === 'en' ? 'Map' : 'Mapa'}</span>
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${view === 'list' 
                  ? 'bg-white text-orange-500' 
                  : 'bg-orange-600 hover:bg-orange-700'}`}
            >
              <List size={20} />
              <span>{language === 'en' ? 'List' : 'Lista'}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'calendar' && <CalendarView language={language} />}
        {view === 'map' && <MapView language={language} />}
        {view === 'list' && <ListView language={language} />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} Second Harvest Food Bank
            </p>
            <a 
              href="https://www.shfb.org/get-food/" 
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
