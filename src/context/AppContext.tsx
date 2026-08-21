import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Category, User, CartItem, Order } from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_ADMIN_USER
} from '../data/mockData';
import { api } from '../api/client';

interface AppContextType {
  products: Product[];
  categories: Category[];
  user: User | null;
  cart: CartItem[];
  favorites: string[];
  orders: Order[];
  searchQuery: string;
  selectedCategory: string | null;
  selectedCity: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedCity: (city: string) => void;
  
  // Auth functions
  login: (phoneOrEmail: string, pass: string) => Promise<{ success: boolean; isAdmin?: boolean; message: string }>;
  register: (name: string, phone: string, email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  
  // Product management (Admin)
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  
  // Cart & Favorites
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => Promise<void>;
  
  // Checkout
  placeOrder: (deliveryMethod: 'Pvz' | 'Courier', deliveryAddress: string, paymentMethod: string, totalOverride?: number) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage initialization helper
  const getInitial = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`savdox_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const [products, setProducts] = useState<Product[]>(() => getInitial('products', INITIAL_PRODUCTS));
  const [categories, setCategories] = useState<Category[]>(() => getInitial('categories', INITIAL_CATEGORIES));
  const [user, setUser] = useState<User | null>(() => getInitial('user', null));
  const [cart, setCart] = useState<CartItem[]>(() => getInitial('cart', []));
  const [favorites, setFavorites] = useState<string[]>(() => getInitial('favorites', []));
  const [orders, setOrders] = useState<Order[]>(() => getInitial('orders', []));

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('Toshkent');

  // Load data from Backend PostgreSQL API on mount
  useEffect(() => {
    async function loadDataFromBackend() {
      try {
        const [backendProducts, backendCategories, backendOrders] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
          api.getOrders()
        ]);

        if (backendProducts && backendProducts.length > 0) {
          setProducts(backendProducts);
        }
        if (backendCategories && backendCategories.length > 0) {
          setCategories(backendCategories);
        }
        if (backendOrders && backendOrders.length > 0) {
          setOrders(backendOrders);
        }
      } catch (e) {
        console.warn('Backend server offline, using local state/storage');
      }
    }
    loadDataFromBackend();
  }, []);

  // Fetch favorites if user logged in
  useEffect(() => {
    if (user?.id) {
      api.getFavorites(user.id).then(favs => {
        if (favs && favs.length > 0) setFavorites(favs);
      });
    }
  }, [user]);

  // Persistence side effects
  useEffect(() => {
    localStorage.setItem('savdox_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('savdox_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('savdox_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('savdox_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('savdox_orders', JSON.stringify(orders));
  }, [orders]);

  // Auth logic via API
  const login = async (phoneOrEmail: string, pass: string) => {
    const res = await api.login(phoneOrEmail, pass);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const register = async (name: string, phone: string, email: string, pass: string) => {
    const res = await api.register(name, phone, email, pass);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    setUser(null);
  };

  // Admin Product Actions via API
  const addProduct = async (newProdData: Omit<Product, 'id'>) => {
    const created = await api.addProduct(newProdData);
    if (created) {
      setProducts(prev => [created, ...prev]);
    } else {
      // Fallback local addition if server unavailable
      const localProduct: Product = { ...newProdData, id: `prod-${Date.now()}` };
      setProducts(prev => [localProduct, ...prev]);
    }
  };

  const deleteProduct = async (id: string) => {
    await api.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));
    setFavorites(prev => prev.filter(fId => fId !== id));
  };

  const updateProduct = async (updated: Product) => {
    const res = await api.updateProduct(updated);
    if (res) {
      setProducts(prev => prev.map(p => p.id === res.id ? res : p));
    } else {
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    }
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );
      const currentQty = existingIndex > -1 ? prev[existingIndex].quantity : 0;
      const maxAllowed = product.stock || 99;
      const newQty = Math.min(maxAllowed, currentQty + quantity);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity = newQty;
        return updated;
      }
      return [...prev, { product, quantity: Math.min(maxAllowed, quantity), selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCart(prev => prev.filter(item => {
      if (item.product.id !== productId) return true;
      if (color !== undefined && item.selectedColor !== color) return true;
      if (size !== undefined && item.selectedSize !== size) return true;
      return false;
    }));
  };

  const updateCartQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId &&
          (color === undefined || item.selectedColor === color) &&
          (size === undefined || item.selectedSize === size)) {
        const maxStock = item.product.stock || 99;
        return { ...item, quantity: Math.min(maxStock, quantity) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorites via API
  const toggleFavorite = async (productId: string) => {
    const userId = user?.id || 'guest-user';
    const res = await api.toggleFavorite(userId, productId);
    if (res) {
      setFavorites(res.favorites);
    } else {
      setFavorites(prev => 
        prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
      );
    }
  };

  // Checkout via API
  const placeOrder = async (deliveryMethod: 'Pvz' | 'Courier', deliveryAddress: string, paymentMethod: string, totalOverride?: number) => {
    if (cart.length === 0) return null;

    const baseAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalAmount = totalOverride !== undefined ? totalOverride : baseAmount;

    const orderData = {
      items: cart,
      totalAmount,
      customerName: user ? user.name : 'Mehmon',
      customerPhone: user ? user.phone : '+998900000000',
      deliveryMethod,
      deliveryAddress: deliveryAddress || 'Toshkent shahri, SavdoX Topshirish punkti',
      paymentMethod
    };

    const createdOrder = await api.placeOrder(orderData);

    // Update local stock for products in cart
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.product.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    }));

    if (createdOrder) {
      setOrders(prev => [createdOrder, ...prev]);
      clearCart();
      return createdOrder;
    } else {
      // Local fallback
      const fallbackOrder: Order = {
        id: `SX-${Date.now().toString().slice(-6)}${Math.floor(1000 + Math.random() * 9000)}`,
        items: cart.map(item => ({
          productTitle: item.product.title,
          productImage: item.product.image,
          price: item.product.price,
          quantity: item.quantity
        })),
        totalAmount,
        status: 'Tayyorlanmoqda',
        date: new Date().toLocaleString('uz-UZ'),
        customerName: user ? user.name : 'Mehmon',
        customerPhone: user ? user.phone : '+998900000000',
        deliveryMethod,
        deliveryAddress: deliveryAddress || 'Toshkent shahri, SavdoX Topshirish punkti',
        paymentMethod
      };
      setOrders(prev => [fallbackOrder, ...prev]);
      clearCart();
      return fallbackOrder;
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    await api.updateOrderStatus(orderId, status);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        user,
        cart,
        favorites,
        orders,
        searchQuery,
        selectedCategory,
        selectedCity,
        setSearchQuery,
        setSelectedCategory,
        setSelectedCity,
        login,
        register,
        logout,
        addProduct,
        deleteProduct,
        updateProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleFavorite,
        placeOrder,
        updateOrderStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
