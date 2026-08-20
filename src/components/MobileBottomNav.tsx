import React from 'react';
import { Home, Grid, ShoppingBag, Heart, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MobileBottomNavProps {
  onGoHome: () => void;
  onToggleCatalog: () => void;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenAuth: () => void;
  onOpenOrders: () => void;
  onOpenAdmin: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onGoHome,
  onToggleCatalog,
  onOpenCart,
  onOpenFavorites,
  onOpenAuth,
  onOpenOrders,
  onOpenAdmin
}) => {
  const { user, cart, favorites } = useApp();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-1.5 px-3 sm:hidden shadow-lg font-sans">
      <div className="flex items-center justify-around">
        {/* Asosiy (Home) */}
        <button
          onClick={onGoHome}
          className="flex flex-col items-center justify-center space-y-0.5 text-gray-600 hover:text-uzum-primary active:scale-95 transition-all w-14"
        >
          <Home className="w-5 h-5 text-gray-700 hover:text-uzum-primary" />
          <span className="text-[10px] font-bold tracking-tight">Asosiy</span>
        </button>

        {/* Katalog */}
        <button
          onClick={onToggleCatalog}
          className="flex flex-col items-center justify-center space-y-0.5 text-gray-600 hover:text-uzum-primary active:scale-95 transition-all w-14"
        >
          <Grid className="w-5 h-5 text-gray-700 hover:text-uzum-primary" />
          <span className="text-[10px] font-bold tracking-tight">Katalog</span>
        </button>

        {/* Savat */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center space-y-0.5 text-gray-600 hover:text-uzum-primary active:scale-95 transition-all relative w-14"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-gray-700 hover:text-uzum-primary" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-uzum-primary text-white text-[9px] font-black px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-xs">
                {cartItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight">Savat</span>
        </button>

        {/* Sevimlilar */}
        <button
          onClick={onOpenFavorites}
          className="flex flex-col items-center justify-center space-y-0.5 text-gray-600 hover:text-uzum-primary active:scale-95 transition-all relative w-14"
        >
          <div className="relative">
            <Heart className="w-5 h-5 text-gray-700 hover:text-uzum-red" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-uzum-red text-white text-[9px] font-black px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-xs">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight">Saralangan</span>
        </button>

        {/* Profil / Admin / Kirish */}
        {user ? (
          user.role === 'admin' ? (
            <button
              onClick={onOpenAdmin}
              className="flex flex-col items-center justify-center space-y-0.5 text-purple-700 active:scale-95 transition-all w-14"
            >
              <ShieldCheck className="w-5 h-5 text-purple-700 animate-pulse" />
              <span className="text-[10px] font-black tracking-tight text-purple-700">Admin</span>
            </button>
          ) : (
            <button
              onClick={onOpenOrders}
              className="flex flex-col items-center justify-center space-y-0.5 text-gray-600 hover:text-uzum-primary active:scale-95 transition-all w-14"
            >
              <div className="w-5 h-5 rounded-full bg-uzum-primary text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-[10px] font-bold tracking-tight max-w-[50px] truncate">{user.name}</span>
            </button>
          )
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex flex-col items-center justify-center space-y-0.5 text-gray-600 hover:text-uzum-primary active:scale-95 transition-all w-14"
          >
            <UserIcon className="w-5 h-5 text-gray-700 hover:text-uzum-primary" />
            <span className="text-[10px] font-bold tracking-tight">Kirish</span>
          </button>
        )}
      </div>
    </div>
  );
};
