
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { Button } from '@/components/ui/button';
import type { Hotel } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import React from 'react';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const hotelId = hotel.id;
  const stateId = hotel.stateId;
  const cityId = hotel.cityId;

  if (!hotelId || !stateId || !cityId) {
    return null;
  }

  return (
    <Card className="overflow-hidden group w-full flex flex-col">
      <CardHeader className="p-0">
        <Carousel className="w-full">
            <CarouselContent>
                {hotel.images && hotel.images.length > 0 ? hotel.images.map((image, index) => (
                <CarouselItem key={index}>
                    <div className="relative h-48">
                        <Image
                            src={image.src}
                            alt={image.caption || hotel.name}
                            fill
                            className="object-cover"
                            data-ai-hint={image.caption}
                        />
                    </div>
                </CarouselItem>
                )) : (
                    <CarouselItem>
                         <div className="relative h-48 bg-secondary flex items-center justify-center">
                            <span className="text-muted-foreground">No Image</span>
                        </div>
                    </CarouselItem>
                )}
            </CarouselContent>
            {hotel.images && hotel.images.length > 1 && (
                <>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
            )}
        </Carousel>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <Badge variant="secondary" className="mb-1">{hotel.brand}</Badge>
                <CardTitle className="text-lg font-headline mb-1 leading-tight">{hotel.name}</CardTitle>
            </div>
            {hotel.rating &&
                <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-bold ml-2">
                    <Star className="w-4 h-4 fill-white" />
                    <span>{hotel.rating.toFixed(1)}</span>
                </div>
            }
        </div>
        <CardDescription className="flex items-center gap-1 text-sm mt-1">
          <MapPin className="w-4 h-4" />
          {hotel.city}, {hotel.state}
        </CardDescription>
        <div className="mt-3 flex flex-wrap gap-2">
            {hotel.tags && hotel.tags.slice(0, 3).map((tag, index) => {
              return (
                <Badge key={`${tag}-${index}`} variant="outline" className="font-normal">{tag}</Badge>
              )
            })}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-end items-center bg-secondary/30">
        <Button asChild>
          <Link href={`/states/${stateId}/cities/${cityId}/hotels/${hotelId}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
