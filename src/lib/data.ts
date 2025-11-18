import type { Hotel, Package, Destination } from './types';

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'The Grand Palace',
    brand: 'Luxury Collection',
    state: 'Rajasthan',
    city: 'Jaipur',
    address: '123 Palace Road, Jaipur',
    images: [{
      "src": "https://picsum.photos/seed/hotel-4/1080/720",
      "thumb": "https://picsum.photos/seed/hotel-4/300/200",
      "caption": "Hotel Exterior",
      "hash": "hotel-4"
    }],
    roomCategories: [
      { name: 'Deluxe', size: '35 m2', count: 20 },
      { name: 'Suite', size: '60 m2', count: 5 },
    ],
    priceBase: 8000,
    rating: 4.8,
    facilities: {
      pool: true,
      spa: true,
      wifi: true,
      gym: true,
      parking: true,
      petFriendly: false,
      checkIn: "14:00",
      checkOut: "12:00"
    },
    about: "A luxurious palace hotel offering a glimpse into royal life.",
  },
  {
    id: '2',
    name: 'Goa Beach Resort',
    brand: 'Coastal Escapes',
    state: 'Goa',
    city: 'Goa',
    address: '456 Beach Avenue, North Goa',
    images: [{
      "src": "https://picsum.photos/seed/hotel-3/1080/720",
      "thumb": "https://picsum.photos/seed/hotel-3/300/200",
      "caption": "Beachfront view",
      "hash": "hotel-3"
    }],
    roomCategories: [
        { name: 'Standard', size: '30 m2', count: 50 },
        { name: 'Sea View', size: '35 m2', count: 25 },
    ],
    priceBase: 5500,
    rating: 4.5,
    facilities: {
      pool: true,
      spa: false,
      wifi: true,
      gym: false,
      parking: true,
      petFriendly: true,
      checkIn: "15:00",
      checkOut: "11:00"
    },
    about: "A beautiful resort right on the shores of the Arabian Sea."
  },
  {
    id: '3',
    name: 'Mumbai Modern Stay',
    brand: 'City Hotels',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: '789 Business District, Mumbai',
    images: [{
      "src": "https://picsum.photos/seed/hotel-2/1080/720",
      "thumb": "https://picsum.photos/seed/hotel-2/300/200",
      "caption": "Cityscape from room",
      "hash": "hotel-2"
    }],
    roomCategories: [
        { name: 'Business', size: '32 m2', count: 100 },
        { name: 'Executive', size: '45 m2', count: 30 },
    ],
    priceBase: 7000,
    rating: 4.6,
    facilities: {
      pool: false,
      spa: false,
      wifi: true,
      gym: true,
      parking: true,
      petFriendly: false,
      checkIn: "14:00",
      checkOut: "12:00"
    },
    about: "A contemporary hotel in the heart of Mumbai's bustling business hub."
  },
  {
    id: '4',
    name: 'Kerala Backwater Retreat',
    brand: 'Nature Lodges',
    state: 'Kerala',
    city: 'Alleppey',
    address: '101 Backwater Point, Alleppey',
    images: [{
      "src": "https://picsum.photos/seed/hotel-1/1080/720",
      "thumb": "https://picsum.photos/seed/hotel-1/300/200",
      "caption": "Backwater view from cottage",
      "hash": "hotel-1"
    }],
    roomCategories: [
        { name: 'Cottage', size: '40 m2', count: 15 },
        { name: 'Villa', size: '70 m2', count: 5 },
    ],
    priceBase: 6500,
    rating: 4.7,
    facilities: {
      pool: true,
      spa: true,
      wifi: true,
      gym: false,
      parking: true,
      petFriendly: false,
      checkIn: "13:00",
      checkOut: "11:00"
    },
    about: "Experience tranquility amidst the serene backwaters of Kerala."
  },
   {
    id: '5',
    name: 'Jaipur Heritage Inn',
    brand: 'Heritage Stays',
    state: 'Rajasthan',
    city: 'Jaipur',
    address: '22 Old City, Jaipur',
    images: [{
      "src": "https://picsum.photos/seed/hotel-5/1080/720",
      "thumb": "https://picsum.photos/seed/hotel-5/300/200",
      "caption": "Courtyard",
      "hash": "hotel-5"
    }],
    roomCategories: [
        { name: 'Standard', size: '28 m2', count: 30 },
        { name: 'Heritage Suite', size: '50 m2', count: 10 },
    ],
    priceBase: 4500,
    rating: 4.4,
     facilities: {
      pool: false,
      spa: false,
      wifi: true,
      gym: false,
      parking: true,
      petFriendly: true,
      checkIn: "12:00",
      checkOut: "11:00"
    },
    about: "A charming inn that captures the essence of old Jaipur."
  },
  {
    id: '6',
    name: 'South Goa Paradise',
    brand: 'Coastal Escapes',
    state: 'Goa',
    city: 'Goa',
    address: '33 Serene Beach, South Goa',
    images: [{
      "src": "https://picsum.photos/seed/hotel-6/1080/720",
      "thumb": "https://picsum.photos/seed/hotel-6/300/200",
      "caption": "Private beach access",
      "hash": "hotel-6"
    }],
    roomCategories: [
        { name: 'Deluxe Villa', size: '80 m2', count: 10 },
        { name: 'Oceanfront Bungalow', size: '100 m2', count: 4 },
    ],
    priceBase: 9500,
    rating: 4.9,
    facilities: {
      pool: true,
      spa: true,
      wifi: true,
      gym: true,
      parking: true,
      petFriendly: false,
      checkIn: "15:00",
      checkOut: "12:00"
    },
    about: "An exclusive resort for a peaceful and luxurious beach getaway."
  },
];

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
