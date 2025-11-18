'use client';
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import SeoGenerator from '@/components/seo-generator';
import { Separator } from '@/components/ui/separator';

export default function SEOPage(){
  const [pages, setPages] = useState<any[]>([]);
  const firestore = useFirestore();

  useEffect(()=>{
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore,'seoPages'), snap=> setPages(snap.docs.map(d=>({id:d.id,...d.data()}))) );
    return ()=>unsub();
  },[firestore]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">SEO Page Generator</h1>
        <SeoGenerator />
      </div>

      <Separator />

      <div>
        <h1 className="text-2xl font-bold mb-4">Existing SEO Pages</h1>
        <div className="grid gap-3">
          {pages.length > 0 ? (
            pages.map(p=> (
              <div key={p.id} className="p-3 bg-white rounded shadow">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-500">{p.slug}</div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No SEO pages found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
