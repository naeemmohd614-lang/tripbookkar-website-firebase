

'use client';
import { states, hotels, cities as allCities } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Users, Calendar, Clock, Package as PackageIcon, Hotel as HotelIcon, Castle, Sun, Landmark, MapPin } from 'lucide-react';
import type { State, Hotel, City } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Helper function to create a slug
function slugify(text: string) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function StatePage() {
  const params = useParams();
  const stateId = params.stateId as string;
  
  const state = (states as State[]).find((s) => s.stateId === stateId);
  
  if (!state) {
    notFound();
  }

  const stateHotels = (hotels as Hotel[]).filter(hotel => hotel.stateId === stateId);
  const stateImage = {
      "src": `https://picsum.photos/seed/${state.stateId}/1280/300`,
      "caption": `landscape ${state.name}`
  };

  const rajasthanHighlights = [
    { icon: Castle, text: 'Majestic Forts', color: 'text-sky-500' },
    { icon: Landmark, text: 'Royal Palaces', color: 'text-green-500' },
    { icon: Sun, text: 'Desert Safari', color: 'text-orange-500' },
  ];

  const rajasthanCities = ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer'].map(cityName => {
    const city = (allCities as City[]).find(c => c.name === cityName);
    const citySlug = slugify(cityName);
    return {
      name: cityName,
      slug: citySlug,
      image: `https://picsum.photos/seed/city-${citySlug}/400/500`,
      caption: `${cityName} city`
    };
  });
  
  const rajasthanAttractions = [
    { 
      name: 'Amer Fort', 
      location: 'Jaipur',
      image: 'https://picsum.photos/seed/amer-fort/600/400',
      caption: 'amer fort',
      description: "Perched on a hilltop overlooking Maota Lake, Amer Fort is a stunning example of Rajput architecture. Explore its intricate network of courtyards, palaces, and halls, including the breathtaking Sheesh Mahal (Mirror Palace)."
    },
    { 
      name: 'Mehrangarh Fort', 
      location: 'Jodhpur',
      image: 'https://picsum.photos/seed/mehrangarh-fort/600/400',
      caption: 'mehrangarh fort',
      description: "One of India's largest and most magnificent forts, Mehrangarh Fort rises from a rocky hill 125m above Jodhpur's skyline. Its thick, imposing walls enclose a complex of beautiful palaces, courtyards, and a museum."
    },
    { 
      name: 'City Palace', 
      location: 'Udaipur',
      image: 'https://picsum.photos/seed/city-palace-udaipur/600/400',
      caption: 'udaipur palace',
      description: "A majestic palace-complex on the banks of Lake Pichola, the City Palace is a fusion of Rajasthani and Mughal architecture. It houses a museum showcasing royal artifacts and offers breathtaking views of the lake and city."
    },
  ];

  const rajasthanCarouselImages = [
    {
      src: 'https://picsum.photos/seed/rajasthan-carousel-1/1200/600',
      caption: 'Jaisalmer Fort',
      'data-ai-hint': 'jaisalmer fort'
    },
    {
      src: 'https://picsum.photos/seed/rajasthan-carousel-2/1200/600',
      caption: 'Hawa Mahal, Jaipur',
      'data-ai-hint': 'hawa mahal'
    },
    {
      src: 'https://picsum.photos/seed/rajasthan-carousel-3/1200/600',
      caption: 'Lake Pichola, Udaipur',
      'data-ai-hint': 'udaipur lake'
    }
  ];

  if (stateId === 'rajasthan') {
    return (
      <div>
        {/* Full-width Image Carousel */}
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {rajasthanCarouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[16/7]">
                    <Image 
                      src={image.src} 
                      alt={image.caption} 
                      fill 
                      className="object-cover"
                      data-ai-hint={image['data-ai-hint']}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          </Carousel>
        </div>

        <div className="container mx-auto px-4">
          {/* Hero Description */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Rajasthan</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The 'Land of Kings', Rajasthan is India's most vibrant and colorful state, a land of epic tales of valor, majestic forts, and opulent palaces. Journey through its golden Thar Desert on a camel safari, explore the bustling markets of the Pink City of Jaipur, the Blue City of Jodhpur, and the Golden City of Jaisalmer. Rajasthan is a living museum of rich history, folk culture, and royal grandeur that will leave you spellbound.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center">
              <CardContent className="p-4">
                <Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" />
                <h3 className="font-semibold">Best Time to Visit</h3>
                <p className="text-sm text-muted-foreground">October to March</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Clock className="mx-auto mb-2 h-8 w-8 text-green-500" />
                <h3 className="font-semibold">Ideal Duration</h3>
                <p className="text-sm text-muted-foreground">7-8 Days</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" />
                <h3 className="font-semibold">Holiday Packages</h3>
                <p className="text-sm text-muted-foreground">View Packages</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" />
                <h3 className="font-semibold">Top Hotels</h3>
                <p className="text-sm text-muted-foreground">Find Hotels</p>
              </CardContent>
            </Card>
          </div>

          {/* Highlights */}
          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {rajasthanHighlights.map(highlight => {
                      const Icon = highlight.icon;
                      return (
                          <div key={highlight.text} className="flex flex-col items-center gap-2">
                              <div className="bg-primary/10 p-4 rounded-full">
                                  <Icon className={`h-8 w-8 ${highlight.color}`} />
                              </div>
                              <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                          </div>
                      );
                  })}
              </div>
          </div>

          {/* Explore Major Cities */}
          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Cities</h2>
            <p className="mt-2 text-muted-foreground">Discover the unique charm of each city within Rajasthan.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {rajasthanCities.map(city => (
                <Card key={city.name} className="overflow-hidden group relative">
                  <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Top Attractions */}
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Rajasthan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rajasthanAttractions.map(attraction => (
                <Card key={attraction.name} className="overflow-hidden">
                  <Image src={attraction.image} alt={attraction.caption} width={600} height={400} className="object-cover w-full h-48" data-ai-hint={attraction.caption} />
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg">{attraction.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {attraction.location}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{attraction.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Top 10 Hotels */}
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top 10 Hotels in Rajasthan
            </h2>
            {stateHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stateHotels.slice(0, 10).map((hotel) => (
                  <HotelCard key={hotel.hotelId} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this state yet.</h3>
                <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


  // Default State Page Layout
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mb-12">
        <CardHeader className="p-0">
           {stateImage && (
            <div className="relative h-48 w-full">
              <Image
                src={stateImage.src}
                alt={`A scenic view of ${state.name}`}
                fill
                className="object-cover rounded-t-lg"
                data-ai-hint={stateImage.caption}
              />
               <div className="absolute inset-0 bg-black/40" />
            </div>
          )}
          <div className="p-6 relative">
            <CardTitle className="font-headline text-4xl text-brand-blue">{state.name}</CardTitle>
            <CardDescription className="text-lg mt-2">{state.description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
            <div className="flex space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Map className="w-5 h-5"/>
                    <span>{state.totalCities} cities</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5"/>
                    <span>{state.totalHotels} hotels</span>
                </div>
            </div>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">
        Hotels in {state.name}
      </h2>

      {stateHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stateHotels.map((hotel) => (
            <HotelCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this state yet.</h3>
          <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
        </div>
      )}
    </div>
  );
}
