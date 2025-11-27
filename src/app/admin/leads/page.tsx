
'use client';
import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export default function LeadsPage(){
  const firestore = useFirestore();

  const leadsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'leads'), orderBy('createdAt', 'desc')) : null, [firestore]);
  
  const { data: leads, isLoading } = useCollection(leadsQuery);
  
  if (isLoading) {
    return <p>Loading leads...</p>
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads from Contact Form</h1>
      {leads && leads.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {leads.map(lead=> (
            <Card key={lead.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{lead.name}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  <span>{lead.phone}</span> | <span>{lead.email}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm italic border-l-2 pl-3 py-1 mb-4">"{lead.message}"</p>
                <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Destination:</strong> {lead.destination || 'N/A'}</p>
                    <p><strong>Travel Type:</strong> {lead.travelType || 'N/A'}</p>
                    <p><strong>Dates:</strong> {lead.dates || 'N/A'}</p>
                    <p><strong>Travellers:</strong> {lead.travellers || 'N/A'}</p>
                    <p><strong>Budget:</strong> {lead.budget || 'N/A'}</p>
                </div>
              </CardContent>
              <div className="text-xs text-muted-foreground px-6 pb-4 text-right">
                  Received on {lead.createdAt ? format(lead.createdAt.toDate(), 'PPP, p') : 'N/A'}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-muted-foreground">No leads yet.</h3>
          <p className="mt-2 text-muted-foreground">Check back later for new enquiries.</p>
        </div>
      )}
    </div>
  );
}
