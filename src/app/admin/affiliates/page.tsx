
'use client';
import React, { useEffect, useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

export default function AdminAffiliatesPage() {
    const firestore = useFirestore();
    const { register, handleSubmit, reset, watch } = useForm();
    const { toast } = useToast();
    
    const affiliatesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'affiliates') : null, [firestore]);

    const { data: affiliates, isLoading } = useCollection<any>(affiliatesQuery);

    const affiliate = affiliates?.[0];

    useEffect(() => {
        if (affiliate) {
            reset(affiliate);
        }
    }, [affiliate, reset]);

    const onSubmit = (data: any) => {
        if (!firestore || !affiliate) return;
        const affiliateId = affiliate.id;
        if (!affiliateId) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No affiliate document ID found.',
            });
            return;
        }
        const docRef = doc(firestore, 'affiliates', affiliateId);
        setDocumentNonBlocking(docRef, data, { merge: true });
        
        toast({
            title: 'Affiliates Updated',
            description: 'Your affiliate IDs have been saved.',
        });
    };
    
    if (isLoading) {
        return <p>Loading affiliate settings...</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Affiliate Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Affiliate IDs</CardTitle>
                </CardHeader>
                <CardContent>
                    {affiliate ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="bookingId" className="text-sm font-medium">Booking.com ID</label>
                                    <Input id="bookingId" {...register('bookingId')} />
                                </div>
                                <div>
                                    <label htmlFor="tripadvisorId" className="text-sm font-medium">TripAdvisor ID</label>
                                    <Input id="tripadvisorId" {...register('tripadvisorId')} />
                                </div>
                                <div>
                                    <label htmlFor="agodaId" className="text-sm font-medium">Agoda ID</label>
                                    <Input id="agodaId" {...register('agodaId')} />
                                </div>
                                <div>
                                    <label htmlFor="expediaId" className="text-sm font-medium">Expedia ID</label>
                                    <Input id="expediaId" {...register('expediaId')} />
                                </div>
                                 <div>
                                    <label htmlFor="makeMyTripId" className="text-sm font-medium">MakeMyTrip ID</label>
                                    <Input id="makeMyTripId" {...register('makeMyTripId')} />
                                </div>
                                <div>
                                    <label htmlFor="redBusId" className="text-sm font-medium">RedBus ID</label>
                                    <Input id="redBusId" {...register('redBusId')} />
                                </div>
                                 <div>
                                    <label htmlFor="uberId" className="text-sm font-medium">Uber ID</label>
                                    <Input id="uberId" {...register('uberId')} />
                                </div>
                                 <div>
                                    <label htmlFor="airbnbId" className="text-sm font-medium">Airbnb ID</label>
                                    <Input id="airbnbId" {...register('airbnbId')} />
                                </div>
                            </div>
                             <div className="flex justify-end">
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    ) : (
                        <p>No affiliate settings found.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
