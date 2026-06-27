/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { ChallengeList } from './components/ChallengeList';
import { AddChallengeForm } from './components/AddChallengeForm';
import { Challenge, Category } from './types';
import { INITIAL_CHALLENGES } from './data';
import { 
  Lightbulb, 
  ThumbsUp, 
  Wrench, 
  CheckCircle,
  Sparkles,
  HelpCircle,
  TrendingUp
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'local_impact_finder_challenges';

const getInitialChallenges = (): Challenge[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved challenges', e);
      }
    }
  }
  return INITIAL_CHALLENGES;
};

export default function App() {
  const [challenges, setChallenges] = useState<Challenge[]>(getInitialChallenges);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State Sync with LocalStorage whenever challenges change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(challenges));
  }, [challenges]);

  const syncChallenges = (updated: Challenge[]) => {
    setChallenges(updated);
  };

  // 3. Handle Interactive Upvoting
  const handleUpvote = (id: string) => {
    const updated = challenges.map((challenge) => {
      if (challenge.id === id) {
        const alreadyVoted = !!challenge.hasVoted;
        return {
          ...challenge,
          votes: alreadyVoted ? challenge.votes - 1 : challenge.votes + 1,
          hasVoted: !alreadyVoted
        };
      }
      return challenge;
    });
    syncChallenges(updated);
  };

  // 4. Handle Submitting a New Challenge Report
  const handleAddChallenge = (newFields: Omit<Challenge, 'id' | 'votes' | 'createdAt' | 'status' | 'hasVoted'>) => {
    const newChallenge: Challenge = {
      ...newFields,
      id: Date.now().toString(),
      votes: 1, // Start with 1 vote from the submitter
      createdAt: new Date().toISOString(),
      status: 'reported',
      hasVoted: true // Mark as upvoted by the creator
    };

    const updated = [newChallenge, ...challenges];
    syncChallenges(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased overflow-x-hidden pb-12">
      
      {/* Platform Header */}
      <Header 
        challenges={challenges} 
        onAddClick={() => setIsFormOpen(true)} 
      />

      {/* Top Filter Category Bar */}
      <CategoryBar 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      {/* Main Grid Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Modern Welcoming Hero Banner */}
        <div className="mb-8 p-6 sm:p-8 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-3xl relative overflow-hidden shadow-sm shadow-green-600/10">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-green-100 text-xs font-bold mb-4 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Empowering Urban Solutions
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Help fix issues in your local neighborhood
            </h2>
            
            <p className="text-green-50 text-sm sm:text-base leading-relaxed mb-0 font-medium opacity-95">
              Identify key local issues under the 5 Smart City Tracks. Submit suggestions, vote on critical upgrades, and see real-time communal prioritization. We bridge the gap between residents and public works departments.
            </p>
          </div>
        </div>

        {/* Challenge Feed Grid & Explainer Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left/Center: Challenge Card Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                {selectedCategory === 'All' ? 'All Community Challenges' : `${selectedCategory} Feed`}
              </h2>
              <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                Showing {challenges.filter(c => selectedCategory === 'All' || c.category === selectedCategory).length} items
              </span>
            </div>

            <ChallengeList 
              challenges={challenges}
              selectedCategory={selectedCategory}
              onUpvote={handleUpvote}
              onAddClick={() => setIsFormOpen(true)}
            />
          </div>

          {/* Right: Modern Civic Lifecycle Sidebar Guidance */}
          <div className="space-y-6">
            
            {/* Guide Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-green-600" />
                How Civic Impact Works
              </h3>
              
              <div className="space-y-5">
                {/* Step 1 */}
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Report & Catalog</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Identify a problem in your street, park, or block. Fill out a simple card mapping it to a dedicated track.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Build Community Consensus</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Fellow citizens upvote critical challenges. Most-needed repairs naturally float to the top of the local queue.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Review & Investigation</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Platform moderators and municipal teams investigate high-consensus reports and update their resolution stage.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 text-green-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Action & Resolution</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      City teams schedule construction, gardening, or electric upgrades. The issue is officially completed and resolved!
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Smart City Vision Note */}
            <div className="bg-green-50/40 rounded-2xl border border-green-100 p-5">
              <h4 className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-green-600 shrink-0" />
                The Smart City Pledge
              </h4>
              <p className="text-xs text-green-950/80 leading-relaxed font-medium">
                Our local environment improves when community members collaborate with digital infrastructure. By sharing high-fidelity, categorized data, municipal budgets can be prioritized accurately and equitably.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Slide-up Bottom Sheet Report Modal Form */}
      <AddChallengeForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddChallenge}
      />

    </div>
  );
}
