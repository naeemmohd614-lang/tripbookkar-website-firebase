
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


const marriottBrandNames = [
    "The Ritz-Carlton", "St. Regis", "Edition", "The Luxury Collection",
    "W Hotels", "JW Marriott", "Marriott", "Sheraton", "Le Méridien",
    "The Westin", "Autograph Collection", "Renaissance Hotels", "Courtyard by Marriott",
    "Four Points by Sheraton", "Fairfield by Marriott", "Aloft Hotels"
];

export default function MarriottPage() {
    const firestore = useFirestore();
    const heroImage = {
        src: "https://picsum.photos/seed/marriott-hero-page/1920/800",
        caption: "modern hotel exterior"
    };

    const marriottBrands = (brands as Brand[]).filter(b => marriottBrandNames.includes(b.name));
    
    const marriottHotelsQuery = firestore ? query(collection(firestore, 'hotels'), where('brand', 'in', marriottBrandNames)) : null;

    const { data: marriottHotels, isLoading } = useCollection<Hotel>(marriottHotelsQuery);

    const preferredHotels = marriottHotels?.filter(h => 
        ["The Ritz-Carlton, Bangalore", "The St. Regis Mumbai", "W Goa"].includes(h.name)
    ) || [];

    const hotelsByBrand = marriottBrands.map(brand => ({
      ...brand,
      hotels: marriottHotels?.filter(hotel => hotel.brand === brand.name) || []
    })).filter(brand => brand.hotels.length > 0);


    return (
        <div className="bg-background text-foreground">
            <section className="relative w-full h-[50vh] text-white">
                <Image
                    src={heroImage.src}
                    alt="Marriott Bonvoy Hotels in India"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.caption}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
                        Marriott Bonvoy Hotels in India
                    </h1>
                </div>
            </section>

            <section id="explore-brands" className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4">
                        Explore Marriott Brands
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                        From timeless luxury to modern design, discover the perfect brand for your stay.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {marriottBrands.map(brand => (
                            <Button asChild variant="outline" key={brand.brandSlug}>
                                <Link href={`/brands/${brand.brandSlug}`}>{brand.name}</Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            <section id="preferred-properties" className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4">
                        Our Preferred Marriott Properties
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                        We partner with Marriott International to offer you the finest stays across India, from luxurious resorts to business-friendly hotels.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {preferredHotels.map(hotel => (
                            <HotelCard hotel={hotel} key={hotel.id} />
                        ))}
                    </div>
                </div>
            </section>

            <section id="all-marriott-hotels" className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4 space-y-16">
                    {hotelsByBrand.map(brand => (
                        <div key={brand.brandSlug}>
                            <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center">
                                Top {brand.name} Properties
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {brand.hotels.slice(0, 4).map(hotel => (
                                    <HotelCard hotel={hotel} key={hotel.id} />
                                ))}
                            </div>
                            {brand.hotels.length > 4 && (
                                <div className="text-center mt-8">
                                    <Button asChild variant="link">
                                        <Link href={`/brands/${brand.brandSlug}`}>View all {brand.name} hotels</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
