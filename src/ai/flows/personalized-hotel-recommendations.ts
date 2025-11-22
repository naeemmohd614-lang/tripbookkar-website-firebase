
'use server';

/**
 * @fileOverview A flow to generate personalized hotel recommendations based on user's past searches.
 *
 * - personalizedHotelRecommendations - A function that returns personalized hotel recommendations.
 * - PersonalizedHotelRecommendationsInput - The input type for the personalizedHotelRecommendations function.
 * - PersonalizedHotelRecommendationsOutput - The return type for the personalizedHotelRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHotelRecommendationsInputSchema = z.object({
  pastSearches: z
    .string()
    .describe('A comma-separated list of the user\'s past hotel searches.'),
});

export type PersonalizedHotelRecommendationsInput = z.infer<
  typeof PersonalizedHotelRecommendationsInputSchema
>;

const PersonalizedHotelRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of personalized hotel recommendations.'),
});

export type PersonalizedHotelRecommendationsOutput = z.infer<
  typeof PersonalizedHotelRecommendationsOutputSchema
>;

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
