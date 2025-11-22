

'use client';
import { cities, states, attractions } from '@/lib/data';
import { notFound, useParams }from 'next/navigation';
import type { City, Hotel, State, Attraction } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Castle, ShoppingBag, Star, Utensils, MapPin, Building, Waves, Paintbrush, Sun, Sailboat, Music, Zap, Landmark, Leaf, Mountain, TreePine, Church, Hand, Flower, Droplets, FerrisWheel, School, BookOpen, CableCar, Sprout, Cat, Train, Palmtree, Wind, Ship, Users2, ShieldCheck, HeartPulse, Drama, CookingPot, Diamond, ShoppingBasket, Anchor, Compass } from 'lucide-react';
import Link from 'next/link';
import HotelCard from '@/components/hotel-card';
import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


// Helper function to create a slug
function slugify(text: string) {
    if (!text) return '';
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function CityPage() {
  const params = useParams();
  const stateId = params.stateId as string;
  const cityId = params.cityId as string;

  const firestore = useFirestore();

  const state = (states as State[]).find((s) => s.stateId === stateId);
  const city = (cities as City[]).find((c) => c.cityId === cityId);

  if (!state || !city) {
    notFound();
  }

  const cityHotelsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'hotels'), where('cityId', '==', cityId));
  }, [firestore, cityId]);

  const { data: cityHotels, isLoading } = useCollection<Hotel>(cityHotelsQuery);
  
  const heroImage = {
      "src": `https://picsum.photos/seed/city-${cityId}/1920/600`,
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
