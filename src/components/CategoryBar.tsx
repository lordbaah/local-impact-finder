/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CATEGORIES, Category } from '../types';
import { 
  Bus, 
  Wrench, 
  Leaf, 
  ShieldAlert, 
  Users, 
  Grid 
} from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
}

const CATEGORY_ICONS: Record<Category | 'All', React.ReactNode> = {
  'All': <Grid className="w-4 h-4" />,
  'Mobility & Transport': <Bus className="w-4 h-4" />,
  'Infrastructure & Utilities': <Wrench className="w-4 h-4" />,
  'Environment & Sustainability': <Leaf className="w-4 h-4" />,
  'Public Health & Safety': <ShieldAlert className="w-4 h-4" />,
  'Community & Social': <Users className="w-4 h-4" />
};

export function CategoryBar({ selectedCategory, onSelectCategory }: CategoryBarProps) {
  const allFilters: (Category | 'All')[] = ['All', ...CATEGORIES];

  return (
    <div className="w-full bg-white md:bg-white/50 md:backdrop-blur-md border-b border-slate-100 py-3.5 md:sticky md:top-[121px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Scroll Containment */}
        <div className="relative flex items-center">
          
          {/* Scrollable Badges Wrapper */}
          <div 
            id="category-scroll-container"
            className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth pb-1.5 pt-0.5 -mx-4 px-4 sm:mx-0 sm:px-0 w-full"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {allFilters.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  id={`cat-btn-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer select-none min-h-[48px] border shrink-0
                    ${isActive 
                      ? 'bg-green-600 border-green-600 text-white shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'
                    }
                  `}
                >
                  {CATEGORY_ICONS[cat]}
                  <span>{cat === 'All' ? 'All Impacts' : cat}</span>
                </button>
              );
            })}
          </div>

          {/* Optional: Right gradient indicator for mobile horizontal scroll */}
          <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
        </div>

      </div>
    </div>
  );
}
