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
import { Trash2, Wand2, Utensils, Zap, Mic2, GlassWater } from 'lucide-react';
import type { Hotel } from '@/lib/types';
import { generateHotelDetailsAction } from '@/app/actions';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface HotelEditorProps {
  hotel?: Hotel;
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

const newHotelDefault: Partial<Hotel> = {
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
  facilities: { pool: false, spa: false, gym: false, wifi: true, parking: true, petFriendly: false, checkIn: '3:00 PM', checkOut: '12:00 PM' },
  tags: [],
  diningExperiences: [],
  experiencesAndActivities: [],
  weddingVenues: [],
};


export default function HotelEditor({ hotel }: HotelEditorProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

  const { register, control, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<Hotel>({
    defaultValues: hotel || newHotelDefault
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roomCategories"
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "images"
  });
  
  const { fields: diningFields, append: appendDining, remove: removeDining } = useFieldArray({
    control,
    name: "diningExperiences"
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: "experiencesAndActivities"
  });
  
  const { fields: weddingFields, append: appendWedding, remove: removeWedding } = useFieldArray({
    control,
    name: "weddingVenues"
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
      control,
      name: "tags"
  });

  useEffect(() => {
    if (hotel) {
      reset(hotel);
    } else {
      reset(newHotelDefault);
    }
  }, [hotel, reset]);
  
  const watchedName = useWatch({ control, name: 'name' });
  const watchedCity = useWatch({ control, name: 'city' });
  const watchedBrand = useWatch({ control, name: 'brand' });

  const handleGenerateDetails = async () => {
    if (!watchedName) {
      toast({ variant: 'destructive', title: "Hotel Name Required", description: "Please enter a hotel name before generating details." });
      return;
    }
    const result = await generateHotelDetailsAction({
      name: watchedName,
      city: watchedCity,
      brand: watchedBrand,
    });

    if (result.details) {
      const { about, diningExperiences, experiencesAndActivities, weddingVenues, tags } = result.details;
      setValue('about', about);
      setValue('diningExperiences', diningExperiences || []);
      setValue('experiencesAndActivities', experiencesAndActivities || []);
      setValue('weddingVenues', weddingVenues || []);
      setValue('tags', tags || []);
      toast({ title: "Hotel Details Generated", description: "All details have been filled in by AI." });
    }
    if (result.error) {
       toast({ variant: 'destructive', title: 'AI Error', description: result.error });
    }
  };

  const onSubmit: SubmitHandler<Hotel> = async (data) => {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore not available.' });
      return;
    }

    try {
      let hotelData: Hotel;
      if (hotel?.id) {
        // For existing hotels, we just merge the updated data.
        // We assume essential IDs like hotelId, cityId, etc. already exist.
        hotelData = data;
        const hotelRef = doc(firestore, 'hotels', hotel.id);
        await setDocumentNonBlocking(hotelRef, hotelData, { merge: true });
        toast({ title: 'Hotel Updated', description: `"${data.name}" has been saved.` });
      } else {
        // For a NEW hotel, we must generate all the necessary IDs.
        const generatedId = slugify(data.name);
        hotelData = {
          ...data,
          id: generatedId,
          hotelId: generatedId,
          cityId: slugify(data.city),
          stateId: slugify(data.state),
          brandSlug: slugify(data.brand),
        };
        const hotelRef = doc(firestore, 'hotels', hotelData.id);
        await setDocumentNonBlocking(hotelRef, hotelData, { merge: true });
        toast({ title: 'Hotel Created', description: `"${data.name}" has been added.` });
      }
      
      router.push('/admin/hotels');
      router.refresh();

    } catch (error: any) {
      console.error("Error saving hotel:", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.message });
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast({ title: 'Simulating Upload', description: `Uploading: ${file.name}. In a real app, this would upload to cloud storage.` });
    appendImage({ src: URL.createObjectURL(file), caption: 'New upload' });
  };


  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">{hotel?.id ? 'Edit Hotel' : 'Create New Hotel'}</CardTitle>
              <CardDescription>Manage hotel details, room categories, and images.</CardDescription>
            </div>
            <Button type="button" onClick={handleGenerateDetails} variant="outline">
              <Wand2 className="mr-2 h-4 w-4" />
              Generate All Details with AI
            </Button>
          </div>
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
                  <Label htmlFor="about">About</Label>
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
                    <h3 className="text-lg font-semibold flex items-center gap-2"><GlassWater className="w-5 h-5"/>Room Categories</h3>
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
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Utensils className="w-5 h-5"/>Dining Experiences</h3>
                    <Button type="button" variant="outline" onClick={() => appendDining({ name: '', type: '' })}>
                        Add Dining
                    </Button>
                </div>
                <div className="space-y-4">
                    {diningFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-4 items-end p-4 border rounded-lg bg-secondary/30">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input {...register(`diningExperiences.${index}.name`)} placeholder="e.g., The Lantern" />
                            </div>
                             <div className="space-y-2">
                                <Label>Type</Label>
                                <Input {...register(`diningExperiences.${index}.type`)} placeholder="e.g., Chinese" />
                            </div>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeDining(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

             <Separator />

             <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Zap className="w-5 h-5"/>Experiences &amp; Activities</h3>
                    <Button type="button" variant="outline" onClick={() => appendExperience({ value: '' } as any)}>
                       Add Activity
                    </Button>
                </div>
                <div className="space-y-4">
                    {experienceFields.map((field, index) => (
                         <div key={field.id} className="grid grid-cols-[1fr,auto] gap-4 items-end p-4 border rounded-lg bg-secondary/30">
                            <div className="space-y-2">
                                <Label>Activity</Label>
                                <Input {...register(`experiencesAndActivities.${index}` as any)} placeholder="e.g., Rooftop Pool" />
                            </div>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeExperience(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            <Separator />
            
             <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Mic2 className="w-5 h-5"/>Wedding Venues</h3>
                    <Button type="button" variant="outline" onClick={() => appendWedding({ value: '' } as any)}>
                        Add Venue
                    </Button>
                </div>
                <div className="space-y-4">
                    {weddingFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-[1fr,auto] gap-4 items-end p-4 border rounded-lg bg-secondary/30">
                            <div className="space-y-2">
                                <Label>Venue</Label>
                                <Input {...register(`weddingVenues.${index}` as any)} placeholder="e.g., Grand Ballroom" />
                            </div>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeWedding(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

             <Separator />

             <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Tags</h3>
                    <Button type="button" variant="outline" onClick={() => appendTag({ value: '' } as any)}>
                        Add Tag
                    </Button>
                </div>
                <div className="space-y-4">
                    {tagFields.map((field, index) => (
                         <div key={field.id} className="grid grid-cols-[1fr,auto] gap-4 items-end">
                            <Input {...register(`tags.${index}` as any)} placeholder="e.g., luxury" />
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeTag(index)}>
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
                           {image.src && <Image src={image.src} alt={image.caption || `Image ${index + 1}`} fill className="rounded-md object-cover" />}
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
