
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { useAuth, useUser } from '@/firebase';
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
  Tag,
  Heart,
  Landmark,
  Building
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
import LoadingLink from '@/components/loading-link';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/hotels', label: 'Hotels', icon: Building2 },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/states', label: 'States', icon: Landmark },
  { href: '/admin/cities', label: 'Cities', icon: Building },
  { href: '/admin/destinations', label: 'Destinations', icon: Map },
  { href: '/admin/interests', label: 'Interests', icon: Heart },
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
    <div className="min-h-screen flex bg-secondary/30 text-foreground">
      <aside className="w-64 bg-background border-r px-4 py-6 hidden md:flex flex-col">
        <div className="px-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">TripBookKar</h2>
            <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <LoadingLink href={link.href}>
                  <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname.startsWith(link.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'}`}>
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                </LoadingLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-background border-b h-20 flex items-center justify-end px-8 gap-4">
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
