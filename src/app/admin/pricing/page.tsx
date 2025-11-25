'use client';
import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

export default function PricingPage(){
  const firestore = useFirestore();

  const pricingRulesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'pricingRules');
  }, [firestore]);
  
  const { data: rules, isLoading } = useCollection(pricingRulesQuery);
  
  if (isLoading) {
    return <p>Loading pricing rules...</p>
  }
  
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Pricing Rules</h1>
      <div className="grid gap-3">
        {rules && rules.map(r=> <div key={r.id} className="p-3 bg-white rounded shadow"><div className="font-semibold">{r.type}</div><div className="text-sm">Factor: {r.factor}</div></div>)}
      </div>
    </div>
  );
}
