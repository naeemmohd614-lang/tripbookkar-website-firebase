'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Hotel, Shield, Menu, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/hotels', label: 'Hotels', icon: Hotel },
  { href: '/packages', label: 'Packages', icon: Package },
  { href: '/admin', label: 'Admin', icon: Shield },
];

export default function Header() {
  const pathname = usePathname();

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
