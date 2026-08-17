import type { Product, Category, User } from '../types';

export const ADMIN_PHONE = '+998991992012';
export const ADMIN_EMAIL = 'asilbekturkmanov12@gmail.com';
export const ADMIN_PASS = '+998991992012';

export const INITIAL_ADMIN_USER: User = {
  id: 'admin-1',
  name: 'Asilbek Turkmanov',
  phone: ADMIN_PHONE,
  email: ADMIN_EMAIL,
  role: 'admin'
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Elektronika', iconName: 'Smartphone', slug: 'elektronika' },
  { id: 'cat-2', name: 'Maishiy texnika', iconName: 'Tv', slug: 'maishiy-texnika' },
  { id: 'cat-3', name: 'Kiyim-kechak', iconName: 'Shirt', slug: 'kiyim-kechak' },
  { id: 'cat-4', name: "Go'zallik va parvarish", iconName: 'Sparkles', slug: 'gozallik' },
  { id: 'cat-5', name: "Uy-ro'zg'or buyumlari", iconName: 'Home', slug: 'uy-rozgor' },
  { id: 'cat-6', name: 'Kitoblar', iconName: 'BookOpen', slug: 'kitoblar' },
];

export const INITIAL_PRODUCTS: Product[] = [
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
    description: 'A17 Pro chipiga ega, alyuminiy titanium korpusli, 48MP asosiy kamerali eng so\'nggi avlod iPhone. Uzum kafolati bilan 1 kunda yetkazib beriladi.',
    specs: {
      'Ekran': '6.7 dyuym Super Retina XDR OLED',
      'Protsessor': 'Apple A17 Pro',
      'Xotira': '256 GB',
      'Kamera': '48 MP + 12 MP + 12 MP',
      'Batareya': '4422 mA/soat'
    },
    colors: ['Natural Titanium', 'Black Titanium', 'White Titanium']
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
    description: 'Super-yengil va kuchli Apple M2 protsessori bilan ishlaydigan noutbuk. 18 soatgacha avtonom ishlash va ultra-sokin ventilyatorsiz dizayn.',
    specs: {
      'Protsessor': 'Apple M2 (8 yadro)',
      'Operativ xotira': '8 GB Unified',
      'Xotira': '256 GB SSD',
      'Vazni': '1.24 kg'
    }
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
    stock: 15,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    description: 'Quantum Dot texnologiyasiga ega 4K Ultra HD televizor. Boy va tabiiy ranglar, Tizen OS smart tizimi.',
    specs: {
      'Ekran diagonal': '55 dyuym (139 sm)',
      'Ruxsat etilganlik': '4K UHD (3840x2160)',
      'Smart TV': 'Tizen OS',
      'Ovoz kuchi': '20 Vt'
    }
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
    description: 'Faol shovqinni bostirish (ANC) va shaffoflik rejimi bilan jihozlangan premium quloqchinlar.',
    specs: {
      'Chipi': 'Apple H2',
      'Shovqin bostirish': 'Mavjud (ANC)',
      'Ishlash vaqti': '6 soatgacha (g‘ilof bilan 30 soat)'
    }
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
    stock: 7,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
    description: 'Uyda va ofisda haqiqiy espresso hamda kapuchino tayyorlash uchun avtomatik kofe mashinasi.',
    specs: {
      'Bosim': '15 bar',
      'Kofe donasi idishi': '250 g',
      'Suv idishi': '1.8 l'
    }
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
    description: 'Klassik afsonaviy oq krossovka. Tabiiy charmdan tayyorlangan, kunda kiyish uchun juda qulay.',
    sizes: ['40', '41', '42', '43', '44']
  },
  {
    id: 'prod-7',
    title: 'Erkaklar sviteri oversize premiyum paxta Uzum Collection',
    category: 'Kiyim-kechak',
    price: 289000,
    originalPrice: 390000,
    rating: 4.6,
    reviewsCount: 45,
    installmentPrice: 30000,
    express: true,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Yumshoq 100% paxtadan tayyorlangan zamonaviy erkaklar sviteri.',
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
    stock: 40,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Yuz terisini chuqur namlantiruvchi va yoshartiruvchi gialuron kislotali krem va zardob to\'plami.',
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
    description: 'Lazerli changni aniqlash sensori va 60 daqiqalik quvvat beruvchi aqlli akumulyatorli changyutgich.',
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
    description: 'Dunyo bo\'ylab 15 milliondan ortiq sotilgan, hayotingizni 1% ga yaxshilash sirlari haqidagi bestseller kitob.',
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
    stock: 22,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: '1.97" AMOLED ekranli, alyuminiy korpus va 20 kunlik batareya quvvatiga ega aqlli soat.',
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
    stock: 14,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80',
    description: "Yog'siz va sog'lom taomlar tayyorlash uchun ko'p tarmoqli aerogril.",
  }
];
