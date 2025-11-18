
'use client';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { hotels } from '@/lib/data';
import type { Hotel } from '@/lib/types';
import { monthlyDestinationsData, MonthData } from '@/data/monthly-destinations';

export default function MonthPage() {
    const params = useParams();
    const monthSlug = params.month as string;

    const monthData: MonthData | undefined = monthlyDestinationsData[monthSlug];

    if (!monthData) {
        notFound();
    }
    
    const { name, pageImage, destinations } = monthData;

    return (
        <div className="bg-secondary/30">
            <div className="relative h-64 w-full">
                <Image
                    src={pageImage.src}
                    alt={`Scenic view for travel in ${name}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={pageImage.caption}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg text-center px-4">
                        Top Places to Visit in India in {name}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {destinations && destinations.length > 0 ? (
                    <div className="space-y-12">
                        {destinations.map((dest, index) => (
                            <Card key={dest.name} className="overflow-hidden shadow-lg">
                                <CardHeader className="p-0">
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={dest.image.src}
                                            alt={dest.name}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={dest.image.caption}
                                        />
                                        <div className="absolute inset-0 bg-black/30" />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <h2 className="text-3xl font-headline text-brand-blue mb-2">{index + 1}. {dest.name}</h2>
                                    <p className="text-muted-foreground italic mb-4">{dest.reason}</p>
                                    
                                    <h3 className="font-bold text-lg mb-3">Top Hotels in {dest.name.split(',')[0]}:</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
                                        {dest.hotels.map(hotelName => {
                                            const hotel = (hotels as Hotel[]).find(h => h.name === hotelName);
                                            return (
                                                <div key={hotelName}>
                                                {hotel ? (
                                                    <Link href={`/states/${hotel.stateId}/cities/${hotel.cityId}/hotels/${hotel.hotelId}`} className="text-primary hover:underline">
                                                        {hotel.name}
                                                    </Link>
                                                ) : (
                                                    <span className="text-muted-foreground">{hotelName}</span>
                                                )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-16">
                        <h2 className="text-2xl font-headline font-bold text-brand-blue">Coming Soon!</h2>
                        <p className="text-muted-foreground text-lg mt-2">
                            Our travel experts are curating the best destinations for {name}. Please check back later!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
