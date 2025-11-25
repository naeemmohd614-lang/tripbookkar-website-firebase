import Link from 'next/link';
import { Mountain, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
             <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-blue mb-4">
              <Mountain className="h-6 w-6" />
              <span className="font-headline text-xl">TripBookKar</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your ultimate travel companion. Discover, plan, and book your perfect getaway.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-brand-blue mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/hotels" className="text-sm hover:text-primary transition-colors">Hotels</Link></li>
              <li><Link href="/packages" className="text-sm hover:text-primary transition-colors">Packages</Link></li>
              <li><Link href="#destinations" className="text-sm hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link href="/admin" className="text-sm hover:text-primary transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-brand-blue mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-brand-blue mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TripBookKar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
