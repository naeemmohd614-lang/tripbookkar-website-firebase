

'use client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cities, states } from '@/lib/data';
import type { Hotel, City, State } from '@/lib/types';
import type { MonthData } from '@/data/monthly-destinations';
import React from 'react';
import { useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc } from 'firebase/firestore';


function slugify(text: string) {
  if (!text) return '';
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function MonthPage({ params }: { params: { month: string } }) {
    const firestore = useFirestore();
    const { month: monthSlug } = React.use(Promise.resolve(params));

    const monthDocRef = useMemoFirebase(() => {
        if (!firestore || !monthSlug) return null;
        return doc(firestore, 'monthlyDestinations', monthSlug);
    }, [firestore, monthSlug]);

    const { data: monthData, isLoading: isMonthLoading } = useDoc<MonthData>(monthDocRef);

    const hotelNames = monthData?.destinations?.flatMap(d => d.hotels.map(h => typeof h === 'string' ? h : h.name)) || [];
    
    const hotelsQuery = useMemoFirebase(() => {
        if (!firestore || hotelNames.length === 0) return null;
        return query(collection(firestore, 'hotels'), where('name', 'in', hotelNames.slice(0, 30)));
    }, [firestore, hotelNames]);

    const { data: hotels, isLoading: areHotelsLoading } = useCollection<Hotel>(hotelsQuery);
    
    const isLoading = isMonthLoading || areHotelsLoading;

    if (!monthData && !isLoading) {
        notFound();
    }
    
    if (isLoading) {
        return <div className="p-6 text-center">Loading destinations for {monthSlug}...</div>;
    }
    
    const { name, pageImage, destinations } = monthData!;

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
                        {destinations.map((dest, index) => {
                            const [cityName, stateName] = dest.name.split(',').map(s => s.trim());
                            const cityInfo = (cities as City[]).find(c => c.name === cityName);
                            const stateInfo = (states as State[]).find(s => s.name === stateName);
                            
                            const cityLink = cityInfo && stateInfo ? `/states/${stateInfo.stateId}/cities/${cityInfo.cityId}` : '#';

                            return (
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
                                        <Link href={cityLink}>
                                            <h2 className="text-3xl font-headline text-brand-blue mb-2 hover:underline">{index + 1}. {dest.name}</h2>
                                        </Link>
                                        <p className="text-muted-foreground italic mb-4">{dest.reason}</p>
                                        
                                        <h3 className="font-bold text-lg mb-3">Top Hotels in {dest.name.split(',')[0]}:</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
                                            {dest.hotels.map(hotelOrName => {
                                                const hotelName = typeof hotelOrName === 'string' ? hotelOrName : hotelOrName.name;
                                                const hotel = hotels?.find(h => h.name === hotelName);
                                                return (
                                                    <div key={hotelName}>
                                                    {hotel ? (
                                                        <Link href={`/states/${hotel.stateId}/cities/${hotel.cityId}/hotels/${hotel.id}`} className="text-primary hover:underline">
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
                            );
                        })}
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

    
