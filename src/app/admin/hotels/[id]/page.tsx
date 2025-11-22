'use client'
import HotelEditor from '@/components/admin/HotelEditor';
import type { Hotel } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function EditHotelPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();

  const hotelRef = useMemoFirebase(() => {
    if (!firestore || !params.id) return null;
    return doc(firestore, 'hotels', params.id);
  }, [firestore, params.id]);

  const { data: hotel, isLoading, error } = useDoc<Hotel>(hotelRef);

  if (isLoading) {
    return <div>Loading hotel data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!hotel) {
    notFound();
  }

  return <HotelEditor hotel={hotel} />;
}
