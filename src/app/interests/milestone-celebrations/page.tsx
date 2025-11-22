
'use client';
import HotelCard from '@/components/hotel-card';
import type { Hotel } from '@/lib/types';
import Image from 'next/image';
import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


export default function MilestoneCelebrationsPage() {
    const firestore = useFirestore();
    const celebrationHotelsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'hotels'), where('tags', 'array-contains-any', ['romantic', 'palace', 'luxury']));
    }, [firestore]);
    const { data: celebrationHotels, isLoading } = useCollection<Hotel>(celebrationHotelsQuery);

  const heroImage = {
      "src": "https://picsum.photos/seed/interest-milestones/1920/600",
      "caption": "romantic dinner setup"
  };

  return (
    <div className="bg-secondary/30">
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={heroImage.src}
          alt="A romantic dinner setup with candles for a milestone celebration"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.caption}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg text-center px-4">
            Milestone Celebrations
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
                Celebrate your special occasions in memorable settings. Whether it's an anniversary, a birthday, or any significant milestone, find the perfect hotel to make your celebration extraordinary.
            </p>
        </div>

        <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
          Top Hotels for Celebrations
        </h2>
        {isLoading && <p className="text-center">Loading hotels...</p>}
        {celebrationHotels && celebrationHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {celebrationHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : !isLoading && (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for celebrations.</h3>
            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
