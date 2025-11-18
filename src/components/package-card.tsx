import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Package } from '@/lib/types';

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
    const packageImage = {
      "src": `https://picsum.photos/seed/${pkg.images[0]}/1080/720`,
      "caption": `image for ${pkg.name}`
    };

  return (
    <Card className="overflow-hidden group w-full flex flex-col hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48">
          {packageImage && (
            <Image
              src={packageImage.src}
              alt={pkg.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={packageImage.caption}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-2">{pkg.name}</CardTitle>
        <CardDescription>{pkg.description}</CardDescription>
        <div className="mt-3 flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4"/>
                <span>{pkg.days} Days / {pkg.nights} Nights</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-secondary/30">
        <div>
          <p className="text-sm text-muted-foreground">Price per person</p>
          <p className="font-bold text-lg text-brand-blue">
            ₹{pkg.price.toLocaleString()}
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href={`/packages/${pkg.id}`}>View Itinerary</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
