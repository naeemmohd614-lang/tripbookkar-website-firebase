
'use server';

import { personalizedHotelRecommendations } from '@/ai/flows/personalized-hotel-recommendations';
import { generateSeoPage, generateHotelDescription } from '@/ai/flows/generate-seo-pages';
import { z } from 'zod';
import type { 
  RecommendationsState, 
  SeoGeneratorState, 
  HotelDescriptionState,
  GenerateSeoPageInput,
  PersonalizedHotelRecommendationsInput,
  GenerateHotelDescriptionInput
} from '@/lib/types';

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
