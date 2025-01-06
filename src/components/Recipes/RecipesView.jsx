import React from 'react';
import { Carrot, Apple, Leaf } from 'lucide-react';

const RecipesView = ({ language }) => {
  // Simple recipes using common produce items
  const recipes = [
    {
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      title: {
        en: 'Quick Vegetable Soup',
        es: 'Sopa Rápida de Verduras'
      },
      ingredients: {
        en: ['Carrots', 'Celery', 'Potatoes', 'Onions'],
        es: ['Zanahorias', 'Apio', 'Papas', 'Cebollas']
      },
      instructions: {
        en: 'Chop vegetables, simmer in broth for 20 minutes until tender.',
        es: 'Cortar las verduras, cocinar en caldo por 20 minutos hasta que estén tiernas.'
      }
    },
    {
      icon: <Apple className="w-6 h-6 text-red-500" />,
      title: {
        en: 'Fresh Fruit Salad',
        es: 'Ensalada de Frutas Fresca'
      },
      ingredients: {
        en: ['Apples', 'Oranges', 'Bananas'],
        es: ['Manzanas', 'Naranjas', 'Plátanos']
      },
      instructions: {
        en: 'Cut fruits into bite-sized pieces, mix and serve.',
        es: 'Cortar las frutas en trozos pequeños, mezclar y servir.'
      }
    }
  ];

  // Tips for produce storage
  const storageTips = [
    {
      icon: <Carrot className="w-6 h-6 text-orange-500" />,
      title: {
        en: 'Storage Tips',
        es: 'Consejos de Almacenamiento'
      },
      tips: [
        {
          en: 'Keep potatoes in a cool, dark place',
          es: 'Guarde las papas en un lugar fresco y oscuro'
        },
        {
          en: 'Store leafy greens with a paper towel',
          es: 'Guarde las verduras con una toalla de papel'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 p-4">
      {/* Recipe Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {recipes.map((recipe, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              {recipe.icon}
              <h3 className="text-lg font-semibold">{recipe.title[language]}</h3>
            </div>
            <ul className="list-disc list-inside mb-4 text-gray-600 dark:text-gray-300">
              {recipe.ingredients[language].map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
            <p className="text-gray-700 dark:text-gray-200">{recipe.instructions[language]}</p>
          </div>
        ))}
      </div>

      {/* Storage Tips */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          {storageTips[0].icon}
          <h3 className="text-lg font-semibold">{storageTips[0].title[language]}</h3>
        </div>
        <ul className="space-y-2">
          {storageTips[0].tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
              <span className="text-gray-700 dark:text-gray-200">{tip[language]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipesView;