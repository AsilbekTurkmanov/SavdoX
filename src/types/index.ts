export interface Product {
  id: string;
  title: string;
  category: string;
  price: number; // current selling price in UZS
  originalPrice?: number; // old price for discount comparison
  rating: number;
  reviewsCount: number;
  installmentPrice: number; // per month (12 months)
  express: boolean; // 1 kunda yetkazish
  isHit?: boolean;
  stock: number;
  image: string;
  gallery?: string[];
  description: string;
  specs?: Record<string, string>;
  colors?: string[];
  sizes?: string[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  slug: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'admin' | 'user';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  items: {
    productTitle: string;
    productImage: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'Kutilmoqda' | 'Tayyorlanmoqda' | 'Yetkazilmoqda' | 'Yetkazildi';
  date: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: 'Pvz' | 'Courier';
  deliveryAddress: string;
  paymentMethod: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}
