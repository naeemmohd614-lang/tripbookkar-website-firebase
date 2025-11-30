
'use client';
import React from 'react';
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { State } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { bulkImportData } from '@/app/actions';
import LoadingLink from '@/components/loading-link';

function BulkImportStatesData() {
    const { toast } = useToast();
    const [isImporting, setIsImporting] = React.useState(false);

    const handleImport = async () => {
        setIsImporting(true);
        const result = await bulkImportData('states');
        if (result.success) {
            toast({
                title: 'Import Successful',
                description: result.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Import Failed',
                description: result.message,
            });
        }
        setIsImporting(false);
    };

    return (
        <Button onClick={handleImport} disabled={isImporting}>
            <Upload className="mr-2 h-4 w-4" />
            {isImporting ? 'Importing...' : 'Bulk Import States'}
        </Button>
    );
}

export default function StatesPage() {
    const firestore = useFirestore();
    
    const statesQuery = firestore ? collection(firestore, 'states') : null;

    const { data: states, isLoading } = useCollection<State>(statesQuery);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">States</h1>
                 <div className="flex items-center gap-4">
                     <BulkImportStatesData />
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <LoadingLink href="/admin/states/new">
                            <Plus size={18} className="mr-2"/> Add New State
                        </LoadingLink>
                    </Button>
                </div>
            </div>
            
            {isLoading && <p>Loading states...</p>}

            {states && (
                <div className="overflow-x-auto border rounded-lg">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Total Cities</TableHead>
                                <TableHead>Total Hotels</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {states.map(state => (
                                <TableRow key={state.stateId}>
                                    <TableCell className="font-semibold">{state.name}</TableCell>
                                    <TableCell className="text-sm text-gray-600 max-w-xs truncate">{state.description}</TableCell>
                                    <TableCell>{state.totalCities}</TableCell>
                                    <TableCell>{state.totalHotels}</TableCell>
                                    <TableCell>
                                         <div className="flex gap-4 shrink-0">
                                            <LoadingLink href={`/admin/states/${state.stateId}`} className="text-blue-600 hover:text-blue-800">
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
            )}
           
        </div>
    );
}
