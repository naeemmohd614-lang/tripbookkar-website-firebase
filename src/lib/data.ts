


// This file is a placeholder for when data is fetched dynamically.
// For now, we are using the JSON file.
import type { Destination, Brand, State, City, Hotel, MonthDestination, Attraction } from './types';

import marriottHotels from '@/data/marriott.json';
import tajHotels from '@/data/taj.json';
import oberoiHotels from '@/data/oberoi.json';
import leelaHotels from '@/data/the-leela.json';
import hyattHotels from '@/data/hyatt.json';
import otherHotels from '@/data/other-hotels.json';

import brandsData from '@/data/brands.json';
import statesData from '@/data/states.json';
import citiesData from '@/data/cities.json';
import featuredPackages from '@/data/packages.json';
import { attractions as attractionsData } from '@/data/attractions';

// Helper to create a slug from a string
function slugify(text: string) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const allHotelsData = [
  ...marriottHotels,
  ...tajHotels,
  ...oberoiHotels,
  ...leelaHotels,
  ...hyattHotels,
  ...otherHotels
];

// We need to cast this because the JSON import is not typed
const hotels: Hotel[] = (allHotelsData as any[]).map((hotel, index) => ({
  ...hotel,
  hotelId: hotel.id || `${slugify(hotel.name)}-${index}`,
  stateId: slugify(hotel.state),
  cityId: slugify(hotel.city),
  brandSlug: slugify(hotel.brand),
}));

const brands: Brand[] = (brandsData as Brand[]).map(brand => ({
    ...brand,
    brandSlug: slugify(brand.name),
}));
const states: State[] = (statesData as State[]).map(state => ({
    ...state,
    stateId: slugify(state.name),
}));
const cities: City[] = (citiesData as City[]).map(city => ({
    ...city,
    cityId: slugify(city.name),
    stateId: slugify(city.stateId),
}));

export { hotels };
export { brands };
export { states };
export { cities };
export { featuredPackages };
export const attractions: Attraction[] = attractionsData;


export const popularDestinations: Destination[] = [
  { city: 'Goa', state: 'Goa', imageId: 'dest-goa' },
  { city: 'Jaipur', state: 'Rajasthan', imageId: 'dest-jaipur' },
  { city: 'Alleppey', state: 'Kerala', imageId: 'dest-kerala' },
  { city: 'Mumbai', state: 'Maharashtra', imageId: 'dest-mumbai' },
];

export const destinationsByMonth: MonthDestination[] = [
    { name: 'January', imageId: 'month-jan', slug: 'january' },
    { name: 'February', imageId: 'month-feb', slug: 'february' },
    { name: 'March', imageId: 'month-mar', slug: 'march' },
    { name: 'April', imageId: 'month-apr', slug: 'april' },
    { name: 'May', imageId: 'month-may', slug: 'may' },
    { name: 'June', imageId: 'month-jun', slug: 'june' },
    { name: 'July', imageId: 'month-jul', slug: 'july' },
    { name: 'August', imageId: 'month-aug', slug: 'august' },
    { name: 'September', imageId: 'month-sep', slug: 'september' },
    { name: 'October', imageId: 'month-oct', slug: 'october' },
    { name: 'November', imageId: 'month-nov', slug: 'november' },
    { name: 'December', imageId: 'month-dec', slug: 'december' },
];
