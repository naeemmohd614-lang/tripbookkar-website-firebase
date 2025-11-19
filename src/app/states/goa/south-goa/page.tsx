
'use client';
import { attractions, hotels } from '@/lib/data';
import type { Attraction, Hotel } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Waves, Leaf, Hotel as HotelIcon } from 'lucide-react';
import Link from 'next/link';
import HotelCard from '@/components/hotel-card';

export default function SouthGoaPage() {
    
    const heroImage = {
        src: 'https://picsum.photos/seed/south-goa-hero/1920/600',
        caption: 'Palolem beach serene sunset'
    };

    const highlights = [
        { icon: Waves, text: 'Serene Beaches', color: 'text-sky-500' },
        { icon: HotelIcon, text: 'Luxury Resorts', color: 'text-amber-500' },
        { icon: Leaf, text: 'Untouched Nature', color: 'text-green-500' },
    ];
    
    const southGoaAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'south-goa');

    const southGoaHotels = (hotels as Hotel[]).filter(hotel => 
        ['benaulim', 'cavelossim', 'margao', 'palolem'].includes(hotel.cityId)
    );

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image
                    src={heroImage.src}
                    alt="Serene and beautiful South Goa beach at sunset"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.caption}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore South Goa</h1>
                    <p className="text-lg text-gray-200 mt-2">Discover tranquility and pristine beauty</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/states/goa">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Goa
                        </Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to South Goa</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        South Goa offers a tranquil escape from the bustling north. It's a region of pristine, white-sand beaches, lush paddy fields, and luxurious resorts. If you're seeking peace, relaxation, and a chance to connect with nature, South Goa is your perfect destination.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
                        {highlights.map(highlight => {
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
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in South Goa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {southGoaAttractions.map(attraction => (
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
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>


                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in South Goa</h3>
                     {southGoaHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {southGoaHotels.map((hotel) => (
                            <HotelCard key={hotel.hotelId} hotel={hotel} />
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this area yet.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
