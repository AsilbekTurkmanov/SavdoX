import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from './ProductCard';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { user, cart, selectedCity, placeOrder } = useApp();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+998');
  const [deliveryMethod, setDeliveryMethod] = useState<'Pvz' | 'Courier'>('Pvz');
  const [deliveryAddress, setDeliveryAddress] = useState(`${selectedCity} shahri, SavdoX Topshirish punkti #12 (Markaziy)`);
  const [paymentMethod, setPaymentMethod] = useState('Uzcard / Humo');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  React.useEffect(() => {
    if (user) {
      if (user.name) setCustomerName(user.name);
      if (user.phone) setCustomerPhone(user.phone);
    }
  }, [user]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'Courier' ? 15000 : 0;
  const totalAmount = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const newOrder = await placeOrder(deliveryMethod, deliveryAddress, paymentMethod, totalAmount);
    if (newOrder) {
      setPlacedOrderId(newOrder.id);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-uzum-text">Buyurtmangiz qabul qilindi!</h2>
            <p className="text-xs text-gray-500">
              Buyurtma ID raqami: <strong className="text-uzum-primary font-bold">{placedOrderId}</strong>
            </p>
            <div className="bg-uzum-bg p-4 rounded-2xl text-left text-xs space-y-1.5 text-gray-700">
              <p><strong>Mijoz:</strong> {customerName} ({customerPhone})</p>
              <p><strong>Yetkazish manzili:</strong> {deliveryAddress}</p>
              <p><strong>To'lov usuli:</strong> {paymentMethod}</p>
              <p><strong>Jami summasi:</strong> <strong className="text-uzum-primary">{formatPrice(totalAmount)}</strong></p>
            </div>
            <p className="text-xs text-gray-500">Buyurtmangiz 1 kunda yetkazib beriladi. Rahmat!</p>
            <button
              onClick={() => {
                onClose();
                onOrderSuccess();
              }}
              className="w-full bg-uzum-primary text-white font-bold py-3 rounded-xl shadow hover:bg-uzum-primary-hover transition-colors text-sm"
            >
              Mening buyurtmalarimga o'tish
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-black text-uzum-text mb-1">Buyurtmani rasmiylashtirish</h2>
            <p className="text-xs text-gray-400 mb-6">Ma'lumotlarni kiriting va to'lov turini tanlang</p>

            <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
              {/* Customer info */}
              <div className="space-y-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Ism va Familiya</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Masalan: Asilbek Turkmanov"
                    className="w-full bg-uzum-bg border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Telefon raqam</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full bg-uzum-bg border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-medium"
                  />
                </div>
              </div>

              {/* Delivery method */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Yetkazib berish usuli</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryMethod('Pvz');
                      setDeliveryAddress(`${selectedCity} shahri, SavdoX Topshirish punkti #12 (Markaziy)`);
                    }}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${deliveryMethod === 'Pvz' ? 'border-uzum-primary bg-uzum-primary-light text-uzum-primary font-bold' : 'border-gray-200 text-gray-700'}`}
                  >
                    <span className="font-bold">Topshirish punktigacha</span>
                    <span className="text-[10px] text-green-600 font-bold mt-1">1 KUNDA • BEPUL</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryMethod('Courier');
                      setDeliveryAddress(`${selectedCity} shahri, Chilonzor tuman 12-uy, 45-xonadon`);
                    }}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${deliveryMethod === 'Courier' ? 'border-uzum-primary bg-uzum-primary-light text-uzum-primary font-bold' : 'border-gray-200 text-gray-700'}`}
                  >
                    <span className="font-bold">Kurer orqali uyga</span>
                    <span className="text-[10px] text-gray-500 mt-1">1 KUNDA • 15 000 so'm</span>
                  </button>
                </div>
              </div>

              {/* Delivery address */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Topshirish manzili</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-uzum-bg border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-medium"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">To'lov turi</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-uzum-bg border border-gray-200 rounded-xl p-2.5 outline-none focus:border-uzum-primary font-bold"
                >
                  <option value="Uzcard / Humo">Uzcard / Humo (Plastik karta orqali)</option>
                  <option value="Naqd pul">Naqd pul (Mahsulotni olganda to'lov)</option>
                  <option value="SavdoX Nasiya 12 oy">SavdoX Nasiya (Halol muddatli to'lov)</option>
                </select>
              </div>

              {/* Summary */}
              <div className="bg-uzum-yellow/20 p-3 rounded-xl flex justify-between items-center text-uzum-text font-black text-sm">
                <span>To'lanadigan summasi:</span>
                <span className="text-uzum-primary text-base">{formatPrice(totalAmount)}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-uzum-yellow hover:bg-uzum-yellow-hover text-uzum-text font-black py-3.5 rounded-2xl shadow-lg transition-all active:scale-95 text-sm"
              >
                Buyurtmani tasdiqlash
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
