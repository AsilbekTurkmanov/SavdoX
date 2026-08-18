import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from './ProductCard';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onOpenCheckout
}) => {
  if (!isOpen) return null;

  const { cart, removeFromCart, updateCartQuantity, clearCart } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'UZUM20' || promoCode.trim().toUpperCase() === 'SAVDOX') {
      setDiscountPercent(20);
      setPromoError('');
    } else {
      setPromoError('Promokod mavjud emas');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end font-sans animate-fade-in">
      <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-uzum-primary" />
            <h2 className="font-bold text-lg text-uzum-text">Savat ({cart.length})</h2>
          </div>

          <div className="flex items-center space-x-2">
            {cart.length > 0 && (
              <button 
                onClick={clearCart} 
                className="text-xs text-red-500 hover:underline font-medium"
              >
                Tozalash
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-uzum-primary-light text-uzum-primary flex items-center justify-center">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-uzum-text mb-1">Savatingiz hozircha bo'sh</h3>
                <p className="text-xs text-gray-400">Bosh sahifadagi mahsulotlardan tanlang yoki qidiruvdan foydalaning.</p>
              </div>
              <button
                onClick={onClose}
                className="bg-uzum-primary text-white text-xs font-bold px-6 py-3 rounded-xl shadow hover:bg-uzum-primary-hover transition-colors"
              >
                Xaridni boshlash
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                className="flex space-x-3 bg-uzum-bg p-3 rounded-2xl border border-gray-200/70"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-xl bg-white border border-gray-100 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-uzum-text line-clamp-2 leading-tight pr-2">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-uzum-red transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {(item.selectedColor || item.selectedSize) && (
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.selectedColor} {item.selectedSize && `| ${item.selectedSize}`}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-200/50">
                    <span className="text-xs font-black text-uzum-text">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>

                    <div className="flex items-center space-x-2 border border-gray-300 rounded-lg bg-white px-1 py-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 font-bold text-xs text-gray-600 hover:bg-gray-100 rounded"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 font-bold text-xs text-gray-600 hover:bg-gray-100 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white space-y-3">
            {/* Promo input */}
            <form onSubmit={handleApplyPromo} className="flex space-x-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promokod (masalan: SAVDOX)"
                  className="w-full text-xs bg-uzum-bg border border-gray-200 rounded-xl py-2 pl-8 pr-3 outline-none focus:border-uzum-primary uppercase font-bold"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-black transition-colors"
              >
                Qo'llash
              </button>
            </form>
            {discountPercent > 0 && (
              <p className="text-xs font-bold text-green-600">✓ Promokod faol: 20% chegirma berildi!</p>
            )}
            {promoError && (
              <p className="text-xs text-red-500">{promoError}</p>
            )}

            {/* Total summary */}
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Mahsulotlar ({cart.length}):</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Chegirma (20%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Yetkazib berish (SavdoX Topshirish punktiga):</span>
                <span className="text-green-600 font-bold">BEPUL</span>
              </div>
              <div className="flex justify-between text-sm font-black text-uzum-text pt-2 border-t border-gray-100">
                <span>Jami to'lov:</span>
                <span className="text-uzum-primary text-base">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full bg-uzum-yellow hover:bg-uzum-yellow-hover text-uzum-text font-black py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95 text-sm"
            >
              <span>Rasmiylashtirishga o'tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
