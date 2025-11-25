
'use client'
import HotelEditor from '@/components/admin/HotelEditor';
import type { Hotel } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import React from 'react';

export default function EditHotelPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const { id } = React.use(params);

  const hotelRef = firestore && id ? doc(firestore, 'hotels', id) : null;

  const { data: hotel, isLoading } = useDoc<Hotel>(hotelRef);

  if (isLoading) {
    return <div className="p-6">Loading hotel data...</div>;
  }
  
  if (!hotel && !isLoading) {
    notFound();
  }

  return <HotelEditor hotel={hotel as Hotel} />;
}
