'use client';

import { Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Mountain className="h-8 w-8 text-primary" />
      <span className="font-headline text-3xl font-bold text-primary">Tripify</span>
    </div>
  );
}
