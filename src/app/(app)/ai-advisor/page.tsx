'use client';
import { useFormState, useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getInvestmentAdvice } from './actions';
import { BrainCircuit, Bot, Loader } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader className="animate-spin" /> : "Get Advice"}
    </Button>
  );
}

export default function AiAdvisorPage() {
  const [state, formAction] = useFormState(getInvestmentAdvice, initialState);

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>AI Investment Advisor</CardTitle>
          <CardDescription>
            Fill out your profile to receive personalized investment recommendations
            powered by AI.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" placeholder="e.g., 35" required />
                {state.errors?.age && <p className="text-sm text-red-500">{state.errors.age[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">Annual Income (USD)</Label>
                <Input id="income" name="income" type="number" placeholder="e.g., 80000" required />
                 {state.errors?.income && <p className="text-sm text-red-500">{state.errors.income[0]}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="riskTolerance">Risk Tolerance</Label>
              <Select name="riskTolerance" required>
                <SelectTrigger id="riskTolerance">
                  <SelectValue placeholder="Select your risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
               {state.errors?.riskTolerance && <p className="text-sm text-red-500">{state.errors.riskTolerance[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="investmentGoals">Investment Goals</Label>
              <Textarea
                id="investmentGoals"
                name="investmentGoals"
                placeholder="e.g., Long-term growth, retirement savings, buying a house in 5 years..."
                required
              />
               {state.errors?.investmentGoals && <p className="text-sm text-red-500">{state.errors.investmentGoals[0]}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Your Recommendations</CardTitle>
          <CardDescription>
            Based on your profile, here are our AI-driven suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          {state.message === 'success' && state.recommendations ? (
            <div className="space-y-6 text-sm">
                <Alert>
                  <Bot className="h-4 w-4" />
                  <AlertTitle>Recommendations</AlertTitle>
                  <AlertDescription>
                    {state.recommendations.recommendations}
                  </AlertDescription>
                </Alert>
                <Alert>
                  <BrainCircuit className="h-4 w-4" />
                  <AlertTitle>Rationale</AlertTitle>
                  <AlertDescription>
                    {state.recommendations.rationale}
                  </AlertDescription>
                </Alert>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <BrainCircuit className="mx-auto h-12 w-12" />
              <p className="mt-4">Your investment advice will appear here.</p>
              {state.message && state.message !== 'success' && <p className="text-red-500 mt-2">{state.message}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
