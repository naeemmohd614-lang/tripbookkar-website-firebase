'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendations, RecommendationsState } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Wand2, Loader2 } from 'lucide-react';

const initialState: RecommendationsState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export default function Recommendations() {
  const [state, formAction] = useFormState(getRecommendations, initialState);

  return (
    <Card className="bg-secondary/30 border-dashed border-2">
      <CardContent className="p-6">
        <form action={formAction} className="space-y-4">
          <Textarea
            name="pastSearches"
            placeholder="e.g., 'beach resorts in Goa', '5-star hotels in Jaipur with a pool', 'family-friendly hotels near Mumbai airport'"
            rows={3}
            className="bg-background"
          />
          <div className="flex justify-end">
            <SubmitButton />
          </div>
          {state.error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </form>

        {state.recommendations && (
          <div className="mt-6">
            <h3 className="font-headline text-xl text-brand-blue mb-2">Here are your recommendations:</h3>
            <div className="prose prose-sm md:prose-base max-w-none p-4 bg-background rounded-md border">
                <p>{state.recommendations}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
