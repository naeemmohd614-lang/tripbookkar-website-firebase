
import LoadingLink from './loading-link';
import Image from 'next/image';
import { Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Package } from '@/lib/types';
import { Badge } from './ui/badge';

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
    const packageImage = pkg.images[0] ? {
      src: typeof pkg.images[0] === 'string' ? pkg.images[0] : pkg.images[0].src,
      caption: typeof pkg.images[0] === 'string' ? `image for ${pkg.name}` : pkg.images[0].caption,
    } : {
      src: `https://picsum.photos/seed/${pkg.id}/1080/720`,
      caption: `image for ${pkg.name}`
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
        <div className="mt-3 flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4"/>
                <span>{pkg.days} Days / {pkg.nights} Nights</span>
            </div>
        </div>
         <div className="mt-3 flex flex-wrap gap-2">
            {pkg.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="outline" className="font-normal capitalize">{tag}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-end items-center bg-secondary/30">
        <Button asChild>
          <LoadingLink href={`/packages/${pkg.id}`}>View Itinerary</LoadingLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
