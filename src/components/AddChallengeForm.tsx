/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MapPin, User, LayoutGrid, FileText } from 'lucide-react';
import { CATEGORIES, Category, Challenge } from '../types';

interface AddChallengeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newChallenge: Omit<Challenge, 'id' | 'votes' | 'createdAt' | 'status' | 'hasVoted'>) => void;
}

export function AddChallengeForm({ isOpen, onClose, onSubmit }: AddChallengeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('Mobility & Transport');
  const [location, setLocation] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 15) {
      newErrors.description = 'Please describe the challenge in at least 15 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      location: location.trim() || undefined,
      reporterName: reporterName.trim() || undefined
    });

    // Reset Form Fields
    setTitle('');
    setDescription('');
    setCategory('Mobility & Transport');
    setLocation('');
    setReporterName('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900 z-50 cursor-pointer"
          />

          {/* Bottom Sheet Modal Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 inset-x-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-xl w-full bg-white rounded-t-3xl md:rounded-3xl shadow-2xl z-50 flex flex-col max-h-[92vh] md:max-h-[85vh] overflow-hidden"
          >
            {/* Grabber indicator for Mobile Bottom Sheet */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3 md:hidden shrink-0" />

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Report a Neighborhood Challenge</h2>
                <p className="text-xs text-slate-500">Add civic reports to gain consensus and notify authorities</p>
              </div>
              <button
                id="close-modal-btn"
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer min-h-[44px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-5">
              
              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="challenge-category-select" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <LayoutGrid className="w-4 h-4 text-green-600" />
                  Smart City Track <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="challenge-category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-green-500 focus:bg-white rounded-xl text-sm font-semibold text-slate-800 outline-none transition-all cursor-pointer appearance-none min-h-[48px]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Title Input */}
              <div className="space-y-1.5">
                <label htmlFor="challenge-title-input" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-green-600" />
                  What is the issue? <span className="text-rose-500">*</span>
                </label>
                <input
                  id="challenge-title-input"
                  type="text"
                  maxLength={60}
                  placeholder="e.g., Unlit crosswalk near Lincoln School"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
                  }}
                  className={`w-full px-4 py-3.5 bg-slate-50 border ${errors.title ? 'border-rose-400 focus:border-rose-500 bg-rose-50/10' : 'border-slate-200 focus:border-green-500 focus:bg-white'} rounded-xl text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 min-h-[48px]`}
                />
                <div className="flex justify-between items-center text-xs">
                  {errors.title ? (
                    <span className="text-rose-600 font-semibold">{errors.title}</span>
                  ) : (
                    <span className="text-slate-400">Describe the problem briefly</span>
                  )}
                  <span className="text-slate-400">{title.length}/60</span>
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-1.5">
                <label htmlFor="challenge-desc-textarea" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-green-600" />
                  Detailed Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="challenge-desc-textarea"
                  maxLength={350}
                  rows={4}
                  placeholder="Describe the challenge. What needs fixing? How is it impacting the local neighborhood?"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
                  }}
                  className={`w-full px-4 py-3.5 bg-slate-50 border ${errors.description ? 'border-rose-400 focus:border-rose-500 bg-rose-50/10' : 'border-slate-200 focus:border-green-500 focus:bg-white'} rounded-xl text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 min-h-[48px] resize-none`}
                />
                <div className="flex justify-between items-center text-xs">
                  {errors.description ? (
                    <span className="text-rose-600 font-semibold">{errors.description}</span>
                  ) : (
                    <span className="text-slate-400">Please provide helpful context</span>
                  )}
                  <span className="text-slate-400">{description.length}/350</span>
                </div>
              </div>

              {/* Location Input */}
              <div className="space-y-1.5">
                <label htmlFor="challenge-location-input" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-green-600" />
                  Location / Address <span className="text-xs font-normal text-slate-400">(Optional)</span>
                </label>
                <input
                  id="challenge-location-input"
                  type="text"
                  placeholder="e.g., 5th Ave & Pine St or near public park"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-green-500 focus:bg-white rounded-xl text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 min-h-[48px]"
                />
              </div>

              {/* Reporter Name */}
              <div className="space-y-1.5">
                <label htmlFor="challenge-reporter-input" className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-green-600" />
                  Your Name <span className="text-xs font-normal text-slate-400">(Optional)</span>
                </label>
                <input
                  id="challenge-reporter-input"
                  type="text"
                  placeholder="e.g., Jane Doe"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-green-500 focus:bg-white rounded-xl text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 min-h-[48px]"
                />
              </div>

              {/* Form Submission Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  id="cancel-form-btn"
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/2 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer select-none text-center min-h-[48px]"
                >
                  Cancel
                </button>
                <button
                  id="submit-form-btn"
                  type="submit"
                  className="w-full sm:w-1/2 py-3.5 px-4 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-600/10 cursor-pointer select-none text-center flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Send className="w-4 h-4" />
                  Submit Challenge
                </button>
              </div>

            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
