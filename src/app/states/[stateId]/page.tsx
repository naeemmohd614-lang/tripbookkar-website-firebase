

'use client';
import { states, cities as allCities, attractions } from '@/lib/data';
import { notFound }from 'next/navigation';
import type { City, Hotel, State, Attraction } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Castle, ShoppingBag, Star, Utensils, MapPin, Building, Waves, Paintbrush, Sun, Sailboat, Music, Zap, Landmark, Leaf, Mountain, Users2, ShieldCheck, TreePine, Church, Hand, Flower, Droplets, FerrisWheel, School, BookOpen, CableCar, Sprout, Cat, Train, Palmtree, Wind, Ship, Compass, Anchor, Diamond, CookingPot, Drama, Clapperboard, HeartPulse, Martini, Hotel as HotelIcon, Sparkles, Users, Package, Clock, Calendar, ShoppingCart } from 'lucide-react';
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
  HeartPulse, Music, Paintbrush, HotelIcon, Sparkles, Users, Package, Clock, Calendar
};


export default function StatePage({ params }: { params: { stateId: string } }) {
  const { stateId } = params;
  
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
  const stateAttractions = (attractions as Attraction[]).filter(attraction => attraction.stateId === stateId);
  
  const stateImage = {
      "src": `https://picsum.photos/seed/${state.stateId}/1280/400`,
      "caption": `landscape ${state.name}`
  };

  const cityImages: { [key: string]: { src: string, caption: string } } = {
    jaipur: { src: 'https://images.unsplash.com/photo-1698031952427-040d75f92277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxqYWlwcHVyJTIwY2l0eXxlbnwwfHx8fDE3NjM4NzYyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Hawa Mahal Jaipur' },
    jodhpur: { src: 'https://images.unsplash.com/photo-1678826532773-304f58c73449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxqodhpurJTIwYmx1ZSUyMGNpdHl8ZW58MHx8fHwxNzYzODc2MjYwfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Jodhpur blue city' },
    udaipur: { src: 'https://images.unsplash.com/photo-1715951336181-427a1b73e58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx1ZGFpcHVyJTIwY2l0eSUyMHBhbGFjZXxlbnwwfHx8fDE3NjM4NzYyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Udaipur city palace' },
    jaisalmer: { src: 'https://images.unsplash.com/photo-1678783440318-47734a171542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxqYWlzYWxtZXIlMjBmb3J0fGVufDB8fHx8MTc2Mzg3NjI2MHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Jaisalmer fort' },
    rishikesh: { src: 'https://images.unsplash.com/photo-1681928701229-75ec3d9650b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxWaWV3JTIwb2YlMjBSaXNoaWtlc2h8ZW58MHx8fHwxNzYzODcyMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'View of Rishikesh' },
    nainital: { src: 'https://images.unsplash.com/photo-1619796696652-a29a854f21a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxWaWV3JTIwb2YlMjBOYWluaXRhbHxlbnwwfHx8fDE3NjM4NzIwNzB8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'View of Nainital' },
    mussoorie: { src: 'https://images.unsplash.com/photo-1720782114166-703488743930?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxWaWV3JTIwb2YlMjBNdXNzb29yaWV8ZW58MHx8fHwxNzYzODcyMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'View of Mussoorie' },
    dehradun: { src: 'https://images.unsplash.com/photo-1714919988045-f47e43a10aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwYW5vcmFtaWMlMjB2aWV3JTIwb2YlMjBEZWhyYWR1bnxlbnwwfHx8fDE3NjM4NzYyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'panoramic view of Dehradun' },
  };

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
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                        {state.bestTimeToVisit && 
                            <div className="flex items-center gap-2">
                                <Sun className="w-5 h-5 text-amber-500"/>
                                <div>
                                    <span className="font-semibold text-foreground">Best Time to Visit</span><br/>
                                    <span>{state.bestTimeToVisit}</span>
                                </div>
                            </div>
                        }
                         {state.idealDuration && 
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-500"/>
                                 <div>
                                    <span className="font-semibold text-foreground">Ideal Duration</span><br/>
                                    <span>{state.idealDuration}</span>
                                </div>
                            </div>
                        }
                         <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-green-500"/>
                             <div>
                                <span className="font-semibold text-foreground">Holiday Packages</span><br/>
                                <Link href="/packages" className="hover:underline">View Packages</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <HotelIcon className="w-5 h-5 text-purple-500"/>
                            <div>
                                <span className="font-semibold text-foreground">Top Hotels</span><br/>
                                <Link href={`/states/${state.stateId}/#state-hotels`} className="hover:underline">Find Hotels</Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {state.highlights && state.highlights.length > 0 && (
                 <div className="my-16">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                        Highlights
                    </h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        {state.highlights.map(highlight => {
                             const Icon = iconMap[highlight.icon] || Landmark;
                            return (
                                <div key={highlight.name} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <p className="font-semibold text-muted-foreground">{highlight.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}


            {stateAttractions.length > 0 && (
                <div className="my-16">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                        Top Attractions in {state.name}
                    </h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stateAttractions.map((attraction) => (
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


            {stateCities.length > 0 && (
                <div className="my-16">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                        Explore Cities in {state.name}
                    </h2>
                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {stateCities.map((city) => {
                            const cityImage = cityImages[city.cityId] || { src: `https://picsum.photos/seed/${city.cityId}/400/300`, caption: `View of ${city.name}` };
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


            <div className="my-16" id="state-hotels">
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




