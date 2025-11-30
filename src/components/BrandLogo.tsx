
'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  brand: {
    name: string;
    slug: string;
    href: string;
    logo?: string;
  };
}

export default function BrandLogo({ brand }: BrandLogoProps) {
  // Use the logo if available, otherwise display the name
  if (brand.logo) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <Image 
          src={brand.logo}
          alt={`${brand.name} logo`}
          fill
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className={cn(
        "flex items-center justify-center w-full h-full rounded-full",
        "bg-gradient-to-br from-primary/20 to-primary/50"
      )}>
      <span className="font-bold text-center text-xs text-primary-foreground drop-shadow-lg">{brand.name}</span>
    </div>
  );
}
