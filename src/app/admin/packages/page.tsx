
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
    <div className="bg-card rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Package Management</h1>
        <Button asChild>
          <LoadingLink href="/admin/packages/new">+ Add New Package</LoadingLink>
        </Button>
      </div>
       {isLoading && (
          <div className="text-center p-8">Loading packages...</div>
       )}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">PACKAGE NAME</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">DURATION</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">PRICE</TableHead>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-card divide-y divide-border">
              {packagesData && packagesData.map(p => (
                <TableRow key={p.id} className="hover:bg-muted/50">
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{p.name}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{p.days} Days / {p.nights} Nights</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{formatPrice(p.price)}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-4">
                      <LoadingLink href={`/admin/packages/${p.id}`} className="text-primary hover:text-primary/80">
                        <Pencil size={18} />
                      </LoadingLink>
                      <button className="text-destructive hover:text-destructive/80">
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
