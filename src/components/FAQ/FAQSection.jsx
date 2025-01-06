import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = ({ language }) => {
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      id: 'disclaimer',
      isAlert: true,
      q: {
        en: 'About This Website',
        es: 'Acerca de Este Sitio Web'
      },
      a: {
        en: 'This is a community-created visualization tool that transforms Second Harvest Food Bank\'s Produce Mobile PDF calendar into an interactive format. While we strive for accuracy, please refer to SHFB\'s official website or call 1-800-984-3663 for the most up-to-date information.',
        es: 'Esta es una herramienta de visualización creada por la comunidad que transforma el calendario PDF de Second Harvest Food Bank en un formato interactivo. Para obtener la información más actualizada, consulte el sitio web oficial de SHFB o llame al 1-800-984-3663.'
      }
    },
    {
      id: 'what-bring',
      q: {
        en: 'What should I bring?',
        es: '¿Qué debo traer?'
      },
      a: {
        en: 'Please bring your own bags or boxes to carry the produce. No ID or documentation is required to receive food.',
        es: 'Por favor traiga sus propias bolsas o cajas para llevar los productos. No se requiere identificación ni documentación.'
      }
    },
    {
      id: 'what-receive',
      q: {
        en: 'What will I receive?',
        es: '¿Qué voy a recibir?'
      },
      a: {
        en: 'Each distribution provides 25-35 pounds of fresh fruits and vegetables per household.',
        es: 'Cada distribución proporciona entre 25 y 35 libras de frutas y verduras frescas por hogar.'
      }
    },
    {
      id: 'more-help',
      q: {
        en: 'Where can I find more food resources?',
        es: '¿Dónde puedo encontrar más recursos de alimentos?'
      },
      a: {
        en: 'Call Second Harvest\'s Food Connection hotline at 1-800-984-3663 for information about food programs, CalFresh, and home delivery. Visit www.shfb.org/get-food for more resources.',
        es: 'Llame a la línea directa de Food Connection de Second Harvest al 1-800-984-3663 para obtener información sobre programas de alimentos, CalFresh y entrega a domicilio. Visite www.shfb.org/get-food para más recursos.'
      }
    },
    {
      id: 'weather',
      q: {
        en: 'What if it\'s raining?',
        es: '¿Qué pasa si está lloviendo?'
      },
      a: {
        en: 'Distributions typically continue rain or shine. In severe weather, call 1-800-984-3663 to verify.',
        es: 'Las distribuciones generalmente continúan llueva o haga sol. En clima severo, llame al 1-800-984-3663 para verificar.'
      }
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {faqItems.map((item) => (
        <div 
          key={item.id}
          className={`mb-4 rounded-lg overflow-hidden ${
            item.isAlert 
              ? 'bg-orange-50 dark:bg-orange-900/20' 
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center"
            onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-3">
              {item.isAlert && <Info className="w-5 h-5 text-orange-500" />}
              <span className="font-medium">{item.q[language]}</span>
            </div>
            {openItem === item.id ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          {openItem === item.id && (
            <div className="px-6 py-4 border-t dark:border-gray-700">
              <p className={`${
                item.isAlert 
                  ? 'text-orange-700 dark:text-orange-300' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}>
                {item.a[language]}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;