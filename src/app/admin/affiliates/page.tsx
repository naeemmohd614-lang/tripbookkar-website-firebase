'use client';
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

export default function AdminAffiliatesPage() {
    const [affiliates, setAffiliates] = useState<any[]>([]);
    const firestore = useFirestore();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (!firestore) return;
        const unsub = onSnapshot(collection(firestore, 'affiliates'), snap => {
            const affiliateData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setAffiliates(affiliateData);
            if (affiliateData.length > 0) {
                reset(affiliateData[0]);
            }
        });
        return () => unsub();
    }, [firestore, reset]);

    const onSubmit = (data: any) => {
        console.log("Saving affiliate data...", data);
        // Here you would typically save the data to Firestore
        // For example: setDoc(doc(firestore, 'affiliates', data.id), data, { merge: true });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Affiliate Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Affiliate IDs</CardTitle>
                </CardHeader>
                <CardContent>
                    {affiliates.length > 0 ? (
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
                        <p>Loading affiliate settings or none found...</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
