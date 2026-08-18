import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BannerSlider } from './components/BannerSlider';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { AdminPanel } from './components/AdminPanel';
import { FavoritesView } from './components/FavoritesView';
import { OrdersView } from './components/OrdersView';
import type { Product } from './types';
import { Sparkles, ArrowUpDown, Send } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    products, 
    searchQuery, 
    selectedCategory, 
    user 
  } = useApp();

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // Sorting option
  const [sortBy, setSortBy] = useState<'popular' | 'low-price' | 'high-price' | 'rating'>('popular');

  // Filter products by search & category
  const filteredProducts = products.filter(p => {
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === null || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-price') return a.price - b.price;
    if (sortBy === 'high-price') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-uzum-bg font-sans flex flex-col justify-between text-uzum-text antialiased">
      {/* Header */}
      <Header
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Banner Slider */}
        <BannerSlider />

        {/* Category Pills Navigation */}
        <CategoryNav />

        {/* Catalog Section */}
        <div className="max-w-7xl mx-auto px-4 mt-8">
          {/* Header Row: Category title, Result count, Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-uzum-text tracking-tight flex items-center space-x-2">
                <span>{selectedCategory ? selectedCategory : 'Ommabop Mahsulotlar'}</span>
                {searchQuery && (
                  <span className="text-sm font-medium text-gray-500">
                    ("{searchQuery}" bo'yicha Natijalar)
                  </span>
                )}
              </h2>
              <p className="text-xs text-uzum-muted mt-0.5">
                Topilgan mahsulotlar soni: <strong className="text-uzum-primary font-bold">{sortedProducts.length} ta</strong>
              </p>
            </div>

            {/* Sorting controls */}
            <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-2xl border border-gray-200/80 shadow-xs">
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-bold text-gray-600">Saralash:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-uzum-primary outline-none cursor-pointer"
              >
                <option value="popular">Ommabopligi bo'yicha</option>
                <option value="low-price">Oldin arzonlari</option>
                <option value="high-price">Oldin qimmatlari</option>
                <option value="rating">Reytingi balandlari</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-md mx-auto my-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-purple-100 text-uzum-primary flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-uzum-text">Mahsulot topilmadi</h3>
              <p className="text-xs text-gray-400">Qidiruv so'zini o'zgartirib ko'ring yoki boshqa kategoriyani tanlang.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-12 pb-8 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-uzum-primary text-white flex items-center justify-center font-black text-lg">
                S
              </div>
              <span className="text-lg font-black text-uzum-primary">
                Savdo <span className="text-uzum-text">X</span>
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-3">
              SavdoX — O'zbekistondagi eng yirik zamonaviy internet-do'kon platformasi. Barcha turdagi mahsulotlar 1 kunda yetkaziladi.
            </p>
            <div className="bg-uzum-yellow/40 p-2.5 rounded-xl border border-uzum-yellow text-uzum-text font-bold text-[11px]">
              SavdoX Nasiya 0-0-12 muddatli to'lov
            </div>
          </div>

          <div>
            <h4 className="font-black text-sm text-uzum-text mb-3">Biz haqimizda</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-uzum-primary transition-colors">Topshirish punktlari</a></li>
              <li><a href="#" className="hover:text-uzum-primary transition-colors">Vakansiyalar</a></li>
              <li><a href="#" className="hover:text-uzum-primary transition-colors">SavdoX Nasiya haqida</a></li>
              <li><a href="#" className="hover:text-uzum-primary transition-colors">Kafolat va qaytarish</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sm text-uzum-text mb-3">Foydalanuvchilarga</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-uzum-primary transition-colors">Biz bilan bog'lanish</a></li>
              <li><a href="#" className="hover:text-uzum-primary transition-colors">Savol-Javoblar</a></li>
              <li><a href="#" className="hover:text-uzum-primary transition-colors">Sotuvchi bo'lish</a></li>
              <li><a href="#" className="hover:text-uzum-primary transition-colors">SavdoX Admin paneli</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-sm text-uzum-text mb-3">Qo'llab-quvvatlash</h4>
            <a 
              href="tel:+998991992012" 
              className="font-bold text-sm text-uzum-primary hover:underline mb-1 block"
              title="Telefon qilish"
            >
              +998 99 199-20-12
            </a>
            <p className="text-gray-400 text-xs mb-3">Har kuni 08:00 dan 22:00 gacha</p>

            <a 
              href="https://t.me/htpAsilbek" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 p-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl border border-sky-200 transition-colors font-bold text-xs shadow-xs"
              title="Telegram orqali bog'lanish"
            >
              <Send className="w-4 h-4 text-sky-600" />
              <span>Telegram: @htpAsilbek</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-gray-400 text-[11px]">
          <p>© 2025 SavdoX Platformasi. Barcha huquqlar himoyalangan.</p>
          <p>Yaratuvchi: Asilbek Turkmanov</p>
        </div>
      </footer>

      {/* ALL MODALS & DRAWERS */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={() => setIsOrdersOpen(true)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAdminLoginSuccess={() => setIsAdminOpen(true)}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <FavoritesView
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      <OrdersView
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
