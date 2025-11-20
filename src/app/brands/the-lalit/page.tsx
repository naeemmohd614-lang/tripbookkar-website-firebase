
import { hotels, brands } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Hotel, Brand } from '@/lib/types';
import HotelCard from '@/components/hotel-card';

const lalitBrandNames = [
    "The Lalit"
];

export default function TheLalitPage() {
    const heroImage = {
        src: "https://picsum.photos/seed/lalit-hero-page/1920/800",
        caption: "modern art hotel lobby"
    };

    const lalitBrands = (brands as Brand[]).filter(b => lalitBrandNames.includes(b.name));

    const lalitHotels = (hotels as Hotel[]).filter(h => lalitBrandNames.includes(h.brand));

    const preferredHotels = lalitHotels.filter(h => 
        ["The Lalit New Delhi", "The Lalit Mumbai", "The Lalit Grand Palace Srinagar"].includes(h.name)
    );

    return (
        <div className="bg-background text-foreground">
            <section className="relative w-full h-[50vh] text-white">
                <Image
                    src={heroImage.src}
                    alt="The Lalit Hotels in India"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.caption}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
                        The Lalit Hotels, Palaces & Resorts
                    </h1>
                </div>
            </section>

            <section id="preferred-properties" className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4">
                        Our Preferred The Lalit Properties
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                       Discover a blend of modern sophistication and traditional Indian hospitality with a focus on art and culture.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {preferredHotels.map(hotel => (
                            <HotelCard hotel={hotel} key={hotel.hotelId} />
                        ))}
                    </div>
                </div>
            </section>

            <section id="all-lalit-hotels" className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center">
                        All The Lalit Properties in India
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {lalitHotels.map(hotel => (
                            <HotelCard hotel={hotel} key={hotel.hotelId} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
