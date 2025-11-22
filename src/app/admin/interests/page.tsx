
'use client';
import React from 'react';
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Interest } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image';

export default function InterestsPage() {
    const firestore = useFirestore();
    
    const interestsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'interests');
    }, [firestore]);

    const { data: interests, isLoading } = useCollection<Interest>(interestsQuery);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Travel Interests</h1>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus size={18} className="mr-2"/> Add New Interest
                </Button>
            </div>
            
            {isLoading && <p>Loading interests...</p>}

            {interests && (
                <div className="overflow-x-auto border rounded-lg">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-20">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Hotel Tags</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {interests.map(interest => (
                                <TableRow key={interest.id}>
                                    <TableCell>
                                        {interest.image?.src && <Image src={interest.image.src} alt={interest.name} width={64} height={64} className="rounded-md object-cover"/>}
                                    </TableCell>
                                    <TableCell className="font-semibold">{interest.name}</TableCell>
                                    <TableCell className="text-sm text-gray-600 max-w-xs truncate">{interest.description}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {interest.tags.map(tag => (
                                                <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                         <div className="flex gap-4 shrink-0">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <Pencil size={18} />
                                            </button>
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
