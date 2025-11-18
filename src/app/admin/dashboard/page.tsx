'use client';
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

export default function DashboardPage(){
  const [stats, setStats] = useState({ hotels: 0, packages: 0, leads: 0 });
  const firestore = useFirestore();

  useEffect(()=>{
    if (!firestore) return;

    (async ()=>{
      try{
        const hotelsSnap = await getCountFromServer(collection(firestore, 'hotels'));
        const packagesSnap = await getCountFromServer(collection(firestore, 'packages'));
        const leadsSnap = await getCountFromServer(collection(firestore, 'leads'));
        setStats({ hotels: hotelsSnap.data().count, packages: packagesSnap.data().count, leads: leadsSnap.data().count });
      }catch(e){ console.warn(e); }
    })();
  },[firestore]);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow"> <div className="text-sm text-gray-500">Hotels</div><div className="text-2xl">{stats.hotels}</div></div>
        <div className="p-4 bg-white rounded shadow"> <div className="text-sm text-gray-500">Packages</div><div className="text-2xl">{stats.packages}</div></div>
        <div className="p-4 bg-white rounded shadow"> <div className="text-sm text-gray-500">Leads</div><div className="text-2xl">{stats.leads}</div></div>
      </div>
    </div>
  );
}
