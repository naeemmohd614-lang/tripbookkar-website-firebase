
'use server';

/**
 * @fileOverview A flow to generate personalized hotel recommendations based on user's past searches.
 *
 * - personalizedHotelRecommendations - A function that returns personalized hotel recommendations.
 */

import {ai} from '@/ai/genkit';
import {
  PersonalizedHotelRecommendationsInputSchema,
  PersonalizedHotelRecommendationsOutputSchema,
  type PersonalizedHotelRecommendationsInput,
  type PersonalizedHotelRecommendationsOutput
} from '@/lib/types';


const prompt = ai.definePrompt({
  name: 'personalizedHotelRecommendationsPrompt',
  input: {schema: PersonalizedHotelRecommendationsInputSchema},
  output: {schema: PersonalizedHotelRecommendationsOutputSchema},
  prompt: `You are a travel expert who provides personalized hotel recommendations based on a user's past searches.

  Leverage your awareness of popular destinations and current travel trends to produce insightful and relevant tips.

  Past Searches: {{{pastSearches}}}

  Provide a list of personalized hotel recommendations the user might enjoy.`,
});

const personalizedHotelRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedHotelRecommendationsFlow',
    inputSchema: PersonalizedHotelRecommendationsInputSchema,
    outputSchema: PersonalizedHotelRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


export async function personalizedHotelRecommendations(
  input: PersonalizedHotelRecommendationsInput
): Promise<PersonalizedHotelRecommendationsOutput> {
  return personalizedHotelRecommendationsFlow(input);
}
