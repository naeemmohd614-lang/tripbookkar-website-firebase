
'use client';
import React, { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Wand2 } from 'lucide-react';
import type { Package, Itinerary } from '@/lib/types';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { generatePackageItineraryAction } from '@/app/actions';

interface PackageEditorProps {
  pkg?: Package;
}

function slugify(text: string) {
  if (!text) return '';
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

const newPackageDefault: Partial<Package> = {
  name: '',
  days: 0,
  nights: 0,
  price: 0,
  itinerary: [],
  tags: [],
  city: [],
  state: [],
  images: [],
};

export default function PackageEditor({ pkg }: PackageEditorProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

  const { register, control, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<Package>({
    defaultValues: pkg || newPackageDefault
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "itinerary"
  });

  const watchedFields = useWatch({
    control,
    name: ["name", "days", "nights", "city", "state", "tags"]
  });

  useEffect(() => {
    if (pkg) {
      reset(pkg);
    } else {
      reset(newPackageDefault);
    }
  }, [pkg, reset]);

  const handleGenerateItinerary = async () => {
    const [name, days, nights, city, state, tags] = watchedFields;
    
    if (!name || !days || !nights || !city.length || !state.length) {
      toast({ variant: 'destructive', title: "Missing Information", description: "Please fill in Name, Days, Nights, Cities, and States before generating." });
      return;
    }

    const result = await generatePackageItineraryAction({
        name,
        days: Number(days),
        nights: Number(nights),
        cities: Array.isArray(city) ? city : (city as string).split(',').map(s => s.trim()),
        states: Array.isArray(state) ? state : (state as string).split(',').map(s => s.trim()),
        tags: Array.isArray(tags) ? tags : (tags as string).split(',').map(s => s.trim()),
    });

    if (result.itinerary) {
      replace(result.itinerary as Itinerary[]);
      toast({ title: "Itinerary Generated", description: "The day-by-day itinerary has been filled in by AI." });
    } else if (result.error) {
       toast({ variant: 'destructive', title: 'AI Error', description: result.error });
    }
  };

  const onSubmit: SubmitHandler<Package> = async (data) => {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore not available.' });
      return;
    }

    try {
      const packageId = pkg?.id || slugify(data.name);

      if (!packageId) {
        toast({ variant: 'destructive', title: 'Error', description: 'Package name is required to create an ID.' });
        return;
      }

      const packageData: Package = {
        ...data,
        id: packageId,
        // Ensure array fields are correctly formatted
        city: Array.isArray(data.city) ? data.city : (data.city as any).split(',').map((s:string) => s.trim()),
        state: Array.isArray(data.state) ? data.state : (data.state as any).split(',').map((s:string) => s.trim()),
        tags: Array.isArray(data.tags) ? data.tags : (data.tags as any).split(',').map((s:string) => s.trim()),
        images: data.images || [],
      };
      
      const packageRef = doc(firestore, 'packages', packageId);
      await setDocumentNonBlocking(packageRef, packageData, { merge: true });
      
      toast({
        title: pkg ? 'Package Updated' : 'Package Created',
        description: `"${data.name}" has been saved.`
      });
      
      router.push('/admin/packages');
      router.refresh();

    } catch (error: any) {
      console.error("Error saving package:", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.message });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{pkg?.id ? 'Edit Package' : 'Create New Package'}</CardTitle>
              <CardDescription>Manage package details and itinerary.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <section>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Package Name</Label>
                  <Input id="name" {...register('name', { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Days</Label>
                  <Input id="days" type="number" {...register('days', { valueAsNumber: true, required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nights">Nights</Label>
                  <Input id="nights" type="number" {...register('nights', { valueAsNumber: true, required: true })} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="price">Price (INR)</Label>
                  <Input id="price" type="number" {...register('price', { valueAsNumber: true })} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" {...register('tags')} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="city">Cities (comma-separated)</Label>
                  <Input id="city" {...register('city')} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="state">States (comma-separated)</Label>
                  <Input id="state" {...register('state')} />
                </div>
              </div>
            </section>

            <hr/>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Itinerary</h3>
                    <Button type="button" variant="outline" onClick={handleGenerateItinerary}>
                        <Wand2 className="mr-2 h-4 w-4" /> Generate with AI
                    </Button>
                </div>
                <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Day {field.day || index + 1}</h4>
                            <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4 mr-2" /> Remove Day
                            </Button>
                        </div>
                         <div className="space-y-2">
                            <Label>Day</Label>
                            <Input type="number" {...register(`itinerary.${index}.day`, { valueAsNumber: true })} />
                        </div>
                         <div className="space-y-2">
                            <Label>Title</Label>
                            <Input {...register(`itinerary.${index}.title`)} />
                        </div>
                         <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea {...register(`itinerary.${index}.description`)} />
                        </div>
                    </div>
                ))}
                </div>
                 <Button type="button" variant="outline" className="mt-4" onClick={() => append({ day: fields.length + 1, title: '', description: '' })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Day
                </Button>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Package'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
