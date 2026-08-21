import type { Product, Category, User, Order } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (!res.ok) throw new Error('Kategoriyalarni olishda xatolik');
      return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using fallback categories', e);
      return [];
    }
  },

  // Products
  async getProducts(category?: string | null, search?: string): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
      if (!res.ok) throw new Error('Mahsulotlarni olishda xatolik');
      return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using fallback products', e);
      return [];
    }
  },

  async addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error('Mahsulot qo\'shishda xatolik');
      return await res.json();
    } catch (e) {
      console.error('API Error adding product:', e);
      return null;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch (e) {
      console.error('API Error deleting product:', e);
      return false;
    }
  },

  async updateProduct(product: Product): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error('Mahsulotni tahrirlashda xatolik');
      return await res.json();
    } catch (e) {
      console.error('API Error updating product:', e);
      return null;
    }
  },

  // Auth
  async login(phoneOrEmail: string, pass: string): Promise<{ success: boolean; isAdmin?: boolean; message: string; user?: User }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneOrEmail, pass })
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error('API Error login:', e);
      return { success: false, message: 'Server bilan ulanishda xatolik yuz berdi.' };
    }
  },

  async register(name: string, phone: string, email: string, pass: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, pass })
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error('API Error register:', e);
      return { success: false, message: 'Server bilan ulanishda xatolik yuz berdi.' };
    }
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`);
      if (!res.ok) throw new Error('Buyurtmalarni olishda xatolik');
      return await res.json();
    } catch (e) {
      console.warn('API Error getOrders:', e);
      return [];
    }
  },

  async placeOrder(orderData: any): Promise<Order | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!res.ok) throw new Error('Buyurtma berishda xatolik');
      return await res.json();
    } catch (e) {
      console.error('API Error placeOrder:', e);
      return null;
    }
  },

  async updateOrderStatus(id: string, status: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return res.ok;
    } catch (e) {
      console.error('API Error updateOrderStatus:', e);
      return false;
    }
  },

  // Favorites
  async getFavorites(userId: string): Promise<string[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/favorites/${userId}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  },

  async toggleFavorite(userId: string, productId: string): Promise<{ isFavorite: boolean; favorites: string[] } | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/favorites/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
};
