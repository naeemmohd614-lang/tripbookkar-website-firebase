
'use client';
import Image from 'next/image';

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
    <div className="flex items-center justify-center w-full h-full">
      <span className="font-bold text-center text-sm">{brand.name}</span>
    </div>
  );
}
