import React from 'react';
import { Layers } from 'lucide-react';
import { CategoryType } from '../types';

interface CategoryNavProps {
  currentCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenMoreCategories: () => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenMoreCategories
}) => {
  return (
    <nav
      className="w-[min(1486px,calc(100%-48px))] mx-auto my-6 bg-[#0c0d0f] border border-[#303237] rounded-2xl overflow-hidden shadow-lg"
      aria-label="Apparel categories"
    >
      <div className="grid grid-cols-6 divide-x divide-[#2e3036] overflow-x-auto min-w-[650px] sm:min-w-0">
        {/* Hoodie */}
        <button
          onClick={() => onSelectCategory('hoodie')}
          className={`flex flex-col items-center justify-center py-4 px-2 transition-all ${
            currentCategory === 'hoodie'
              ? 'bg-gradient-to-b from-blue-950/40 to-[#0e1726] text-blue-400 font-bold'
              : 'text-[#d6d8dc] hover:text-white hover:bg-[#14161a]'
          }`}
        >
          <svg
            viewBox="0 0 50 50"
            className="w-10 h-10 mb-1 fill-none stroke-current stroke-[1.5] stroke-linecap-round stroke-linejoin-round"
            aria-hidden="true"
          >
            <path d="M19 14c-2-7 1-11 6-11s8 4 6 11l5 2 5 14-5 2-3-7v17H17V25l-3 7-5-2 5-14 5-2Z" />
            <path d="M19 14c1 5 11 5 12 0M21 15l-1 7M29 15l1 7M20 33h10v5H20zM17 38h16" />
          </svg>
          <span className="text-xs tracking-wider">Hoodie</span>
        </button>

        {/* Sweatshirt */}
        <button
          onClick={() => onSelectCategory('sweatshirt')}
          className={`flex flex-col items-center justify-center py-4 px-2 transition-all ${
            currentCategory === 'sweatshirt'
              ? 'bg-gradient-to-b from-blue-950/40 to-[#0e1726] text-blue-400 font-bold'
              : 'text-[#d6d8dc] hover:text-white hover:bg-[#14161a]'
          }`}
        >
          <svg
            viewBox="0 0 50 50"
            className="w-10 h-10 mb-1 fill-none stroke-current stroke-[1.5] stroke-linecap-round stroke-linejoin-round"
            aria-hidden="true"
          >
            <path d="M19 8 13 11 8 29l6 2 3-9v20h16V22l3 9 6-2-5-18-6-3" />
            <path d="M19 8c1 6 11 6 12 0M20 9c2 3 8 3 10 0M17 37h16M20 25v5M30 25v5" />
          </svg>
          <span className="text-xs tracking-wider">Sweatshirt</span>
        </button>

        {/* T-Shirt */}
        <button
          onClick={() => onSelectCategory('tshirt')}
          className={`flex flex-col items-center justify-center py-4 px-2 transition-all ${
            currentCategory === 'tshirt'
              ? 'bg-gradient-to-b from-blue-950/40 to-[#0e1726] text-blue-400 font-bold'
              : 'text-[#d6d8dc] hover:text-white hover:bg-[#14161a]'
          }`}
        >
          <svg
            viewBox="0 0 50 50"
            className="w-10 h-10 mb-1 fill-none stroke-current stroke-[1.5] stroke-linecap-round stroke-linejoin-round"
            aria-hidden="true"
          >
            <path d="m18 7-11 6 5 11 5-3v21h16V21l5 3 5-11-11-6" />
            <path d="M18 7c0 7 14 7 14 0M20 8c2 4 8 4 10 0" />
          </svg>
          <span className="text-xs tracking-wider">T-Shirt</span>
        </button>

        {/* Jacket */}
        <button
          onClick={() => onSelectCategory('jacket')}
          className={`flex flex-col items-center justify-center py-4 px-2 transition-all ${
            currentCategory === 'jacket'
              ? 'bg-gradient-to-b from-blue-950/40 to-[#0e1726] text-blue-400 font-bold'
              : 'text-[#d6d8dc] hover:text-white hover:bg-[#14161a]'
          }`}
        >
          <svg
            viewBox="0 0 50 50"
            className="w-10 h-10 mb-1 fill-none stroke-current stroke-[1.5] stroke-linecap-round stroke-linejoin-round"
            aria-hidden="true"
          >
            <path d="m19 7-7 4-4 21 6 1 3-11v20h16V22l3 11 6-1-4-21-7-4" />
            <path d="m19 7 6 8 6-8M25 15v27M20 27h3M27 27h3M17 37h6M27 37h6" />
          </svg>
          <span className="text-xs tracking-wider">Jacket</span>
        </button>

        {/* Cap */}
        <button
          onClick={() => onSelectCategory('cap')}
          className={`flex flex-col items-center justify-center py-4 px-2 transition-all ${
            currentCategory === 'cap'
              ? 'bg-gradient-to-b from-blue-950/40 to-[#0e1726] text-blue-400 font-bold'
              : 'text-[#d6d8dc] hover:text-white hover:bg-[#14161a]'
          }`}
        >
          <svg
            viewBox="0 0 50 50"
            className="w-10 h-10 mb-1 fill-none stroke-current stroke-[1.5] stroke-linecap-round stroke-linejoin-round"
            aria-hidden="true"
          >
            <path d="M10 28C10 14 17 7 27 7s15 8 15 21H10Z" />
            <path d="M10 28c-5 1-8 4-7 7 2 4 18 4 29 0 5-2 8-4 10-7H10ZM26 8v20M18 11c-3 5-4 10-4 17M34 11c3 5 4 10 4 17" />
          </svg>
          <span className="text-xs tracking-wider">Cap</span>
        </button>

        {/* More Categories */}
        <button
          onClick={onOpenMoreCategories}
          className="flex flex-col items-center justify-center py-4 px-2 text-[#d6d8dc] hover:text-white hover:bg-[#14161a] transition-all"
        >
          <div className="w-10 h-10 mb-1 grid place-items-center text-blue-400">
            <Layers className="w-7 h-7" />
          </div>
          <span className="text-xs tracking-wider">All & More</span>
        </button>
      </div>
    </nav>
  );
};
