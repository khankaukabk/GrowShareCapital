'use server';

import {
  investmentRecommendations,
  type InvestmentRecommendationsInput,
  type InvestmentRecommendationsOutput,
} from '@/ai/flows/investment-recommendations';
import { z } from 'zod';

const AdvisorFormSchema = z.object({
  age: z.coerce.number().min(18, "Must be at least 18."),
  income: z.coerce.number().min(0, "Income cannot be negative."),
  riskTolerance: z.enum(['low', 'medium', 'high']),
  investmentGoals: z.string().min(10, "Please describe your goals in at least 10 characters."),
});

type AdvisorFormState = {
    message: string;
    recommendations?: InvestmentRecommendationsOutput;
    errors?: {
        age?: string[];
        income?: string[];
        riskTolerance?: string[];
        investmentGoals?: string[];
    }
}

export async function getInvestmentAdvice(
    prevState: AdvisorFormState,
    formData: FormData
): Promise<AdvisorFormState> {
    const validatedFields = AdvisorFormSchema.safeParse({
        age: formData.get('age'),
        income: formData.get('income'),
        riskTolerance: formData.get('riskTolerance'),
        investmentGoals: formData.get('investmentGoals'),
    });

    if (!validatedFields.success) {
        return {
            message: "Failed to validate fields.",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const { age, income, riskTolerance, investmentGoals } = validatedFields.data;

    const userProfile = `Age: ${age}, Annual Income: $${income}, Risk Tolerance: ${riskTolerance}, Investment Goals: "${investmentGoals}"`;
    const marketTrends = "Current market is experiencing volatility in the tech sector, with strong growth in renewable energy and healthcare. Inflation is a key concern, and investors are looking for value stocks and dividend-yielding assets.";

    const input: InvestmentRecommendationsInput = {
        userProfile,
        marketTrends
    };

    try {
        const recommendations = await investmentRecommendations(input);
        return { message: 'success', recommendations };
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred while getting recommendations.' };
    }
}
