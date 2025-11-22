

'use client';
import { states, cities as allCities, attractions } from '@/lib/data';
import { notFound, useParams }from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Users, Calendar, Clock, Package as PackageIcon, Hotel as HotelIcon, Castle, Sun, Landmark, MapPin, Waves, Martini, Zap, Leaf, Utensils, Sailboat, Building, Mountain, Users2, ShieldCheck, TreePine, Church, Star, ShoppingBag, Paintbrush, Music, HeartPulse, SwatchBook, Bell, Hand, Flower, CableCar, Sprout, BookOpen, Cat, Clapperboard, Drama, CookingPot, Diamond, ShoppingBasket, Anchor, Compass } from 'lucide-react';
import type { State, Hotel, City, Attraction } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


// Helper function to create a slug
function slugify(text: string) {
  if (!text) return '';
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function StatePage() {
  const params = useParams();
  const stateId = params.stateId as string;
  
  const firestore = useFirestore();

  const state = (states as State[]).find((s) => s.stateId === stateId);
  
  if (!state) {
    notFound();
  }

  const stateHotelsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'hotels'), where('stateId', '==', stateId));
  }, [firestore, stateId]);

  const { data: stateHotels, isLoading } = useCollection<Hotel>(stateHotelsQuery);

  const stateCities = (allCities as City[]).filter(city => city.stateId === stateId);
  
  const stateImage = {
      "src": `https://picsum.photos/seed/${state.stateId}/1280/400`,
      "caption": `landscape ${state.name}`
  };

  // Fallback for other states
  return (
    <div>
        {stateImage && (
            <div className="relative h-64 md:h-80 w-full">
                <Image
                    src={stateImage.src}
                    alt={`A scenic view of ${state.name}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={stateImage.caption}
                />
                <div className="absolute inset-0 bg-black/40" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">{state.name}</h1>
                </div>
            </div>
        )}
        <div className="container mx-auto px-4 py-12">
            <Card className="mb-12 shadow-lg -mt-24 relative z-10 max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-brand-blue">{state.name}</CardTitle>
                    <CardDescription className="text-base pt-2">{state.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Map className="w-5 h-5"/>
                            <span>{state.totalCities} cities</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5"/>
                            <span>{stateHotels ? stateHotels.length : '...'} hotels</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {stateCities.length > 0 && (
                <div className="my-16">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                        Explore Cities in {state.name}
                    </h2>
                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {stateCities.map((city) => {
                            const cityImage = {
                                "src": `https://picsum.photos/seed/${city.cityId}/400/300`,
                                "caption": `View of ${city.name}`
                            };
                            return (
                                <Link href={`/states/${state.stateId}/cities/${city.cityId}`} key={city.cityId}>
                                    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                                        <CardContent className="p-0">
                                        <div className="relative h-40">
                                            <Image
                                                src={cityImage.src}
                                                alt={cityImage.caption}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                data-ai-hint={cityImage.caption}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-3">
                                                <h3 className="font-bold text-lg text-white font-headline">{city.name}</h3>
                                            </div>
                                        </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}


            <div className="my-16">
                <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                    Hotels in {state.name}
                </h2>
                {isLoading && <p className="text-center">Loading hotels...</p>}
                {stateHotels && stateHotels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stateHotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                    </div>
                ) : (
                    !isLoading && <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this state yet.</h3>
                    <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
