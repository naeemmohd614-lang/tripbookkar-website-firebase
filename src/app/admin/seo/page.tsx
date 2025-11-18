'use client';
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function SEOPage(){
  const [pages, setPages] = useState<any[]>([]);
  const firestore = useFirestore();

  useEffect(()=>{
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore,'seoPages'), snap=> setPages(snap.docs.map(d=>({id:d.id,...d.data()}))) );
    return ()=>unsub();
  },[firestore]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">SEO Pages</h1>
      <div className="grid gap-3">
        {pages.map(p=> <div key={p.id} className="p-3 bg-white rounded shadow"><div className="font-semibold">{p.title}</div><div className="text-sm">{p.slug}</div></div>)}
      </div>
    </div>
  );
}
