'use client'
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Package = {
    id: string;
    name: string;
    days: number;
    nights: number;
    price: number;
};

export default function PackagesPage(){
  const [packages, setPackages] = useState<Package[]>([]);
  const firestore = useFirestore();

  useEffect(()=>{
    if (!firestore) return;
    const unsub = onSnapshot(collection(firestore,'packages'), snap=> {
        const pkgs = snap.docs.map(d => ({ id:d.id, ...d.data() })) as Package[];
        setPackages(pkgs);
    });
    return ()=>unsub();
  },[firestore]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Package Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + Add New Package
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-500">PACKAGE NAME</th>
              <th className="p-4 text-sm font-semibold text-gray-500">DURATION</th>
              <th className="p-4 text-sm font-semibold text-gray-500">PRICE</th>
              <th className="p-4 text-sm font-semibold text-gray-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(p => (
              <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{p.name}</td>
                <td className="p-4 text-gray-600">{p.days} Days / {p.nights} Nights</td>
                <td className="p-4 text-gray-600">₹{p.price.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>
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
