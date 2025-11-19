

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
    [key: string]: string;
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
    size?: string;
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
  diningExperiences?: { name: string; type: string }[];
  experiencesAndActivities?: string[];
  weddingVenues?: string[];
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

export interface MonthDestination {
    name: string;
    imageId: string;
    slug: string;
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
    stateId: string;
    name: string;
    image: string;
    description: string;
    totalHotels: number;
}

export interface Attraction {
    attractionId: string;
    name: string;
    city: string;
    cityId: string;
    image: {
        src: string;
        caption: string;
    };
    description: string;
    timing: string;
    fees: {
        type: string;
        amount: string;
    }[];
    bestTimeToVisit: string;
    distances: {
        from: string;
        distance: string;
    }[];
    notes?: string[];
    nearbyHotels?: string[];
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

export interface Lead {
  name: string;
  email: string;
  phone: string;
  message: string;
  hotelId?: string;
  packageId?: string;
  source: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  createdAt: string;
}

export interface DynamicPricingRule {
  type: 'season' | 'weekend' | 'demand' | 'margin';
  state?: string;
  city?: string;
  hotelId?: string;
  factor: number;
  active: boolean;
}

export interface Payment {
  orderId: string;
  gateway: 'Razorpay' | 'Stripe';
  amount: number;
  userId: string;
  hotelId?: string;
  packageId?: string;
  status: 'success' | 'failed';
  response: object;
  createdAt: string;
}

export interface Analytics {
    date: string;
    totalVisitors: number;
    hotelClicks: number;
    packageClicks: number;
    affiliateClicks: number;
    topStates: string[];
    topHotels: string[];
    createdAt: string;
}

export interface SeoPage {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  type: 'state-hotels' | 'city-hotels' | 'interest' | 'month' | 'package';
  contentHtml: string;
  image: string;
  state: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface Itinerary {
  day: number;
  title: string;
  description: string;
  stay?: string;
  meals?: string[];
  activities: string[];
}
