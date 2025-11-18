'use client';
import { cities, hotels } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin } from 'lucide-react';
import type { City, Hotel } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import Image from 'next/image';

export default function CityPage() {
  const params = useParams();
  const cityId = params.cityId as string;
  
  const city = (cities as City[]).find((c) => c.cityId === cityId);
  
  if (!city) {
    notFound();
  }

  const cityHotels = (hotels as Hotel[]).filter(hotel => hotel.city.toLowerCase() === city.name.toLowerCase());
  const cityImage = {
      "src": `https://picsum.photos/seed/${city.cityId}/1080/200`,
      "caption": `image of ${city.name}`
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-12">
        <CardHeader>
           {cityImage && (
            <div className="relative h-48 w-full mb-4">
              <Image
                src={cityImage.src}
                alt={`A scenic view of ${city.name}`}
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint={cityImage.caption}
              />
               <div className="absolute inset-0 bg-black/40" />
            </div>
          )}
          <div className="relative">
            <CardTitle className="font-headline text-4xl text-brand-blue">{city.name}</CardTitle>
            <CardDescription className="text-lg">{city.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
            <div className="flex space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Building className="w-5 h-5"/>
                    <span>{city.totalHotels} hotels</span>
                </div>
            </div>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">
        Hotels in {city.name}
      </h2>

      {cityHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cityHotels.map((hotel) => (
            <HotelCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this city yet.</h3>
          <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
        </div>
      )}
    </div>
  );
}
