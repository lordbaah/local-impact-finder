/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Challenge, Category } from '../types';
import { ChallengeCard } from './ChallengeCard';
import { Search, SlidersHorizontal, ArrowUpDown, AlertCircle, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ChallengeListProps {
  challenges: Challenge[];
  selectedCategory: Category | 'All';
  onUpvote: (id: string) => void;
  onAddClick: () => void;
}

type SortOption = 'votes' | 'newest';

export function ChallengeList({ 
  challenges, 
  selectedCategory, 
  onUpvote, 
  onAddClick 
}: ChallengeListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('votes');

  // Filter and sort challenges
  const filteredAndSortedChallenges = useMemo(() => {
    let result = [...challenges];

    // 1. Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(c => c.category === selectedCategory);
    }

    // 2. Text search query (title, description, location)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(c => 
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        (c.location && c.location.toLowerCase().includes(query))
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'votes') {
        // Primary: Votes (descending), Secondary: Date (descending)
        if (b.votes !== a.votes) {
          return b.votes - a.votes;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        // Newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [challenges, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full">
      
      {/* Search & Sort Panel */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            id="search-challenges-input"
            type="text"
            placeholder="Search active issues, streets, parks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-green-500 focus:bg-white rounded-xl text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 min-h-[48px]"
          />
        </div>

        {/* Sorting Controller */}
        <div className="flex items-center gap-2.5 shrink-0">
          <label htmlFor="sort-challenges-select" className="text-xs font-bold uppercase tracking-wider text-slate-400 hidden lg:inline">
            Sort by:
          </label>
          <div className="relative w-full sm:w-auto">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-600 w-4 h-4 pointer-events-none" />
            <select
              id="sort-challenges-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full sm:w-auto pl-10 pr-9 py-3 bg-slate-50 border border-slate-200 hover:border-green-300 focus:border-green-500 rounded-xl text-sm font-semibold text-slate-750 outline-none transition-all cursor-pointer appearance-none min-h-[48px]"
            >
              <option value="votes">Most Popular (Votes)</option>
              <option value="newest">Recent Reports</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>

      </div>

      {/* Grid List of Challenges */}
      <AnimatePresence>
        {filteredAndSortedChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAndSortedChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onUpvote={onUpvote}
              />
            ))}
          </div>
        ) : (
          /* Empty State Illustration */
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center max-w-xl mx-auto flex flex-col items-center justify-center shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-950 mb-1">
              No challenges found
            </h3>
            
            <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
              {searchQuery 
                ? `No reported challenges match "${searchQuery}". Try editing your keyword search.` 
                : `No reported issues are currently active in the "${selectedCategory}" track. Be the first to start a change!`
              }
            </p>

            <button
              id="empty-state-report-btn"
              onClick={onAddClick}
              className="flex items-center gap-2 px-5 py-3 bg-green-50 text-green-700 hover:bg-green-100 font-bold rounded-xl transition-all cursor-pointer select-none min-h-[48px]"
            >
              <Sparkles className="w-4 h-4" />
              Report in {selectedCategory === 'All' ? 'General' : selectedCategory}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
