'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Hotel, Shield, Menu, Mountain, User as UserIcon, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@/firebase';

const navLinks = [
  { href: '/hotels', label: 'Hotels', icon: Hotel },
  { href: '/packages', label: 'Packages', icon: Package },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
    }
  };

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav
      className={cn(
        'flex items-center gap-4',
        isMobile ? 'flex-col items-start gap-4 p-4' : 'hidden md:flex'
      )}
    >
      {navLinks.map(({ href, label, icon: Icon }) => (
        <Button
          key={href}
          variant={pathname.startsWith(href) ? 'secondary' : 'ghost'}
          asChild
          className={cn(isMobile && 'w-full justify-start')}
        >
          <Link href={href}>
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-blue">
          <Mountain className="h-6 w-6" />
          <span className="font-headline">Tripify</span>
        </Link>

        <div className="flex items-center gap-4">
          <NavLinks />

          {isUserLoading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || 'Welcome'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin"><Shield className="mr-2 h-4 w-4"/>Admin Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login"><LogIn className="mr-2 h-4 w-4"/>Login</Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-blue mb-6">
                <Mountain className="h-6 w-6" />
                <span className="font-headline">Tripify</span>
              </Link>
              <NavLinks isMobile={true} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
