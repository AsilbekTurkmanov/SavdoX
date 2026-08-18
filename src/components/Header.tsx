import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  MapPin, 
  Grid, 
  ShieldCheck, 
  LogOut, 
  ChevronDown,
  Sparkles,
  Package,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onOpenAuth: () => void;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onOpenFavorites: () => void;
  onOpenOrders: () => void;
}

const CITIES = ['Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Namangan', "Farg'ona", 'Qarshi', 'Nukus', 'Xiva'];

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onOpenCart,
  onOpenAdmin,
  onOpenFavorites,
  onOpenOrders
}) => {
  const { 
    user, 
    logout, 
    cart, 
    favorites, 
    categories, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    selectedCity,
    setSelectedCity
  } = useApp();

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100 font-sans">
      {/* Top Bar */}
      <div className="bg-uzum-bg text-xs border-b border-gray-200/60 py-1.5 px-4 text-uzum-muted">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* City selector */}
            <div className="relative">
              <button 
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center space-x-1 hover:text-uzum-primary transition-colors font-medium text-uzum-text"
              >
                <MapPin className="w-3.5 h-3.5 text-uzum-primary" />
                <span>Shahar: <strong className="underline decoration-dotted">{selectedCity}</strong></span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {isCityDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-fade-in">
                  {CITIES.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-uzum-primary-light hover:text-uzum-primary transition-colors ${selectedCity === city ? 'font-bold text-uzum-primary bg-uzum-primary-light/50' : 'text-gray-700'}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="hidden md:inline-block text-gray-300">|</span>
            <div className="hidden md:flex items-center space-x-1 text-gray-600">
              <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold">1 KUNDA</span>
              <span>Topshirish punktlari va kurerlik yetkazib berish</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-block text-gray-500">
              Savolingiz bormi? <a href="tel:+998991992012" className="hover:text-uzum-primary font-bold text-gray-800">+998 99 199-20-12</a>
            </span>
            <a 
              href="https://t.me/htpAsilbek" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sky-600 hover:text-sky-700 font-bold bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded text-[11px] transition-colors"
              title="Telegram orqali bog'lanish"
            >
              <Send className="w-3 h-3 text-sky-600" />
              <span>@htpAsilbek</span>
            </a>
            <span className="bg-uzum-yellow/30 text-uzum-text px-2 py-0.5 rounded font-semibold text-[11px]">
              SavdoX Nasiya 0-0-12
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button 
          onClick={() => {
            setSelectedCategory(null);
            setSearchQuery('');
          }}
          className="flex items-center space-x-2 focus:outline-none group text-left shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-uzum-primary text-white flex items-center justify-center font-black text-xl shadow-md shadow-uzum-primary/20 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-uzum-primary leading-none">
              Savdo<span className="text-uzum-text text-xl font-bold">X</span>
            </span>
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
              Rasmiy Platformasi
            </span>
          </div>
        </button>

        {/* Catalog Button */}
        <div className="relative shrink-0">
          <button
            onClick={() => setIsCatalogOpen(!isCatalogOpen)}
            className="flex items-center space-x-2 bg-uzum-primary-light text-uzum-primary hover:bg-uzum-primary hover:text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
          >
            <Grid className="w-4 h-4" />
            <span>Katalog</span>
          </button>

          {/* Catalog Dropdown */}
          {isCatalogOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-fade-in">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setIsCatalogOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${selectedCategory === null ? 'bg-uzum-primary text-white' : 'hover:bg-uzum-bg text-gray-800'}`}
              >
                <span>Barcha kategoriyalar</span>
                <Sparkles className="w-4 h-4" />
              </button>
              <div className="h-px bg-gray-100 my-1"></div>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setIsCatalogOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${selectedCategory === cat.name ? 'bg-uzum-primary-light text-uzum-primary font-bold' : 'hover:bg-uzum-bg text-gray-700'}`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mahsulotlar va turkumlar bo'yicha qidiruv..."
              className="w-full bg-uzum-bg border-2 border-transparent focus:border-uzum-primary focus:bg-white text-uzum-text placeholder-gray-400 text-sm rounded-xl py-2.5 pl-4 pr-10 outline-none transition-all duration-200"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-400 hover:text-gray-600 text-xs bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            ) : (
              <Search className="absolute right-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          {/* Admin Fast Button if Admin */}
          {user?.role === 'admin' && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 px-3 py-2 rounded-xl text-xs font-bold shadow-sm transition-all"
              title="Admin Panelga Kirish"
            >
              <ShieldCheck className="w-4 h-4 text-uzum-yellow animate-pulse" />
              <span className="hidden lg:inline">Admin Panel</span>
            </button>
          )}

          {/* User Profile / Auth */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:bg-uzum-bg px-3 py-2 rounded-xl text-uzum-text font-medium text-sm transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-uzum-primary text-white font-bold text-xs flex items-center justify-center shadow">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline max-w-[100px] truncate text-xs font-bold">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400">Kirilgan hisob:</p>
                      <p className="text-sm font-bold text-uzum-text truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.phone || user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                          ADMINISTRATOR
                        </span>
                      )}
                    </div>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenAdmin();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-uzum-primary hover:bg-uzum-primary-light flex items-center space-x-2 transition-colors my-1"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Admin Boshqaruv Paneli</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenOrders();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-uzum-bg flex items-center space-x-2 transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      <span>Mening buyurtmalarim</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Chiqish</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 hover:bg-uzum-bg text-uzum-text px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-colors"
              >
                <UserIcon className="w-4 h-4 text-gray-500" />
                <span>Kirish</span>
              </button>
            )}
          </div>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-xl hover:bg-uzum-bg text-gray-700 transition-colors"
            title="Sevimlilar"
          >
            <Heart className="w-5 h-5 text-gray-600 hover:text-uzum-red transition-colors" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-uzum-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center space-x-2 bg-uzum-yellow hover:bg-uzum-yellow-hover text-uzum-text px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-uzum-text" />
            <span className="hidden sm:inline">Savat</span>
            {cartItemsCount > 0 && (
              <span className="bg-uzum-primary text-white text-xs font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
