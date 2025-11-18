
export interface Hotel {
  id: string;
  name: string;
  brand: string;
  state: string;
  city: string;
  address: string;
  images: {
    src: string;
    thumb: string;
    caption: string;
    hash: string;
  }[];
  roomCategories: { name: string; size: string, count: number }[];
  priceBase: number;
  rating: number;
  about: string;
  facilities: {
    pool: boolean;
    spa: boolean;
    gym: boolean;
    wifi: boolean;
    parking: boolean;
    petFriendly: boolean;
    checkIn: string;
    checkOut: string;
  };
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
