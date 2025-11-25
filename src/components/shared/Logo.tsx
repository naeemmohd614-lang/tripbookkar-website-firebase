'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-[200px] h-[50px]", className)}>
      <Image 
        src="/TripBookkar.png"
        alt="TripBookkar Logo" 
        fill
        className="object-contain"
      />
    </div>
  );
}
