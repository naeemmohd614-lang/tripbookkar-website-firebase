'use client'
import HotelEditor from '@/components/admin/HotelEditor';
import { hotels } from '@/lib/data';
import type { Hotel } from '@/lib/types';
import { notFound } from 'next/navigation';

export default function EditHotelPage({ params }: { params: { id: string } }) {
  const hotel = (hotels as Hotel[]).find(h => h.hotelId === params.id);

  if (!hotel) {
    notFound();
  }

  return <HotelEditor hotel={hotel} />;
}
