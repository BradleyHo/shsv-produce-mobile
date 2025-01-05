import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ language }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {language === 'en' ? 'Loading...' : 'Cargando...'}
      </p>
    </div>
  );
};

export default LoadingSpinner;