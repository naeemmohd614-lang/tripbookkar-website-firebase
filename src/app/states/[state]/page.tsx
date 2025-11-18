'use client';
import { states, hotels } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Users } from 'lucide-react';
import type { State, Hotel } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import Image from 'next/image';

export default function StatePage() {
  const params = useParams();
  const stateId = params.state as string;
  
  const state = (states as State[]).find((s) => s.stateId === stateId);
  
  if (!state) {
    notFound();
  }

  const stateHotels = (hotels as Hotel[]).filter(hotel => hotel.state.toLowerCase() === state.name.toLowerCase());
  const stateImage = {
      "src": `https://picsum.photos/seed/${state.stateId}/1080/200`,
      "caption": `image of ${state.name}`
  }


  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-12">
        <CardHeader>
           {stateImage && (
            <div className="relative h-48 w-full mb-4">
              <Image
                src={stateImage.src}
                alt={`A scenic view of ${state.name}`}
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint={stateImage.caption}
              />
               <div className="absolute inset-0 bg-black/40" />
            </div>
          )}
          <div className="relative">
            <CardTitle className="font-headline text-4xl text-brand-blue">{state.name}</CardTitle>
            <CardDescription className="text-lg">{state.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
            <div className="flex space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Map className="w-5 h-5"/>
                    <span>{state.totalCities} cities</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5"/>
                    <span>{state.totalHotels} hotels</span>
                </div>
            </div>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">
        Hotels in {state.name}
      </h2>

      {stateHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stateHotels.map((hotel) => (
            <HotelCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this state yet.</h3>
          <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
        </div>
      )}
    </div>
  );
}
