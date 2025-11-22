'use client';
import React, { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Trash2, Wand2 } from 'lucide-react';
import type { Hotel } from '@/lib/types';
import { generateHotelDescriptionAction } from '@/app/actions';
import { useFirestore } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import { setDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

interface HotelEditorProps {
  hotel?: Hotel;
}

export default function HotelEditor({ hotel }: HotelEditorProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

  const { register, control, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<Hotel>({
    defaultValues: hotel || {
      name: '',
      brand: '',
      city: '',
      state: '',
      address: '',
      about: '',
      basePrice: 0,
      rating: 0,
      images: [],
      roomCategories: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roomCategories"
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "images"
  });

  useEffect(() => {
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);
  
  const watchedName = useWatch({ control, name: 'name' });
  const watchedCity = useWatch({ control, name: 'city' });
  const watchedBrand = useWatch({ control, name: 'brand' });

  const handleGenerateDescription = async () => {
    if (!watchedName) {
      alert("Please enter a hotel name first.");
      return;
    }
    const result = await generateHotelDescriptionAction({
      name: watchedName,
      city: watchedCity,
      brand: watchedBrand,
    });

    if (result.description) {
      setValue('about', result.description);
    }
    if (result.error) {
      alert(`AI Error: ${result.error}`);
    }
  };

  const onSubmit: SubmitHandler<Hotel> = async (data) => {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore not available.' });
      return;
    }

    try {
      if (hotel?.hotelId) {
        // Update existing hotel
        const hotelRef = doc(firestore, 'hotels', hotel.hotelId);
        setDocumentNonBlocking(hotelRef, data, { merge: true });
        toast({ title: 'Hotel Updated', description: `"${data.name}" has been saved.` });
      } else {
        // Create new hotel
        const hotelsCol = collection(firestore, 'hotels');
        await addDocumentNonBlocking(hotelsCol, data);
        toast({ title: 'Hotel Created', description: `"${data.name}" has been added.` });
      }
      router.push('/admin/hotels');
      router.refresh(); // To show the updated list
    } catch (error: any) {
      console.error("Error saving hotel:", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.message });
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    alert(`Simulating upload for: ${file.name}. In a real app, this would upload to cloud storage.`);
    // In a real app:
    // 1. Get a reference to Firebase Storage
    // 2. Upload the file
    // 3. Get the download URL
    // 4. Update the hotel's data with the new image URL
    // e.g., appendImage({ src: newUrl, caption: 'Uploaded image' });
  };


  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{hotel?.hotelId ? 'Edit Hotel' : 'Create New Hotel'}</CardTitle>
          <CardDescription>Manage hotel details, room categories, and images.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <section>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Hotel Name</Label>
                  <Input id="name" {...register('name')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input id="brand" {...register('brand')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register('city')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" {...register('state')} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" {...register('address')} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="about">About</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription}>
                      <Wand2 className="mr-2 h-4 w-4"/>
                      Generate with AI
                    </Button>
                  </div>
                  <Textarea id="about" {...register('about')} rows={5}/>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (INR)</Label>
                  <Input id="basePrice" type="number" {...register('basePrice', { valueAsNumber: true })} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input id="rating" type="number" step="0.1" {...register('rating', { valueAsNumber: true })} />
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Room Categories</h3>
                    <Button type="button" variant="outline" onClick={() => append({ name: '', count: 0, size: '' })}>
                        Add Room
                    </Button>
                </div>
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr,100px,100px,auto] gap-4 items-end p-4 border rounded-lg bg-secondary/30">
                            <div className="space-y-2">
                                <Label>Room Name</Label>
                                <Input {...register(`roomCategories.${index}.name`)} placeholder="e.g., Deluxe Room" />
                            </div>
                             <div className="space-y-2">
                                <Label>Count</Label>
                                <Input type="number" {...register(`roomCategories.${index}.count`, { valueAsNumber: true })} placeholder="e.g., 50" />
                            </div>
                             <div className="space-y-2">
                                <Label>Size (sqft)</Label>
                                <Input {...register(`roomCategories.${index}.size`)} placeholder="e.g., 450 sqft" />
                            </div>
                            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

             <Separator />

             <section>
                <h3 className="text-lg font-semibold mb-4">Image Management</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imageFields.map((image, index) => (
                        <div key={image.id} className="relative aspect-video">
                            <img src={image.src} alt={image.caption} className="rounded-md object-cover w-full h-full" />
                             <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6"
                                onClick={() => removeImage(index)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                        </div>
                    ))}
                     <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md">
                        <Label htmlFor="image-upload" className="cursor-pointer text-center">
                            <p>+ Add Image</p>
                            <Input id="image-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                        </Label>
                    </div>
                </div>
            </section>


            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Hotel'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
