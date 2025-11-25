
'use client';
import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import SeoGenerator from '@/components/seo-generator';
import { Separator } from '@/components/ui/separator';

export default function SEOPage(){
  const firestore = useFirestore();

  const seoPagesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'seoPages') : null, [firestore]);
  
  const { data: pages, isLoading } = useCollection(seoPagesQuery);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">SEO Page Generator</h1>
        <SeoGenerator />
      </div>

      <Separator />

      <div>
        <h1 className="text-2xl font-bold mb-4">Existing SEO Pages</h1>
        {isLoading && <p>Loading SEO pages...</p>}
        <div className="grid gap-3">
          {!isLoading && pages && pages.length > 0 ? (
            pages.map(p=> (
              <div key={p.id} className="p-3 bg-white rounded shadow">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-500">{p.slug}</div>
              </div>
            ))
          ) : !isLoading && (
            <p className="text-muted-foreground">No SEO pages found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
