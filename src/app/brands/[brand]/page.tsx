
'use client';
import { brands } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import type { Brand, Hotel } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import React from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


export default function BrandPage({ params }: { params: { brand: string }}) {
  const { brand: brandSlug } = React.use(params);
  const firestore = useFirestore();
  
  const brand = (brands as Brand[]).find((b) => b.brandSlug === brandSlug);
  
  if (!brand) {
    notFound();
  }

  const brandHotelsQuery = firestore ? query(collection(firestore, 'hotels'), where('brandSlug', '==', brandSlug)) : null;

  const { data: brandHotels, isLoading } = useCollection<Hotel>(brandHotelsQuery);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center gap-4">
            {brand.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.logo} alt={`${brand.name} logo`} className="h-16 w-16 object-contain" />
            ) : (
              <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div>
              <CardTitle className="font-headline text-4xl text-brand-blue">{brand.name}</CardTitle>
              <CardDescription className="text-lg">{brand.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <div className="text-sm text-muted-foreground">
                {brand.totalHotels} hotels worldwide
            </div>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">
        Hotels by {brand.name}
      </h2>

      {isLoading && <p>Loading hotels...</p>}

      {brandHotels && brandHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        !isLoading && <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this brand yet.</h3>
          <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
        </div>
      )}
    </div>
  );
}
