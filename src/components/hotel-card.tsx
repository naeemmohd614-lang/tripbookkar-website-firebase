
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Hotel } from '@/lib/types';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const hotelImage = hotel.images && hotel.images[0] ? hotel.images[0] : null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden group w-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48">
          {hotelImage && hotelImage.src && (
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
            {hotel.tags && hotel.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="font-normal">{tag}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-secondary/30">
        <div>
          <p className="text-sm text-muted-foreground">Starting from</p>
          {typeof hotel.basePrice === 'number' ? (
            <p className="font-bold text-lg text-brand-blue">
                {formatPrice(hotel.basePrice)}
                <span className="text-sm font-normal text-muted-foreground">/night</span>
            </p>
          ) : (
            <p className="font-bold text-lg text-brand-blue">Price not available</p>
          )}
        </div>
        <Button asChild>
          <Link href={`/states/${hotel.stateId}/cities/${hotel.cityId}/hotels/${hotel.hotelId}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
