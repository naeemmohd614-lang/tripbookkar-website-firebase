'use client'
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Management</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/admin/hotels/new">+ Add New Hotel</Link>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-500">HOTEL NAME</th>
              <th className="p-4 text-sm font-semibold text-gray-500">CITY</th>
              <th className="p-4 text-sm font-semibold text-gray-500">BRAND</th>
              <th className="p-4 text-sm font-semibold text-gray-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(h => (
              <tr key={h.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{h.name}</td>
                <td className="p-4 text-gray-600">{h.city}</td>
                <td className="p-4 text-gray-600">{h.brand}</td>
                <td className="p-4">
                  <div className="flex gap-4">
                     <Link href={`/admin/hotels/${h.id}`} className="text-blue-600 hover:text-blue-800">
                        <Pencil size={18} />
                    </Link>
                    <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
