'use client'
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';

export default function HotelsPage(){
  const [hotels, setHotels] = useState<any[]>([]);
  const firestore = useFirestore();

  useEffect(()=>{
    if (!firestore) return;
    const q = query(collection(firestore,'hotels'), orderBy('name'));
    const unsub = onSnapshot(q, snap=>{
      const arr = snap.docs.map(d=>({ id: d.id, ...d.data() }));
      setHotels(arr);
    });
    return ()=>unsub();
  },[firestore]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Hotels</h1>
        <Link href="/admin/hotels/new" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Hotel</Link>
      </div>
      <div className="grid gap-3">
        {hotels.map(h=> (
          <div key={h.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
            <div>
              <div className="font-semibold">{h.name}</div>
              <div className="text-sm text-gray-500">{h.city} — {h.state}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/hotels/${h.id}`} className="px-3 py-1 border rounded text-sm">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
