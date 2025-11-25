
'use client';
import HotelCard from '@/components/hotel-card';
import type { Hotel } from '@/lib/types';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

export default function HotelsPage() {
  const firestore = useFirestore();
  const hotelsQuery = firestore ? query(collection(firestore, 'hotels'), orderBy('name', 'asc')) : null;

  const { data: hotels, isLoading } = useCollection<Hotel>(hotelsQuery);

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

      {isLoading && <p className="text-center">Loading hotels...</p>}

      {!isLoading && hotels && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
