'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-bold text-lg text-brand-blue", className)}>
        <Image src="/uploads/www.marriott.com/Places_To.../TripBookkar.png" alt="TripBookkar Logo" width={150} height={50} priority />
    </Link>
  );
}
