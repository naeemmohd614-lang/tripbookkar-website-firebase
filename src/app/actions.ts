
'use server';

import { personalizedHotelRecommendations } from '@/ai/flows/personalized-hotel-recommendations';
import { generateSeoPage, generateHotelDescription, generateHotelDetails } from '@/ai/flows/generate-seo-pages';
import { z } from 'zod';
import type { 
  RecommendationsState, 
  SeoGeneratorState, 
  HotelDescriptionState,
  HotelDetailsState,
  GenerateSeoPageInput,
  PersonalizedHotelRecommendationsInput,
  GenerateHotelDescriptionInput,
  GenerateHotelDetailsInput,
  Hotel,
  Interest,
  State,
  MonthData,
} from '@/lib/types';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../serviceAccountKey.json';
import { revalidatePath } from 'next/cache';

if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount)
    });
}
const db = getFirestore();

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

// Re-exporting the imported function so other parts of the app can use it from here.
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
      return { success: true, message: `${count} ${dataType} hotels imported successfully.` };
    }

  } catch (error: any) {
    console.error(`Bulk import for ${dataType} failed:`, error);
    return { success: false, message: `Bulk import for ${dataType} failed: ${error.message}` };
  }
}
