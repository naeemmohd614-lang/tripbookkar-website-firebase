
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import HotelCard from '@/components/hotel-card';
import SearchForm from '@/components/search-form';
import type { Hotel } from '@/lib/types';
import { usePageLoaderStore } from '@/components/page-loader';

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q')?.toLowerCase().trim() || '';
  const { setIsLoading } = usePageLoaderStore.getState();

  const firestore = useFirestore();
  const hotelsQuery = firestore ? query(collection(firestore, 'hotels'), orderBy('name', 'asc')) : null;

  const { data: allHotels, isLoading } = useCollection<Hotel>(hotelsQuery);

  React.useEffect(() => {
    if (!isLoading) {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading]);

  const filteredHotels = React.useMemo(() => {
    if (!allHotels || !q) return [];
    
    return allHotels.filter(hotel => 
        (hotel.name?.toLowerCase().includes(q)) ||
        (hotel.city?.toLowerCase().includes(q)) ||
        (hotel.state?.toLowerCase().includes(q)) ||
        (hotel.brand?.toLowerCase().includes(q)) ||
        (Array.isArray(hotel.tags) && hotel.tags.some(tag => {
            const tagValue = typeof tag === 'string' ? tag : (tag as any).value;
            return typeof tagValue === 'string' && tagValue.toLowerCase().includes(q);
        }))
    );
  }, [allHotels, q]);
  
  if (isLoading) {
    return <div className="text-center py-16">Searching...</div>
  }
  
  if (!q) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-muted-foreground">Search for Hotels and Destinations</h2>
        <p className="mt-2 text-muted-foreground">Enter a city, state, hotel name, or interest above to begin.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-headline font-bold text-brand-blue mb-2">
        {`Search results for "${q}"`}
      </h1>
      <p className="text-muted-foreground mb-8">
        {`Found ${filteredHotels.length} ${filteredHotels.length === 1 ? 'hotel' : 'hotels'}.`}
      </p>

      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold text-muted-foreground">No hotels found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your search query.</p>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <SearchForm />
      </div>
      <Suspense fallback={<div className="text-center py-16">Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
