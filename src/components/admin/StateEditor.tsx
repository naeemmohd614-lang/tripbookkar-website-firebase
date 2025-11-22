
'use client';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { State } from '@/lib/types';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

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

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<State>({
    defaultValues: state || newStateDefault
  });

  useEffect(() => {
    if (state) {
      reset(state);
    } else {
      reset(newStateDefault);
    }
  }, [state, reset]);

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
              <Label htmlFor="description">Description</Label>
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
