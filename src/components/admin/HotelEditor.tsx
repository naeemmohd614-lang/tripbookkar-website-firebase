'use client';
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, SubmitHandler, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Trash2, Wand2, Utensils, Zap, Mic2, GlassWater, Tag, Upload, Link as LinkIcon } from 'lucide-react';
import type { Hotel } from '@/lib/types';
import { saveHotelAction, generateHotelDetailsAction, generateHotelDescriptionAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface HotelEditorProps {
  hotel?: Hotel;
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
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState('');


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

  const handleGenerateDescription = async () => {
    if (!watchedName) {
        toast({ variant: 'destructive', title: "Hotel Name Required", description: "Please enter a hotel name before generating a description." });
        return;
    }
    const result = await generateHotelDescriptionAction({ name: watchedName, city: watchedCity, brand: watchedBrand });
    if (result.description) {
        setValue('about', result.description);
        toast({ title: "Description Generated", description: "The description has been filled in by AI." });
    } else if (result.error) {
        toast({ variant: 'destructive', title: 'AI Error', description: result.error });
    }
  };

  const handleGenerateDetails = async (sections: ('about' | 'dining' | 'experiences' | 'weddings' | 'tags')[]) => {
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
      if (sections.includes('about')) setValue('about', result.details.about);
      if (sections.includes('dining')) setValue('diningExperiences', result.details.diningExperiences || []);
      
      const formatForFieldArray = (data: string[]) => data.map(item => ({ value: item }));

      if(sections.includes('experiences')) setValue('experiencesAndActivities', formatForFieldArray(result.details.experiencesAndActivities || []) as any);
      if(sections.includes('weddings')) setValue('weddingVenues', formatForFieldArray(result.details.weddingVenues || []) as any);
      if(sections.includes('tags')) setValue('tags', formatForFieldArray(result.details.tags || []) as any);

      toast({ title: "AI Generation Complete", description: "Selected details have been filled in." });
    }
    if (result.error) {
       toast({ variant: 'destructive', title: 'AI Error', description: result.error });
    }
  };

  const onSubmit: SubmitHandler<Hotel> = async (data) => {
    const result = await saveHotelAction(hotel?.id || null, data);
    
    if (result.success) {
      toast({
        title: result.isNew ? 'Hotel Created' : 'Hotel Updated',
        description: `"${data.name}" has been saved.`
      });
      router.push('/admin/hotels');
      router.refresh(); // Refresh the current view if needed
    } else {
      toast({ variant: 'destructive', title: 'Save Failed', description: result.message });
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast({ title: 'Simulating Upload', description: `Uploading: ${file.name}. In a real app, this would upload to cloud storage.` });
    appendImage({ src: URL.createObjectURL(file), caption: 'New upload' });
  };
  
  const handleAddImageUrl = () => {
    if (imageUrl && imageUrl.trim() !== '') {
      appendImage({ src: imageUrl, caption: 'New image from URL' });
      setImageUrl('');
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid URL',
        description: 'Please enter a valid image URL.',
      });
    }
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
            <Button type="button" onClick={() => handleGenerateDetails(['about', 'dining', 'experiences', 'weddings', 'tags'])} variant="outline">
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
                  <div className="flex justify-between items-center">
                     <Label htmlFor="about">About</Label>
                     <Button type="button" size="sm" variant="ghost" onClick={handleGenerateDescription}>
                        <Wand2 className="mr-2 h-3 w-3" /> Generate
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
                    <div className="flex items-center gap-2">
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleGenerateDetails(['dining'])}>
                            <Wand2 className="mr-2 h-4 w-4" /> Generate
                        </Button>
                        <Button type="button" variant="outline" onClick={() => appendDining({ name: '', type: '' })}>
                            Add Dining
                        </Button>
                    </div>
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
                    <div className="flex items-center gap-2">
                         <Button type="button" variant="ghost" size="sm" onClick={() => handleGenerateDetails(['experiences'])}>
                            <Wand2 className="mr-2 h-4 w-4" /> Generate
                        </Button>
                        <Button type="button" variant="outline" onClick={() => appendExperience({ value: '' } as any)}>
                           Add Activity
                        </Button>
                    </div>
                </div>
                <div className="space-y-4">
                    {experienceFields.map((field, index) => (
                         <div key={field.id} className="grid grid-cols-[1fr,auto] gap-4 items-end p-4 border rounded-lg bg-secondary/30">
                            <div className="space-y-2">
                                <Label>Activity</Label>
                                <Input {...register(`experiencesAndActivities.${index}.value` as any)} placeholder="e.g., Rooftop Pool" />
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
                    <div className="flex items-center gap-2">
                         <Button type="button" variant="ghost" size="sm" onClick={() => handleGenerateDetails(['weddings'])}>
                            <Wand2 className="mr-2 h-4 w-4" /> Generate
                        </Button>
                        <Button type="button" variant="outline" onClick={() => appendWedding({ value: '' } as any)}>
                            Add Venue
                        </Button>
                    </div>
                </div>
                <div className="space-y-4">
                    {weddingFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-[1fr,auto] gap-4 items-end p-4 border rounded-lg bg-secondary/30">
                            <div className="space-y-2">
                                <Label>Venue</Label>
                                <Input {...register(`weddingVenues.${index}.value` as any)} placeholder="e.g., Grand Ballroom" />
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
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Tag className="w-5 h-5" />Tags</h3>
                     <div className="flex items-center gap-2">
                         <Button type="button" variant="ghost" size="sm" onClick={() => handleGenerateDetails(['tags'])}>
                            <Wand2 className="mr-2 h-4 w-4" /> Generate
                        </Button>
                        <Button type="button" variant="outline" onClick={() => appendTag({ value: '' } as any)}>
                            Add Tag
                        </Button>
                    </div>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button type="button" asChild variant="outline">
                        <Label htmlFor="image-upload" className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" /> Upload Image
                        </Label>
                    </Button>
                    <Input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    <div className="flex items-center gap-2 flex-grow">
                        <Input 
                            placeholder="Or paste image URL" 
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="flex-grow"
                        />
                        <Button type="button" onClick={handleAddImageUrl}><LinkIcon className="mr-2 h-4 w-4"/>Add URL</Button>
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
