import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Smartphone, Tv, Shirt, Home, BookOpen } from 'lucide-react';

export const CategoryNav: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useApp();

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'elektronika': return <Smartphone className="w-4 h-4" />;
      case 'maishiy-texnika': return <Tv className="w-4 h-4" />;
      case 'kiyim-kechak': return <Shirt className="w-4 h-4" />;
      case 'gozallik': return <Sparkles className="w-4 h-4" />;
      case 'uy-rozgor': return <Home className="w-4 h-4" />;
      case 'kitoblar': return <BookOpen className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-3 sm:mt-6 font-sans">
      <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto pb-1.5 sm:pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
            selectedCategory === null
              ? 'bg-uzum-primary text-white shadow-md shadow-uzum-primary/20 scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Barchasi</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
              selectedCategory === cat.name
                ? 'bg-uzum-primary text-white shadow-md shadow-uzum-primary/20 scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
            }`}
          >
            {getIcon(cat.slug)}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
