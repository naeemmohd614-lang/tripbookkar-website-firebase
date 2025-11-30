
import LoadingLink from '../loading-link';
import { Twitter, Facebook, Instagram } from 'lucide-react';
import Logo from '../shared/Logo';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
             <Logo />
            <p className="text-muted-foreground text-sm mt-4">
              Your ultimate travel companion. Discover, plan, and book your perfect getaway.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-brand-blue mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><LoadingLink href="/about" className="text-sm hover:text-primary transition-colors">About Us</LoadingLink></li>
              <li><LoadingLink href="/hotels" className="text-sm hover:text-primary transition-colors">Hotels</LoadingLink></li>
              <li><LoadingLink href="/packages" className="text-sm hover:text-primary transition-colors">Packages</LoadingLink></li>
              <li><LoadingLink href="/#destinations" className="text-sm hover:text-primary transition-colors">Destinations</LoadingLink></li>
              <li><LoadingLink href="/admin" className="text-sm hover:text-primary transition-colors">Admin</LoadingLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-brand-blue mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><LoadingLink href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</LoadingLink></li>
              <li><LoadingLink href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</LoadingLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-brand-blue mb-4">Connect</h4>
            <div className="flex space-x-4">
              <LoadingLink href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></LoadingLink>
              <LoadingLink href="https://www.facebook.com/profile.php?id=61582685195183" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></LoadingLink>
              <LoadingLink href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></LoadingLink>
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
