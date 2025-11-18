
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { useAuth, useUser } from '@/firebase';
import Link from 'next/link';
import { FiHome, FiMap, FiPackage, FiDollarSign, FiSearch, FiUsers } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const pathname = usePathname();
  const { auth } = useAuth();

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
      window.location.href = '/admin/login';
    }
  };

  if (isUserLoading) {
    return <div className="p-6">Loading...</div>;
  }
  
  if (!user && pathname !== '/admin/login') {
     if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return null;
  }
  
  if(user && pathname === '/admin/login'){
     if (typeof window !== 'undefined') {
      window.location.href = '/admin/dashboard';
    }
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r px-4 py-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">TripBookKar Admin</h2>
        <nav className="space-y-2 text-sm">
          <Link href="/admin/dashboard" className={`flex items-center gap-3 p-2 rounded ${pathname === '/admin/dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'}`}><FiHome/> Dashboard</Link>
          <Link href="/admin/hotels" className={`flex items-center gap-3 p-2 rounded ${pathname.startsWith('/admin/hotels') ? 'bg-indigo-50 text-indigo-600':'text-gray-700'}`}><FiMap/> Hotels</Link>
          <Link href="/admin/packages" className={`flex items-center gap-3 p-2 rounded ${pathname.startsWith('/admin/packages') ? 'bg-indigo-50 text-indigo-600':'text-gray-700'}`}><FiPackage/> Packages</Link>
          <Link href="/admin/pricing" className={`flex items-center gap-3 p-2 rounded ${pathname.startsWith('/admin/pricing') ? 'bg-indigo-50 text-indigo-600':'text-gray-700'}`}><FiDollarSign/> Pricing</Link>
          <Link href="/admin/seo" className={`flex items-center gap-3 p-2 rounded ${pathname.startsWith('/admin/seo') ? 'bg-indigo-50 text-indigo-600':'text-gray-700'}`}><FiSearch/> SEO</Link>
          <Link href="/admin/leads" className={`flex items-center gap-3 p-2 rounded ${pathname.startsWith('/admin/leads') ? 'bg-indigo-50 text-indigo-600':'text-gray-700'}`}><FiUsers/> Leads</Link>
        </nav>
        <div className="mt-8">
          <Button onClick={handleLogout} variant="link" className="text-sm text-red-600 p-0">Logout</Button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}


export default function RootAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <AdminLayout>{children}</AdminLayout>
    </FirebaseClientProvider>
  )
}
