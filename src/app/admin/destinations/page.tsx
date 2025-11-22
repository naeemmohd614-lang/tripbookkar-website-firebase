
'use client';
import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { MonthData } from '@/data/monthly-destinations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus size={18} className="mr-2"/> Add New Month
                </Button>
            </div>
            
             {isLoading && <p>Loading destinations...</p>}

            {monthlyDestinations && (
                 <Accordion type="single" collapsible className="w-full">
                    {monthlyDestinations.sort((a,b) => new Date(`1 ${a.name} 2000`).getMonth() - new Date(`1 ${b.name} 2000`).getMonth()).map(month => (
                        <AccordionItem value={month.id} key={month.id}>
                            <AccordionTrigger className="text-lg font-semibold hover:no-underline capitalize">
                                {month.name} ({month.destinations?.length || 0} destinations)
                            </AccordionTrigger>
                            <AccordionContent>
                               <div className="space-y-4">
                                {month.destinations?.map((dest, index) => (
                                     <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center">
                                         <div>
                                            <h4 className="font-semibold text-gray-800">{dest.name}</h4>
                                            <p className="text-sm text-gray-600 line-clamp-2">{dest.reason}</p>
                                         </div>
                                         <div className="flex gap-4 shrink-0 ml-4">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <Pencil size={18} />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
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

    