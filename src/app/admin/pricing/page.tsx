'use client';
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function PricingPage(){
  const [rules, setRules] = useState<any[]>([]);
  const firestore = useFirestore();

  useEffect(()=>{
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore,'pricingRules'), snap=> setRules(snap.docs.map(d=>({id:d.id,...d.data()}))) );
    return ()=>unsub();
  },[firestore]);
  
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Pricing Rules</h1>
      <div className="grid gap-3">
        {rules.map(r=> <div key={r.id} className="p-3 bg-white rounded shadow"><div className="font-semibold">{r.type}</div><div className="text-sm">Factor: {r.factor}</div></div>)}
      </div>
    </div>
  );
}
