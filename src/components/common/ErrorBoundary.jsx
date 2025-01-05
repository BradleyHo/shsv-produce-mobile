import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { language } = this.props;

    if (hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            {language === 'en' ? 'Something went wrong' : 'Algo salió mal'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error?.message || (language === 'en' 
              ? 'An unexpected error occurred' 
              : 'Ocurrió un error inesperado'
            )}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <RefreshCw size={18} />
            {language === 'en' ? 'Refresh Page' : 'Actualizar Página'}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;