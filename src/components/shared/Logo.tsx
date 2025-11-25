'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("relative flex items-center h-10 w-48", className)}>
        <Image 
            src="/TripBookkar.png" 
            alt="TripBookKar Logo" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            priority 
        />
    </Link>
  );
}
