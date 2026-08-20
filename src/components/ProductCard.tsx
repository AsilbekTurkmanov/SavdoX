import React from 'react';
import { Heart, Star, ShoppingBag, Zap } from 'lucide-react';
import type { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " so'm";
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { favorites, toggleFavorite, addToCart } = useApp();

  const isFavorite = favorites.includes(product.id);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-2 sm:p-3 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group relative font-sans">
      {/* Top badges & Favorite heart */}
      <div className="relative aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden bg-gray-50 mb-2 sm:mb-3 cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-1.5 left-1.5 flex flex-col space-y-1 z-10">
          {product.express && (
            <span className="badge-express text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-md flex items-center space-x-0.5 sm:space-x-1 shadow-xs">
              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white" />
              <span>1 KUNDA</span>
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-uzum-red text-white text-[9px] sm:text-[10px] font-black px-1 sm:px-1.5 py-0.5 rounded-md shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.isHit && (
            <span className="bg-amber-500 text-white text-[9px] sm:text-[10px] font-black px-1 sm:px-1.5 py-0.5 rounded-md shadow-xs">
              XIT
            </span>
          )}
        </div>

        {/* Favorite Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-1.5 right-1.5 p-1.5 sm:p-2 rounded-full bg-white/85 backdrop-blur-xs hover:bg-white text-gray-400 hover:text-uzum-red transition-all shadow-xs z-10"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${isFavorite ? 'fill-uzum-red text-uzum-red' : ''}`} />
        </button>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="text-[11px] sm:text-sm font-medium text-uzum-text line-clamp-2 hover:text-uzum-primary cursor-pointer transition-colors leading-snug mb-1"
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 text-[10px] sm:text-xs text-gray-500 mb-1.5">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-gray-800">{product.rating}</span>
            <span className="truncate">({product.reviewsCount})</span>
          </div>

          {/* Monthly Installment Pill */}
          <div className="bg-uzum-yellow/40 border border-uzum-yellow/80 px-1.5 sm:px-2 py-0.5 rounded-md inline-block text-[10px] sm:text-[11px] font-bold text-uzum-text mb-2 sm:mb-3">
            {formatPrice(product.installmentPrice)} / oy
          </div>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-1.5 sm:pt-2 border-t border-gray-100 flex items-end justify-between gap-1">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] sm:text-[11px] text-gray-400 line-through leading-none mb-0.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xs sm:text-base font-black text-uzum-text leading-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white border border-uzum-primary text-uzum-primary hover:bg-uzum-primary hover:text-white flex items-center justify-center transition-colors shadow-xs shrink-0 active:scale-90"
            title="Savatga qo'shish"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
