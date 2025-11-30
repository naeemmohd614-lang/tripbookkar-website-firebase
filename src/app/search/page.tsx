
'use client';
import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, where, or } from 'firebase/firestore';
import HotelCard from '@/components/hotel-card';
import SearchForm from '@/components/search-form';
import type { Hotel } from '@/lib/types';
import { usePageLoaderStore } from '@/components/page-loader';

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q')?.toLowerCase() || '';
  const { setIsLoading } = usePageLoaderStore();

  const firestore = useFirestore();
  const hotelsQuery = firestore ? collection(firestore, 'hotels') : null;

  const { data: allHotels, isLoading } = useCollection<Hotel>(hotelsQuery);

  // Turn off the loader when data fetching is complete
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading]);

  const filteredHotels = React.useMemo(() => {
    if (!allHotels) return [];
    if (!q) return allHotels;
    
    return allHotels.filter(hotel => 
        (hotel.name && hotel.name.toLowerCase().includes(q)) ||
        (hotel.city && hotel.city.toLowerCase().includes(q)) ||
        (hotel.state && hotel.state.toLowerCase().includes(q)) ||
        (hotel.brand && hotel.brand.toLowerCase().includes(q)) ||
        (hotel.tags && Array.isArray(hotel.tags) && hotel.tags.some(tag => {
            const tagValue = typeof tag === 'string' ? tag : (tag as any).value;
            return typeof tagValue === 'string' && tagValue.toLowerCase().includes(q);
        }))
    );
  }, [allHotels, q]);

  return (
    <>
      <h1 className="text-3xl font-headline font-bold text-brand-blue mb-2">
        {q ? `Search results for "${q}"` : 'All Hotels'}
      </h1>
      <p className="text-muted-foreground mb-8">
        {isLoading ? 'Searching...' : `Found ${filteredHotels.length} ${filteredHotels.length === 1 ? 'hotel' : 'hotels'}.`}
      </p>

      {isLoading && <div className="text-center py-16">Loading...</div>}

      {!isLoading && filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold text-muted-foreground">No hotels found</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your search query.</p>
          </div>
        )
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
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
