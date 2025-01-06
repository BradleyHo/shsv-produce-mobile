import React from 'react';
import { Carrot, Cherry, ChefHat } from 'lucide-react';

const recipes = {
  smoothies: [
    {
      title: {
        en: 'Green Energy Smoothie',
        es: 'Batido de Energía Verde',
        zh: '绿色能量冰沙',
        'zh-tw': '綠色能量冰沙',
        tl: 'Berdeng Smoothie ng Enerhiya',
        vi: 'Sinh tố Xanh Tăng Lực',
        ko: '그린 에너지 스무디'
      },
      ingredients: ['Spinach', 'Apple', 'Banana', 'Orange'],
      instructions: {
        en: 'Blend all ingredients with water or ice until smooth',
        es: 'Mezcla todos los ingredientes con agua o hielo hasta que quede suave',
        // ... other languages
      }
    },
    {
      title: {
        en: 'Berry Blast Smoothie',
        es: 'Batido Explosión de Bayas',
        // ... other languages
      },
      ingredients: ['Mixed Berries', 'Banana', 'Yogurt'],
      instructions: {
        en: 'Blend berries, banana, and yogurt until creamy',
        es: 'Mezcla las bayas, el plátano y el yogur hasta que quede cremoso',
        // ... other languages
      }
    }
  ],
  soups: [
    {
      title: {
        en: 'Simple Vegetable Soup',
        es: 'Sopa Simple de Verduras',
        // ... other languages
      },
      ingredients: ['Carrots', 'Celery', 'Onion', 'Potato'],
      instructions: {
        en: 'Simmer vegetables in broth until tender',
        es: 'Cocina las verduras en caldo hasta que estén tiernas',
        // ... other languages
      }
    },
    {
      title: {
        en: 'Creamy Carrot Soup',
        es: 'Sopa Cremosa de Zanahoria',
        // ... other languages
      },
      ingredients: ['Carrots', 'Onion', 'Ginger', 'Coconut Milk'],
      instructions: {
        en: 'Cook carrots and onions, blend with coconut milk',
        es: 'Cocina zanahorias y cebolla, licúa con leche de coco',
        // ... other languages
      }
    }
  ]
};

const RecipeSuggestions = ({ language = 'en' }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 p-4">
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-orange-600">
          <Cherry size={24} />
          Smoothies
        </h3>
        <div className="space-y-4">
          {recipes.smoothies.map((recipe, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-lg">{recipe.title[language]}</h4>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <p className="font-medium">Ingredients:</p>
                <ul className="list-disc list-inside ml-2">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <p className="mt-2">{recipe.instructions[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-orange-600">
          <ChefHat size={24} />
          Soups
        </h3>
        <div className="space-y-4">
          {recipes.soups.map((recipe, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-lg">{recipe.title[language]}</h4>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <p className="font-medium">Ingredients:</p>
                <ul className="list-disc list-inside ml-2">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <p className="mt-2">{recipe.instructions[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSuggestions;