
'use client';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Wand2 } from 'lucide-react';
import type { State } from '@/lib/types';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { generateStateDescriptionAction } from '@/app/actions';

interface StateEditorProps {
  state?: State;
}

function slugify(text: string) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const newStateDefault: Partial<State> = {
  name: '',
  description: '',
  totalCities: 0,
  totalHotels: 0,
};

export default function StateEditor({ state }: StateEditorProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting }, control } = useForm<State>({
    defaultValues: state || newStateDefault
  });

  useEffect(() => {
    if (state) {
      reset(state);
    } else {
      reset(newStateDefault);
    }
  }, [state, reset]);

  const watchedName = useWatch({ control, name: 'name' });

  const handleGenerateDescription = async () => {
    if (!watchedName) {
        toast({ variant: 'destructive', title: "State Name Required", description: "Please enter a state name before generating a description." });
        return;
    }
    const result = await generateStateDescriptionAction({ name: watchedName });
    if (result.description) {
        setValue('description', result.description);
        toast({ title: "Description Generated", description: "The description has been filled in by AI." });
    } else if (result.error) {
        toast({ variant: 'destructive', title: 'AI Error', description: result.error });
    }
  };

  const onSubmit: SubmitHandler<State> = async (data) => {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore not available.' });
      return;
    }

    try {
      let stateData: State;
      const stateId = state?.stateId || slugify(data.name);

      if (!stateId) {
        toast({ variant: 'destructive', title: 'Error', description: 'State name is required to create an ID.' });
        return;
      }

      stateData = {
        ...data,
        stateId: stateId,
      };

      const stateRef = doc(firestore, 'states', stateId);
      await setDocumentNonBlocking(stateRef, stateData, { merge: true });
      
      toast({
        title: state ? 'State Updated' : 'State Created',
        description: `"${data.name}" has been saved.`
      });
      
      router.push('/admin/states');
      router.refresh();

    } catch (error: any) {
      console.error("Error saving state:", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{state?.stateId ? 'Edit State' : 'Create New State'}</CardTitle>
          <CardDescription>Manage state details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">State Name</Label>
              <Input id="name" {...register('name', { required: true })} />
            </div>
            <div className="space-y-2">
               <div className="flex justify-between items-center">
                <Label htmlFor="description">Description</Label>
                 <Button type="button" size="sm" variant="ghost" onClick={handleGenerateDescription}>
                    <Wand2 className="mr-2 h-3 w-3" /> Generate with AI
                </Button>
               </div>
              <Textarea id="description" {...register('description')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <Label htmlFor="totalCities">Total Cities</Label>
                <Input id="totalCities" type="number" {...register('totalCities', { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="totalHotels">Total Hotels</Label>
                <Input id="totalHotels" type="number" {...register('totalHotels', { valueAsNumber: true })} />
                </div>
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save State'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
