
'use client';
import { brands } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Hotel, Brand } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


const leelaBrandNames = [
    "The Leela"
];

export default function LeelaPage() {
    const firestore = useFirestore();
    const heroImage = {
        src: "https://picsum.photos/seed/leela-hero-page/1920/800",
        caption: "opulent indian palace interior"
    };

    const leelaBrands = (brands as Brand[]).filter(b => leelaBrandNames.includes(b.name));
    
    const leelaHotelsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'hotels'), where('brand', 'in', leelaBrandNames)) : null, [firestore]);

    const { data: leelaHotels, isLoading } = useCollection<Hotel>(leelaHotelsQuery);

    const preferredHotels = leelaHotels?.filter(h => 
        ["The Leela Palace New Delhi", "The Leela Palace Udaipur", "The Leela Palace Bengaluru"].includes(h.name)
    ) || [];

    return (
        <div className="bg-background text-foreground">
            <section className="relative w-full h-[50vh] text-white">
                <Image
                    src={heroImage.src}
                    alt="The Leela Hotels in India"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.caption}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
                        The Leela Palaces, Hotels and Resorts
                    </h1>
                </div>
            </section>

            <section id="preferred-properties" className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4">
                        Our Preferred Leela Properties
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                       Experience the essence of true Indian luxury and warm, gracious hospitality.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {preferredHotels.map(hotel => (
                            <HotelCard hotel={hotel} key={hotel.id} />
                        ))}
                    </div>
                </div>
            </section>

            <section id="all-leela-hotels" className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center">
                        All The Leela Properties in India
                    </h2>
                    {isLoading && <p className="text-center">Loading hotels...</p>}
                    {leelaHotels && leelaHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {leelaHotels.map(hotel => (
                                <HotelCard hotel={hotel} key={hotel.id} />
                            ))}
                        </div>
                    ) : !isLoading && (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this brand.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
