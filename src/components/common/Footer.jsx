import React from 'react';

const Footer = ({ language }) => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <a 
              href="https://github.com/BradleyHo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              Created by Bradley Ho
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Last Updated: January 5, 2025
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://www.shfb.org/get-food/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              {language === 'en' ? 'More Food Resources' : 
               language === 'es' ? 'Más Recursos de Alimentos' :
               language === 'zh' ? '更多食物资源' :
               language === 'zh-tw' ? '更多食物資源' :
               language === 'tl' ? 'Karagdagang Mapagkukunan ng Pagkain' :
               language === 'vi' ? 'Thêm Nguồn Thực Phẩm' :
               language === 'ko' ? '더 많은 식품 자원' : 'More Food Resources'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;