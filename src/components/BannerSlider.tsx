import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, Clock } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    title: 'Katta Bahor Savdosi 70% gacha Chegirmalar',
    subtitle: 'Barcha maishiy texnika va smartfonlarga SavdoX kafolati bilan',
    tag: 'MEGA AKSIYA',
    bgGradient: 'from-purple-900 via-uzum-primary to-indigo-900',
    btnText: 'Xarid qilish',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'Halol Nasiya 0-0-12 Oylik Boshlang\'ich To\'lovsiz',
    subtitle: 'Hech qanday ortiqcha hujjatlarsiz, pasportingiz kifoya',
    tag: 'SAVDOX NASIYA',
    bgGradient: 'from-amber-600 via-amber-500 to-yellow-600',
    btnText: 'Rasmiylashtirish',
    image: 'https://images.unsplash.com/photo-1556742049-0a67daf4004a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: '1 KUNDA Yetkazib Berish Xizmati',
    subtitle: 'O\'zbekistonning barcha viloyat va shaharlariga tekin topshirish punkti',
    tag: 'EXPRESS YETKAZISH',
    bgGradient: 'from-blue-900 via-uzum-primary to-purple-800',
    btnText: 'Tanishib chiqish',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
  }
];

export const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const banner = BANNERS[currentIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-4">
      <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[220px] sm:min-h-[280px] md:min-h-[320px] flex items-center">
        {/* Background gradient & image overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient} transition-all duration-700 ease-in-out`} />
        
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay transition-all duration-700"
          style={{ backgroundImage: `url(${banner.image})` }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 text-white max-w-2xl">
          <span className="inline-flex items-center space-x-1.5 bg-uzum-yellow text-uzum-text text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-md">
            <Zap className="w-3.5 h-3.5 fill-uzum-text" />
            <span>{banner.tag}</span>
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
            {banner.title}
          </h2>
          
          <p className="text-sm sm:text-base text-purple-100 font-medium mb-6 line-clamp-2">
            {banner.subtitle}
          </p>

          <div className="flex items-center space-x-3">
            <button className="bg-uzum-yellow hover:bg-uzum-yellow-hover text-uzum-text font-black px-6 py-3 rounded-2xl text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              {banner.btnText}
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-purple-200 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl">
              <Clock className="w-4 h-4 text-uzum-yellow" />
              <span>Aksiya tugashiga: 2 kun 14 soat</span>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <button 
          onClick={() => setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setCurrentIndex((prev) => (prev + 1) % BANNERS.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-uzum-yellow' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
