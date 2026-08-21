import React from 'react';
import { X, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from './ProductCard';

interface OrdersViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ isOpen, onClose }) => {
  const { orders } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden relative">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-uzum-primary" />
            <h2 className="font-bold text-lg text-uzum-text">Mening buyurtmalarim ({orders.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Package className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-bold text-gray-700 text-base">Sizda hali buyurtmalar mavjud emas</h3>
              <p className="text-xs text-gray-400">Savatga mahsulot qo'shib buyurtma rasmiylashtiring.</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-uzum-bg border border-gray-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-2 text-xs">
                  <div>
                    <span className="font-black text-uzum-primary">{order.id}</span>
                    <span className="text-gray-400 ml-2">• {order.date}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${order.status === 'Yetkazildi' ? 'bg-green-100 text-green-700' : order.status === 'Yetkazilmoqda' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-gray-100">
                      <div className="flex items-center space-x-2">
                        <img src={item.productImage} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-50" />
                        <div>
                          <p className="font-bold text-gray-800 line-clamp-1">{item.productTitle}</p>
                          <p className="text-gray-400 text-[10px]">Miqdori: {item.quantity} ta</p>
                        </div>
                      </div>
                      <span className="font-black text-uzum-text">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs">
                  <span className="text-gray-500">To'langan: <strong>{order.paymentMethod}</strong></span>
                  <span className="font-black text-sm text-uzum-primary">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
