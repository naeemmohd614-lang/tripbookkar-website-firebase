
'use client';
import HotelCard from '@/components/hotel-card';
import type { Hotel } from '@/lib/types';
import Image from 'next/image';
import React from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


export default function BoutiquePage() {
    const firestore = useFirestore();
    const boutiqueHotelsQuery = firestore ? query(collection(firestore, 'hotels'), where('tags', 'array-contains', 'boutique')) : null;

    const { data: boutiqueHotels, isLoading } = useCollection<Hotel>(boutiqueHotelsQuery);

  const heroImage = {
      "src": "https://images.unsplash.com/photo-1761501989065-7c98a5d1f773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwYm91dGlxdWUlMjBob3RlbCUyMGxvYmJ5fGVufDB8fHx8MTc2Mzg4NDQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "caption": "stylish boutique hotel lobby"
  };

  return (
    <div className="bg-secondary/30">
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={heroImage.src}
          alt="The lobby of a charming and stylish boutique hotel"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.caption}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg text-center px-4">
            Boutique Hotels
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
                Discover unique and intimate hotels with personalized service. Our collection of boutique hotels offers one-of-a-kind experiences, distinctive design, and a strong sense of place for the discerning traveler.
            </p>
        </div>

        <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
          Top Boutique Hotels
        </h2>
        {isLoading && <p className="text-center">Loading hotels...</p>}
        {boutiqueHotels && boutiqueHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boutiqueHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : !isLoading && (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold text-muted-foreground">No boutique hotels found.</h3>
            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
