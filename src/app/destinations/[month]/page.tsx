
'use client';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { hotels } from '@/lib/data';
import type { Hotel } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import { destinationsByMonth } from '@/lib/data';

const januaryDestinations = [
  {
    name: "Auli, Uttarakhand",
    reason: "January transforms Auli into a premier skiing destination. The snow-covered meadows, panoramic views of the Himalayas, and the crisp mountain air make it perfect for winter sports enthusiasts and nature lovers.",
    hotels: ["The Royal Village", "Himalayan High, Auli", "The Tattva Resort"],
    image: {
        src: "https://picsum.photos/seed/auli-january/1200/400",
        caption: "snowy mountains auli"
    }
  },
  {
    name: "Jaipur, Rajasthan",
    reason: "The weather in January is pleasantly cool and ideal for sightseeing. You can explore majestic forts, vibrant markets, and attend the Jaipur Literature Festival, which often takes place this month.",
    hotels: (hotels as Hotel[]).filter(h => h.city === 'Jaipur').map(h => h.name).slice(0, 10),
    image: {
        src: "https://picsum.photos/seed/jaipur-january/1200/400",
        caption: "amber fort jaipur"
    }
  },
  {
    name: "Goa",
    reason: "After the peak season rush of December, January in Goa is more relaxed but still vibrant. The weather is perfect for beach hopping, water sports, and enjoying the lively shacks and nightlife.",
    hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').map(h => h.name).slice(0, 10),
    image: {
        src: "https://picsum.photos/seed/goa-january/1200/400",
        caption: "goa beach"
    }
  },
  {
    name: "Munnar, Kerala",
    reason: "The cool and comfortable climate of January is perfect for exploring Munnar's sprawling tea plantations. The post-monsoon greenery is at its peak, offering breathtaking landscapes.",
    hotels: ["The Fog Munnar", "Chandys Windy Woods", "KTDC Tea County"],
    image: {
        src: "https://picsum.photos/seed/munnar-january/1200/400",
        caption: "tea plantation munnar"
    }
  },
  {
    name: "Andaman and Nicobar Islands",
    reason: "With clear skies and calm seas, January is the best time for water activities like scuba diving and snorkeling. The pristine beaches and turquoise waters create a picture-perfect tropical paradise.",
    hotels: ["Taj Exotica Resort & Spa, Andamans", "Barefoot at Havelock", "SeaShell, Havelock"],
    image: {
        src: "https://picsum.photos/seed/andaman-january/1200/400",
        caption: "andaman beach"
    }
  },
    {
    name: "Delhi",
    reason: "The pleasant winter of January is ideal for exploring the historical monuments of Delhi. The month culminates with the grand Republic Day Parade on January 26th, a spectacular event to witness.",
    hotels: (hotels as Hotel[]).filter(h => h.city === 'New Delhi').map(h => h.name).slice(0, 10),
    image: {
        src: "https://picsum.photos/seed/delhi-january/1200/400",
        caption: "india gate delhi"
    }
  },
  {
    name: "Rann of Kutch, Gujarat",
    reason: "January is when the Rann Utsav is in full swing. Experience the vast white salt desert under the full moon, enjoy cultural performances, and witness the region's vibrant heritage.",
    hotels: ["The Fern Residency, Bhuj", "Regenta Resort Bhuj", "Rann Riders, Dasada"],
     image: {
        src: "https://picsum.photos/seed/kutch-january/1200/400",
        caption: "rann of kutch"
    }
  },
  {
    name: "Pondicherry",
    reason: "The weather is cool and perfect for exploring the charming French Quarter on foot or bicycle. The spiritual vibes of Auroville and the serene beaches make it a unique winter getaway.",
    hotels: ["Palais de Mahe - CGH Earth", "La Villa", "The Promenade"],
     image: {
        src: "https://picsum.photos/seed/pondy-january/1200/400",
        caption: "pondicherry french colony"
    }
  },
  {
    name: "Udaipur, Rajasthan",
    reason: "Known as the 'City of Lakes', Udaipur's beauty is enhanced by the pleasant January weather. Enjoy boat rides on Lake Pichola and explore the majestic City Palace without the scorching heat.",
    hotels: (hotels as Hotel[]).filter(h => h.city === 'Udaipur').map(h => h.name).slice(0, 10),
    image: {
        src: "https://picsum.photos/seed/udaipur-january/1200/400",
        caption: "udaipur lake palace"
    }
  },
  {
    name: "Khajuraho, Madhya Pradesh",
    reason: "The pleasant daytime temperatures in January are perfect for exploring the intricate and world-famous temple sculptures. The annual Khajuraho Dance Festival often begins towards the end of the month.",
    hotels: ["The Lalit Temple View Khajuraho", "Radisson Jass Khajuraho", "Ramada by Wyndham Khajuraho"],
    image: {
        src: "https://picsum.photos/seed/khajuraho-january/1200/400",
        caption: "khajuraho temple"
    }
  }
];

export default function MonthPage() {
    const params = useParams();
    const monthSlug = params.month as string;

    const monthData = destinationsByMonth.find(m => m.slug === monthSlug);

    if (!monthData) {
        notFound();
    }

    // For now, we only have data for January.
    if (monthSlug !== 'january') {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                 <h1 className="text-4xl font-headline font-bold text-brand-blue capitalize mb-4">
                    Travel Guide for {monthData.name}
                </h1>
                <p className="text-muted-foreground text-lg">Content for this month is coming soon. Please check back later!</p>
            </div>
        )
    }
    
    const pageImage = {
        "src": `https://picsum.photos/seed/jan-hero/1080/200`,
        "caption": "winter travel india"
    };

    return (
        <div className="bg-secondary/30">
            <div className="relative h-64 w-full">
                <Image
                    src={pageImage.src}
                    alt={`Scenic view for travel in ${monthData.name}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={pageImage.caption}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg text-center px-4">
                        Top 10 Places to Visit in India in {monthData.name}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="space-y-12">
                    {januaryDestinations.map((dest, index) => (
                        <Card key={dest.name} className="overflow-hidden shadow-lg">
                             <CardHeader className="p-0">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={dest.image.src}
                                        alt={dest.name}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={dest.image.caption}
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <h2 className="text-3xl font-headline text-brand-blue mb-2">{index + 1}. {dest.name}</h2>
                                <p className="text-muted-foreground italic mb-4">{dest.reason}</p>
                                
                                <h3 className="font-bold text-lg mb-3">Top Hotels in {dest.name.split(',')[0]}:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
                                    {dest.hotels.map(hotelName => {
                                        const hotel = (hotels as Hotel[]).find(h => h.name === hotelName);
                                        return (
                                            <div key={hotelName}>
                                            {hotel ? (
                                                <Link href={`/states/${hotel.stateId}/cities/${hotel.cityId}/hotels/${hotel.hotelId}`} className="text-primary hover:underline">
                                                    {hotel.name}
                                                </Link>
                                            ) : (
                                                <span className="text-muted-foreground">{hotelName}</span>
                                            )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
