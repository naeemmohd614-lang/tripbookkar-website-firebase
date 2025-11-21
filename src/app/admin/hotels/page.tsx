'use client'
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import { Pencil, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';

type Hotel = {
    id: string;
    name: string;
    brand: string;
    city: string;
    state: string;
    basePrice: number;
    rating: number;
};

export default function HotelsPage(){
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const firestore = useFirestore();

  useEffect(()=>{
    if (!firestore) return;
    const q = query(collection(firestore,'hotels'), orderBy('name'));
    const unsub = onSnapshot(q, snap=>{
      const arr = snap.docs.map(d=>({ id: d.id, ...d.data() })) as Hotel[];
      setHotels(arr);
    });
    return ()=>unsub();
  },[firestore]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Management</h1>
        <Button asChild>
          <Link href="/admin/hotels/new">+ Add New Hotel</Link>
        </Button>
      </div>
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Night</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {hotels.map(h => (
              <TableRow key={h.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{h.name}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.brand}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.city}, {h.state}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(h.basePrice)}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{h.rating.toFixed(1)}</span>
                    </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-4">
                     <Link href={`/admin/hotels/${h.id}`} className="text-blue-600 hover:text-blue-800">
                        <Pencil size={18} />
                    </Link>
                    <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
