
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { attractions, hotels } from '@/lib/data';
import type { Attraction, Hotel } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Ticket, CalendarCheck, MapPin, Bus, Train, Plane, Info, Hotel as HotelIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function AttractionPage() {
    const params = useParams();
    const router = useRouter();
    const attractionId = params.attractionId as string;

    const attraction = attractions.find((a) => a.attractionId === attractionId);

    if (!attraction) {
        notFound();
    }
    
    const distanceIcons: { [key: string]: React.ElementType } = {
        'Airport': Plane,
        'Railway Station': Train,
        'Bus Stand': Bus,
    };

    return (
        <div className="bg-secondary/30">
            <div className="relative h-64 md:h-96 w-full">
                <Image
                    src={attraction.image.src}
                    alt={`View of ${attraction.name}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={attraction.image.caption}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-8 left-8">
                    <Button variant="outline" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">{attraction.name}</h1>
                    <p className="flex items-center gap-2 text-lg text-gray-200 mt-2">
                        <MapPin className="w-5 h-5"/>
                        {attraction.city}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-headline text-brand-blue mb-4">About {attraction.name}</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {attraction.description}
                                </p>

                                {attraction.notes && attraction.notes.length > 0 && (
                                     <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                        <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-2"><Info className="w-5 h-5"/>Important Notes</h3>
                                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                                            {attraction.notes.map((note, i) => <li key={i}>{note}</li>)}
                                        </ul>
                                     </div>
                                )}
                            </CardContent>
                        </Card>
                        
                        {attraction.nearbyHotels && attraction.nearbyHotels.length > 0 && (
                            <Card className="mt-8">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <HotelIcon className="w-6 h-6 text-primary" />
                                        Nearby Hotels
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {attraction.nearbyHotels.map(hotelName => {
                                            const hotel = (hotels as Hotel[]).find(h => h.name === hotelName);
                                            if (!hotel) return null;
                                            return (
                                                <Link key={hotel.hotelId} href={`/states/${hotel.stateId}/cities/${hotel.cityId}/hotels/${hotel.hotelId}`}>
                                                    <div className="p-3 rounded-md border hover:bg-accent transition-colors">
                                                        <h4 className="font-semibold text-primary">{hotel.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{hotel.brand}</p>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Quick Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 mt-1 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Timings</h4>
                                        <p className="text-sm text-muted-foreground">{attraction.timing}</p>
                                    </div>
                                </div>
                                <Separator/>
                                <div className="flex items-start gap-3">
                                    <Ticket className="w-5 h-5 mt-1 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Entry Fees</h4>
                                        <ul className="text-sm text-muted-foreground">
                                            {attraction.fees.map(fee => (
                                                <li key={fee.type}><strong>{fee.type}:</strong> {fee.amount}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                 <Separator/>
                                <div className="flex items-start gap-3">
                                    <CalendarCheck className="w-5 h-5 mt-1 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Best Time to Visit</h4>
                                        <p className="text-sm text-muted-foreground">{attraction.bestTimeToVisit}</p>
                                    </div>
                                </div>
                                 <Separator/>
                                 <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 mt-1 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Distance From</h4>
                                        <ul className="text-sm text-muted-foreground">
                                            {attraction.distances.map(dist => {
                                                const Icon = Object.keys(distanceIcons).find(key => dist.from.includes(key)) 
                                                                ? distanceIcons[Object.keys(distanceIcons).find(key => dist.from.includes(key))!]
                                                                : MapPin;
                                                return (
                                                    <li key={dist.from} className="flex items-center gap-2 mt-1">
                                                        <Icon className="w-4 h-4"/>
                                                        <span><strong>{dist.from}:</strong> {dist.distance}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
