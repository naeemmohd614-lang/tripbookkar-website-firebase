'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("relative flex items-center h-12 w-48", className)}>
        <Image 
            src="/generated-pages/TripBookKar1.png" 
            alt="TripBookKar Logo" 
            fill
            className="object-contain"
        />
    </Link>
  );
}
