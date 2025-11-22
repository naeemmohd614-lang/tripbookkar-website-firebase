
'use client';
import React, { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import type { MonthData } from '@/data/monthly-destinations';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

interface MonthEditorProps {
  month?: MonthData;
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

const newMonthDefault: Partial<MonthData> = {
  name: '',
  slug: '',
  pageImage: { src: '', caption: '' },
  destinations: [],
};

export default function MonthEditor({ month }: MonthEditorProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<MonthData>({
    defaultValues: month || newMonthDefault
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "destinations"
  });

  useEffect(() => {
    if (month) {
      reset(month);
    } else {
      reset(newMonthDefault);
    }
  }, [month, reset]);

  const onSubmit: SubmitHandler<MonthData> = async (data) => {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore not available.' });
      return;
    }

    try {
      const monthId = month?.id || slugify(data.name);

      if (!monthId) {
        toast({ variant: 'destructive', title: 'Error', description: 'Month name is required to create an ID.' });
        return;
      }
      
      const monthData: MonthData = {
        ...data,
        id: monthId,
        slug: monthId,
      };

      const monthRef = doc(firestore, 'monthlyDestinations', monthId);
      await setDocumentNonBlocking(monthRef, monthData, { merge: true });
      
      toast({
        title: month ? 'Month Updated' : 'Month Created',
        description: `"${data.name}" has been saved.`
      });
      
      router.push('/admin/destinations');
      router.refresh();

    } catch (error: any) {
      console.error("Error saving month:", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.message });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{month?.id ? `Edit ${month.name}` : 'Create New Month'}</CardTitle>
          <CardDescription>Manage destinations for a specific month.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Month Name</Label>
                    <Input id="name" {...register('name', { required: true })} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" {...register('slug')} placeholder="e.g., january" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="pageImage.src">Page Image URL</Label>
                    <Input id="pageImage.src" {...register('pageImage.src')} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="pageImage.caption">Page Image AI Hint</Label>
                    <Input id="pageImage.caption" {...register('pageImage.caption')} />
                </div>
            </div>
            
            <hr/>

            <div>
                <h3 className="text-lg font-semibold mb-4">Destinations</h3>
                <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Destination #{index + 1}</h4>
                            <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4 mr-2" /> Remove Destination
                            </Button>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Destination Name</Label>
                                <Input {...register(`destinations.${index}.name`)} placeholder="e.g., Auli, Uttarakhand" />
                            </div>
                             <div className="space-y-2">
                                <Label>Image URL</Label>
                                <Input {...register(`destinations.${index}.image.src`)} />
                            </div>
                             <div className="space-y-2 md:col-span-2">
                                <Label>Reason to Visit</Label>
                                <Textarea {...register(`destinations.${index}.reason`)} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Hotel Names (comma-separated)</Label>
                                <Textarea {...register(`destinations.${index}.hotels` as any)} placeholder="Hotel A, Hotel B, Hotel C" />
                            </div>
                              <div className="space-y-2">
                                <Label>Image AI Hint</Label>
                                <Input {...register(`destinations.${index}.image.caption`)} />
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                 <Button type="button" variant="outline" className="mt-4" onClick={() => append({ name: '', reason: '', image: {src: '', caption: ''}, hotels: [] })}>
                    <Plus className="h-4 w-4 mr-2" /> Add Destination
                </Button>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Month'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

