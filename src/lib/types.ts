
export interface Hotel {
  hotelId: string;
  name: string;
  brand: string;
  brandSlug: string;
  state: string;
  stateId: string;
  city: string;
  cityId: string;
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
    makemytrip: string;
    redbus: string;
    uber: string;
    ola: string;
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
  state: string[];
  city: string[];
  price: number;
  dynamicPrice: number;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  images: string[];
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
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

export interface State {
  stateId: string;
  name: string;
  image: string;
  description: string;
  totalCities: number;
  totalHotels: number;
}

export interface City {
    cityId: string;
    name: string;
    image: string;
    description: string;
    totalHotels: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  wishlist: string[];
  bookings: string[];
  lastVisit: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  permissions: {
    manageHotels: boolean;
    managePackages: boolean;
    manageSEO: boolean;
    manageAffiliates: boolean;
    managePricing: boolean;
    manageLeads: boolean;
  };
}
