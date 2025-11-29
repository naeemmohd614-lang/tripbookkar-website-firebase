
'use client';
import InterestEditor from '@/components/admin/InterestEditor';
import type { Interest } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import React from 'react';

export default function EditInterestPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const { id } = params;

  const interestRef = firestore && id ? doc(firestore, 'interests', id) : null;

  const { data: interest, isLoading } = useDoc<Interest>(interestRef);

  if (isLoading) {
    return <div className="p-6">Loading interest data...</div>;
  }
  
  if (!interest && !isLoading) {
    notFound();
  }

  return <InterestEditor interest={interest as Interest} />;
}
