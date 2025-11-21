
'use client';
import { hotels } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import type { Hotel } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Dumbbell, Dog, MapPin, Utensils, Zap, Mic2, GlassWater } from 'lucide-react';
import React from 'react';

export default function HotelDetailPage() {
  const params = React.use(useParams());
  const hotelId = params.hotelId as string;

  const hotel = (hotels as Hotel[]).find((h) => h.hotelId === hotelId);

  if (!hotel) {
    notFound();
  }

  const mainImage = hotel.images && hotel.images[0] && hotel.images[0].src ? hotel.images[0] : null;

  const SectionCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <Card className="bg-card/5 border-border/20">
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-headline text-primary">
                <Icon className="w-6 h-6" />
                <span>{title}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {children}
        </CardContent>
    </Card>
  );

  const ListItem = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3 text-foreground/80">
        <Check className="w-5 h-5 text-green-500 shrink-0" />
        <span>{children}</span>
    </div>
  );

  return (
    <div className="bg-background text-foreground">
        <div className="relative h-64 md:h-96 w-full">
            {mainImage && (
                <Image
                src={mainImage.src}
                alt={`Main image for ${hotel.name}`}
                fill
                className="object-cover"
                priority
                data-ai-hint={mainImage.caption}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        
      <div className="container mx-auto -mt-24 relative z-10 px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
                <Card className="bg-background/80 backdrop-blur-sm border-border/20">
                    <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">{hotel.brand}</Badge>
                        <CardTitle className="text-4xl md:text-5xl font-headline">{hotel.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 pt-2 text-base">
                            <MapPin className="w-5 h-5" />
                            {hotel.address}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-2xl font-headline text-primary mb-2">About this hotel</h2>
                        <p className="text-foreground/80 leading-relaxed">{hotel.about}</p>
                        
                        {hotel.distance && Object.keys(hotel.distance).length > 0 &&
                        <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            {Object.entries(hotel.distance).map(([key, value]) => (
                            <span key={key}><strong>{value}</strong> from {key}</span>
                            ))}
                        </div>
                        }
                    </CardContent>
                </Card>

                {hotel.roomCategories && hotel.roomCategories.length > 0 && (
                    <SectionCard icon={GlassWater} title="Room Categories">
                        {hotel.roomCategories.map(room => (
                            <ListItem key={room.name}>
                                {room.name} {room.count && `(${room.count})`}
                            </ListItem>
                        ))}
                    </SectionCard>
                )}

                {hotel.diningExperiences && hotel.diningExperiences.length > 0 && (
                    <SectionCard icon={Utensils} title="Dining Experiences">
                        {hotel.diningExperiences.map(dining => (
                            <ListItem key={dining.name}>
                                {dining.name} ({dining.type})
                            </ListItem>
                        ))}
                    </SectionCard>
                )}

                {hotel.experiencesAndActivities && hotel.experiencesAndActivities.length > 0 && (
                    <SectionCard icon={Zap} title="Experiences & Activities">
                        {hotel.experiencesAndActivities.map(activity => (
                            <ListItem key={activity}>
                                {activity}
                            </ListItem>
                        ))}
                    </SectionCard>
                )}

                 {hotel.weddingVenues && hotel.weddingVenues.length > 0 && (
                    <SectionCard icon={Mic2} title="Wedding Venues">
                        {hotel.weddingVenues.map(venue => (
                            <ListItem key={venue}>
                                {venue}
                            </ListItem>
                        ))}
                    </SectionCard>
                )}
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-background/80 backdrop-blur-sm border-border/20">
              <CardContent className="p-6">
                <Button size="lg" className="w-full h-12 text-lg">Book Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
