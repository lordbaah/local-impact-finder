/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  User, 
  Calendar, 
  ChevronUp, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Hammer 
} from 'lucide-react';
import { Challenge, Category } from '../types';

interface ChallengeCardProps {
  key?: string | number;
  challenge: Challenge;
  onUpvote: (id: string) => void;
}

// Map categories to modern visual color accents
const CATEGORY_STYLES: Record<Category, { badge: string; border: string; bg: string }> = {
  'Mobility & Transport': {
    badge: 'bg-green-50 text-green-700 border-green-200',
    border: 'hover:border-green-300',
    bg: 'bg-green-50/20'
  },
  'Infrastructure & Utilities': {
    badge: 'bg-green-50 text-green-700 border-green-200',
    border: 'hover:border-green-300',
    bg: 'bg-green-50/20'
  },
  'Environment & Sustainability': {
    badge: 'bg-green-50 text-green-700 border-green-200',
    border: 'hover:border-green-300',
    bg: 'bg-green-50/20'
  },
  'Public Health & Safety': {
    badge: 'bg-green-50 text-green-700 border-green-200',
    border: 'hover:border-green-300',
    bg: 'bg-green-50/20'
  },
  'Community & Social': {
    badge: 'bg-green-50 text-green-700 border-green-200',
    border: 'hover:border-green-300',
    bg: 'bg-green-50/20'
  }
};

const STATUS_CONFIGS = {
  reported: {
    label: 'Reported',
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    style: 'bg-slate-100 text-slate-700 border-slate-200'
  },
  investigating: {
    label: 'Under Review',
    icon: <Clock className="w-3.5 h-3.5" />,
    style: 'bg-slate-50 text-slate-600 border-slate-150'
  },
  scheduled: {
    label: 'Scheduled',
    icon: <Hammer className="w-3.5 h-3.5" />,
    style: 'bg-slate-50 text-slate-600 border-slate-150'
  },
  resolved: {
    label: 'Resolved',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    style: 'bg-green-100 text-green-800 border-green-200'
  }
};

export function ChallengeCard({ challenge, onUpvote }: ChallengeCardProps) {
  const catStyle = CATEGORY_STYLES[challenge.category];
  const statusConfig = STATUS_CONFIGS[challenge.status];

  // Formatter for relative date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative overflow-hidden`}
    >
      {/* Visual Accent Tab on the left border */}
      <div className={`absolute top-0 bottom-0 left-0 w-1 bg-green-500/0 hover:bg-green-500`} />

      <div>
        {/* Header Badges Grid */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
          {/* Category Tag */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2.5 py-1 rounded-md">
            {challenge.category}
          </span>

          {/* Status Tag */}
          <span className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md border ${statusConfig.style}`}>
            {statusConfig.icon}
            <span>{statusConfig.label}</span>
          </span>
        </div>

        {/* Challenge Title */}
        <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-snug mb-2">
          {challenge.title}
        </h3>

        {/* Challenge Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4.5 font-normal">
          {challenge.description}
        </p>

        {/* Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-slate-50 text-xs text-slate-500 font-medium">
          {challenge.location && (
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{challenge.location}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 min-w-0">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{challenge.reporterName || 'Anonymous Neighbor'}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:col-span-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Reported on {formatDate(challenge.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Footer Upvoting Container */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-50">
        
        {/* Status indicator description or visual resolved text */}
        <div className="text-xs text-slate-500 flex items-center gap-1">
          {challenge.status === 'resolved' ? (
            <span className="text-green-600 font-bold flex items-center gap-1">
              🎉 Solution Completed
            </span>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-700 font-bold text-sm">{challenge.votes}</span>
              <span className="text-slate-500 text-xs uppercase tracking-wide">votes</span>
            </div>
          )}
        </div>

        {/* Beautiful Upvote CTA Trigger */}
        <motion.button
          id={`upvote-btn-${challenge.id}`}
          whileTap={{ scale: 0.95 }}
          onClick={() => onUpvote(challenge.id)}
          className={`
            flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-bold transition-all duration-200 select-none cursor-pointer min-h-[48px] text-sm group
            ${challenge.hasVoted 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-slate-50 hover:bg-green-50 border-slate-200 text-slate-700 hover:text-green-700'
            }
          `}
        >
          <motion.div
            animate={challenge.hasVoted ? { y: [-2, 2, -2, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <ChevronUp className={`w-5 h-5 transition-colors ${challenge.hasVoted ? 'text-green-600' : 'text-slate-400 group-hover:text-green-600'}`} />
          </motion.div>
          <span>
            {challenge.hasVoted ? 'Upvoted' : 'Upvote'}
          </span>
        </motion.button>

      </div>
    </motion.div>
  );
}
