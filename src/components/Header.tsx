/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Activity, Plus, Award, AlertCircle } from 'lucide-react';
import { Challenge } from '../types';

interface HeaderProps {
  challenges: Challenge[];
  onAddClick: () => void;
}

export function Header({ challenges, onAddClick }: HeaderProps) {
  const totalVotes = challenges.reduce((sum, c) => sum + c.votes, 0);
  const resolvedCount = challenges.filter(c => c.status === 'resolved').length;
  const activeCount = challenges.length - resolvedCount;

  return (
    <header className="bg-white border-b border-slate-200 md:sticky top-0 z-40 md:backdrop-blur-md bg-white md:bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo and Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                Local Impact Finder
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200 rounded-full uppercase tracking-wider">
                  Smart City Hub
                </span>
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Crowdsourcing neighborhood improvements to shape a smarter community
              </p>
            </div>
          </div>

          {/* Action Trigger for New Challenge & Profile Bubble */}
          <div className="flex items-center gap-4 self-stretch md:self-auto">
            <button
              id="report-issue-btn"
              onClick={onAddClick}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-xl transition-all duration-250 shadow-md shadow-green-600/10 cursor-pointer text-base select-none min-h-[48px]"
            >
              <Plus className="w-5 h-5" />
              Report Local Challenge
            </button>

            {/* Profile Avatar from Sleek Interface Theme */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 shadow-sm overflow-hidden flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 select-none">
                JD
              </div>
            </div>
          </div>

        </div>

        {/* Community Stats Dashboard Grid */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-5 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-700 shrink-0 hidden sm:flex">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Challenges</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-800">{activeCount}</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-700 shrink-0 hidden sm:flex">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Upvotes</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-800">{totalVotes}</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-700 shrink-0 hidden sm:flex">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Issues Resolved</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-800">{resolvedCount}</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
