
import { hotels, brands } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Hotel, Brand } from '@/lib/types';
import HotelCard from '@/components/hotel-card';

const hiltonBrandNames = [
    "Hilton", "Conrad", "DoubleTree by Hilton", "Waldorf Astoria", "Hampton by Hilton"
];

export default function HiltonPage() {
    const heroImage = {
        src: "https://picsum.photos/seed/hilton-hero-page/1920/800",
        caption: "sleek modern hotel building"
    };

    const hiltonBrands = (brands as Brand[]).filter(b => hiltonBrandNames.includes(b.name));

    const hiltonHotels = (hotels as Hotel[]).filter(h => hiltonBrandNames.includes(h.brand));

    const preferredHotels = hiltonHotels.filter(h => 
        ["Conrad Bengaluru", "Hilton Mumbai International Airport", "Hilton Shillim Estate Retreat & Spa"].includes(h.name)
    );

    return (
        <div className="bg-background text-foreground">
            <section className="relative w-full h-[50vh] text-white">
                <Image
                    src={heroImage.src}
                    alt="Hilton Hotels in India"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.caption}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
                        Hilton Hotels & Resorts
                    </h1>
                </div>
            </section>

            <section id="explore-brands" className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4">
                        Explore Hilton Brands
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                        From iconic luxury to focused service, discover a portfolio of exceptional brands.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {hiltonBrands.map(brand => (
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
                        Our Preferred Hilton Properties
                    </h2>
                    <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
                        Discover exceptional stays with Hilton's world-renowned hospitality.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {preferredHotels.map(hotel => (
                            <HotelCard hotel={hotel} key={hotel.hotelId} />
                        ))}
                    </div>
                </div>
            </section>

            <section id="all-hilton-hotels" className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center">
                        All Hilton Properties in India
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hiltonHotels.map(hotel => (
                            <HotelCard hotel={hotel} key={hotel.hotelId} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
