
'use client';
import React from 'react';
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { MonthData } from '@/data/monthly-destinations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';
import { bulkImportData } from '@/app/actions';
import Link from 'next/link';

function BulkImportMonthlyData() {
    const { toast } = useToast();
    const [isImporting, setIsImporting] = React.useState(false);

    const handleImport = async () => {
        setIsImporting(true);
        const result = await bulkImportData('monthlyDestinations');
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
            {isImporting ? 'Importing...' : 'Bulk Import Monthly Data'}
        </Button>
    );
}

export default function DestinationsPage() {
    const firestore = useFirestore();
    
    const monthlyDestinationsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'monthlyDestinations');
    }, [firestore]);

    const { data: monthlyDestinations, isLoading } = useCollection<MonthData>(monthlyDestinationsQuery);

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Monthly Destinations</h1>
                <div className="flex items-center gap-4">
                     <BulkImportMonthlyData />
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/admin/destinations/new">
                            <Plus size={18} className="mr-2"/> Add New Month
                        </Link>
                    </Button>
                </div>
            </div>
            
             {isLoading && <p>Loading destinations...</p>}

            {monthlyDestinations && (
                 <Accordion type="single" collapsible className="w-full">
                    {monthlyDestinations.sort((a,b) => new Date(`1 ${a.name} 2000`).getMonth() - new Date(`1 ${b.name} 2000`).getMonth()).map(month => (
                        <AccordionItem value={month.id} key={month.id}>
                            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                <div className="flex justify-between items-center w-full pr-4">
                                    <span className="capitalize">{month.name} ({month.destinations?.length || 0} destinations)</span>
                                    <Button asChild variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                                        <Link href={`/admin/destinations/${month.id}`}>
                                            <Pencil size={14} className="mr-2"/> Edit Month
                                        </Link>
                                    </Button>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                               <div className="space-y-4">
                                {month.destinations?.map((dest, index) => (
                                     <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                         <div>
                                            <h4 className="font-semibold text-gray-800">{dest.name}</h4>
                                            <p className="text-sm text-gray-600 line-clamp-2">{dest.reason}</p>
                                         </div>
                                     </div>
                                ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                 </Accordion>
            )}
           
        </div>
    );
}
