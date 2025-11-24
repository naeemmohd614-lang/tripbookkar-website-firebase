'use client';
import PackageEditor from '@/components/admin/PackageEditor';
import type { Package } from '@/lib/types';
import { notFound } from 'next/navigation';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import React from 'react';

export default function EditPackagePage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const { id } = params;

  const packageRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'packages', id);
  }, [firestore, id]);

  const { data: pkg, isLoading } = useDoc<Package>(packageRef);

  if (isLoading) {
    return <div className="p-6">Loading package data...</div>;
  }
  
  if (!pkg && !isLoading) {
    notFound();
  }

  return <PackageEditor pkg={pkg as Package} />;
}
