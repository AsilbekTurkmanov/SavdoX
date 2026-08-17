import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Category, User, CartItem, Order } from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_ADMIN_USER, 
  ADMIN_PHONE, 
  ADMIN_EMAIL, 
  ADMIN_PASS 
} from '../data/mockData';

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
  login: (phoneOrEmail: string, pass: string) => { success: boolean; isAdmin?: boolean; message: string };
  register: (name: string, phone: string, email: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  
  // Product management (Admin)
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (product: Product) => void;
  
  // Cart & Favorites
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  
  // Checkout
  placeOrder: (deliveryMethod: 'Pvz' | 'Courier', deliveryAddress: string, paymentMethod: string) => Order | null;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
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
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [user, setUser] = useState<User | null>(() => getInitial('user', null));
  const [cart, setCart] = useState<CartItem[]>(() => getInitial('cart', []));
  const [favorites, setFavorites] = useState<string[]>(() => getInitial('favorites', []));
  const [orders, setOrders] = useState<Order[]>(() => getInitial('orders', []));
  const [registeredUsers, setRegisteredUsers] = useState<{ phone: string; email: string; pass: string; user: User }[]>(() => 
    getInitial('registered_users', [
      {
        phone: ADMIN_PHONE,
        email: ADMIN_EMAIL,
        pass: ADMIN_PASS,
        user: INITIAL_ADMIN_USER
      }
    ])
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('Toshkent');

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

  useEffect(() => {
    localStorage.setItem('savdox_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Auth logic
  const login = (phoneOrEmail: string, pass: string) => {
    const cleanInput = phoneOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Check specific Admin credentials rule
    const isAdminCredentials = 
      (cleanInput === ADMIN_PHONE.toLowerCase() || cleanInput === '991992012' || cleanInput === ADMIN_EMAIL.toLowerCase()) && 
      cleanPass === ADMIN_PASS;

    if (isAdminCredentials) {
      setUser(INITIAL_ADMIN_USER);
      return { success: true, isAdmin: true, message: 'Admin panelga muvaffaqiyatli kirildingiz!' };
    }

    // Check registered database
    const found = registeredUsers.find(
      u => (u.phone.toLowerCase() === cleanInput || u.email.toLowerCase() === cleanInput) && u.pass === cleanPass
    );

    if (found) {
      setUser(found.user);
      return { 
        success: true, 
        isAdmin: found.user.role === 'admin', 
        message: `Hush kelibsiz, ${found.user.name}!` 
      };
    }

    return { 
      success: false, 
      message: 'Telefon raqam, email yoki parol noto\'g\'ri. Agar ro\'yxatdan o\'tmagan bo\'lsangiz, iltimos ro\'yxatdan o\'ting.' 
    };
  };

  const register = (name: string, phone: string, email: string, pass: string) => {
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check existing
    const exists = registeredUsers.some(u => u.phone === cleanPhone || u.email === cleanEmail);
    if (exists) {
      return { success: false, message: 'Ushbu telefon raqam yoki email allaqachon ro\'yxatdan o\'tgan.' };
    }

    const isAdmin = cleanPhone === ADMIN_PHONE || cleanEmail === ADMIN_EMAIL;
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim() || 'Foydalanuvchi',
      phone: cleanPhone,
      email: cleanEmail,
      role: isAdmin ? 'admin' : 'user'
    };

    setRegisteredUsers(prev => [...prev, { phone: cleanPhone, email: cleanEmail, pass, user: newUser }]);
    setUser(newUser);

    return { 
      success: true, 
      message: isAdmin ? 'Admin sifatida ro\'yxatdan o\'tildi!' : 'Muvaffaqiyatli ro\'yxatdan o\'tildi!' 
    };
  };

  const logout = () => {
    setUser(null);
  };

  // Admin Product Actions
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));
    setFavorites(prev => prev.filter(fId => fId !== id));
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && item.selectedColor === color && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorites
  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Checkout
  const placeOrder = (deliveryMethod: 'Pvz' | 'Courier', deliveryAddress: string, paymentMethod: string) => {
    if (cart.length === 0) return null;

    const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const newOrder: Order = {
      id: `UZ-${Math.floor(100000 + Math.random() * 900000)}`,
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
      deliveryAddress: deliveryAddress || 'Toshkent shahri, Uzum Topshirish punkti',
      paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
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
