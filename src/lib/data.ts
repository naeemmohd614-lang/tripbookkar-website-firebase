
// This file is a placeholder for when data is fetched dynamically.
// For now, we are using the JSON file.
import type { Destination, Brand, State, City, Hotel } from './types';
import rawHotels from '@/data/new-hotels.json';
import brands from '@/data/brands.json';
import states from '@/data/states.json';
import cities from '@/data/cities.json';
import featuredPackages from '@/data/packages.json';

// We need to cast this because the JSON import is not typed
const hotels: Hotel[] = (rawHotels as any[]).map(hotel => ({
  ...hotel,
  hotelId: hotel.id,
}));


export { hotels };
export { brands };
export { states };
export { cities };
export { featuredPackages };


export const popularDestinations: Destination[] = [
  { city: 'Goa', state: 'Goa', imageId: 'dest-goa' },
  { city: 'Jaipur', state: 'Rajasthan', imageId: 'dest-jaipur' },
  { city: 'Alleppey', state: 'Kerala', imageId: 'dest-kerala' },
  { city: 'Mumbai', state: 'Maharashtra', imageId: 'dest-mumbai' },
];
