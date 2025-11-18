'use client'
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function PackagesPage(){
  const [packages, setPackages] = useState<any[]>([]);
  const firestore = useFirestore();

  useEffect(()=>{
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore,'packages'), snap=> setPackages(snap.docs.map(d=>({id:d.id,...d.data()}))) );
    return ()=>unsub();
  },[firestore]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4"><h1 className="text-xl font-bold">Packages</h1></div>
      <div className="grid gap-3">
        {packages.map(p=> <div key={p.id} className="p-3 bg-white rounded shadow">{p.name}</div>)}
      </div>
    </div>
  );
}
