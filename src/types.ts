/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 
  | 'Mobility & Transport'
  | 'Infrastructure & Utilities'
  | 'Environment & Sustainability'
  | 'Public Health & Safety'
  | 'Community & Social';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  votes: number;
  createdAt: string;
  status: 'reported' | 'investigating' | 'scheduled' | 'resolved';
  reporterName?: string;
  location?: string;
  hasVoted?: boolean;
}

export const CATEGORIES: Category[] = [
  'Mobility & Transport',
  'Infrastructure & Utilities',
  'Environment & Sustainability',
  'Public Health & Safety',
  'Community & Social'
];
