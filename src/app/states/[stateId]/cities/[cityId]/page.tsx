'use client';
import { cities, hotels, states } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import type { City, Hotel, State } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Castle, ShoppingBag, Star, Utensils } from 'lucide-react';
import Link from 'next/link';
import HotelCard from '@/components/hotel-card';

export default function CityPage() {
  const params = useParams();
  const stateId = params.stateId as string;
  const cityId = params.cityId as string;

  const state = (states as State[]).find((s) => s.stateId === stateId);
  const city = (cities as City[]).find((c) => c.cityId === cityId);

  if (!state || !city) {
    notFound();
  }

  const cityHotels = (hotels as Hotel[]).filter(
    (hotel) => hotel.cityId === cityId
  );
  
  const heroImage = {
      "src": `https://picsum.photos/seed/city-${cityId}/1920/600`,
      "caption": `panoramic view of ${city.name}`
  };
  
  if (cityId === 'jaipur') {
     const jaipurHeroImage = {
        "src": "https://images.unsplash.com/photo-1599661046223-140c147242da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxqYWwlMjBtYWhhbCUyMGphaXB1cnxlbnwwfHx8fDE3NjM0NTU2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "caption": "jal mahal jaipur"
    };

    const jaipurHighlights = [
        { icon: Star, text: 'The Pink City', color: 'text-pink-500' },
        { icon: Castle, text: 'Royal Forts & Palaces', color: 'text-orange-500' },
        { icon: ShoppingBag, text: 'Vibrant Bazaars', color: 'text-sky-500' },
        { icon: Utensils, text: 'Rich Culinary Heritage', color: 'text-green-500' },
    ];

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image
                    src={jaipurHeroImage.src}
                    alt={`A scenic view of ${city.name}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={jaipurHeroImage.caption}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Jaipur</h1>
                    <p className="text-lg text-gray-200 mt-2">The vibrant heart of Rajasthan</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to {state.name}
                        </Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Jaipur</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Jaipur, the capital of Rajasthan, is a city that effortlessly blends the old and the new. Famously known as the 'Pink City' due to the distinct color of its buildings, it was founded in 1727 by Maharaja Sawai Jai Singh II. A delight for shoppers, foodies, and history buffs alike, the city is a treasure trove of majestic forts, opulent palaces, vibrant bazaars, and delectable cuisine.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        {jaipurHighlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full">
                                        <Icon className={`h-8 w-8 ${highlight.color}`} />
                                    </div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                     {cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (
                            <HotelCard key={hotel.hotelId} hotel={hotel} />
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this city yet.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }

  // Fallback for other cities
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
                <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                         <div>
                            <CardContent className="font-headline text-3xl text-brand-blue">{city.name}, {state.name}</CardContent>
                            <p className="text-muted-foreground pl-6">{city.description}</p>
                        </div>
                        <Button asChild variant="outline">
                            <Link href={`/states/${stateId}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to {state.name}
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                Hotels in {city.name}
            </h2>
            {cityHotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cityHotels.map((hotel) => (
                    <HotelCard key={hotel.hotelId} hotel={hotel} />
                ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this city yet.</h3>
                <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                </div>
            )}
        </div>
    </div>
  )
}
