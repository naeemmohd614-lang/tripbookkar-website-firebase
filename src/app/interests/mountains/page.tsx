
import { hotels } from '@/lib/data';
import HotelCard from '@/components/hotel-card';
import type { Hotel } from '@/lib/types';
import Image from 'next/image';

export default function MountainsPage() {
  const mountainHotels = (hotels as Hotel[]).filter(hotel => 
    hotel.tags.some(tag => tag.toLowerCase().includes('mountain') || tag.toLowerCase().includes('himalayas') || tag.toLowerCase().includes('valley view'))
  ).slice(0, 10);

  const heroImage = {
      "src": "https://picsum.photos/seed/interest-mountains/1920/600",
      "caption": "himalayan mountain range"
  };

  return (
    <div className="bg-secondary/30">
      <div className="relative h-64 md:h-80 w-full">
        <Image
          src={heroImage.src}
          alt="A majestic snow-capped mountain range at sunrise"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.caption}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg text-center px-4">
            Mountain Escapes
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
                Discover hotels with breathtaking views, crisp mountain air, and serene surroundings. From luxurious resorts to cozy lodges, find your perfect high-altitude getaway.
            </p>
        </div>

        <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
          Top 10 Mountain View Hotels
        </h2>

        {mountainHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mountainHotels.map((hotel) => (
              <HotelCard key={hotel.hotelId} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold text-muted-foreground">No mountain hotels found.</h3>
            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
