'use server';

/**
 * @fileOverview Flow for generating SEO-optimized pages for cities, states, and hotel types.
 *
 * - generateSeoPage - A function that handles the generation of SEO pages.
 * - GenerateSeoPageInput - The input type for the generateSeoPage function.
 * - GenerateSeoPageOutput - The return type for the generateSeoPage function.
 * - generateHotelDescription - Generates a compelling description for a hotel.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoPageInputSchema = z.object({
  pageType: z.enum(['city', 'state', 'hotelType']).describe('The type of SEO page to generate.'),
  location: z.string().optional().describe('The city or state for which to generate the page (if applicable).'),
  hotelType: z.string().optional().describe('The type of hotel for which to generate the page (if applicable).'),
});
export type GenerateSeoPageInput = z.infer<typeof GenerateSeoPageInputSchema>;

const GenerateSeoPageOutputSchema = z.object({
  title: z.string().describe('The SEO title for the page.'),
  description: z.string().describe('The SEO description for the page.'),
  content: z.string().describe('The main content of the SEO page.'),
});
export type GenerateSeoPageOutput = z.infer<typeof GenerateSeoPageOutputSchema>;

export async function generateSeoPage(input: GenerateSeoPageInput): Promise<GenerateSeoPageOutput> {
  return generateSeoPageFlow(input);
}

const generateSeoPagePrompt = ai.definePrompt({
  name: 'generateSeoPagePrompt',
  input: {schema: GenerateSeoPageInputSchema},
  output: {schema: GenerateSeoPageOutputSchema},
  prompt: `You are an SEO expert tasked with generating SEO-optimized pages for a travel website called Tripify.

  Based on the provided page type, location (city or state), and hotel type, generate a compelling SEO title, meta description, and page content that will attract organic traffic.

  Page Type: {{{pageType}}}
  Location: {{{location}}}
  Hotel Type: {{{hotelType}}}

  Instructions:
  1. The SEO title should be concise and include relevant keywords.
  2. The meta description should be engaging and entice users to click through to the page.
  3. The page content should be informative, well-written, and optimized for search engines.
  4. If a location or hotel type is not provided, use your knowledge to generate relevant content for the given page type.
  5. Ensure the page content does not include any irrelevant data, and focuses on providing value to potential travelers.

  Output the result in JSON format.
  `,
});

const generateSeoPageFlow = ai.defineFlow(
  {
    name: 'generateSeoPageFlow',
    inputSchema: GenerateSeoPageInputSchema,
    outputSchema: GenerateSeoPageOutputSchema,
  },
  async input => {
    const {output} = await generateSeoPagePrompt(input);
    return output!;
  }
);


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


const generateHotelDescriptionPrompt = ai.definePrompt({
  name: 'generateHotelDescriptionPrompt',
  input: { schema: GenerateHotelDescriptionInputSchema },
  output: { schema: GenerateHotelDescriptionOutputSchema },
  prompt: `You are a creative copywriter for a luxury travel website. Your task is to write a single, compelling "about" paragraph for a hotel.

Hotel Details:
- Name: {{{name}}}
- City: {{{city}}}
- Brand: {{{brand}}}

Instructions:
- Write one engaging paragraph.
- Highlight the hotel's key features and unique selling points (e.g., location, luxury, views, specific amenities).
- Use evocative and appealing language.
- The tone should be sophisticated and inviting.
- Do not make up specific facts if they aren't provided (like number of rooms), but you can infer likely characteristics based on brand and location (e.g., a JW Marriott in a major city is likely to have business facilities and luxury amenities).
- The output must be only the description text, with no preamble.

Example Output for "The Ritz-Carlton, Bangalore":
"The Ritz-Carlton, Bangalore, located in the heart of the city, offers luxurious accommodations, fine dining, and a tranquil spa. Experience legendary service in a sophisticated setting where modern design meets timeless elegance, making it the perfect urban oasis for both business and leisure travelers."
`,
});


export const generateHotelDescription = ai.defineFlow(
  {
    name: 'generateHotelDescriptionFlow',
    inputSchema: GenerateHotelDescriptionInputSchema,
    outputSchema: GenerateHotelDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await generateHotelDescriptionPrompt(input);
    return output!;
  }
);
