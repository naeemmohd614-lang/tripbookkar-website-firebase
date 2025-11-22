
'use client'
import MonthEditor from '@/components/admin/MonthEditor';
import type { MonthData } from '@/data/monthly-destinations';
import { notFound } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function EditMonthPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();

  const monthRef = useMemoFirebase(() => {
    if (!firestore || !params.id) return null;
    return doc(firestore, 'monthlyDestinations', params.id);
  }, [firestore, params.id]);

  const { data: month, isLoading } = useDoc<MonthData>(monthRef);

  if (isLoading) {
    return <div className="p-6">Loading month data...</div>;
  }
  
  if (!month && !isLoading) {
    notFound();
  }

  return <MonthEditor month={month as MonthData} />;
}
