'use client';
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function LeadsPage(){
  const [leads, setLeads] = useState<any[]>([]);
  const firestore = useFirestore();

  useEffect(()=>{
    if (!firestore) return;
    const q = query(collection(firestore,'leads'), orderBy('createdAt','desc'));
    const unsub = onSnapshot(q, snap=> setLeads(snap.docs.map(d=>({id:d.id,...d.data()}))) );
    return ()=>unsub();
  },[firestore]);
  
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Leads</h1>
      <div className="grid gap-3">
        {leads.map(l=> (<div key={l.id} className="p-3 bg-white rounded shadow"><div className="font-semibold">{l.name} — {l.phone}</div><div className="text-sm">{l.message}</div></div>))}
      </div>
    </div>
  );
}
