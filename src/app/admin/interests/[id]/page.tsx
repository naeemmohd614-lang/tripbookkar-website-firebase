'use client';
import InterestEditor from '@/components/admin/InterestEditor';
import type { Interest } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function EditInterestPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();

  const interestRef = useMemoFirebase(() => {
    if (!firestore || !params.id) return null;
    return doc(firestore, 'interests', params.id);
  }, [firestore, params.id]);

  const { data: interest, isLoading } = useDoc<Interest>(interestRef);

  if (isLoading) {
    return <div className="p-6">Loading interest data...</div>;
  }
  
  if (!interest && !isLoading) {
    notFound();
  }

  return <InterestEditor interest={interest as Interest} />;
}
