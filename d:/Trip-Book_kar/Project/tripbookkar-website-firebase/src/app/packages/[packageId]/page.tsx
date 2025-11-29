

'use client';
import { featuredPackages } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Package } from '@/lib/types';
import React from 'react';

export default function PackageDetailPage({ params }: { params: { packageId: string } }) {
    const { packageId } = React.use(params);
    const pkg = (featuredPackages as Package[]).find((p) => p.id === packageId);

    if (!pkg) {
        notFound();
    }
    
    const packageImage = pkg.images[0] ? {
      src: pkg.images[0].src,
      caption: pkg.images[0].caption,
    } : {
      src: `https://picsum.photos/seed/${pkg.id}/1280/400`,
      caption: `image for ${pkg.name}`
    };


    return (
        <div className="bg-secondary/30">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                {packageImage && (
                                <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                                <Image
                                    src={packageImage.src}
                                    alt={`A scenic view for ${pkg.name}`}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={packageImage.caption}
                                />
                                <div className="absolute inset-0 bg-black/40" />
                                </div>
                            )}
                                <div className="relative">
                                    <CardTitle className="font-headline text-3xl text-brand-blue">{pkg.name}</CardTitle>
                                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{pkg.days} Days / {pkg.nights} Nights</span>
                                        </div>
                                         <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{pkg.state.join(', ')}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {pkg.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="text-2xl font-headline text-brand-blue border-b pb-2 mb-4">Detailed Itinerary</h3>
                                <div className="space-y-6">
                                    {pkg.itinerary.map(item => (
                                        <div key={item.day} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold">{item.day}</div>
                                                <div className="flex-grow w-px bg-border my-2"></div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">{item.title}</h4>
                                                <p className="text-muted-foreground mt-1">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="lg:col-span-1">
                        <Card className="sticky top-24 shadow-lg">
                            <CardHeader>
                                <CardTitle>Book This Package</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Contact us to customize and book this package for your travel dates.
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button size="lg" className="w-full">Enquire Now</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
