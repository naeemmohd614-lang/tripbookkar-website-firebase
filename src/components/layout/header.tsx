
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Package, 
  Hotel, 
  Shield, 
  Menu, 
  Mountain, 
  User as UserIcon, 
  LogOut, 
  LogIn,
  CircleUserRound,
  Umbrella,
  Percent,
  Gem,
  Sparkles,
  Diamond,
  Briefcase,
  Palmtree,
  MapPin,
  Building2,
  Sun,
  Users,
  Landmark,
  Home,
  Tent,
  Train,
  HeartPulse,
  Cake
} from 'lucide-react';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@/firebase';
import React from 'react';
import { Separator } from '../ui/separator';

const navLinks = [
  { href: '/packages', label: 'Packages', icon: Package },
];

const hotelBrands = [
  { title: "Marriott", href: "/brands/marriott" },
  { title: "Taj", href: "/brands/taj" },
  { title: "Oberoi", href: "/brands/oberoi" },
  { title: "Hyatt", href: "/brands/hyatt" },
  { title: "The Leela", href: "/brands/the-leela" },
  { title: "IHG", href: "/brands/ihg" },
  { title: "Radisson", href: "/brands/radisson" },
  { title: "Accor", href: "/brands/accor" },
  { title: "Hilton", href: "/brands/hilton" },
];

const experiences = [
  { title: "Adults-Only Resorts", href: "/experiences/adults-only", icon: CircleUserRound, description: "Unwind in serene, adults-only environments." },
  { title: "All-inclusive Resorts", href: "/experiences/all-inclusive", icon: Palmtree, description: "Enjoy worry-free vacations with everything included." },
  { title: "Around Delhi NCR", href: "/experiences/around-delhi-ncr", icon: MapPin, description: "Quick getaways and stays near the capital city." },
  { title: "Beachfront Resorts", href: "/experiences/beachfront", icon: Umbrella, description: "Wake up to the sound of waves at stunning beachfront properties." },
  { title: "Boutique Hotels", href: "/experiences/boutique", icon: Building2, description: "Unique and intimate hotels with personalized service." },
  { title: "Desert Experiences", href: "/experiences/desert", icon: Sun, description: "Explore the magic and majesty of the desert." },
  { title: "Exclusive Offers", href: "/experiences/exclusive-offers", icon: Percent, description: "Find special deals and packages for your next trip." },
  { title: "Family-Friendly Resorts", href: "/experiences/family-friendly", icon: Users, description: "Fun for all ages with activities and amenities for families." },
  { title: "Heritage & Palaces", href: "/experiences/heritage-palaces", icon: Landmark, description: "Stay in historic palaces and heritage properties." },
  { title: "Luxury Hotels", href: "/experiences/luxury-hotels", icon: Gem, description: "Indulge in the finest hospitality and world-class amenities." },
  { title: "Luxury Tents", href: "/experiences/luxury-tents", icon: Tent, description: "Experience glamorous camping with all the comforts." },
  { title: "Luxury Villas", href: "/experiences/luxury-villas", icon: Home, description: "Enjoy privacy and space in your own luxury villa." },
  { title: "Milestone Celebrations", href: "/experiences/milestone-celebrations", icon: Sparkles, description: "Celebrate special occasions in memorable settings." },
  { title: "Mountain Lodges", href: "/experiences/mountain-lodges", icon: Mountain, description: "Cozy lodges with breathtaking mountain views." },
  { title: "Train Journeys", href: "/experiences/train-journeys", icon: Train, description: "Experience the romance of luxury train travel." },
  { title: "Ultra Luxury", href: "/experiences/ultra-luxury", icon: Diamond, description: "The pinnacle of opulence and bespoke service." },
  { title: "Weddings", href: "/experiences/weddings", icon: Cake, description: "Find the perfect venue for your dream wedding." },
  { title: "Wellness Resorts", href: "/experiences/wellness", icon: HeartPulse, description: "Rejuvenate your mind, body, and soul." },
  { title: "Wildlife Resorts", href: "/experiences/wildlife", icon: Briefcase, description: "Stay close to nature and experience wildlife." },
];


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            {title}
          </div>
          {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export default function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
    }
  };

  const NavContent = () => (
    <>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Hotels</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[200px] gap-1 p-2">
            {hotelBrands.map((brand) => (
              <ListItem
                key={brand.title}
                title={brand.title}
                href={brand.href}
              />
            ))}
            <Separator className="my-1" />
            <ListItem href="/hotels" title="All Hotels" />
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {navLinks.map(({ href, label }) => (
        <NavigationMenuItem key={href}>
          <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), pathname.startsWith(href) ? "bg-accent" : "")}>
            <Link href={href}>{label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}

      <NavigationMenuItem>
        <NavigationMenuTrigger>Experiences</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-3">
             {experiences.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
                icon={component.icon}
              >
                {component.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </>
  );

  const MobileNavLinks = () => (
     <nav className={'flex flex-col items-start gap-2 p-4'}>
      {navLinks.map(({ href, label, icon: Icon }) => (
        <Button
          key={href}
          variant={pathname.startsWith(href) ? 'secondary' : 'ghost'}
          asChild
          className="w-full justify-start"
        >
          <Link href={href}>
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Link>
        </Button>
      ))}
       <h3 className="px-4 text-sm font-semibold text-muted-foreground">Experiences</h3>
        {experiences.map((component) => (
          <Button
            key={component.title}
            variant="ghost"
            asChild
            className="w-full justify-start font-normal"
          >
            <Link href={component.href}>
              <component.icon className="mr-2 h-4 w-4" />
              {component.title}
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

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavContent />
            </NavigationMenuList>
          </NavigationMenu>
        </div>


        <div className="flex items-center gap-4">
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
              <MobileNavLinks />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
