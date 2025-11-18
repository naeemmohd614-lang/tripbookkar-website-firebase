import { hotels } from '@/lib/data';
import HotelCard from '@/components/hotel-card';
import type { Hotel } from '@/lib/types';

export default function HotelsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-brand-blue">
          Our Hotels
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse our complete collection of curated hotels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(hotels as unknown as Hotel[]).map((hotel: any) => (
          <HotelCard key={hotel.id || hotel.hotelId} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
