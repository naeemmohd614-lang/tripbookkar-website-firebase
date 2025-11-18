

export interface Hotel {
  hotelId: string;
  name: string;
  brand: string;
  brandSlug: string;
  state: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  pincode: string;
  about: string;
  distance: {
    airport: string;
    railway: string;
    bus: string;
  };
  images: {
    src: string;
    thumb: string;
    caption: string;
    hash: string;
  }[];
  roomCategories: {
    name: string;
    count: number;
    size: string;
  }[];
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
  diningCount: number;
  banquetCount: number;
  basePrice: number;
  dynamicPrice: number;
  rating: number;
  tags: string[];
  affiliate: {
    booking: string;
    agoda: string;
    expedia: string;
    tripadvisor: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
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

export interface Brand {
  brandSlug: string;
  name: string;
  logo: string;
  description: string;
  totalHotels: number;
}
