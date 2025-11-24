'use server';

/**
 * @fileOverview Flow for generating SEO-optimized pages and hotel details.
 *
 * - generateSeoPage - Generates SEO-optimized content for a given page type.
 * - generateHotelDescription - Generates a compelling "about" paragraph for a hotel.
 * - generateHotelDetails - Generates a comprehensive set of details for a hotel.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateSeoPageInputSchema,
  GenerateSeoPageOutputSchema,
  GenerateHotelDescriptionInputSchema,
  GenerateHotelDescriptionOutputSchema,
  GenerateHotelDetailsInputSchema,
  GenerateHotelDetailsOutputSchema,
  GenerateInterestDescriptionInputSchema,
  GenerateInterestDescriptionOutputSchema,
  GenerateStateDescriptionInputSchema,
  GenerateStateDescriptionOutputSchema,
  type GenerateSeoPageInput,
  type GenerateSeoPageOutput,
  type GenerateHotelDescriptionInput,
  type GenerateHotelDescriptionOutput,
  type GenerateHotelDetailsInput,
  type GenerateHotelDetailsOutput,
  type GenerateInterestDescriptionInput,
  type GenerateInterestDescriptionOutput,
  type GenerateStateDescriptionInput,
  type GenerateStateDescriptionOutput,
} from '@/lib/types';


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

export async function generateSeoPage(input: GenerateSeoPageInput): Promise<GenerateSeoPageOutput> {
  return generateSeoPageFlow(input);
}


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


const generateHotelDescriptionFlow = ai.defineFlow(
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

export async function generateHotelDescription(input: GenerateHotelDescriptionInput): Promise<GenerateHotelDescriptionOutput> {
  return generateHotelDescriptionFlow(input);
}


const generateHotelDetailsPrompt = ai.definePrompt({
  name: 'generateHotelDetailsPrompt',
  input: { schema: GenerateHotelDetailsInputSchema },
  output: { schema: GenerateHotelDetailsOutputSchema },
  prompt: `You are a creative travel content writer for a luxury travel website. Your task is to generate compelling details for a hotel based on its name, brand, and city. Infer likely features based on the hotel's branding and location (e.g., a 'resort' will have leisure activities, a 'business' hotel will have meeting rooms).

Hotel Details:
- Name: {{{name}}}
- City: {{{city}}}
- Brand: {{{brand}}}

Instructions:
1.  **About**: Write one engaging paragraph highlighting the hotel's key features and unique selling points. The tone should be sophisticated and inviting.
2.  **Room Categories**: Suggest 2-3 likely room categories with a name, an estimated count, and an estimated size in sqft (e.g., "Deluxe Room", 150, "450 sqft").
3.  **Dining Experiences**: Suggest 2-3 likely dining experiences with a name and type (e.g., "The Lantern", "Chinese").
4.  **Experiences & Activities**: Suggest 3-4 likely experiences or activities available at the hotel (e.g., "Rooftop Pool", "Spa", "Fitness Center").
5.  **Wedding Venues**: Suggest 2-3 potential wedding venues (e.g., "Grand Ballroom", "Outdoor Lawns").
6.  **Tags**: Provide 3-5 relevant, one-word or two-word tags (e.g., "luxury", "business", "city view", "pet friendly").

Output the result in a valid JSON object.
`,
});

const generateHotelDetailsFlow = ai.defineFlow(
  {
    name: 'generateHotelDetailsFlow',
    inputSchema: GenerateHotelDetailsInputSchema,
    outputSchema: GenerateHotelDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await generateHotelDetailsPrompt(input);
    return output!;
  }
);

export async function generateHotelDetails(input: GenerateHotelDetailsInput): Promise<GenerateHotelDetailsOutput> {
  return generateHotelDetailsFlow(input);
}


const generateInterestDescriptionPrompt = ai.definePrompt({
  name: 'generateInterestDescriptionPrompt',
  input: { schema: GenerateInterestDescriptionInputSchema },
  output: { schema: GenerateInterestDescriptionOutputSchema },
  prompt: `You are a creative travel content writer. Your task is to write a single, compelling "description" paragraph for a travel interest category.

Interest Name: {{{name}}}

Instructions:
- Write one engaging paragraph (around 40-60 words).
- Describe the essence of this travel style.
- Use evocative and appealing language to inspire travelers.
- The tone should be inviting and exciting.
- The output must be only the description text, with no preamble.
`,
});

const generateInterestDescriptionFlow = ai.defineFlow(
  {
    name: 'generateInterestDescriptionFlow',
    inputSchema: GenerateInterestDescriptionInputSchema,
    outputSchema: GenerateInterestDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await generateInterestDescriptionPrompt(input);
    return output!;
  }
);

export async function generateInterestDescription(input: GenerateInterestDescriptionInput): Promise<GenerateInterestDescriptionOutput> {
  return generateInterestDescriptionFlow(input);
}


const generateStateDescriptionPrompt = ai.definePrompt({
  name: 'generateStateDescriptionPrompt',
  input: { schema: GenerateStateDescriptionInputSchema },
  output: { schema: GenerateStateDescriptionOutputSchema },
  prompt: `You are a travel content writer for Tripify. Your task is to write a short, compelling "description" paragraph for an Indian state.

State Name: {{{name}}}

Instructions:
- Write one engaging paragraph (around 20-30 words).
- Highlight the state's main identity or key attractions (e.g., tech hub, palaces, beaches, backwaters).
- The tone should be concise and informative.
- The output must be only the description text, with no preamble.
`,
});

const generateStateDescriptionFlow = ai.defineFlow(
  {
    name: 'generateStateDescriptionFlow',
    inputSchema: GenerateStateDescriptionInputSchema,
    outputSchema: GenerateStateDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await generateStateDescriptionPrompt(input);
    return output!;
  }
);

export async function generateStateDescription(input: GenerateStateDescriptionInput): Promise<GenerateStateDescriptionOutput> {
  return generateStateDescriptionFlow(input);
}
