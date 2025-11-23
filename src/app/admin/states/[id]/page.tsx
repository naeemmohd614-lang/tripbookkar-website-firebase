'use client'
import StateEditor from '@/components/admin/StateEditor';
import type { State } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function EditStatePage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const { id } = params;

  const stateRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'states', id);
  }, [firestore, id]);

  const { data: state, isLoading } = useDoc<State>(stateRef);

  if (isLoading) {
    return <div className="p-6">Loading state data...</div>;
  }
  
  if (!state && !isLoading) {
    notFound();
  }

  return <StateEditor state={state as State} />;
}
