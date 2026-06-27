/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Challenge } from './types';

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Inadequate Bike Lane Markings',
    description: 'The green paint for the cycle lane has faded almost entirely, causing vehicles to repeatedly encroach onto the bicycle path during rush hour.',
    category: 'Mobility & Transport',
    votes: 15,
    createdAt: '2026-06-25T10:30:00Z',
    status: 'investigating',
    reporterName: 'Elena Rostova',
    location: 'Broadway Corridor & 12th St'
  },
  {
    id: '2',
    title: 'Severe Pothole on 5th Ave',
    description: 'A deep pothole has developed in the middle lane, forcing vehicles to swerve abruptly. Potentially hazardous for cyclists and vehicles alike.',
    category: 'Infrastructure & Utilities',
    votes: 12,
    createdAt: '2026-06-26T08:15:00Z',
    status: 'reported',
    reporterName: 'Marcus Vance',
    location: '5th Ave & Pine St'
  },
  {
    id: '3',
    title: 'Community Garden Tools Needed',
    description: 'We are seeking communal garden equipment like shovels, trowels, and watering cans to help volunteers set up the new neighborhood vegetable patch.',
    category: 'Community & Social',
    votes: 8,
    createdAt: '2026-06-24T14:45:00Z',
    status: 'scheduled',
    reporterName: 'David Chen',
    location: 'Maple Street Public Park'
  },
  {
    id: '4',
    title: 'Unlit Crosswalk Near School',
    description: 'The pedestrian crossing safety warning light and overhead streetlamps have failed. It is pitch black during early morning and late afternoon school transits.',
    category: 'Public Health & Safety',
    votes: 4,
    createdAt: '2026-06-26T17:20:00Z',
    status: 'reported',
    reporterName: 'Sarah Jenkins',
    location: 'Oak Ridge Elementary Crossing'
  }
];
