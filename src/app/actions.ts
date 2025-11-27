
'use server';

import { personalizedHotelRecommendations } from '@/ai/flows/personalized-hotel-recommendations';
import { generateSeoPage, generateHotelDescription, generateHotelDetails, generateInterestDescription, generateStateDescription } from '@/ai/flows/generate-seo-pages';
import { generatePackageItinerary } from '@/ai/flows/generate-package-itinerary';
import { z } from 'zod';
import type { 
  RecommendationsState, 
  SeoGeneratorState, 
  HotelDescriptionState,
  HotelDetailsState,
  InterestDescriptionState,
  StateDescriptionState,
  PackageItineraryState,
  GenerateSeoPageInput,
  PersonalizedHotelRecommendationsInput,
  GenerateHotelDescriptionInput,
  GenerateHotelDetailsInput,
  GenerateInterestDescriptionInput,
  GenerateStateDescriptionInput,
  GeneratePackageItineraryInput,
  Hotel,
  Interest,
  State,
  MonthData,
} from '@/lib/types';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

// --- Firebase Admin Initialization ---
// This function initializes the Firebase Admin SDK.
// It first tries to use environment variables for production (e.g., on Hostinger).
// If that fails, it falls back to using the local serviceAccountKey.json for development.
function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }

  try {
    // For Production (Hostinger): Use environment variables
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountString) {
      console.log('Initializing Firebase Admin with environment variable...');
      const serviceAccount = JSON.parse(serviceAccountString);
      initializeApp({
        credential: cert(serviceAccount)
      });
      return;
    }
  } catch (e) {
    console.error('Failed to initialize Firebase from environment variable:', e);
  }

  try {
    // For Development (Local): Use the JSON file
    console.log('Initializing Firebase Admin with local service account file...');
    const serviceAccount = require('../../serviceAccountKey.json');
    initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (e) {
    console.error('Fallback to local serviceAccountKey.json failed:', e);
    console.error('Please ensure either FIREBASE_SERVICE_ACCOUNT environment variable is set or serviceAccountKey.json exists.');
  }
}

// Initialize the app
initializeFirebaseAdmin();
const db = getFirestore();
// --- End of Firebase Admin Initialization ---


function slugify(text: string) {
    if (!text) return '';
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export async function getRecommendations(
  prevState: RecommendationsState,
  formData: FormData
): Promise<RecommendationsState> {
  const schema = z.object({
    pastSearches: z.string().min(1, "Please enter your past searches."),
  });

  const validatedFields = schema.safeParse({
    pastSearches: formData.get('pastSearches'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.pastSearches?.[0],
    };
  }

  try {
    const input: PersonalizedHotelRecommendationsInput = {
      pastSearches: validatedFields.data.pastSearches,
    };
    const result = await personalizedHotelRecommendations(input);
    return { recommendations: result.recommendations };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get recommendations. Please try again.' };
  }
}

export async function generateSeoContent(
  prevState: SeoGeneratorState,
  formData: FormData
): Promise<SeoGeneratorState> {
  
  const schema = z.object({
    pageType: z.enum(['city', 'state', 'hotelType']),
    location: z.string().optional(),
    hotelType: z.string().optional(),
  });

  const pageType = formData.get('pageType') as 'city' | 'state' | 'hotelType';

  const validatedFields = schema.safeParse({
    pageType: pageType,
    location: formData.get('location'),
    hotelType: formData.get('hotelType'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid input. Please check the fields.',
    };
  }
  
  const input = validatedFields.data;

  if ((input.pageType === 'city' || input.pageType === 'state') && !input.location) {
    return { error: 'Location is required for this page type.', input };
  }
  if (input.pageType === 'hotelType' && !input.hotelType) {
    return { error: 'Hotel type is required for this page type.', input };
  }

  try {
    const result = await generateSeoPage(input as GenerateSeoPageInput);
    return { ...result, input };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate SEO content. Please try again.', input };
  }
}

export async function generateHotelDescriptionAction(input: GenerateHotelDescriptionInput): Promise<HotelDescriptionState> {
  try {
    const result = await generateHotelDescription(input);
    return { description: result.description };
  } catch(e: any) {
    console.error(e);
    return { error: 'Failed to generate description.' };
  }
}

export async function generateHotelDetailsAction(input: GenerateHotelDetailsInput): Promise<HotelDetailsState> {
  try {
    const result = await generateHotelDetails(input);
    return { details: result };
  } catch(e: any) {
    console.error(e);
    return { error: 'Failed to generate hotel details.' };
  }
}

export async function generateInterestDescriptionAction(input: GenerateInterestDescriptionInput): Promise<InterestDescriptionState> {
  try {
    const result = await generateInterestDescription(input);
    return { description: result.description };
  } catch(e: any) {
    console.error(e);
    return { error: 'Failed to generate description.' };
  }
}

export async function generateStateDescriptionAction(input: GenerateStateDescriptionInput): Promise<StateDescriptionState> {
  try {
    const result = await generateStateDescription(input);
    return { description: result.description };
  } catch(e: any) {
    console.error(e);
    return { error: 'Failed to generate description.' };
  }
}

export async function generatePackageItineraryAction(input: GeneratePackageItineraryInput): Promise<PackageItineraryState> {
    try {
        const result = await generatePackageItinerary(input);
        return { itinerary: result.itinerary };
    } catch(e: any) {
        console.error(e);
        return { error: 'Failed to generate itinerary.' };
    }
}


export async function bulkImportData(dataType: string): Promise<{ success: boolean, message: string }> {
  try {
    const batch = db.batch();
    let count = 0;

    if (dataType === 'interests') {
      const interestsData = (await import(`@/data/interests.json`)).default;
      interestsData.forEach((interest: Interest) => {
        const docRef = db.collection('interests').doc(interest.id);
        batch.set(docRef, interest, { merge: true });
        count++;
      });
      await batch.commit();
      revalidatePath('/admin/interests');
      revalidatePath('/interests');
      revalidatePath('/');
      return { success: true, message: `${count} interests imported successfully.` };
    } else if (dataType === 'states') {
      const statesData = (await import(`@/data/states.json`)).default;
       statesData.forEach((state: State) => {
        const docRef = db.collection('states').doc(state.stateId);
        batch.set(docRef, state, { merge: true });
        count++;
      });
      await batch.commit();
      revalidatePath('/admin/dashboard'); // Or a relevant page
      revalidatePath('/'); // Revalidate home page
      return { success: true, message: `${count} states imported successfully.` };
    } else if (dataType === 'monthlyDestinations') {
      const { monthlyDestinationsData } = await import(`@/data/monthly-destinations`);
      for (const monthKey in monthlyDestinationsData) {
        const month: MonthData = monthlyDestinationsData[monthKey];
        const docRef = db.collection('monthlyDestinations').doc(month.slug);
        batch.set(docRef, month, { merge: true });
        count++;
      }
      await batch.commit();
      revalidatePath('/admin/destinations');
      revalidatePath('/');
      return { success: true, message: `${count} monthly destination sets imported successfully.` };
    } else {
      // Assuming it's a hotel brand
      const hotelDataModule = await import(`@/data/${dataType}.json`);
      const hotelsToImport: Hotel[] = hotelDataModule.default;

      if (!hotelsToImport || hotelsToImport.length === 0) {
        return { success: false, message: `No data found for type: ${dataType}.` };
      }

      hotelsToImport.forEach((hotel) => {
        if (!hotel.name) return;
        const hotelId = slugify(hotel.name);
        const hotelRef = db.collection('hotels').doc(hotelId);

        const hotelData: Hotel = {
          ...hotel,
          id: hotelId,
          hotelId: hotelId,
          cityId: slugify(hotel.city),
          stateId: slugify(hotel.state),
          brandSlug: slugify(hotel.brand),
        };
        
        batch.set(hotelRef, hotelData, { merge: true });
        count++;
      });

      await batch.commit();
      revalidatePath('/admin/hotels');
      revalidatePath('/hotels');
      revalidatePath('/');
      return { success: true, message: `${count} ${dataType} hotels imported successfully.` };
    }

  } catch (error: any) {
    console.error(`Bulk import for ${dataType} failed:`, error);
    return { success: false, message: `Bulk import for ${dataType} failed: ${error.message}` };
  }
}

export async function saveHotelAction(
  existingHotelId: string | null,
  data: Hotel
): Promise<{ success: boolean; message: string; isNew: boolean }> {
  try {
    const isNew = !existingHotelId;
    const hotelId = existingHotelId || slugify(data.name);

    if (!hotelId) {
      throw new Error("Hotel name is required to create an ID.");
    }

    const hotelData: Hotel = {
      ...data,
      id: hotelId,
      hotelId: hotelId,
      cityId: slugify(data.city),
      stateId: slugify(data.state),
      brandSlug: slugify(data.brand),
    };

    const hotelRef = db.collection('hotels').doc(hotelId);
    await hotelRef.set(hotelData, { merge: true });

    // Revalidate paths to show updated data on the front end
    revalidatePath('/hotels');
    revalidatePath(`/states/${hotelData.stateId}/cities/${hotelData.cityId}/hotels/${hotelData.hotelId}`);
    revalidatePath(`/`);

    return { success: true, message: "Hotel saved successfully.", isNew };
  } catch (error: any) {
    console.error("Error saving hotel:", error);
    return { success: false, message: error.message, isNew: !existingHotelId };
  }
}

export async function saveInterestAction(
  existingInterestId: string | null,
  data: Interest
): Promise<{ success: boolean; message: string; isNew: boolean }> {
  try {
    const isNew = !existingInterestId;
    const interestId = existingInterestId || slugify(data.name);
    
    if (!interestId) {
      throw new Error("Interest name is required to create an ID.");
    }

    const interestData: Interest = {
      ...data,
      id: interestId,
    };
    
    const interestRef = db.collection('interests').doc(interestId);
    await interestRef.set(interestData, { merge: true });

    revalidatePath('/admin/interests');
    revalidatePath(`/interests/${interestId}`);
    revalidatePath('/');

    return { success: true, message: "Interest saved successfully.", isNew };
  } catch (error: any) {
    console.error("Error saving interest:", error);
    return { success: false, message: error.message, isNew: !existingInterestId };
  }
}
