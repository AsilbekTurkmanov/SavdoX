import React from 'react';
import { X, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

interface FavoritesViewProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const { products, favorites } = useApp();

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden relative">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-uzum-red fill-uzum-red" />
            <h2 className="font-bold text-lg text-uzum-text">Sevimlilar ({favoriteProducts.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-bold text-gray-700 text-base">Sevimlilar ro'yxati bo'sh</h3>
              <p className="text-xs text-gray-400">Mahsulotlardagi yurakcha tugmasini bosish orqali saralashingiz mumkin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {favoriteProducts.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onSelect={(prod) => {
                    onClose();
                    onSelectProduct(prod);
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
