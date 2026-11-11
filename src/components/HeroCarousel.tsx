import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  ShieldCheck,
  Truck,
  Headphones
} from 'lucide-react';
import { JTARSLogo } from './JTARSLogo';
import { CategoryType } from '../types';

interface HeroCarouselProps {
  onSelectCategory: (cat: CategoryType) => void;
  onExploreStory: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onSelectCategory, onExploreStory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      id: 0,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1800&q=88',
      type: 'logo',
      tagline: 'PREMIUM CLOTHING BRAND',
      scriptWord1: 'Wear the ',
      scriptWord2: 'Difference',
      ctaText: 'Shop Now',
      action: () => onSelectCategory('featured')
    },
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1800&q=88',
      type: 'text',
      kicker: 'NEW SEASON / 2025',
      headingLine1: 'Own The',
      headingLine2: 'Night.',
      description: 'Dark tones, sharp silhouettes and premium comfort. Discover streetwear made to stand apart.',
      ctaText: 'Explore Hoodies',
      action: () => onSelectCategory('hoodie')
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=88',
      type: 'text',
      kicker: 'THE SIGNATURE EDIT',
      headingLine1: 'Everyday.',
      headingLine2: 'Elevated.',
      description: 'Essential layers built with heavyweight fabrics, considered details and an unmistakable identity.',
      ctaText: 'Shop The Collection',
      action: () => onSelectCategory('all')
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=88',
      type: 'text',
      kicker: 'MORE THAN CLOTHING',
      headingLine1: 'Join The',
      headingLine2: 'Movement.',
      description: 'JTARS is a statement of confidence, individuality and ambition. This is only the beginning.',
      ctaText: 'Our Story',
      action: onExploreStory
    }
  ];

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    resetTimer();
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section
      id="home"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[390px] sm:h-[420px] md:h-[460px] bg-[#020304] border-b border-[#1e2024] overflow-hidden select-none isolate"
      aria-label="JTARS Streetwear Showcase Carousel"
    >
      {/* Slides */}
      {slides.map((s, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image & gradient overlays */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ${
                isActive ? 'scale-100' : 'scale-105'
              }`}
              style={{
                backgroundImage: `linear-gradient(90deg, #020304 0%, rgba(2, 3, 4, 0.85) 28%, rgba(2, 3, 4, 0.35) 70%, rgba(2, 3, 4, 0.45) 100%), linear-gradient(0deg, rgba(0, 18, 42, 0.35), transparent 55%), url('${s.image}')`,
                filter: 'saturate(0.55) contrast(1.15) brightness(0.72)'
              }}
            />

            {/* Slide Content */}
            <div className="relative z-20 h-full w-[min(1480px,calc(100%-48px))] mx-auto flex items-center">
              {s.type === 'logo' ? (
                /* Slide 1 Logo Center Piece */
                <div className="w-full max-w-md sm:max-w-lg mx-auto sm:ml-12 md:ml-20 text-center animate-fadeIn">
                  <div className="flex justify-center mb-2">
                    <JTARSLogo className="w-56 h-36 sm:w-72 sm:h-44 md:w-80 md:h-48" showText={false} />
                  </div>
                  <div className="flex items-center justify-center gap-3 text-white font-display text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase">
                    <span className="w-6 h-px bg-white/60"></span>
                    <span>{s.tagline}</span>
                    <span className="w-6 h-px bg-white/60"></span>
                  </div>
                  <div className="font-script text-4xl sm:text-5xl md:text-6xl text-white mt-1 drop-shadow-[0_3px_10px_#000]">
                    {s.scriptWord1}
                    <span className="text-5xl sm:text-6xl md:text-7xl font-normal text-blue-400">
                      {s.scriptWord2}
                    </span>
                  </div>
                  <button
                    onClick={s.action}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#f4f4f4] hover:bg-white text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                  >
                    <span>{s.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Slide 2/3/4 Typography Cut */
                <div className="max-w-lg sm:ml-12 md:ml-20 text-left animate-fadeIn">
                  <div className="flex items-center gap-3 text-blue-400 font-display text-xs font-semibold tracking-[0.3em] uppercase">
                    <span className="w-8 h-px bg-blue-500"></span>
                    <span>{s.kicker}</span>
                  </div>
                  <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[0.9] mt-2 drop-shadow-lg">
                    {s.headingLine1} <br />
                    <span className="text-blue-500">{s.headingLine2}</span>
                  </h2>
                  <p className="mt-4 text-xs sm:text-sm text-[#cbd0d8] leading-relaxed max-w-sm">
                    {s.description}
                  </p>
                  <button
                    onClick={s.action}
                    className="mt-5 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                  >
                    <span>{s.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Atmospheric Laser Beams & Smoke */}
      <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/60"></div>
        {/* Blue diagonal neon beams */}
        <div className="absolute -top-32 left-1/4 w-[2px] h-[700px] bg-gradient-to-b from-transparent via-blue-500 to-transparent rotate-[38deg] opacity-70 shadow-[0_0_15px_#1684ff]"></div>
        <div className="absolute top-12 right-1/4 w-[1.5px] h-[600px] bg-gradient-to-b from-transparent via-blue-400 to-transparent rotate-[42deg] opacity-50 shadow-[0_0_10px_#1684ff]"></div>
      </div>

      {/* Hero Benefits Pill List (Right Side on large displays) */}
      <div className="hidden xl:flex flex-col absolute right-16 top-1/2 -translate-y-1/2 z-25 bg-[#0a0c0f]/80 backdrop-blur-md p-3.5 rounded-2xl border border-[#2b2d34] shadow-2xl space-y-3">
        <div className="flex items-center gap-3 text-xs font-semibold text-white">
          <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/40 grid place-items-center text-blue-400">
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <p className="leading-tight">Premium Quality</p>
            <p className="text-[10px] text-[#80858e] font-normal">Heavyweight Fabrics</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-white">
          <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/40 grid place-items-center text-blue-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="leading-tight">Trusted Brand</p>
            <p className="text-[10px] text-[#80858e] font-normal">Original Designs</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-white">
          <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/40 grid place-items-center text-blue-400">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <p className="leading-tight">Fast Delivery</p>
            <p className="text-[10px] text-[#80858e] font-normal">Nationwide in BD</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-white">
          <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/40 grid place-items-center text-blue-400">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <p className="leading-tight">24/7 Support</p>
            <p className="text-[10px] text-[#80858e] font-normal">Always Available</p>
          </div>
        </div>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#050608]/60 hover:bg-blue-600/70 border border-[#3b3d42] hover:border-blue-500 text-white grid place-items-center backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#050608]/60 hover:bg-blue-600/70 border border-[#3b3d42] hover:border-blue-500 text-white grid place-items-center backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all ${
              i === currentSlide
                ? 'w-7 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#1684ff]'
                : 'w-2 h-2 bg-[#8c919b] hover:bg-white rounded-full'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
