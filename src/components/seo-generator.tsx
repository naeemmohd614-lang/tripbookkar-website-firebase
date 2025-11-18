'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateSeoContent, SeoGeneratorState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wand2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const initialState: SeoGeneratorState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating Content...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate SEO Content
        </>
      )}
    </Button>
  );
}

export default function SeoGenerator() {
  const [state, formAction] = useActionState(generateSeoContent, initialState);
  const [pageType, setPageType] = useState<'city' | 'state' | 'hotelType' | undefined>(state.input?.pageType);

  useEffect(() => {
    if (state.input?.pageType) {
      setPageType(state.input.pageType);
    }
  }, [state.input]);

  return (
    <Card className="max-w-4xl mx-auto shadow-sm bg-white">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <form action={formAction} className="space-y-6">
              <div>
                <Label className="font-semibold">Page Type</Label>
                <RadioGroup 
                  name="pageType" 
                  defaultValue={pageType} 
                  onValueChange={(value: 'city' | 'state' | 'hotelType') => setPageType(value)} 
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="city" id="r-city" />
                    <Label htmlFor="r-city">City</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="state" id="r-state" />
                    <Label htmlFor="r-state">State</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hotelType" id="r-hotelType" />
                    <Label htmlFor="r-hotelType">Hotel Type</Label>
                  </div>
                </RadioGroup>
              </div>

              { (pageType === 'city' || pageType === 'state') && (
                <div>
                  <Label htmlFor="location" className="font-semibold">Location</Label>
                  <Input id="location" name="location" placeholder={pageType === 'city' ? "e.g., Jaipur" : "e.g., Rajasthan"} className="mt-2" defaultValue={state.input?.location}/>
                </div>
              )}
              
              { pageType === 'hotelType' && (
                <div>
                  <Label htmlFor="hotelType" className="font-semibold">Hotel Type</Label>
                  <Input id="hotelType" name="hotelType" placeholder="e.g., Beach Resort" className="mt-2" defaultValue={state.input?.hotelType}/>
                </div>
              )}

              <SubmitButton />

              {state.error && (
                <Alert variant="destructive">
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}
            </form>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg border-b pb-2 mb-4">Generated Content</h3>
            <div className="space-y-6">
                {state.title || state.description || state.content ? (
                    <>
                        <div>
                            <Label className="text-sm font-semibold text-muted-foreground">SEO Title</Label>
                            <div className="mt-1 p-3 bg-secondary rounded-md text-sm font-semibold">{state.title || '...'}</div>
                        </div>
                        <div>
                            <Label className="text-sm font-semibold text-muted-foreground">Meta Description</Label>
                            <div className="mt-1 p-3 bg-secondary rounded-md text-sm">{state.description || '...'}</div>
                        </div>
                        <div>
                            <Label className="text-sm font-semibold text-muted-foreground">Page Content</Label>
                            <div className="mt-1 p-3 h-64 overflow-y-auto bg-secondary rounded-md text-sm prose prose-sm max-w-none">
                                {state.content ? <p>{state.content}</p> : '...'}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground border-2 border-dashed rounded-lg py-16">
                        <p>Generated content will appear here.</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
