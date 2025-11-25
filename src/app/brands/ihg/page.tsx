
'use client';
import { brands } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Hotel, Brand } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import React from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


const ihgBrandNames = [
    "IHG", "InterContinental", "Crowne Plaza", "Holiday Inn"
];

export default function IHGPage() {
    const firestore = useFirestore();
    const heroImage = {
        src: "https://picsum.photos/seed/ihg-hero-page/1920/800",
        caption: "global business hotel"
    };

    const ihgBrands = (brands as Brand[]).filter(b => ihgBrandNames.includes(b.name));

    const ihgHotelsQuery = firestore ? query(collection(firestore, 'hotels'), where('brand', 'in', ihgBrandNames)) : null;

    const { data: ihgHotels, isLoading } = useCollection<Hotel>(ihgHotelsQuery);

    return (
        <div className="bg-background text-foreground">
            <section className="relative w-full h-[50vh] text-white">
                <Image
                    src={heroImage.src}
                    alt="IHG Hotels in India"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.caption}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
                        IHG Hotels & Resorts
                    </h1>
                </div>
            </section>

            <section id="all-ihg-hotels" className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center">
                        All IHG Properties in India
                    </h2>
                    {isLoading && <p>Loading hotels...</p>}
                    {ihgHotels && ihgHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ihgHotels.map(hotel => (
                                <HotelCard hotel={hotel} key={hotel.id} />
                            ))}
                        </div>
                    ) : !isLoading && (
                         <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this brand yet.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
