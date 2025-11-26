
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("relative flex items-center", className)}>
        <Image 
            src="/TripBookar1.png" 
            alt="TripBookKar Logo" 
            width={180}
            height={45}
            className="object-contain"
        />
    </Link>
  );
}
