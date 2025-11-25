
'use client'
import StateEditor from '@/components/admin/StateEditor';
import type { State } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useFirestore, useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import React from 'react';

export default function EditStatePage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const { id } = React.use(params);

  const stateRef = firestore && id ? doc(firestore, 'states', id) : null;

  const { data: state, isLoading } = useDoc<State>(stateRef);

  if (isLoading) {
    return <div className="p-6">Loading state data...</div>;
  }
  
  if (!state && !isLoading) {
    notFound();
  }

  return <StateEditor state={state as State} />;
}
