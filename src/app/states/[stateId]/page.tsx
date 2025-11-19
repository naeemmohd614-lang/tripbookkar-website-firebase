

'use client';
import { states, hotels, cities as allCities, attractions } from '@/lib/data';
import { notFound, useParams }from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Users, Calendar, Clock, Package as PackageIcon, Hotel as HotelIcon, Castle, Sun, Landmark, MapPin, Waves, Martini, Zap, Leaf } from 'lucide-react';
import type { State, Hotel, City, Attraction } from '@/lib/types';
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
  const stateCities = (allCities as City[]).filter(city => {
      return stateHotels.some(hotel => hotel.cityId === city.cityId);
  });
  
  const stateImage = {
      "src": `https://picsum.photos/seed/${state.stateId}/1280/400`,
      "caption": `landscape ${state.name}`
  };

  const rajasthanHighlights = [
    { icon: Castle, text: 'Majestic Forts', color: 'text-sky-500' },
    { icon: Landmark, text: 'Royal Palaces', color: 'text-green-500' },
    { icon: Sun, text: 'Desert Safari', color: 'text-orange-500' },
  ];

  const rajasthanCities = ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer'].map(cityName => {
    const city = (allCities as City[]).find(c => c.name === cityName);
    const cityId = city ? city.cityId : slugify(cityName);
    return {
      name: cityName,
      cityId: cityId,
      image: `https://picsum.photos/seed/city-${cityId}/400/500`,
      caption: `${cityName} city`
    };
  });
  
  const rajasthanAttractions = [
    { 
      id: 'amer-fort',
      name: 'Amer Fort', 
      location: 'Jaipur',
      image: 'https://picsum.photos/seed/amer-fort/600/400',
      caption: 'amer fort',
      description: "Perched on a hilltop overlooking Maota Lake, Amer Fort is a stunning example of Rajput architecture. Explore its intricate network of courtyards, palaces, and halls, including the breathtaking Sheesh Mahal (Mirror Palace)."
    },
    { 
      id: 'mehrangarh-fort',
      name: 'Mehrangarh Fort', 
      location: 'Jodhpur',
      image: 'https://picsum.photos/seed/mehrangarh-fort/600/400',
      caption: 'mehrangarh fort',
      description: "One of India's largest and most magnificent forts, Mehrangarh Fort rises from a rocky hill 125m above Jodhpur's skyline. Its thick, imposing walls enclose a complex of beautiful palaces, courtyards, and a museum."
    },
    { 
      id: 'city-palace-udaipur',
      name: 'City Palace, Udaipur', 
      location: 'Udaipur',
      image: 'https://picsum.photos/seed/city-palace-udaipur/600/400',
      caption: 'udaipur palace',
      description: "A majestic palace-complex on the banks of Lake Pichola, the City Palace is a fusion of Rajasthani and Mughal architecture. It houses a museum showcasing royal artifacts and offers breathtaking views of the lake and city."
    },
  ];

  const rajasthanCarouselImages = [
    {
      src: 'https://picsum.photos/seed/jaisalmer-fort/1200/600',
      caption: 'Jaisalmer Fort',
      'data-ai-hint': 'jaisalmer fort'
    },
    {
      src: 'https://picsum.photos/seed/hawa-mahal/1200/600',
      caption: 'Hawa Mahal, Jaipur',
      'data-ai-hint': 'hawa mahal'
    },
    {
      src: 'https://picsum.photos/seed/udaipur-lake/1200/600',
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
                <Link href={`/states/rajasthan/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Top Attractions */}
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Rajasthan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rajasthanAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.id}`} key={attraction.id}>
                    <Card className="overflow-hidden group h-full hover:shadow-lg transition-shadow">
                        <Image src={attraction.image} alt={attraction.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            {attraction.location}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
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

  const goaCarouselImages = [
    {
      src: 'https://picsum.photos/seed/goa-carousel-1/1200/600',
      caption: 'Palolem Beach, Goa',
      'data-ai-hint': 'palolem beach'
    },
    {
      src: 'https://picsum.photos/seed/goa-carousel-2/1200/600',
      caption: 'A beach party in Goa',
      'data-ai-hint': 'goa nightlife'
    },
    {
      src: 'https://picsum.photos/seed/goa-carousel-3/1200/600',
      caption: 'Basilica of Bom Jesus, Old Goa',
      'data-ai-hint': 'goa church'
    }
  ];

  const goaHighlights = [
    { icon: Waves, text: 'Pristine Beaches', color: 'text-sky-500' },
    { icon: Martini, text: 'Vibrant Nightlife', color: 'text-pink-500' },
    { icon: Zap, text: 'Water Sports', color: 'text-orange-500' },
  ];

  const goaMajorAreas = [
    {
      name: 'North Goa',
      slug: 'north-goa',
      image: 'https://picsum.photos/seed/city-north-goa/400/500',
      caption: 'North Goa beach'
    },
    {
      name: 'South Goa',
      slug: 'south-goa',
      image: 'https://picsum.photos/seed/city-south-goa/400/500',
      caption: 'South Goa peaceful beach'
    },
  ];

  const goaAttractions = (attractions as Attraction[]).filter(a => a.city === "North Goa" || a.city === "South Goa");

  if (stateId === 'goa') {
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {goaCarouselImages.map((image, index) => (
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
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Goa</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              India's pocket-sized paradise, Goa is a coastal state famous for its endless beaches, vibrant nightlife, delicious seafood, and Portuguese-influenced architecture. From the bustling parties of the north to the tranquil shores of the south, Goa offers a perfect holiday for every kind of traveler.
            </p>
          </div>

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
                <p className="text-sm text-muted-foreground">4-5 Days</p>
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

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {goaHighlights.map(highlight => {
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

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Areas</h2>
            <p className="mt-2 text-muted-foreground">Experience the distinct vibes of North and South Goa.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
              {goaMajorAreas.map(area => (
                 <Link href={`/states/goa/${area.slug}`} key={area.name}>
                    <Card className="overflow-hidden group relative">
                        <Image src={area.image} alt={area.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={area.caption} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{area.name}</h3>
                    </Card>
                 </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Goa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {goaAttractions.slice(0,3).map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            {attraction.city}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top 10 Hotels in Goa
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

  // Enhanced Default State Page Layout
  return (
    <div>
        {stateImage && (
            <div className="relative h-64 md:h-80 w-full">
                <Image
                    src={stateImage.src}
                    alt={`A scenic view of ${state.name}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={stateImage.caption}
                />
                <div className="absolute inset-0 bg-black/40" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">{state.name}</h1>
                </div>
            </div>
        )}
        <div className="container mx-auto px-4 py-12">
            <Card className="mb-12 shadow-lg -mt-24 relative z-10 max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-brand-blue">{state.name}</CardTitle>
                    <CardDescription className="text-base pt-2">{state.description}</CardDescription>
                </CardHeader>
                <CardContent>
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

            {stateCities.length > 0 && (
                <div className="my-16">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                        Explore Cities in {state.name}
                    </h2>
                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {stateCities.map((city) => {
                            const cityImage = {
                                "src": `https://picsum.photos/seed/${city.cityId}/400/300`,
                                "caption": `View of ${city.name}`
                            };
                            return (
                                <Link href={`/states/${state.stateId}/cities/${city.cityId}`} key={city.cityId}>
                                    <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                        <CardContent className="p-0">
                                        <div className="relative h-40">
                                            <Image
                                                src={cityImage.src}
                                                alt={cityImage.caption}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                data-ai-hint={cityImage.caption}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-3">
                                                <h3 className="font-bold text-lg text-white font-headline">{city.name}</h3>
                                            </div>
                                        </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}


            <div className="my-16">
                <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
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
        </div>
    </div>
  );
}
