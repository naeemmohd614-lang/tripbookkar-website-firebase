export interface Hotel {
  id: string;
  name: string;
  brand: string;
  state: string;
  city: string;
  address: string;
  images: string[];
  facilities: string[];
  roomCategories: string[];
  priceBase: number;
  rating: number;
}

export interface Package {
  id: string;
  name: string;
  days: number;
  nights: number;
  price: number;
  itinerary: { day: number; description: string }[];
  images: string[];
  description: string;
}

export interface Destination {
  city: string;
  state: string;
  imageId: string;
}
