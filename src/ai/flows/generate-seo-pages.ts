'use server';

/**
 * @fileOverview Flow for generating SEO-optimized pages for cities, states, and hotel types.
 *
 * - generateSeoPage - A function that handles the generation of SEO pages.
 * - GenerateSeoPageInput - The input type for the generateSeoPage function.
 * - GenerateSeoPageOutput - The return type for the generateSeoPage function.
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
