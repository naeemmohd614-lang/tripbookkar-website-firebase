
'use client';
import React, { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Star } from 'lucide-react';
import type { City } from '@/lib/types';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

interface CityEditorProps {
  city?: City;
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

const newCityDefault: Partial<City> = {
  name: '',
  stateId: '',
  description: '',
  totalHotels: 0,
  highlights: [],
};

export default function CityEditor({ city }: CityEditorProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

  const { register, control, handleSubmit, reset } = useForm<City>({
    defaultValues: city || newCityDefault
  });

   const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
  });

  useEffect(() => {
    if (city) {
      reset(city);
    } else {
      reset(newCityDefault);
    }
  }, [city, reset]);

  const onSubmit: SubmitHandler<City> = async (data) => {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore not available.' });
      return;
    }

    try {
      let cityData: City;
      const cityId = city?.cityId || slugify(data.name);

      if (!cityId) {
        toast({ variant: 'destructive', title: 'Error', description: 'City name is required to create an ID.' });
        return;
      }

      cityData = {
        ...data,
        cityId: cityId,
        stateId: slugify(data.stateId),
      };

      const cityRef = doc(firestore, 'cities', cityId);
      await setDocumentNonBlocking(cityRef, cityData, { merge: true });
      
      toast({
        title: city ? 'City Updated' : 'City Created',
        description: `"${data.name}" has been saved.`
      });
      
      router.push('/admin/cities');
      router.refresh();

    } catch (error: any) {
      console.error("Error saving city:", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{city?.cityId ? 'Edit City' : 'Create New City'}</CardTitle>
          <CardDescription>Manage city details and highlights.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <Label htmlFor="name">City Name</Label>
                <Input id="name" {...register('name', { required: true })} />
                </div>
                 <div className="space-y-2">
                <Label htmlFor="stateId">State ID</Label>
                <Input id="stateId" {...register('stateId', { required: true })} placeholder="e.g., rajasthan" />
                </div>
            </div>
            <div className="space-y-2">
               <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <Label htmlFor="totalHotels">Total Hotels</Label>
                <Input id="totalHotels" type="number" {...register('totalHotels', { valueAsNumber: true })} />
                </div>
            </div>

            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Star className="w-5 h-5"/>Highlights</h3>
                    <Button type="button" variant="outline" onClick={() => append({ name: '', icon: '', color: '' })}>
                        <Plus className="mr-2 h-4 w-4"/> Add Highlight
                    </Button>
                </div>
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-4 items-end p-4 border rounded-lg bg-secondary/30">
                           <div className="space-y-2">
                                <Label>Highlight Name</Label>
                                <Input {...register(`highlights.${index}.name`)} placeholder="e.g., Majestic Forts" />
                            </div>
                             <div className="space-y-2">
                                <Label>Icon Name</Label>
                                <Input {...register(`highlights.${index}.icon`)} placeholder="e.g., Castle" />
                            </div>
                            <div className="space-y-2">
                                <Label>Icon Color</Label>
                                <Input {...register(`highlights.${index}.color`)} placeholder="e.g., text-amber-700" />
                            </div>
                            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </section>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit">
                Save City
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
