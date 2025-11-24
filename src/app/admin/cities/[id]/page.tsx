
'use client';
import CityEditor from '@/components/admin/CityEditor';
import type { City } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import React from 'react';

export default function EditCityPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const { id } = React.use(Promise.resolve(params));

  const cityRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'cities', id);
  }, [firestore, id]);

  const { data: city, isLoading } = useDoc<City>(cityRef);

  if (isLoading) {
    return <div className="p-6">Loading city data...</div>;
  }
  
  if (!city && !isLoading) {
    notFound();
  }

  return <CityEditor city={city as City} />;
}
