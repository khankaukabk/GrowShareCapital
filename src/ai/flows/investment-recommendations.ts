// src/ai/flows/investment-recommendations.ts
'use server';

/**
 * @fileOverview AI-powered investment recommendations flow.
 *
 * This file defines a Genkit flow that provides personalized investment
 * recommendations based on user profiles and market trends.
 *
 * @exports investmentRecommendations - A function that triggers the investment recommendations flow.
 * @exports InvestmentRecommendationsInput - The input type for the investmentRecommendations function.
 * @exports InvestmentRecommendationsOutput - The output type for the investmentRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestmentRecommendationsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('A detailed description of the user profile including investment history, risk tolerance, and financial goals.'),
  marketTrends: z
    .string()
    .describe('Current market trends and analysis data.'),
});
export type InvestmentRecommendationsInput = z.infer<
  typeof InvestmentRecommendationsInputSchema
>;

const InvestmentRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of investment recommendations tailored to the user profile and market trends.'),
  rationale: z
    .string()
    .describe('Explanation of why these recommendations are suitable.'),
});
export type InvestmentRecommendationsOutput = z.infer<
  typeof InvestmentRecommendationsOutputSchema
>;

export async function investmentRecommendations(
  input: InvestmentRecommendationsInput
): Promise<InvestmentRecommendationsOutput> {
  return investmentRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investmentRecommendationsPrompt',
  input: {schema: InvestmentRecommendationsInputSchema},
  output: {schema: InvestmentRecommendationsOutputSchema},
  prompt: `You are an AI investment advisor. Based on the user profile and current market trends, provide investment recommendations.

User Profile: {{{userProfile}}}
Market Trends: {{{marketTrends}}}

Provide a list of investment recommendations and a rationale for each recommendation.`,
});

const investmentRecommendationsFlow = ai.defineFlow(
  {
    name: 'investmentRecommendationsFlow',
    inputSchema: InvestmentRecommendationsInputSchema,
    outputSchema: InvestmentRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
