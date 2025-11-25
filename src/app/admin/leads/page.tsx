'use client';
import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

export default function LeadsPage(){
  const firestore = useFirestore();

  const leadsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'leads'), orderBy('createdAt', 'desc'));
  }, [firestore]);
  
  const { data: leads, isLoading } = useCollection(leadsQuery);
  
  if (isLoading) {
    return <p>Loading leads...</p>
  }
  
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Leads</h1>
      <div className="grid gap-3">
        {leads && leads.map(l=> (<div key={l.id} className="p-3 bg-white rounded shadow"><div className="font-semibold">{l.name} — {l.phone}</div><div className="text-sm">{l.message}</div></div>))}
      </div>
    </div>
  );
}
