// This file is a placeholder for when data is fetched dynamically.
// For now, we are using the JSON file.
import type { Package, Destination, Brand, State, City } from './types';
import hotels from '@/data/new-hotels.json';
import brands from '@/data/brands.json';
import states from '@/data/states.json';
import cities from '@/data/cities.json';

// We need to cast this because the JSON import is not typed
export { hotels };
export { brands };
export { states };
export { cities };


export const featuredPackages: Package[] = [
  {
    id: 'pkg1',
    name: 'Kerala Honeymoon Special',
    days: 6,
    nights: 5,
    price: 35000,
    description: 'Experience the romance of Kerala\'s backwaters and hills.',
    images: ['package-1'],
    itinerary: [
      { day: 1, description: 'Arrive in Cochin, transfer to Munnar.' },
      { day: 2, description: 'Munnar sightseeing.' },
      { day: 3, description: 'Travel to Thekkady, visit spice plantations.' },
      { day: 4, description: 'Houseboat stay in Alleppey backwaters.' },
      { day: 5, description: 'Relax at Marari Beach.' },
      { day: 6, description: 'Departure from Cochin.' },
    ],
  },
  {
    id: 'pkg2',
    name: 'Rajasthan Royal Tour',
    days: 8,
    nights: 7,
    price: 55000,
    description: 'Explore the majestic forts and palaces of Rajasthan.',
    images: ['package-2'],
    itinerary: [
      { day: 1, description: 'Arrive in Jaipur, check-in to hotel.' },
      { day: 2, description: 'Jaipur city tour: Amber Fort, City Palace.' },
      { day: 3, description: 'Travel to Jodhpur, the Blue City.' },
      { day: 4, description: 'Jodhpur sightseeing: Mehrangarh Fort.' },
      { day: 5, description: 'Travel to Udaipur, the City of Lakes.' },
      { day: 6, description: 'Udaipur sightseeing: City Palace, Lake Pichola.' },
      { day: 7, description: 'Day trip to Kumbhalgarh Fort.' },
      { day: 8, description: 'Departure from Udaipur.' },
    ],
  },
  {
    id: 'pkg3',
    name: 'Goa Beach Party',
    days: 4,
    nights: 3,
    price: 18000,
    description: 'Enjoy the vibrant nightlife and beautiful beaches of Goa.',
    images: ['package-3'],
    itinerary: [
      { day: 1, description: 'Arrive in Goa, check-in and relax.' },
      { day: 2, description: 'North Goa tour: Baga, Calangute beaches.' },
      { day: 3, description: 'South Goa tour and water sports.' },
      { day: 4, description: 'Departure from Goa.' },
    ],
  },
  {
    id: 'pkg4',
    name: 'Himalayan Adventure',
    days: 7,
    nights: 6,
    price: 42000,
    description: 'Trek through the stunning landscapes of the Himalayas.',
    images: ['package-4'],
    itinerary: [
      { day: 1, description: 'Arrive in Manali.' },
      { day: 2, description: 'Acclimatization and local sightseeing.' },
      { day: 3, description: 'Trek to Chika.' },
      { day: 4, description: 'Trek to Balu ka Ghera.' },
      { day: 5, description: 'Cross Hampta Pass, trek to Shea Goru.' },
      { day: 6, description: 'Trek to Chatru, drive to Chandratal.' },
      { day: 7, description: 'Drive back to Manali and departure.' },
    ],
  },
];


export const popularDestinations: Destination[] = [
  { city: 'Goa', state: 'Goa', imageId: 'dest-goa' },
  { city: 'Jaipur', state: 'Rajasthan', imageId: 'dest-jaipur' },
  { city: 'Alleppey', state: 'Kerala', imageId: 'dest-kerala' },
  { city: 'Mumbai', state: 'Maharashtra', imageId: 'dest-mumbai' },
];
