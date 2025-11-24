

'use client';
import { cities, states, attractions } from '@/lib/data';
import { notFound }from 'next/navigation';
import type { City, Hotel, State, Attraction } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Castle, ShoppingBag, Star, Utensils, MapPin, Building, Waves, Paintbrush, Sun, Sailboat, Music, Zap, Landmark, Leaf, Mountain, Users2, ShieldCheck, TreePine, Church, Hand, Flower, Droplets, FerrisWheel, School, BookOpen, CableCar, Sprout, Cat, Train, Palmtree, Wind, Ship, Compass, Anchor, Diamond, CookingPot, Drama, Clapperboard, HeartPulse, Martini, Hotel as HotelIcon, Sparkles, Users, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import HotelCard from '@/components/hotel-card';
import React, { use } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


// Helper function to create a slug
function slugify(text: string) {
    if (!text) return '';
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

const iconMap: { [key: string]: React.ElementType } = {
  Castle, Sun, Landmark, MapPin, Waves, Martini, Zap, Leaf, Utensils, 
  Sailboat, Building, Mountain, Users2, ShieldCheck, TreePine, Church, 
  Hand, Flower, Droplets, FerrisWheel, School, BookOpen, CableCar, 
  Sprout, Cat, Train, Palmtree, Wind, Ship, Compass, Anchor, Diamond, 
  CookingPot, Drama, Clapperboard, ShoppingBag, ShoppingBasket, Star,
  HeartPulse, Music, Paintbrush, HotelIcon, Sparkles, Users
};

export default function CityPage({ params }: { params: { stateId: string; cityId: string } }) {
  const { stateId, cityId } = params;

  const firestore = useFirestore();

  const state = (states as State[]).find((s) => s.stateId === stateId);
  const city = (cities as City[]).find((c) => c.cityId === cityId);

  if (!state || !city) {
    notFound();
  }
  
  const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === cityId);

  const cityHotelsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'hotels'), where('cityId', '==', cityId));
  }, [firestore, cityId]);

  const { data: cityHotels, isLoading } = useCollection<Hotel>(cityHotelsQuery);
  
  const heroImage = {
      "src": `https://images.unsplash.com/photo-1714919988045-f47e43a10aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwYW5vcmFtaWMlMjB2aWV3JTIwb2YlMjBEZWhyYWR1bnxlbnwwfHx8fDE3NjM4NzYyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080`,
      "caption": `panoramic view of ${city.name}`
  };

  return (
    <div>
        <div className="relative h-64 md:h-80 w-full">
            <Image
                src={heroImage.src}
                alt={`A scenic view of ${city.name}`}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.caption}
            />
            <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">{city.name}</h1>
            </div>
        </div>
        <div className="container mx-auto px-4 py-12">
            <Card className="mb-12 shadow-lg -mt-24 relative z-10 max-w-4xl mx-auto">
                <CardContent className="p-6 flex justify-between items-center">
                    <div>
                        <CardTitle className="font-headline text-3xl text-brand-blue">{city.name}, {state.name}</CardTitle>
                        <CardDescription className="text-base pt-2">{city.description}</CardDescription>
                    </div>
                    <Button asChild variant="outline">
                        <Link href={`/states/${stateId}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to {state.name}
                        </Link>
                    </Button>
                </CardContent>
            </Card>

             {city.highlights && city.highlights.length > 0 && (
                 <div className="my-16">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                        Key Highlights
                    </h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                        {city.highlights.map(highlight => {
                             const Icon = iconMap[highlight.icon] || Landmark;
                            return (
                                <div key={highlight.name} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full">
                                        <Icon className={`h-8 w-8 ${highlight.color || 'text-primary'}`} />
                                    </div>
                                    <p className="font-semibold text-muted-foreground">{highlight.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {cityAttractions.length > 0 && (
                <div className="my-16">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                        Top Attractions in {city.name}
                    </h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cityAttractions.map((attraction) => (
                            <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                                <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                                     <CardHeader className="p-0">
                                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg">{attraction.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                            <MapPin className="w-3 h-3" />
                                            {attraction.city}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                Hotels in {city.name}
            </h2>
            {isLoading && <p>Loading hotels...</p>}
            {cityHotels && cityHotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cityHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                ))}
                </div>
            ) : (
                !isLoading && <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this city yet.</h3>
                <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                </div>
            )}
        </div>
    </div>
  )
}
