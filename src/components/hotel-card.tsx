import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Hotel } from '@/lib/types';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const hotelImage = hotel.images[0];

  return (
    <Card className="overflow-hidden group w-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48">
          {hotelImage && (
            <Image
              src={hotelImage.src}
              alt={hotel.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={hotelImage.caption}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-headline mb-1">{hotel.name}</CardTitle>
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-bold">
                <Star className="w-4 h-4 fill-white" />
                <span>{hotel.rating.toFixed(1)}</span>
            </div>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin className="w-4 h-4" />
          {hotel.city}, {hotel.state}
        </CardDescription>
        <div className="mt-3 flex flex-wrap gap-2">
            {hotel.facilities.pool && <Badge variant="secondary">Pool</Badge>}
            {hotel.facilities.spa && <Badge variant="secondary">Spa</Badge>}
            {hotel.facilities.gym && <Badge variant="secondary">Gym</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-secondary/30">
        <div>
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="font-bold text-lg text-brand-blue">
            ₹{hotel.priceBase.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">/night</span>
          </p>
        </div>
        <Button asChild>
          <Link href={`/hotels/${hotel.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
