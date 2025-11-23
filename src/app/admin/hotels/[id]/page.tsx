'use client'
import HotelEditor from '@/components/admin/HotelEditor';
import type { Hotel } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function EditHotelPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const { id } = params;

  const hotelRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'hotels', id);
  }, [firestore, id]);

  const { data: hotel, isLoading } = useDoc<Hotel>(hotelRef);

  if (isLoading) {
    return <div className="p-6">Loading hotel data...</div>;
  }
  
  if (!hotel && !isLoading) {
    notFound();
  }

  return <HotelEditor hotel={hotel as Hotel} />;
}
