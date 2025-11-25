
// This file is a placeholder for when data is fetched dynamically.
// For now, we are using the JSON file.
import type { Destination, Brand, State, City, Hotel, MonthDestination, Attraction } from './types';

import marriottHotels from '@/data/marriott.json';
import tajHotels from '@/data/taj.json';
import oberoiHotels from '@/data/oberoi.json';
import leelaHotels from '@/data/the-leela.json';
import hyattHotels from '@/data/hyatt.json';
import otherHotels from '@/data/other-hotels.json';
import hiltonHotels from '@/data/hilton.json';
import accorHotels from '@/data/accor.json';
import ihgHotels from '@/data/ihg.json';
import radissonHotels from '@/data/radisson.json';


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

export const trustedPartners = [
    { name: "Marriott", slug: "marriott" },
    { name: "Taj", slug: "taj" },
    { name: "Oberoi", slug: "oberoi" },
    { name: "The Leela", slug: "the-leela" },
    { name: "Hyatt", slug: "hyatt" },
    { name: "Hilton", slug: "hilton" },
    { name: "Accor", slug: "accor" },
    { name: "IHG", slug: "ihg" },
    { name: "Radisson", slug: "radisson" },
    { name: "ITC Hotels", slug: "itc" },
    { name: "Vistara", slug: "vistara" },
    { name: "IndiGo", slug: "indigo" },
];
