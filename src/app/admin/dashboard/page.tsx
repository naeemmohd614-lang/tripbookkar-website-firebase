'use client';
import React, { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
  
  const chartData = [
    { name: 'Hotels', count: stats.hotels },
    { name: 'Packages', count: stats.packages },
    { name: 'Leads', count: stats.leads },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Content Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="count"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}