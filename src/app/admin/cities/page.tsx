
'use client';
import React from 'react';
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import type { City } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';

export default function CitiesPage() {
    const firestore = useFirestore();
    
    const citiesQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'cities'), orderBy('name', 'asc'));
    }, [firestore]);

    const { data: cities, isLoading } = useCollection<City>(citiesQuery);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Cities</h1>
                 <div className="flex items-center gap-4">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/admin/cities/new">
                            <Plus size={18} className="mr-2"/> Add New City
                        </Link>
                    </Button>
                </div>
            </div>
            
            {isLoading && <p>Loading cities...</p>}

            {cities && (
                <div className="overflow-x-auto border rounded-lg">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>State</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Total Hotels</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cities.map(city => (
                                <TableRow key={city.cityId}>
                                    <TableCell className="font-semibold">{city.name}</TableCell>
                                    <TableCell>{city.stateId}</TableCell>
                                    <TableCell className="text-sm text-gray-600 max-w-xs truncate">{city.description}</TableCell>
                                    <TableCell>{city.totalHotels}</TableCell>
                                    <TableCell>
                                         <div className="flex gap-4 shrink-0">
                                            <Link href={`/admin/cities/${city.cityId}`} className="text-blue-600 hover:text-blue-800">
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
            )}
           
        </div>
    );
}
