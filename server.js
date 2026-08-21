import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pkg;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static assets from built dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// PostgreSQL Connection Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/savdox_db'
});

// Database Initialization & Seed Data
const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Elektronika', iconName: 'Smartphone', slug: 'elektronika' },
  { id: 'cat-2', name: 'Maishiy texnika', iconName: 'Tv', slug: 'maishiy-texnika' },
  { id: 'cat-3', name: 'Kiyim-kechak', iconName: 'Shirt', slug: 'kiyim-kechak' },
  { id: 'cat-4', name: "Go'zallik va parvarish", iconName: 'Sparkles', slug: 'gozallik' },
  { id: 'cat-5', name: "Uy-ro'zg'or buyumlari", iconName: 'Home', slug: 'uy-rozgor' },
  { id: 'cat-6', name: 'Kitoblar', iconName: 'BookOpen', slug: 'kitoblar' },
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Smartfon Apple iPhone 15 Pro Max 256GB Natural Titanium',
    category: 'Elektronika',
    price: 15490000,
    originalPrice: 17200000,
    rating: 4.9,
    reviewsCount: 142,
    installmentPrice: 1640000,
    express: true,
    isHit: true,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A17 Pro chipiga ega, alyuminiy titanium korpusli, 48MP asosiy kamerali eng so\'nggi avlod iPhone. SavdoX kafolati bilan 1 kunda yetkazib beriladi.',
    specs: {
      'Ekran': '6.7 dyuym Super Retina XDR OLED',
      'Protsessor': 'Apple A17 Pro',
      'Xotira': '256 GB',
      'Kamera': '48 MP + 12 MP + 12 MP',
      'Batareya': '4422 mA/soat'
    },
    colors: ['Natural Titanium', 'Black Titanium', 'White Titanium'],
    sizes: []
  },
  {
    id: 'prod-2',
    title: 'Noutbuk Apple MacBook Air 13 M2 8/256GB Midnight',
    category: 'Elektronika',
    price: 12890000,
    originalPrice: 14500000,
    rating: 4.9,
    reviewsCount: 88,
    installmentPrice: 1360000,
    express: true,
    isHit: true,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: 'Super-yengil va kuchli Apple M2 protsessori bilan ishlaydigan noutbuk. 18 soatgacha avtonom ishlash va ultra-sokin ventilyatorsiz dizayn.',
    specs: {
      'Protsessor': 'Apple M2 (8 yadro)',
      'Operativ xotira': '8 GB Unified',
      'Xotira': '256 GB SSD',
      'Vazni': '1.24 kg'
    },
    colors: [],
    sizes: []
  },
  {
    id: 'prod-3',
    title: 'Televizor Samsung 55" QLED 4K Smart TV QE55Q60C',
    category: 'Maishiy texnika',
    price: 7990000,
    originalPrice: 8990000,
    rating: 4.8,
    reviewsCount: 65,
    installmentPrice: 845000,
    express: true,
    isHit: false,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: 'Quantum Dot texnologiyasiga ega 4K Ultra HD televizor. Boy va tabiiy ranglar, Tizen OS smart tizimi.',
    specs: {
      'Ekran diagonal': '55 dyuym (139 sm)',
      'Ruxsat etilganlik': '4K UHD (3840x2160)',
      'Smart TV': 'Tizen OS',
      'Ovoz kuchi': '20 Vt'
    },
    colors: [],
    sizes: []
  },
  {
    id: 'prod-4',
    title: 'Simsiz quloqchinlar Apple AirPods Pro 2-avlod USB-C',
    category: 'Elektronika',
    price: 2990000,
    originalPrice: 3400000,
    rating: 4.9,
    reviewsCount: 210,
    installmentPrice: 316000,
    express: true,
    isHit: true,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: 'Faol shovqinni bostirish (ANC) va shaffoflik rejimi bilan jihozlangan premium quloqchinlar.',
    specs: {
      'Chipi': 'Apple H2',
      'Shovqin bostirish': 'Mavjud (ANC)',
      'Ishlash vaqti': '6 soatgacha (g‘ilof bilan 30 soat)'
    },
    colors: [],
    sizes: []
  },
  {
    id: 'prod-5',
    title: 'Kofe mashinasi DeLonghi Magnifica S ECAM 22.110.B',
    category: 'Maishiy texnika',
    price: 4990000,
    originalPrice: 5600000,
    rating: 4.7,
    reviewsCount: 39,
    installmentPrice: 528000,
    express: true,
    isHit: false,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: 'Uyda va ofisda haqiqiy espresso hamda kapuchino tayyorlash uchun avtomatik kofe mashinasi.',
    specs: {
      'Bosim': '15 bar',
      'Kofe donasi idishi': '250 g',
      'Suv idishi': '1.8 l'
    },
    colors: [],
    sizes: []
  },
  {
    id: 'prod-6',
    title: 'Erkaklar sport krossovkasi Nike Air Force 1 "07 White',
    category: 'Kiyim-kechak',
    price: 1190000,
    originalPrice: 1450000,
    rating: 4.8,
    reviewsCount: 94,
    installmentPrice: 126000,
    express: true,
    isHit: true,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: 'Klassik afsonaviy oq krossovka. Tabiiy charmdan tayyorlangan, kunda kiyish uchun juda qulay.',
    specs: {},
    colors: [],
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: 'prod-7',
    title: 'Erkaklar sviteri oversize premiyum paxta SavdoX Collection',
    category: 'Kiyim-kechak',
    price: 289000,
    originalPrice: 390000,
    rating: 4.6,
    reviewsCount: 45,
    installmentPrice: 30000,
    express: true,
    isHit: false,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: 'Yumshoq 100% paxtadan tayyorlangan zamonaviy erkaklar sviteri.',
    specs: {},
    colors: ['Qora', 'Kulrang', 'Bej'],
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'prod-8',
    title: 'Nemis kosmetik to\'plami L\'Oreal Paris Revitalift parvarish',
    category: "Go'zallik va parvarish",
    price: 349000,
    originalPrice: 420000,
    rating: 4.9,
    reviewsCount: 112,
    installmentPrice: 37000,
    express: true,
    isHit: false,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: 'Yuz terisini chuqur namlantiruvchi va yoshartiruvchi gialuron kislotali krem va zardob to\'plami.',
    specs: {},
    colors: [],
    sizes: []
  },
  {
    id: 'prod-9',
    title: 'Changyutgich Dyson V15 Detect Absolute simsiz',
    category: 'Maishiy texnika',
    price: 8990000,
    originalPrice: 9800000,
    rating: 5.0,
    reviewsCount: 52,
    installmentPrice: 950000,
    express: true,
    isHit: true,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: 'Lazerli changni aniqlash sensori va 60 daqiqalik quvvat beruvchi aqlli akumulyatorli changyutgich.',
    specs: {},
    colors: [],
    sizes: []
  },
  {
    id: 'prod-10',
    title: 'Kitob "Atom odatlar" - James Clear (O\'zbek tilida)',
    category: 'Kitoblar',
    price: 75000,
    originalPrice: 90000,
    rating: 5.0,
    reviewsCount: 310,
    installmentPrice: 8000,
    express: true,
    isHit: true,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: 'Dunyo bo\'ylab 15 milliondan ortiq sotilgan, hayotingizni 1% ga yaxshilash sirlari haqidagi bestseller kitob.',
    specs: {},
    colors: [],
    sizes: []
  },
  {
    id: 'prod-11',
    title: 'Smart soat Xiaomi Redmi Watch 4 Black',
    category: 'Elektronika',
    price: 890000,
    originalPrice: 1050000,
    rating: 4.7,
    reviewsCount: 78,
    installmentPrice: 94000,
    express: true,
    isHit: false,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: '1.97" AMOLED ekranli, alyuminiy korpus va 20 kunlik batareya quvvatiga ega aqlli soat.',
    specs: {},
    colors: [],
    sizes: []
  },
  {
    id: 'prod-12',
    title: 'Oshxona havo qovuruvchisi (Air Fryer) Tefal Easy Fry 4.2L',
    category: 'Uy-ro\'zg\'or buyumlari',
    price: 1150000,
    originalPrice: 1350000,
    rating: 4.8,
    reviewsCount: 64,
    installmentPrice: 121000,
    express: true,
    isHit: false,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    description: "Yog'siz va sog'lom taomlar tayyorlash uchun ko'p tarmoqli aerogril.",
    specs: {},
    colors: [],
    sizes: []
  }
];

async function initDatabase() {
  try {
    // Categories Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        slug VARCHAR(255),
        icon_name VARCHAR(100)
      );
    `);

    // Products Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        title TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        price NUMERIC NOT NULL,
        original_price NUMERIC,
        rating NUMERIC DEFAULT 5.0,
        reviews_count INT DEFAULT 0,
        installment_price NUMERIC,
        express BOOLEAN DEFAULT true,
        is_hit BOOLEAN DEFAULT false,
        stock INT DEFAULT 10,
        image TEXT NOT NULL,
        gallery JSONB DEFAULT '[]'::jsonb,
        description TEXT,
        specs JSONB DEFAULT '{}'::jsonb,
        colors JSONB DEFAULT '[]'::jsonb,
        sizes JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Orders Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(100) NOT NULL,
        delivery_method VARCHAR(50) NOT NULL,
        delivery_address TEXT NOT NULL,
        payment_method VARCHAR(100) NOT NULL,
        total_amount NUMERIC NOT NULL,
        status VARCHAR(50) DEFAULT 'Tayyorlanmoqda',
        date VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Order Items Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
        product_id VARCHAR(50),
        product_title TEXT,
        product_image TEXT,
        price NUMERIC,
        quantity INT
      );
    `);

    // Reviews Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(50) PRIMARY KEY,
        product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
        name VARCHAR(255),
        rating INT DEFAULT 5,
        comment TEXT,
        date VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Favorites Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(100),
        product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE(user_id, product_id)
      );
    `);

    console.log('✅ PostgreSQL jadvallari muvaffaqiyatli yaratildi.');

    // Seed Categories
    const catCheck = await pool.query('SELECT COUNT(*) FROM categories');
    if (parseInt(catCheck.rows[0].count) === 0) {
      for (const cat of INITIAL_CATEGORIES) {
        await pool.query(
          'INSERT INTO categories (id, name, slug, icon_name) VALUES ($1, $2, $3, $4)',
          [cat.id, cat.name, cat.slug, cat.iconName]
        );
      }
      console.log('✅ Boshlang\'ich kategoriyalar bazaga kiritildi.');
    }

    // Seed Products
    const prodCheck = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(prodCheck.rows[0].count) === 0) {
      for (const prod of INITIAL_PRODUCTS) {
        await pool.query(
          `INSERT INTO products (
            id, title, category, price, original_price, rating, reviews_count, 
            installment_price, express, is_hit, stock, image, gallery, description, specs, colors, sizes
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
          [
            prod.id,
            prod.title,
            prod.category,
            prod.price,
            prod.originalPrice || null,
            prod.rating,
            prod.reviewsCount,
            prod.installmentPrice,
            prod.express,
            prod.isHit,
            prod.stock,
            prod.image,
            JSON.stringify(prod.gallery || []),
            prod.description,
            JSON.stringify(prod.specs || {}),
            JSON.stringify(prod.colors || []),
            JSON.stringify(prod.sizes || [])
          ]
        );
      }
      console.log('✅ Boshlang\'ich 12 ta mahsulot bazaga kiritildi.');
    }

    // Seed Admin User
    const adminCheck = await pool.query("SELECT * FROM users WHERE phone = '+998991992012' OR email = 'asilbekturkmanov12@gmail.com'");
    if (adminCheck.rows.length === 0) {
      await pool.query(
        "INSERT INTO users (id, name, phone, email, password, role) VALUES ($1, $2, $3, $4, $5, $6)",
        ['admin-1', 'Asilbek Turkmanov', '+998991992012', 'asilbekturkmanov12@gmail.com', '+998991992012', 'admin']
      );
      console.log('✅ Boshlang\'ich Admin foydalanuvchisi bazaga kiritildi.');
    }

  } catch (err) {
    console.error('❌ Database Initialization Error:', err);
  }
}

initDatabase();

// API ROUTES

// 1. GET Categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY id ASC');
    const categories = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      iconName: row.icon_name
    }));
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET Products (with Search & Category Filters)
app.get('/api/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    let queryText = 'SELECT * FROM products';
    const params = [];
    const conditions = [];

    if (category) {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(LOWER(title) LIKE LOWER($${params.length}) OR LOWER(description) LIKE LOWER($${params.length}) OR LOWER(category) LIKE LOWER($${params.length}))`);
    }

    if (conditions.length > 0) {
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await pool.query(queryText, params);

    const products = result.rows.map(r => ({
      id: r.id,
      title: r.title,
      category: r.category,
      price: parseFloat(r.price),
      originalPrice: r.original_price ? parseFloat(r.original_price) : undefined,
      rating: parseFloat(r.rating),
      reviewsCount: r.reviews_count,
      installmentPrice: parseFloat(r.installment_price),
      express: r.express,
      isHit: r.is_hit,
      stock: r.stock,
      image: r.image,
      gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery) : r.gallery || [],
      description: r.description,
      specs: typeof r.specs === 'string' ? JSON.parse(r.specs) : r.specs || {},
      colors: typeof r.colors === 'string' ? JSON.parse(r.colors) : r.colors || [],
      sizes: typeof r.sizes === 'string' ? JSON.parse(r.sizes) : r.sizes || []
    }));

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST Product (Admin - Add New Product)
app.post('/api/products', async (req, res) => {
  try {
    const {
      title, category, price, originalPrice, rating = 5.0, reviewsCount = 1,
      installmentPrice, express = true, isHit = false, stock = 10, image, gallery = [],
      description = '', specs = {}, colors = [], sizes = []
    } = req.body;

    const id = `prod-${Date.now()}`;

    const query = `
      INSERT INTO products (
        id, title, category, price, original_price, rating, reviews_count,
        installment_price, express, is_hit, stock, image, gallery, description, specs, colors, sizes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *;
    `;

    const values = [
      id, title, category, price, originalPrice || null, rating, reviewsCount,
      installmentPrice || Math.round((price * 1.18) / 12), express, isHit, stock, image,
      JSON.stringify(gallery), description, JSON.stringify(specs), JSON.stringify(colors), JSON.stringify(sizes)
    ];

    const result = await pool.query(query, values);
    const r = result.rows[0];

    const newProduct = {
      id: r.id,
      title: r.title,
      category: r.category,
      price: parseFloat(r.price),
      originalPrice: r.original_price ? parseFloat(r.original_price) : undefined,
      rating: parseFloat(r.rating),
      reviewsCount: r.reviews_count,
      installmentPrice: parseFloat(r.installment_price),
      express: r.express,
      isHit: r.is_hit,
      stock: r.stock,
      image: r.image,
      gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery) : r.gallery || [],
      description: r.description,
      specs: typeof r.specs === 'string' ? JSON.parse(r.specs) : r.specs || {},
      colors: typeof r.colors === 'string' ? JSON.parse(r.colors) : r.colors || [],
      sizes: typeof r.sizes === 'string' ? JSON.parse(r.sizes) : r.sizes || []
    };

    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Mahsulot qo\'shishda xatolik yuz berdi.' });
  }
});

// 3b. PUT Product (Admin - Update Product)
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, category, price, originalPrice, rating, reviewsCount,
      installmentPrice, express, isHit, stock, image, gallery,
      description, specs, colors, sizes
    } = req.body;

    const query = `
      UPDATE products SET
        title = $1, category = $2, price = $3, original_price = $4,
        rating = $5, reviews_count = $6, installment_price = $7,
        express = $8, is_hit = $9, stock = $10, image = $11,
        gallery = $12, description = $13, specs = $14, colors = $15, sizes = $16
      WHERE id = $17
      RETURNING *;
    `;

    const values = [
      title, category, price, originalPrice || null, rating || 5.0, reviewsCount || 0,
      installmentPrice || Math.round((price * 1.18) / 12), express, isHit, stock, image,
      JSON.stringify(gallery || []), description, JSON.stringify(specs || {}),
      JSON.stringify(colors || []), JSON.stringify(sizes || []), id
    ];

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mahsulot topilmadi.' });
    }

    const r = result.rows[0];
    const updatedProduct = {
      id: r.id,
      title: r.title,
      category: r.category,
      price: parseFloat(r.price),
      originalPrice: r.original_price ? parseFloat(r.original_price) : undefined,
      rating: parseFloat(r.rating),
      reviewsCount: r.reviews_count,
      installmentPrice: parseFloat(r.installment_price),
      express: r.express,
      isHit: r.is_hit,
      stock: r.stock,
      image: r.image,
      gallery: typeof r.gallery === 'string' ? JSON.parse(r.gallery) : r.gallery || [],
      description: r.description,
      specs: typeof r.specs === 'string' ? JSON.parse(r.specs) : r.specs || {},
      colors: typeof r.colors === 'string' ? JSON.parse(r.colors) : r.colors || [],
      sizes: typeof r.sizes === 'string' ? JSON.parse(r.sizes) : r.sizes || []
    };

    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Mahsulotni tahrirlashda xatolik yuz berdi.' });
  }
});

// 4. DELETE Product (Admin)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Mahsulot topilmadi.' });
    }
    res.json({ success: true, message: 'Mahsulot bazadan o\'chirildi.' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Mahsulotni o\'chirishda xatolik yuz berdi.' });
  }
});

// 5. AUTH: LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { phoneOrEmail, pass } = req.body;
    const cleanInput = (phoneOrEmail || '').trim().toLowerCase();
    const cleanPass = (pass || '').trim();

    // Check specific Admin credentials rule
    const isAdmin = 
      (cleanInput === '+998991992012' || cleanInput === '991992012' || cleanInput === 'asilbekturkmanov12@gmail.com') && 
      cleanPass === '+998991992012';

    if (isAdmin) {
      return res.json({
        success: true,
        isAdmin: true,
        message: 'Admin panelga muvaffaqiyatli kirildi!',
        user: {
          id: 'admin-1',
          name: 'Asilbek Turkmanov',
          phone: '+998991992012',
          email: 'asilbekturkmanov12@gmail.com',
          role: 'admin'
        }
      });
    }

    // Check DB
    const userQuery = await pool.query(
      'SELECT * FROM users WHERE (LOWER(phone) = $1 OR LOWER(email) = $1) AND password = $2',
      [cleanInput, cleanPass]
    );

    if (userQuery.rows.length > 0) {
      const u = userQuery.rows[0];
      return res.json({
        success: true,
        isAdmin: u.role === 'admin',
        message: `Xush kelibsiz, ${u.name}!`,
        user: {
          id: u.id,
          name: u.name,
          phone: u.phone,
          email: u.email,
          role: u.role
        }
      });
    }

    res.status(400).json({
      success: false,
      message: 'Telefon raqam, email yoki parol noto\'g\'ri!'
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Tizimga kirishda xatolik yuz berdi.' });
  }
});

// 6. AUTH: REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, email, pass } = req.body;
    const cleanPhone = (phone || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (pass || '').trim();

    // Check existing
    const checkUser = await pool.query(
      'SELECT * FROM users WHERE phone = $1 OR email = $2',
      [cleanPhone, cleanEmail]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Ushbu telefon raqam yoki email allaqachon ro\'yxatdan o\'tgan.'
      });
    }

    const isAdmin = cleanPhone === '+998991992012' || cleanEmail === 'asilbekturkmanov12@gmail.com';
    const id = `user-${Date.now()}`;
    const role = isAdmin ? 'admin' : 'user';

    await pool.query(
      'INSERT INTO users (id, name, phone, email, password, role) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, name || 'Foydalanuvchi', cleanPhone, cleanEmail, cleanPass, role]
    );

    const newUser = {
      id,
      name: name || 'Foydalanuvchi',
      phone: cleanPhone,
      email: cleanEmail,
      role
    };

    res.status(201).json({
      success: true,
      message: isAdmin ? 'Admin sifatida ro\'yxatdan o\'tildi!' : 'Muvaffaqiyatli ro\'yxatdan o\'tildi!',
      user: newUser
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Ro\'yxatdan o\'tishda xatolik yuz berdi.' });
  }
});

// 7. GET ORDERS
app.get('/api/orders', async (req, res) => {
  try {
    const ordersResult = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    const itemsResult = await pool.query('SELECT * FROM order_items');

    const orders = ordersResult.rows.map(o => {
      const items = itemsResult.rows
        .filter(item => item.order_id === o.id)
        .map(item => ({
          productTitle: item.product_title,
          productImage: item.product_image,
          price: parseFloat(item.price),
          quantity: item.quantity
        }));

      return {
        id: o.id,
        customerName: o.customer_name,
        customerPhone: o.customer_phone,
        deliveryMethod: o.delivery_method,
        deliveryAddress: o.delivery_address,
        paymentMethod: o.payment_method,
        totalAmount: parseFloat(o.total_amount),
        status: o.status,
        date: o.date,
        items
      };
    });

    res.json(orders);
  } catch (err) {
    console.error('Error getting orders:', err);
    res.status(500).json({ error: 'Buyurtmalarni olishda xatolik yuz berdi.' });
  }
});

// 8. POST ORDER (Place Order Transaction with Stock Decrement)
app.post('/api/orders', async (req, res) => {
  const client = await pool.connect();
  try {
    const { items, totalAmount, customerName, customerPhone, deliveryMethod, deliveryAddress, paymentMethod } = req.body;
    const orderId = `SX-${Date.now().toString().slice(-6)}${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleString('uz-UZ');

    await client.query('BEGIN');

    // 1. Verify stock for all items
    for (const item of items) {
      const pId = item.product?.id || item.productId;
      if (pId) {
        const prodRes = await client.query('SELECT stock, title FROM products WHERE id = $1 FOR UPDATE', [pId]);
        if (prodRes.rows.length > 0) {
          const currentStock = prodRes.rows[0].stock;
          if (currentStock < item.quantity) {
            await client.query('ROLLBACK');
            return res.status(400).json({
              error: `"${prodRes.rows[0].title}" mahsulotidan omborda yetarli emas (Mavjud: ${currentStock} ta)`
            });
          }
        }
      }
    }

    // 2. Insert order
    await client.query(
      `INSERT INTO orders (id, customer_name, customer_phone, delivery_method, delivery_address, payment_method, total_amount, status, date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [orderId, customerName, customerPhone, deliveryMethod, deliveryAddress, paymentMethod, totalAmount, 'Tayyorlanmoqda', dateStr]
    );

    // 3. Insert items and decrement stock
    for (const item of items) {
      const pId = item.product?.id || item.productId || null;
      const pTitle = item.product?.title || item.productTitle;
      const pImage = item.product?.image || item.productImage;
      const pPrice = item.product?.price || item.price;

      await client.query(
        `INSERT INTO order_items (order_id, product_id, product_title, product_image, price, quantity)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [orderId, pId, pTitle, pImage, pPrice, item.quantity]
      );

      if (pId) {
        await client.query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2',
          [item.quantity, pId]
        );
      }
    }

    await client.query('COMMIT');

    const createdOrder = {
      id: orderId,
      customerName,
      customerPhone,
      deliveryMethod,
      deliveryAddress,
      paymentMethod,
      totalAmount: parseFloat(totalAmount),
      status: 'Tayyorlanmoqda',
      date: dateStr,
      items: items.map(i => ({
        productTitle: i.product?.title || i.productTitle,
        productImage: i.product?.image || i.productImage,
        price: i.product?.price || i.price,
        quantity: i.quantity
      }))
    };

    res.status(201).json(createdOrder);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Buyurtma berishda xatolik yuz berdi.' });
  } finally {
    client.release();
  }
});

// 9. PATCH ORDER STATUS (Admin)
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);
    res.json({ success: true, id, status });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Buyurtma holatini yangilashda xatolik yuz berdi.' });
  }
});

// 10. GET & POST FAVORITES
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT product_id FROM favorites WHERE user_id = $1', [userId]);
    const favoriteIds = result.rows.map(r => r.product_id);
    res.json(favoriteIds);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ error: 'Sevimlilarni olishda xatolik.' });
  }
});

app.post('/api/favorites/toggle', async (req, res) => {
  try {
    const { userId = 'guest-user', productId } = req.body;

    const check = await pool.query('SELECT * FROM favorites WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    let isFavorite = false;

    if (check.rows.length > 0) {
      await pool.query('DELETE FROM favorites WHERE user_id = $1 AND product_id = $2', [userId, productId]);
      isFavorite = false;
    } else {
      await pool.query('INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)', [userId, productId]);
      isFavorite = true;
    }

    const allFavs = await pool.query('SELECT product_id FROM favorites WHERE user_id = $1', [userId]);
    res.json({ isFavorite, favorites: allFavs.rows.map(r => r.product_id) });
  } catch (err) {
    console.error('Error toggling favorite:', err);
    res.status(500).json({ error: 'Sevimlilarni o\'zgartirishda xatolik.' });
  }
});

// 11. REVIEWS ENDPOINTS
app.get('/api/reviews/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await pool.query(
      'SELECT id, name, rating, comment, date FROM reviews WHERE product_id = $1 ORDER BY created_at DESC',
      [productId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Sharhlarni olishda xatolik.' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { productId, name, rating, comment } = req.body;
    const revId = `rev-${Date.now()}`;
    const dateStr = new Date().toLocaleDateString('uz-UZ');

    await pool.query(
      'INSERT INTO reviews (id, product_id, name, rating, comment, date) VALUES ($1, $2, $3, $4, $5, $6)',
      [revId, productId, name || 'Foydalanuvchi', rating || 5, comment, dateStr]
    );

    // Update product rating & reviews_count
    await pool.query(`
      UPDATE products SET 
        reviews_count = reviews_count + 1,
        rating = (SELECT ROUND(AVG(rating)::numeric, 1) FROM reviews WHERE product_id = $1)
      WHERE id = $1
    `, [productId]);

    res.status(201).json({ id: revId, productId, name, rating, comment, date: dateStr });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Sharh qo\'shishda xatolik.' });
  }
});

// SPA Fallback for frontend routes (Express 5 compatible)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      res.status(404).send('SavdoX Backend Server running. Run "npm run build" to build frontend UI.');
    }
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 SavdoX Express Backend Server http://localhost:${PORT} manzilida ishlamoqda.`);
});

