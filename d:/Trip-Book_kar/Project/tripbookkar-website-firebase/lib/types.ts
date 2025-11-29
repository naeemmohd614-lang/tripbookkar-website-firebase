
import { z } from 'zod';

export interface Hotel {
  id?: string; // Firestore document ID - optional for new documents
  hotelId?: string; // Keep original ID for links
  name: string;
  brand: string;
  brandSlug?: string;
  state: string;
  stateId?: string;
  city: string;
  cityId?: string;
  location?: {
    lat: number;
    lng: number;
  };
  address: string;
  pincode?: string;
  about: string;
  distance?: {
    [key: string]: string;
  };
  images: {
    src: string;
    caption: string;
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
  experiencesAndActivities?: {value: string}[];
  weddingVenues?: {value: string}[];
  diningCount?: number;
  banquetCount?: number;
  basePrice: number;
  dynamicPrice?: number;
  rating: number;
  tags: {value: string}[];
  affiliate?: {
    booking: string;
    agoda: string;
    expedia: string;
    tripadvisor: string;
    makemytrip: string;
    redbus: string;
    uber: string;
    ola: string;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export const ItinerarySchema = z.object({
  day: z.number().describe('The day number of the itinerary item.'),
  title: z.string().describe('The title for the day\'s plan.'),
  description: z.string().describe('A detailed description of the activities for the day.'),
});
export type Itinerary = z.infer<typeof ItinerarySchema>;

export interface Package {
  id: string;
  name: string;
  days: number;
  nights: number;
  state: string[];
  city: string[];
  price: number;
  dynamicPrice?: number;
  itinerary: Itinerary[];
  images: { src: string; caption: string; }[];
  tags: string[];
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt?: string;
  updatedAt?: string;
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
  bestTimeToVisit?: string;
  idealDuration?: string;
  highlights?: {
    name: string;
    icon: string;
  }[];
}

export interface City {
    cityId: string;
    stateId: string;
    name: string;
    image: string;
    description: string;
    totalHotels: number;
    highlights?: {
      name: string;
      icon: string;
      color: string;
    }[];
}

export interface Attraction {
    attractionId: string;
    name: string;
    city: string;
    cityId: string;
    stateId: string;
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

export interface MonthData {
  id: string;
  name: string;
  slug: string;
  pageImage: {
    src: string;
    caption: string;
  };
  destinations: {
    name: string;
    reason: string;
    hotels: string[] | { name: string }[];
    image: {
      src: string;
      caption: string;
    };
  }[];
}

export const GenerateSeoPageInputSchema = z.object({
  pageType: z.enum(['city', 'state', 'hotelType']).describe('The type of SEO page to generate.'),
  location: z.string().optional().describe('The city or state for which to generate the page (if applicable).'),
  hotelType: z.string().optional().describe('The type of hotel for which to generate the page (if applicable).'),
});
export type GenerateSeoPageInput = z.infer<typeof GenerateSeoPageInputSchema>;

export const GenerateSeoPageOutputSchema = z.object({
  title: z.string().describe('The SEO title for the page.'),
  description: z.string().describe('The SEO description for the page.'),
  content: z.string().describe('The main content of the SEO page.'),
});
export type GenerateSeoPageOutput = z.infer<typeof GenerateSeoPageOutputSchema>;


// Hotel Description Flow
export const GenerateHotelDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the hotel.'),
  city: z.string().optional().describe('The city where the hotel is located.'),
  brand: z.string().optional().describe('The brand of the hotel.'),
});
export type GenerateHotelDescriptionInput = z.infer<typeof GenerateHotelDescriptionInputSchema>;

export const GenerateHotelDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling, paragraph-long "about" description for the hotel.'),
});
export type GenerateHotelDescriptionOutput = z.infer<typeof GenerateHotelDescriptionOutputSchema>;

// Hotel Details Flow
export const GenerateHotelDetailsInputSchema = z.object({
  name: z.string().describe('The name of the hotel.'),
  city: z.string().optional().describe('The city where the hotel is located.'),
  brand: z.string().optional().describe('The brand of the hotel.'),
});
export type GenerateHotelDetailsInput = z.infer<typeof GenerateHotelDetailsInputSchema>;

export const GenerateHotelDetailsOutputSchema = z.object({
  about: z.string().describe('A compelling, paragraph-long "about" description for the hotel.'),
  roomCategories: z.array(z.object({ name: z.string(), count: z.number(), size: z.string() })).describe('A list of 2-3 potential room categories with name, count, and size.'),
  diningExperiences: z.array(z.object({ name: z.string(), type: z.string() })).describe('A list of 2-3 potential dining experiences.'),
  experiencesAndActivities: z.array(z.string()).describe('A list of 3-4 likely experiences and activities.'),
  weddingVenues: z.array(z.string()).describe('A list of 2-3 potential wedding venues.'),
  tags: z.array(z.string()).describe('A list of 3-5 relevant tags for the hotel.'),
});
export type GenerateHotelDetailsOutput = z.infer<typeof GenerateHotelDetailsOutputSchema>;

// Interest Description Flow
export const GenerateInterestDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the travel interest.'),
});
export type GenerateInterestDescriptionInput = z.infer<typeof GenerateInterestDescriptionInputSchema>;

export const GenerateInterestDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling, paragraph-long description for the travel interest.'),
});
export type GenerateInterestDescriptionOutput = z.infer<typeof GenerateInterestDescriptionOutputSchema>;

// State Description Flow
export const GenerateStateDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the Indian state.'),
});
export type GenerateStateDescriptionInput = z.infer<typeof GenerateStateDescriptionInputSchema>;

export const GenerateStateDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling, one-sentence description for the state.'),
});
export type GenerateStateDescriptionOutput = z.infer<typeof GenerateStateDescriptionOutputSchema>;


// Personalized Recommendations Flow
export const PersonalizedHotelRecommendationsInputSchema = z.object({
  pastSearches: z
    .string()
    .describe('A comma-separated list of the user\'s past hotel searches.'),
});
export type PersonalizedHotelRecommendationsInput = z.infer<typeof PersonalizedHotelRecommendationsInputSchema>;

export const PersonalizedHotelRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of personalized hotel recommendations.'),
});
export type PersonalizedHotelRecommendationsOutput = z.infer<typeof PersonalizedHotelRecommendationsOutputSchema>;

// Package Itinerary Flow
export const GeneratePackageItineraryInputSchema = z.object({
    name: z.string().describe('The name of the travel package.'),
    days: z.number().describe('The total number of days for the package.'),
    nights: z.number().describe('The total number of nights for the package.'),
    cities: z.array(z.string()).describe('A list of cities covered in the package.'),
    states: z.array(z.string()).describe('A list of states covered in the package.'),
    tags: z.array(z.string()).optional().describe('Keywords describing the package theme (e.g., honeymoon, adventure, heritage).'),
});
export type GeneratePackageItineraryInput = z.infer<typeof GeneratePackageItineraryInputSchema>;

export const GeneratePackageItineraryOutputSchema = z.object({
  itinerary: z.array(ItinerarySchema).describe('A detailed day-by-day itinerary for the travel package.'),
});
export type GeneratePackageItineraryOutput = z.infer<typeof GeneratePackageItineraryOutputSchema>;


// State for personalizedHotelRecommendations
export type RecommendationsState = {
  recommendations?: string;
  error?: string;
}

// State for generateSeoPage
export type SeoGeneratorState = {
  title?: string;
  description?: string;
  content?: string;
  error?: string;
  input?: GenerateSeoPageInput;
}

// State for Hotel Description Generator
export type HotelDescriptionState = {
  description?: string;
  error?: string;
}

// State for Hotel Details Generator
export type HotelDetailsState = {
  details?: GenerateHotelDetailsOutput;
  error?: string;
}

// State for Interest Description Generator
export type InterestDescriptionState = {
  description?: string;
  error?: string;
}

// State for State Description Generator
export type StateDescriptionState = {
  description?: string;
  error?: string;
}

// State for Package Itinerary Generator
export type PackageItineraryState = {
  itinerary?: Itinerary[];
  error?: string;
}

export interface Interest {
  id: string;
  name: string;
  description: string;
  image: {
    src: string;
    caption: string;
  };
  tags: { value: string }[];
}
