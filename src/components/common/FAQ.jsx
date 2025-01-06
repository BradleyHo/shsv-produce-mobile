import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = ({ language }) => {
  const faqs = {
    en: [
      {
        q: "What is Produce Mobile?",
        a: "Produce Mobile is a Second Harvest program that brings 25-35 pounds of fresh fruits and vegetables to your neighborhood every month. It's completely free and available to anyone in need."
      },
      {
        q: "Do I need to bring anything?",
        a: "We recommend bringing your own bags or boxes to carry the produce. No ID or documentation is required."
      },
      {
        q: "What if I can't make it to my nearest location?",
        a: "You can visit any location that's convenient for you. Use our map to find alternative locations and times."
      },
      {
        q: "Is there a limit to how much I can receive?",
        a: "Each household typically receives 25-35 pounds of fresh produce, subject to availability."
      },
      {
        q: "What if I need additional food assistance?",
        a: "Second Harvest offers various other food assistance programs. Visit our main website or call 1-800-984-3663 for more information."
      }
    ],
    es: [
      // Spanish translations...
    ],
    // Other languages...
  };

  const [openIndex, setOpenIndex] = React.useState(null);

  return (
    <div className="space-y-4">
      {faqs[language]?.map((faq, index) => (
        <div
          key={index}
          className="border dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-medium">{faq.q}</span>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {openIndex === index && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;