import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Calculator,
  MessageSquare
} from 'lucide-react';
import type { Product } from '../types';
import { useApp } from '../context/AppContext';
import { formatPrice } from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCart
}) => {
  if (!product) return null;

  const { favorites, toggleFavorite, addToCart } = useApp();
  const isFav = favorites.includes(product.id);

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [installmentMonths, setInstallmentMonths] = useState<3 | 6 | 12 | 24>(12);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState([
    { id: '1', name: 'Jasur Bek', rating: 5, date: '12 Yanvar 2025', comment: 'Juda tez va sifatli yetib keldi. Mahsulot rasmdegidek original!' },
    { id: '2', name: 'Malika R.', rating: 5, date: '3 Fevral 2025', comment: 'Uzum marketdan har doim nasiyaga olaman. Juda qulay va halol hal etishadi.' }
  ]);

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Calculate installment monthly price based on chosen months
  const calculateMonthly = (months: number) => {
    const totalWithMarkup = product.price * (1 + (months === 3 ? 0.05 : months === 6 ? 0.1 : months === 12 ? 0.18 : 0.28));
    return Math.round(totalWithMarkup / months);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    onOpenCart();
    onClose();
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    setReviewsList([
      {
        id: Date.now().toString(),
        name: 'Siz (Foydalanuvchi)',
        rating: newReviewRating,
        date: 'Bugun',
        comment: newReviewText.trim()
      },
      ...reviewsList
    ]);
    setNewReviewText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Product Gallery */}
          <div className="flex flex-col space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-uzum-red transition-all shadow-md"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-uzum-red text-uzum-red' : ''}`} />
              </button>
            </div>

            {galleryImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${selectedImage === img ? 'border-uzum-primary scale-105 shadow-md' : 'border-gray-200 opacity-70'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Delivery Guarantees */}
            <div className="bg-uzum-bg p-4 rounded-2xl space-y-2.5 text-xs text-gray-700">
              <div className="flex items-center space-x-2.5">
                <Truck className="w-4 h-4 text-uzum-primary shrink-0" />
                <span><strong>1 KUNDA</strong> Uzum Topsirish punktiga bepul yetkazish</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Kafolat va asl mahsulot sifati</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>10 kun ichida qaytarib berish kafolati</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Title */}
              <div className="flex items-center space-x-2 text-xs text-uzum-muted mb-1">
                <span>{product.category}</span>
                <span>•</span>
                <span>Kodi: {product.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-uzum-text leading-snug mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 text-xs mb-4">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-black text-gray-900 ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 font-medium">{product.reviewsCount} ta baho va sharhlar</span>
              </div>

              {/* Colors selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="text-xs font-bold text-gray-700 block mb-2">
                    Rang: <span className="text-uzum-primary font-bold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${selectedColor === color ? 'border-uzum-primary bg-uzum-primary-light text-uzum-primary' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <label className="text-xs font-bold text-gray-700 block mb-2">
                    O'lcham: <span className="text-uzum-primary font-bold">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-xl text-xs font-bold border flex items-center justify-center transition-all ${selectedSize === size ? 'border-uzum-primary bg-uzum-primary text-white shadow-md' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price box */}
              <div className="bg-uzum-bg p-4 rounded-2xl mb-4 border border-gray-200/60">
                <div className="text-xs text-gray-500 mb-0.5">Narxi:</div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-2xl sm:text-3xl font-black text-uzum-text">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Installment calculator */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-2">
                    <span className="flex items-center space-x-1">
                      <Calculator className="w-3.5 h-3.5 text-uzum-primary" />
                      <span>Uzum Nasiya Muddatli to'lov:</span>
                    </span>
                    <span className="text-uzum-primary font-black text-sm">
                      {formatPrice(calculateMonthly(installmentMonths))} / oy
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {([3, 6, 12, 24] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => setInstallmentMonths(m)}
                        className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${installmentMonths === m ? 'bg-uzum-yellow text-uzum-text border-uzum-yellow shadow' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                      >
                        {m} oy
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity adjustment */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-xs font-bold text-gray-700">Miqdori:</span>
                <div className="flex items-center space-x-2 border border-gray-200 rounded-xl p-1 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500">Omborda: <strong>{product.stock} ta mavjud</strong></span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-uzum-yellow hover:bg-uzum-yellow-hover text-uzum-text font-black py-3.5 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95 text-sm sm:text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Savatga qo'shish</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product, quantity, selectedColor, selectedSize);
                  onOpenCart();
                  onClose();
                }}
                className="flex-1 bg-uzum-primary hover:bg-uzum-primary-hover text-white font-black py-3.5 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95 text-sm sm:text-base"
              >
                <Zap className="w-5 h-5 fill-uzum-yellow text-uzum-yellow" />
                <span>1 bosishda xarid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs: Description, Specs, Reviews */}
        <div className="px-4 sm:px-8 pb-8 border-t border-gray-100 pt-6">
          <div className="flex border-b border-gray-200 mb-6 space-x-8">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'desc' ? 'text-uzum-primary border-b-2 border-uzum-primary' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Tavsifi
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'specs' ? 'text-uzum-primary border-b-2 border-uzum-primary' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Xususiyatlari
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'reviews' ? 'text-uzum-primary border-b-2 border-uzum-primary' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Sharhlar ({reviewsList.length})
            </button>
          </div>

          {activeTab === 'desc' && (
            <div className="text-gray-700 text-sm leading-relaxed max-w-3xl">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-xl">
              {product.specs ? (
                <div className="divide-y divide-gray-100">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="py-2.5 flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-500 font-medium">{key}</span>
                      <span className="text-gray-900 font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Ushbu mahsulot uchun xususiyatlar ko'rsatilmadi.</p>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-2xl">
              {/* Add review form */}
              <form onSubmit={handleAddReview} className="bg-uzum-bg p-4 rounded-2xl border border-gray-200">
                <h4 className="text-xs font-bold text-gray-800 mb-2 flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4 text-uzum-primary" />
                  <span>Sharh va mulohaza qoldiring:</span>
                </h4>
                <div className="flex items-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewReviewRating(s)}
                      className="p-1 focus:outline-none"
                    >
                      <Star className={`w-5 h-5 ${s <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Mahsulot haqida fikringizni yozib qoldiring..."
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-uzum-primary mb-2 resize-none"
                  rows={2}
                />
                <button
                  type="submit"
                  className="bg-uzum-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-uzum-primary-hover transition-colors"
                >
                  Sharhni yuborish
                </button>
              </form>

              {/* Reviews list */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="border-b border-gray-100 pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-gray-800">{rev.name}</span>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-400 mb-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
