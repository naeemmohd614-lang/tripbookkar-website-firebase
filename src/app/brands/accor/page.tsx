
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


const accorBrandNames = [
    "Accor"
];

export default function AccorPage() {
    const firestore = useFirestore();
    const heroImage = {
        src: "https://picsum.photos/seed/accor-hero-page/1920/800",
        caption: "modern city hotel"
    };

    const accorBrands = (brands as Brand[]).filter(b => accorBrandNames.includes(b.name));

    const accorHotelsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'hotels'), where('brand', 'in', accorBrandNames));
    }, [firestore]);

    const { data: accorHotels, isLoading } = useCollection<Hotel>(accorHotelsQuery);

    return (
        <div className="bg-background text-foreground">
            <section className="relative w-full h-[50vh] text-white">
                <Image
                    src={heroImage.src}
                    alt="Accor Hotels in India"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.caption}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
                        Accor Hotels
                    </h1>
                </div>
            </section>

            <section id="all-accor-hotels" className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center">
                        All Accor Properties in India
                    </h2>
                     {isLoading && <p>Loading hotels...</p>}
                     {accorHotels && accorHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {accorHotels.map(hotel => (
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
