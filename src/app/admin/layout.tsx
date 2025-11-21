
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { useAuth, useUser } from '@/firebase';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Map, 
  Building2, 
  Home, 
  BookOpen, 
  Mail, 
  Share2,
  LogOut,
  Settings,
  Ticket,
  Percent,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.149-.67-.149l-.67-1.629c-.273-.656-.546-.565-.67-.565-.125 0-.273 0-.422.025-.148.025-.371.149-.568.347-.198.198-.767.766-.767 1.852s.792 2.148.917 2.321c.125.172 1.52 2.318 3.687 3.231.596.266 1.063.425 1.422.544.56.187 1.035.162 1.422.099.434-.075 1.342-.544 1.539-1.07.198-.52.198-1.07.149-1.164-.05-.099-.198-.149-.297-.198zM12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z" fill="currentColor"/>
    </svg>
);


const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/destinations', label: 'Destinations', icon: Map },
  { href: '/admin/hotels', label: 'Hotels', icon: Building2 },
  { href: '/admin/leads', label: 'Leads', icon: Mail },
  { href: '/admin/affiliates', label: 'Affiliates', icon: Share2 },
  { href: '/admin/pricing', label: 'Pricing', icon: Percent },
  { href: '/admin/seo', label: 'SEO', icon: TrendingUp },
];

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
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <aside className="w-64 bg-white border-r px-4 py-6 hidden md:flex flex-col">
        <div className="px-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-800">TripBookKar</h2>
            <p className="text-sm text-gray-500">Admin Panel</p>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname.startsWith(link.href) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b h-20 flex items-center justify-end px-8">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                          <AvatarImage src={user?.photoURL || undefined} />
                          <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
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
