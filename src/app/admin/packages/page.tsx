
'use client'
import React from 'react';
import LoadingLink from '@/components/loading-link';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Package } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PackagesPage(){
  const firestore = useFirestore();

  const packagesQuery = useMemoFirebase(() => firestore ? collection(firestore,'packages') : null, [firestore]);

  const { data: packagesData, isLoading } = useCollection<Package>(packagesQuery);
  
  const formatPrice = (price: number) => {
    if (typeof price !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Package Management</h1>
        <Button asChild>
          <LoadingLink href="/admin/packages/new">+ Add New Package</LoadingLink>
        </Button>
      </div>
       {isLoading && (
          <div className="text-center p-8">Loading packages...</div>
       )}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PACKAGE NAME</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DURATION</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRICE</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {packagesData && packagesData.map(p => (
                <TableRow key={p.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.days} Days / {p.nights} Nights</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(p.price)}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-4">
                      <LoadingLink href={`/admin/packages/${p.id}`} className="text-blue-600 hover:text-blue-800">
                        <Pencil size={18} />
                      </LoadingLink>
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
       {!isLoading && (!packagesData || packagesData.length === 0) && (
        <div className="text-center p-8 text-muted-foreground">No packages found.</div>
      )}
    </div>
  );
}
