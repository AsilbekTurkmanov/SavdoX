import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Trash2, 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Search,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Product } from '../types';
import { formatPrice } from './ProductCard';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_IMAGES = [
  { label: 'Smartfon', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80' },
  { label: 'Noutbuk', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Televizor', url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Quloqchin', url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kiyim', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Kitob', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { 
    products, 
    categories, 
    orders, 
    addProduct, 
    deleteProduct, 
    updateProduct,
    updateOrderStatus 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'add' | 'list' | 'orders' | 'stats'>('add');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // New Product Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Elektronika');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [express, setExpress] = useState(true);
  const [isHit, setIsHit] = useState(false);
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [description, setDescription] = useState('');
  const [specsText, setSpecsText] = useState('Ekran: 6.5 dyuym\nKafolat: 1 yil SavdoX');

  // Edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !image) return;

    const numPrice = Number(price);
    const numOrig = originalPrice ? Number(originalPrice) : undefined;
    const numStock = Number(stock) || 5;

    // Auto calculate 12-month installment rate
    const installmentPrice = Math.round((numPrice * 1.18) / 12);

    // Parse spec lines into record
    const specsRecord: Record<string, string> = {};
    specsText.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        specsRecord[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    });

    addProduct({
      title,
      category,
      price: numPrice,
      originalPrice: numOrig,
      rating: 5.0,
      reviewsCount: 1,
      installmentPrice,
      express,
      isHit,
      stock: numStock,
      image,
      description: description || 'SavdoX platformasida kafolatlangan yuqori sifatli mahsulot.',
      specs: specsRecord
    });

    showNotification(`"${title}" mahsuloti muvaffaqiyatli qo'shildi!`);

    // Reset form
    setTitle('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
  };

  const handleDeleteProduct = (id: string, prodTitle: string) => {
    if (window.confirm(`Haqiqatdan ham "${prodTitle}" buyumini katalogdan o'chirmoqchimisiz?`)) {
      deleteProduct(id);
      showNotification(`"${prodTitle}" katalogdan o'chirildi.`);
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-uzum-primary to-indigo-900 text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <ShieldCheck className="w-6 h-6 text-uzum-yellow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black tracking-tight">Admin Panel</h2>
                <a 
                  href="tel:+998991992012"
                  className="bg-uzum-yellow hover:opacity-90 text-uzum-text text-[10px] font-black px-2 py-0.5 rounded-full uppercase transition-opacity"
                  title="Telefon qilish"
                >
                  Asilbek Turkmanov (+998 99 199-20-12)
                </a>
              </div>
              <p className="text-xs text-purple-200">SavdoX mahsulot va buyurtmalar boshqaruvi</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications Alert */}
        {notification && (
          <div className="bg-green-600 text-white px-4 py-2.5 text-xs font-bold flex items-center space-x-2 animate-fade-in shrink-0">
            <CheckCircle className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-4 pt-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all shrink-0 ${activeTab === 'add' ? 'border-uzum-primary text-uzum-primary bg-white rounded-t-xl' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yangi buyum qo'shish</span>
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all shrink-0 ${activeTab === 'list' ? 'border-uzum-primary text-uzum-primary bg-white rounded-t-xl' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            <Package className="w-4 h-4" />
            <span>Barcha buyumlar & O'chirish ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all shrink-0 ${activeTab === 'orders' ? 'border-uzum-primary text-uzum-primary bg-white rounded-t-xl' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buyurtmalar ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all shrink-0 ${activeTab === 'stats' ? 'border-uzum-primary text-uzum-primary bg-white rounded-t-xl' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Analitika</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* TAB 1: ADD PRODUCT */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddProduct} className="max-w-3xl space-y-6 text-xs">
              <div className="bg-uzum-bg p-4 rounded-2xl border border-gray-200 space-y-4">
                <h3 className="font-black text-sm text-uzum-text flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-uzum-primary" />
                  <span>Mahsulot ma'lumotlari</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-gray-700 block mb-1">Buyum nomi *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Masalan: Smartfon Xiaomi Redmi Note 13 Pro 8/256GB"
                      className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Kategoriya</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-bold"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Omborda mavjud miqdor (ta)</label>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Narxi (so'mda) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Masalan: 3200000"
                      className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-bold text-uzum-primary"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Eski / Chegirmasiz narxi (ixtiyoriy)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Masalan: 3800000"
                      className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={express}
                      onChange={(e) => setExpress(e.target.checked)}
                      className="w-4 h-4 rounded text-uzum-primary focus:ring-uzum-primary"
                    />
                    <span className="font-bold text-gray-800">1 kunda yetkazib berish (Express)</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isHit}
                      onChange={(e) => setIsHit(e.target.checked)}
                      className="w-4 h-4 rounded text-uzum-primary focus:ring-uzum-primary"
                    />
                    <span className="font-bold text-gray-800">Xit Sotuv nishoni</span>
                  </label>
                </div>
              </div>

              {/* Image URL / Presets */}
              <div className="bg-uzum-bg p-4 rounded-2xl border border-gray-200 space-y-3">
                <label className="font-bold text-gray-700 block">Rasm havolasi (URL)</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-mono text-xs"
                />

                <div className="flex items-center space-x-2 overflow-x-auto pt-1">
                  <span className="text-gray-500 font-medium shrink-0">Tayyor rasm shablonlari:</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImage(preset.url)}
                      className="bg-white border border-gray-200 px-2.5 py-1 rounded-lg hover:border-uzum-primary text-gray-700 shrink-0 font-medium"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description & Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Mahsulot tavsifi</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mahsulot haqida batafsil ma'lumot..."
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Xususiyatlar (har bir qator: kalit: qiymat)</label>
                  <textarea
                    rows={4}
                    value={specsText}
                    onChange={(e) => setSpecsText(e.target.value)}
                    placeholder="Ekran: OLED&#10;Kafolat: 1 yil"
                    className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-mono text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-uzum-yellow hover:bg-uzum-yellow-hover text-uzum-text font-black py-3.5 px-8 rounded-2xl shadow-lg transition-all text-sm flex items-center space-x-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Katalogga buyum qo'shish</span>
              </button>
            </form>
          )}

          {/* TAB 2: LIST PRODUCTS & DELETE */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buyumlarni qidirish..."
                    className="w-full bg-uzum-bg border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-uzum-primary font-medium"
                  />
                </div>
                <span className="text-xs font-bold text-gray-500">Jami buyumlar: {filteredProducts.length} ta</span>
              </div>

              <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden bg-white">
                {filteredProducts.map(p => (
                  <div key={p.id} className="p-3 sm:p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-14 h-14 object-cover rounded-xl bg-gray-100 shrink-0 border border-gray-200"
                      />
                      <div className="min-w-0">
                        <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                          {p.category}
                        </span>
                        <h4 className="text-xs font-bold text-uzum-text truncate max-w-md">{p.title}</h4>
                        <div className="flex items-center space-x-3 text-[11px] text-gray-500 mt-0.5">
                          <span className="font-black text-uzum-primary">{formatPrice(p.price)}</span>
                          <span>•</span>
                          <span>Omborda: <strong>{p.stock} ta</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {/* Delete button */}
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.title)}
                        className="flex items-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                        title="Buyumni o'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">O'chirish</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Hozircha hech qanday buyurtmalar tushmadi.</p>
                </div>
              ) : (
                orders.map(o => (
                  <div key={o.id} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-2 gap-2 text-xs">
                      <div>
                        <span className="font-black text-uzum-primary text-sm">{o.id}</span>
                        <span className="text-gray-400 ml-2">{o.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-600">Holati:</span>
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                          className="bg-uzum-bg border border-gray-300 rounded-lg px-2 py-1 font-bold text-xs outline-none focus:border-uzum-primary"
                        >
                          <option value="Tayyorlanmoqda">Tayyorlanmoqda</option>
                          <option value="Yetkazilmoqda">Yetkazilmoqda</option>
                          <option value="Yetkazildi">Yetkazildi</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs space-y-1 text-gray-700">
                      <p><strong>Mijoz:</strong> {o.customerName} ({o.customerPhone})</p>
                      <p><strong>Manzil:</strong> {o.deliveryAddress}</p>
                      <p><strong>To'lov usuli:</strong> {o.paymentMethod}</p>
                    </div>

                    <div className="bg-uzum-bg p-3 rounded-xl space-y-2">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <img src={item.productImage} alt="" className="w-8 h-8 rounded bg-white object-cover" />
                            <span className="font-medium text-gray-800">{item.productTitle} x {item.quantity}</span>
                          </div>
                          <span className="font-bold text-uzum-text">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-gray-200 flex justify-between font-black text-xs text-uzum-text">
                        <span>Jami summa:</span>
                        <span className="text-uzum-primary">{formatPrice(o.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: STATS */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl">
                <span className="text-xs text-purple-700 font-bold block mb-1">Jami Buyumlar Soni</span>
                <span className="text-3xl font-black text-purple-900">{products.length} ta</span>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                <span className="text-xs text-amber-700 font-bold block mb-1">Bajarilgan Buyurtmalar</span>
                <span className="text-3xl font-black text-amber-900">{orders.length} ta</span>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-2xl">
                <span className="text-xs text-green-700 font-bold block mb-1">Jami Daromad</span>
                <span className="text-xl sm:text-2xl font-black text-green-900">{formatPrice(totalRevenue)}</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                <span className="text-xs text-blue-700 font-bold block mb-1">Boshqaruvchi Admin</span>
                <span className="text-sm font-black text-blue-900 block mt-1">Asilbek Turkmanov</span>
                <a href="tel:+998991992012" className="text-[11px] text-blue-700 font-bold hover:underline block mt-1">+998 99 199-20-12</a>
                <a href="https://t.me/htpAsilbek" target="_blank" rel="noopener noreferrer" className="text-[11px] text-sky-600 font-bold hover:underline block mt-0.5">Telegram: @htpAsilbek</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
