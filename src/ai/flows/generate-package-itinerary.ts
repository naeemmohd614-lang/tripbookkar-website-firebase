'use server';
/**
 * @fileOverview Flow for generating a travel package itinerary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { ItinerarySchema } from '@/lib/types';


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


export async function generatePackageItinerary(input: GeneratePackageItineraryInput): Promise<GeneratePackageItineraryOutput> {
  return generatePackageItineraryFlow(input);
}

const generatePackageItineraryPrompt = ai.definePrompt({
  name: 'generatePackageItineraryPrompt',
  input: {schema: GeneratePackageItineraryInputSchema},
  output: {schema: GeneratePackageItineraryOutputSchema},
  prompt: `You are a professional travel planner. Your task is to create a detailed, engaging, day-by-day itinerary for a travel package.

Package Details:
- Name: {{{name}}}
- Duration: {{{days}}} days / {{{nights}}} nights
- Cities: {{{cities}}}
- States: {{{states}}}
- Themes: {{{tags}}}

Instructions:
1.  Create an itinerary for each day of the package, from Day 1 to Day {{{days}}}.
2.  For each day, provide a clear 'title' (e.g., "Arrival in Jaipur & Local Sightseeing").
3.  For each day, write a concise 'description' detailing the plan for that day. Mention key activities, sights, and experiences.
4.  Ensure the itinerary is logical, covering the cities mentioned in a sensible travel order.
5.  The tone should be exciting and appealing to a traveler.
6.  The final output must be a valid JSON object containing an array named 'itinerary'.
`,
});

const generatePackageItineraryFlow = ai.defineFlow(
  {
    name: 'generatePackageItineraryFlow',
    inputSchema: GeneratePackageItineraryInputSchema,
    outputSchema: GeneratePackageItineraryOutputSchema,
  },
  async input => {
    const {output} = await generatePackageItineraryPrompt(input);
    return output!;
  }
);
