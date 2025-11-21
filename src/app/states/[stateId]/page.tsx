

'use client';
import { states, hotels, cities as allCities, attractions } from '@/lib/data';
import { notFound, useParams }from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Users, Calendar, Clock, Package as PackageIcon, Hotel as HotelIcon, Castle, Sun, Landmark, MapPin, Waves, Martini, Zap, Leaf, Utensils, Sailboat, Building, Mountain, Users2, ShieldCheck, TreePine, Church, Star, ShoppingBag, Paintbrush, Music, HeartPulse, SwatchBook, Bell, Hand, Flower, CableCar, Sprout, BookOpen, Cat, Clapperboard, Drama, CookingPot, Diamond, ShoppingBasket, Anchor, Compass } from 'lucide-react';
import type { State, Hotel, City, Attraction } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';

// Helper function to create a slug
function slugify(text: string) {
  if (!text) return '';
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
  const stateCities = (allCities as City[]).filter(city => city.stateId === stateId);
  
  const stateImage = {
      "src": `https://picsum.photos/seed/${state.stateId}/1280/400`,
      "caption": `landscape ${state.name}`
  };

  if (stateId === 'delhi') {
    const delhiCarouselImages = [
        { src: 'https://images.unsplash.com/photo-1587474260584-136574528934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGdhdGUlMjBuZXclMjBkZWxoaXxlbnwwfHx8fDE3NjM3MTEzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'India Gate', 'data-ai-hint': 'india gate new delhi' },
        { src: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxodW1heXVucyUyMHRvbWIlMjBkZWxoaXxlbnwwfHx8fDE3NjM3MTEzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Humayun\'s Tomb', 'data-ai-hint': 'humayuns tomb delhi' },
        { src: 'https://images.unsplash.com/photo-1588133547998-a23c214d455c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsb3R1cyUyMHRlbXBsZSUyMGRlbGhpfGVufDB8fHx8MTc2MzcxMTM5Mnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Lotus Temple', 'data-ai-hint': 'lotus temple delhi' }
    ];

    const delhiHighlights = [
        { icon: Landmark, text: 'Historical Monuments', color: 'text-amber-600' },
        { icon: ShoppingBasket, text: 'Bustling Markets', color: 'text-orange-500' },
        { icon: Landmark, text: 'Political Hub', color: 'text-blue-500' },
    ];
    
    const delhiAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'delhi');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {delhiCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Delhi</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The capital of India, Delhi is a bustling metropolis that beautifully blends its historical past with a vibrant present. From ancient Mughal monuments and medieval forts to sprawling markets and modern architecture, Delhi is a city of captivating contrasts.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">October to March</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">3-4 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {delhiHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Delhi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {delhiAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-40 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in Delhi
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

  if (stateId === 'gujarat') {
    const gujaratCarouselImages = [
        { src: 'https://images.unsplash.com/photo-1617653252599-69ce89538333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxSYW5uJTIwb2YlMjBLdXRjaHxlbnwwfHx8fDE3NjM3MDIyODF8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Rann of Kutch', 'data-ai-hint': 'rann of kutch white desert' },
        { src: 'https://images.unsplash.com/photo-1621287636838-5457f5c225b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzb21uYXRoJTIwdGVtcGxlfGVufDB8fHx8MTc2MzcwMjI4MXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Somnath Temple', 'data-ai-hint': 'somnath temple india' },
        { src: 'https://images.unsplash.com/photo-1617490215167-a09c31375d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBqYWwlMjBtYWhhbHxlbnwwfHx8fDE3NjM3MTE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Statue of Unity', 'data-ai-hint': 'statue of unity' }
    ];

    const gujaratHighlights = [
        { icon: Drama, text: 'Vibrant Culture', color: 'text-orange-500' },
        { icon: Castle, text: 'Historical Sites', color: 'text-amber-600' },
        { icon: CookingPot, text: 'Rich Cuisine', color: 'text-red-500' },
    ];
    
    const gujaratCities = ['Ahmedabad', 'Kutch', 'Dwarka', 'Somnath', 'Surat'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      return {
        name: cityName,
        cityId: cityId,
        image: `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: `${cityName} city`
      };
    });

    const gujaratAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'gujarat');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {gujaratCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Gujarat</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Known as the 'Jewel of Western India', Gujarat is a land of vibrant culture, rich history, and diverse landscapes. From the white salt desert of the Rann of Kutch and the sacred temples of Dwarka and Somnath to the bustling city of Ahmedabad and the world's tallest statue, the Statue of Unity, Gujarat offers a kaleidoscope of experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">October to March</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">6-8 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {gujaratHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Destinations</h2>
            <p className="mt-2 text-muted-foreground">From ancient temples to modern marvels.</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8">
              {gujaratCities.map(city => (
                <Link href={`/states/gujarat/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Gujarat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gujaratAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-40 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in Gujarat
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

  if (stateId === 'madhya-pradesh') {
    const mpCarouselImages = [
        { src: 'https://picsum.photos/seed/mp-carousel-1/1200/600', caption: 'Khajuraho Temples', 'data-ai-hint': 'khajuraho temple sculpture' },
        { src: 'https://picsum.photos/seed/mp-carousel-2/1200/600', caption: 'Tiger in Bandhavgarh', 'data-ai-hint': 'bengal tiger' },
        { src: 'https://picsum.photos/seed/mp-carousel-3/1200/600', caption: 'Pachmarhi Hills', 'data-ai-hint': 'pachmarhi hills monsoon' }
    ];

    const mpHighlights = [
        { icon: Cat, text: 'Wildlife Sanctuaries', color: 'text-orange-500' },
        { icon: Castle, text: 'Historical Forts', color: 'text-amber-600' },
        { icon: Hand, text: 'Spiritual Sites', color: 'text-sky-500' },
    ];
    
    const mpCities = ['Bhopal', 'Indore', 'Gwalior', 'Khajuraho', 'Pachmarhi', 'Mandu'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      return {
        name: cityName,
        cityId: cityId,
        image: `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: `${cityName} city`
      };
    });

    const mpAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'madhya-pradesh');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {mpCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Madhya Pradesh</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Known as the 'Heart of India', Madhya Pradesh is a state rich in history, culture, and natural beauty. From the majestic tigers of Bandhavgarh and Kanha to the ancient temples of Khajuraho and the serene hills of Pachmarhi, it offers a diverse and unforgettable journey into the soul of India.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">October to March</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">8-10 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {mpHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Destinations</h2>
            <p className="mt-2 text-muted-foreground">Discover the diverse landscapes and cities of Madhya Pradesh.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">
              {mpCities.map(city => (
                <Link href={`/states/madhya-pradesh/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Madhya Pradesh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mpAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-40 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in Madhya Pradesh
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

  if (stateId === 'tamil-nadu') {
    const tnCarouselImages = [
        { src: 'https://images.unsplash.com/photo-1582646636184-b04e0b04b407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtYWR1cmFpJTIwbWVlbmFrc2hpJTIwdGVtcGxlfGVufDB8fHx8MTc2Mzc5NjQwMnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Meenakshi Temple, Madurai', 'data-ai-hint': 'madurai meenakshi temple' },
        { src: 'https://images.unsplash.com/photo-1620473281222-a9b2b50937a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxvb3R5JTIwdG95JTIwdHJhaW58ZW58MHx8fHwxNzYzNzk2NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Nilgiri Mountain Railway, Ooty', 'data-ai-hint': 'ooty toy train' },
        { src: 'https://images.unsplash.com/photo-1622619443415-c205e4a4282e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxrYW55YWt1bWFyaSUyMG1lbW9yaWFsfGVufDB8fHx8MTc2Mzc5NjQwMnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Vivekananda Rock Memorial, Kanyakumari', 'data-ai-hint': 'kanyakumari memorial' }
    ];

    const tnHighlights = [
        { icon: Landmark, text: 'Ancient Temples', color: 'text-orange-500' },
        { icon: SwatchBook, text: 'Rich Culture', color: 'text-purple-500' },
        { icon: Waves, text: 'Beautiful Coastline', color: 'text-sky-500' },
    ];
    
    const tnCities = ['Chennai', 'Madurai', 'Kanyakumari', 'Ooty', 'Kodaikanal'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      const cityImages: { [key: string]: { image: string, caption: string } } = {
        'chennai': { image: 'https://images.unsplash.com/photo-1616843413587-9e3a35f02c63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxDaGVubmFpJTIwY2l0eXxlbnwwfHx8fDE3NjM3OTY0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Chennai city' },
        'madurai': { image: 'https://images.unsplash.com/photo-1628590144343-41dd2e55e81e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYWR1cmFpJTIwY2l0eXxlbnwwfHx8fDE3NjM3OTY0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Madurai city' },
        'kanyakumari': { image: 'https://images.unsplash.com/photo-1605285223011-f2518f8d6978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxrYW55YWt1bWFyaSUyMGNpdHl8ZW58MHx8fHwxNzYzNzk2NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Kanyakumari city' },
        'ooty': { image: 'https://images.unsplash.com/photo-1629938883995-124b86835a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxvcnR5JTIwY2l0eXxlbnwwfHx8fDE3NjM3OTY0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Ooty city' },
        'kodaikanal': { image: 'https://images.unsplash.com/photo-1596767353994-e37456d95b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxrb2RhaWthbmFsJTIwY2l0eXxlbnwwfHx8fDE3NjM3OTY0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Kodaikanal city' },
      };
      return {
        name: cityName,
        cityId: cityId,
        image: cityImages[cityId]?.image || `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: cityImages[cityId]?.caption || `${cityName} city`
      };
    });

    const tnAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'tamil-nadu');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {tnCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Tamil Nadu</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Known as the 'Land of Temples', Tamil Nadu is a state rich in history, culture, and natural beauty. From the ancient temples of Madurai and Thanjavur to the scenic hill stations of Ooty and Kodaikanal, and the beautiful coastline of the Bay of Bengal, Tamil Nadu offers a diverse range of experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">November to February</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">7-10 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {tnHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Destinations</h2>
            <p className="mt-2 text-muted-foreground">From bustling cities to serene hill stations.</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8">
              {tnCities.map(city => (
                <Link href={`/states/tamil-nadu/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Tamil Nadu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tnAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-40 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in Tamil Nadu
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

  if (stateId === 'west-bengal') {
    const wbCarouselImages = [
        { src: 'https://picsum.photos/seed/wb-carousel-1/1200/600', caption: 'Victoria Memorial, Kolkata', 'data-ai-hint': 'kolkata victoria memorial' },
        { src: 'https://picsum.photos/seed/wb-carousel-2/1200/600', caption: 'Tea Gardens, Darjeeling', 'data-ai-hint': 'darjeeling tea garden' },
        { src: 'https://picsum.photos/seed/wb-carousel-3/1200/600', caption: 'Sundarbans Mangrove Forest', 'data-ai-hint': 'sundarbans mangrove tiger' }
    ];

    const wbHighlights = [
        { icon: BookOpen, text: 'Rich Culture', color: 'text-purple-500' },
        { icon: Mountain, text: 'Himalayan Beauty', color: 'text-sky-500' },
        { icon: Cat, text: 'Royal Bengal Tiger', color: 'text-orange-500' },
    ];
    
    const wbCities = ['Kolkata', 'Darjeeling', 'Siliguri', 'Kalimpong'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      return {
        name: cityName,
        cityId: cityId,
        image: `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: `${cityName} city`
      };
    });

    const wbAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'west-bengal');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {wbCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">West Bengal</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From the colonial charm of Kolkata, the 'City of Joy', to the serene tea gardens of Darjeeling with stunning views of the Kanchenjunga, and the mysterious mangrove forests of the Sundarbans, home to the Royal Bengal Tiger, West Bengal offers a diverse tapestry of experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">October to March</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">5-7 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {wbHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Destinations</h2>
            <p className="mt-2 text-muted-foreground">From the City of Joy to the Queen of the Hills.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {wbCities.map(city => (
                <Link href={`/states/west-bengal/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in West Bengal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {wbAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-40 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in West Bengal
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

  if (stateId === 'sikkim') {
    const sikkimCarouselImages = [
        { src: 'https://picsum.photos/seed/sikkim-carousel-1/1200/600', caption: 'Tsomgo Lake, Sikkim', 'data-ai-hint': 'tsomgo lake winter' },
        { src: 'https://picsum.photos/seed/sikkim-carousel-2/1200/600', caption: 'Pelling, Sikkim', 'data-ai-hint': 'pelling kanchenjunga view' },
        { src: 'https://picsum.photos/seed/sikkim-carousel-3/1200/600', caption: 'Rumtek Monastery, Gangtok', 'data-ai-hint': 'rumtek monastery' }
    ];

    const sikkimHighlights = [
        { icon: Landmark, text: 'Monasteries', color: 'text-orange-500' },
        { icon: Mountain, text: 'Himalayan Views', color: 'text-sky-500' },
        { icon: Zap, text: 'Trekking & Adventure', color: 'text-green-500' },
    ];
    
    const sikkimCities = ['Gangtok', 'Pelling', 'Lachung', 'Namchi'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      return {
        name: cityName,
        cityId: cityId,
        image: `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: `${cityName} city`
      };
    });

    const sikkimAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'sikkim');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {sikkimCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Sikkim</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
             Nestled in the Himalayas, Sikkim is a land of pristine natural beauty, ancient monasteries, and stunning views of the mighty Kanchenjunga. From the vibrant capital of Gangtok to the serene town of Pelling, Sikkim offers a tranquil and mystical experience for every traveler.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">March to May &amp; Oct to Dec</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">5-6 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {sikkimHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Destinations</h2>
            <p className="mt-2 text-muted-foreground">Discover the charm of Sikkim's beautiful towns.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {sikkimCities.map(city => (
                <Link href={`/states/sikkim/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Sikkim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sikkimAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-40 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in Sikkim
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

  if (stateId === 'jammu-and-kashmir') {
    const jnkCarouselImages = [
        { src: 'https://images.unsplash.com/photo-1595822378881-375990264b97?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzcmluYWdhciUyMGRhbCUyMGxha2V8ZW58MHx8fHwxNzA3NjExMDIyfDA&ixlib=rb-4.0.3&w=1080&h=720&fit=crop&crop=entropy', caption: 'Dal Lake, Srinagar', 'data-ai-hint': 'srinagar dal lake' },
        { src: 'https://images.unsplash.com/photo-1627889615925-56037b304313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYWhhbGdhbSUyMHZhbGxleSUyMHJpdmVyfGVufDB8fHx8MTc2MzcyMjk4OXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Pahalgam Valley', 'data-ai-hint': 'pahalgam valley river' },
        { src: 'https://images.unsplash.com/photo-1620227892398-323869275107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxndWxtYXJnJTIwc25vdyUyMG1vdW50YWluc3xlbnwwfHx8fDE3NjM3MjI5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Gulmarg in snow', 'data-ai-hint': 'gulmarg snow mountains' },
    ];

    const jnkHighlights = [
        { icon: Sailboat, text: 'Shikara Rides', color: 'text-sky-500' },
        { icon: Mountain, text: 'Snow-clad Peaks', color: 'text-blue-500' },
        { icon: Flower, text: 'Lush Valleys', color: 'text-green-500' },
    ];
    
    const jnkCities = ['Srinagar', 'Gulmarg', 'Pahalgam'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
       const cityImages: { [key: string]: { image: string, caption: string } } = {
        'srinagar': { image: 'https://images.unsplash.com/photo-1595822378881-375990264b97?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzcmluYWdhciUyMGRhbCUyMGxha2V8ZW58MHx8fHwxNzA3NjExMDIyfDA&ixlib=rb-4.0.3&w=400&h=500&fit=crop&crop=entropy', caption: 'Srinagar city' },
        'gulmarg': { image: 'https://images.unsplash.com/photo-1593361589133-c82a55982855?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxndWxtYXJnJTIwc2tpaW5nfGVufDB8fHx8MTcwNzYxMTAyMnww&ixlib=rb-4.0.3&w=400&h=500&fit=crop&crop=entropy', caption: 'Gulmarg city' },
        'pahalgam': { image: 'https://images.unsplash.com/photo-1627889615925-56037b304313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYWhhbGdhbSUyMHZhbGxleSUyMHJpdmVyfGVufDB8fHx8MTc2MzcyMjk4OXww&ixlib=rb-4.1.0&q=80&w=400&h=500&fit=crop&crop=entropy', caption: 'Pahalgam city' },
      };
      return {
        name: cityName,
        cityId: cityId,
        image: cityImages[cityId]?.image || `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: cityImages[cityId]?.caption || `${cityName} city`
      };
    });

    const jnkAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'jammu-and-kashmir');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {jnkCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Jammu &amp; Kashmir</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Often called 'Paradise on Earth', Jammu &amp; Kashmir is renowned for its breathtaking landscapes, snow-capped mountains, serene lakes, and lush valleys. From the iconic Dal Lake in Srinagar to the world-class ski slopes of Gulmarg, it's a destination that captivates every traveler.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">April to October</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">6-7 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {jnkHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Destinations</h2>
            <p className="mt-2 text-muted-foreground">From the jewel of Srinagar to the meadows of Gulmarg.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {jnkCities.map(city => (
                <Link href={`/states/jammu-and-kashmir/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Jammu &amp; Kashmir</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {jnkAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in Jammu &amp; Kashmir
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

  if (stateId === 'uttarakhand') {
    const uttarakhandCarouselImages = [
        { src: 'https://images.unsplash.com/photo-1678788166239-b28733f56956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxSaXNoaWtlc2glMjBjaXR5fGVufDB8fHx8MTc2MzY5MjUzMHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Rishikesh, Uttarakhand', 'data-ai-hint': 'rishikesh ganges river' },
        { src: 'https://images.unsplash.com/photo-1609309582553-547a357b95bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxOYWluaXRhbCUyMGNpdHl8ZW58MHx8fHwxNzYzNjkyNTMwfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Nainital Lake', 'data-ai-hint': 'nainital lake boats' },
        { src: 'https://images.unsplash.com/photo-1605703975549-3544a3a69634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhdWxpJTIwc2tpaW5nJTIwc25vd3xlbnwwfHx8fDE3NjM2OTI1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Auli Ski Resort', 'data-ai-hint': 'auli skiing snow' }
    ];

    const uttarakhandHighlights = [
        { icon: Hand, text: 'Pilgrimage Sites', color: 'text-orange-500' },
        { icon: Flower, text: 'Yoga &amp; Wellness', color: 'text-green-500' },
        { icon: Mountain, text: 'Himalayan Treks', color: 'text-sky-600' },
    ];
    
    const uttarakhandCities = ['Rishikesh', 'Nainital', 'Mussoorie', 'Dehradun'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      const cityImages: { [key: string]: { image: string, caption: string } } = {
        'rishikesh': { image: 'https://images.unsplash.com/photo-1678788166239-b28733f56956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxSaXNoaWtlc2glMjBjaXR5fGVufDB8fHx8MTc2MzY5MjUzMHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Rishikesh city' },
        'nainital': { image: 'https://images.unsplash.com/photo-1609309582553-547a357b95bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxOYWluaXRhbCUyMGNpdHl8ZW58MHx8fHwxNzYzNjkyNTMwfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Nainital city' },
        'mussoorie': { image: 'https://images.unsplash.com/photo-1612763855876-b2f0bbaa89fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxNdXNzb29yaWUlMjBjaXR5fGVufDB8fHx8MTc2MzY5MjUzMHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Mussoorie city' },
        'dehradun': { image: 'https://images.unsplash.com/photo-1658316342181-1b90e17734ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxEZWhyYWR1biUyMGNpdHl8ZW58MHx8fHwxNzYzNjkyNTMwfDA&ixlib-rb-4.1.0&q=80&w=1080', caption: 'Dehradun city' },
      };
      return {
        name: cityName,
        cityId: cityId,
        image: cityImages[cityId]?.image || `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: cityImages[cityId]?.caption || `${cityName} city`
      };
    });

    const uttarakhandAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'uttarakhand');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {uttarakhandCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Uttarakhand</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Known as 'Devbhumi' or the 'Land of the Gods', Uttarakhand is a Himalayan paradise renowned for its Hindu pilgrimage sites, stunning natural beauty, and thrilling adventure activities. From the spiritual banks of the Ganges in Rishikesh to the serene lakes of Nainital, the state offers a journey of both soul and adrenaline.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">March-April &amp; Sep-Oct</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">5-7 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {uttarakhandHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Cities</h2>
            <p className="mt-2 text-muted-foreground">From the Yoga Capital to the Queen of Hills.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {uttarakhandCities.map(city => (
                <Link href={`/states/uttarakhand/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Uttarakhand</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {uttarakhandAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-40 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in Uttarakhand
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

  if (stateId === 'himachal-pradesh') {
    const himachalCarouselImages = [
        { src: 'https://images.unsplash.com/photo-1712753849140-7e8e96f8816f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzaGltbGElMjBjaXR5fGVufDB8fHx8MTc2MzcyMDY4MXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Shimla, Himachal Pradesh', 'data-ai-hint': 'shimla city' },
        { src: 'https://images.unsplash.com/photo-1677820915317-b5e5174c1f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtYW5hbGklMjB2YWxsZXklMjBzbm93fGVufDB8fHx8MTc2MzcyMDY4MXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Solang Valley, Manali', 'data-ai-hint': 'manali valley snow' },
        { src: 'https://images.unsplash.com/photo-1693745559025-75658021a07f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxyb2h0YW5nJTIwcGFzcyUyMG1vdW50YWluc3xlbnwwfHx8fDE3NjM3MjA2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Rohtang Pass', 'data-ai-hint': 'rohtang pass mountains' }
    ];

    const himachalHighlights = [
        { icon: Mountain, text: 'Himalayan Views', color: 'text-sky-500' },
        { icon: Zap, text: 'Adventure Sports', color: 'text-orange-500' },
        { icon: TreePine, text: 'Pine Forests', color: 'text-green-600' },
    ];
    
    const himachalCities = ['Shimla', 'Manali', 'Dharamshala', 'Dalhousie'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      const cityImages: { [key: string]: { image: string, caption: string } } = {
          'shimla': { image: 'https://images.unsplash.com/photo-1609948545248-b4f2b2054f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8U2hpbWxhJTIwY2l0eXxlbnwwfHx8fDE3NjM3MjA2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Shimla city' },
          'manali': { image: 'https://images.unsplash.com/photo-1713981272299-355d7038d708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxNYW5hbGklMjBjaXR5fGVufDB8fHx8MTc2MzcyMDY4MXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Manali city' },
          'dharamshala': { image: 'https://images.unsplash.com/photo-1609410065485-332392feb93b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxEaGFyYW1zaGFsYSUyMGNpdHl8ZW58MHx8fHwxNzYzNzIwNjgxfDA&ixlib-rb-4.1.0&q=80&w=1080', caption: 'Dharamshala city' },
          'dalhousie': { image: 'https://images.unsplash.com/photo-1647678033475-ebe67c799487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxEYWxob3VzaWUlMjBjaXR5fGVufDB8fHx8MTc2MzcyMDY4MXww&ixlib-rb-4.1.0&q=80&w=1080', caption: 'Dalhousie city' },
      };
      return {
        name: cityName,
        cityId: cityId,
        image: cityImages[cityId]?.image || `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: cityImages[cityId]?.caption || `${cityName} city`
      };
    });

    const himachalAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'himachal-pradesh');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {himachalCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Himachal Pradesh</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Nestled in the Himalayas, Himachal Pradesh is a paradise for nature lovers, adventurers, and peace seekers. From the colonial charm of Shimla to the adventurous hub of Manali, the state offers snow-capped mountains, lush valleys, and serene monasteries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">April to June &amp; Sept to Nov</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">5-6 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {himachalHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Cities</h2>
            <p className="mt-2 text-muted-foreground">From the Queen of Hills to the Valley of Gods.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {himachalCities.map(city => (
                <Link href={`/states/himachal-pradesh/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Himachal Pradesh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {himachalAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-40 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in Himachal Pradesh
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

  if (stateId === 'uttar-pradesh') {
    const upCarouselImages = [
        { src: 'https://images.unsplash.com/photo-1599309199147-e2343c3a4ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyZXNlbWJsaW5nJTIwYXJjaGl0ZWN0dXJlJTIwb2YlMjBMdWNrbm93fGVufDB8fHx8MTc2MzcxMTQwNnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Bara Imambara, Lucknow', 'data-ai-hint': 'lucknow architecture' },
        { src: 'https://images.unsplash.com/photo-1601618237569-e380f25dc289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx2YXJhbmFzaSUyMGNpdHl8ZW58MHx8fHwxNzYzNzExMzkyfDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Ghats of Varanasi', 'data-ai-hint': 'varanasi ghats' },
        { src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxUYWolMjBNYWhhbHxlbnwwfHx8fDE3NjM3MTE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Taj Mahal, Agra', 'data-ai-hint': 'taj mahal' },
    ];

    const upHighlights = [
        { icon: Landmark, text: 'Iconic Monuments', color: 'text-amber-600' },
        { icon: Sailboat, text: 'Spiritual Ghats', color: 'text-sky-500' },
        { icon: Utensils, text: 'Mughal Cuisine', color: 'text-green-500' },
    ];
    
    const upCities = ['Agra', 'Varanasi', 'Lucknow', 'Prayagraj', 'Mathura'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      const cityImages: { [key: string]: { image: string, caption: string } } = {
          'agra': { image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhZ3JhJTIwY2l0eXxlbnwwfHx8fDE3NjM3MTEzOTJ8MA&ixlib-rb-4.1.0&q=80&w=1080', caption: 'Agra city' },
          'varanasi': { image: 'https://images.unsplash.com/photo-1601618237569-e380f25dc289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx2YXJhbmFzaSUyMGNpdHl8ZW58MHx8fHwxNzYzNzExMzkyfDA&ixlib-rb-4.1.0&q=80&w=1080', caption: 'Varanasi city' },
          'lucknow': { image: 'https://images.unsplash.com/photo-1599309199147-e2343c3a4ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyZXNlbWJsaW5nJTIwYXJjaGl0ZWN0dXJlJTIwb2YlMjBMdWNrbm93fGVufDB8fHx8MTc2MzcxMTQwNnww&ixlib-rb-4.1.0&q=80&w=1080', caption: 'Lucknow city' },
          'prayagraj': { image: 'https://images.unsplash.com/photo-1627449552179-880145c4a03c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcmF5YWdyYWolMjBjaXR5fGVufDB8fHx8MTc2MzcxMTM5Mnww&ixlib-rb-4.1.0&q=80&w=1080', caption: 'Prayagraj city' },
          'mathura': { image: 'https://images.unsplash.com/photo-1621785536417-8903c7395026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXRodXJhJTIwY2l0eXxlbnwwfHx8fDE3NjM3MTEzOTN8MA&ixlib-rb-4.1.0&q=80&w=1080', caption: 'Mathura city' },
      };
      return {
        name: cityName,
        cityId: cityId,
        image: cityImages[cityId]?.image || `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: cityImages[cityId]?.caption || `${cityName} city`
      };
    });

    const upAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'uttar-pradesh');
    
    return (
      <div>
        <div className="w-full mb-12">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {upCarouselImages.map((image, index) => (
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
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Uttar Pradesh</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The heartland of India, Uttar Pradesh is a land of ancient history, deep spirituality, and architectural marvels. Home to the iconic Taj Mahal, the sacred ghats of Varanasi, and the nawabi culture of Lucknow, UP offers a journey through the soul of India.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto my-12">
            <Card className="text-center"><CardContent className="p-4"><Calendar className="mx-auto mb-2 h-8 w-8 text-sky-500" /><h3 className="font-semibold">Best Time to Visit</h3><p className="text-sm text-muted-foreground">October to March</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><Clock className="mx-auto mb-2 h-8 w-8 text-green-500" /><h3 className="font-semibold">Ideal Duration</h3><p className="text-sm text-muted-foreground">6-7 Days</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><PackageIcon className="mx-auto mb-2 h-8 w-8 text-orange-500" /><h3 className="font-semibold">Holiday Packages</h3><p className="text-sm text-muted-foreground">View Packages</p></CardContent></Card>
            <Card className="text-center"><CardContent className="p-4"><HotelIcon className="mx-auto mb-2 h-8 w-8 text-red-500" /><h3 className="font-semibold">Top Hotels</h3><p className="text-sm text-muted-foreground">Find Hotels</p></CardContent></Card>
          </div>

          <div className="text-center my-16">
              <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8">Highlights</h2>
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                  {upHighlights.map(highlight => (
                      <div key={highlight.text} className="flex flex-col items-center gap-2">
                          <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                          <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="text-center my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue">Explore Major Cities</h2>
            <p className="mt-2 text-muted-foreground">From the romance of Agra to the spirituality of Varanasi.</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8">
              {upCities.map(city => (
                <Link href={`/states/uttar-pradesh/cities/${city.cityId}`} key={city.name}>
                  <Card className="overflow-hidden group relative">
                    <Image src={city.image} alt={city.caption} width={400} height={500} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" data-ai-hint={city.caption} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-headline text-2xl font-bold text-white">{city.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Uttar Pradesh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {upAttractions.map(attraction => (
                 <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                    <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-40 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{attraction.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{attraction.description}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">
              Top Hotels in Uttar Pradesh
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
  
  const rajasthanAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'rajasthan');


  const rajasthanCarouselImages = [
    {
      src: 'https://images.unsplash.com/photo-1617490215167-a09c31375d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBqYWwlMjBtYWhhbHxlbnwwfHx8fDE3NjM3MTE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Jal Mahal, Jaipur',
      'data-ai-hint': 'jaipur jal mahal'
    },
    {
      src: 'https://images.unsplash.com/photo-1603787723954-526419523277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxqZHB1ciUyMGNpdHklMjBmb3J0fGVufDB8fHx8MTc2MzcxMTQwNnww&ixlib-rb-4.1.0&q=80&w=1080',
      caption: 'Mehrangarh Fort, Jodhpur',
      'data-ai-hint': 'jodhpur fort city'
    },
    {
      src: 'https://images.unsplash.com/photo-1576722420637-9b45e9a464de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwbGFrZSUyMHBpY2hvbGF8ZW58MHx8fHwxNzYzNzExNDA2fDA&ixlib-rb-4.1.0&q=80&w=1080',
      caption: 'Lake Pichola, Udaipur',
      'data-ai-hint': 'udaipur lake pichola'
    }
  ];

  if (stateId === 'rajasthan') {
    return (
      <div>
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
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-brand-blue">Rajasthan</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The 'Land of Kings', Rajasthan is India's most vibrant and colorful state, a land of epic tales of valor, majestic forts, and opulent palaces. Journey through its golden Thar Desert on a camel safari, explore the bustling markets of the Pink City of Jaipur, the Blue City of Jodhpur, and the Golden City of Jaisalmer. Rajasthan is a living museum of rich history, folk culture, and royal grandeur that will leave you spellbound.
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
          
          <div className="my-16">
            <h2 className="text-3xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Rajasthan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {rajasthanAttractions.map(attraction => (
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
      src: 'https://images.unsplash.com/photo-1596620245148-384351235174?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxiYWdhJTIwYmVhY2glMjBjcm93ZHxlbnwwfHx8fDE3NjM2OTc3OTl8MA&ixlib=rb-4.0.3&w=1080&h=720&fit=crop&crop=entropy',
      caption: 'Baga Beach, Goa',
      'data-ai-hint': 'baga beach crowd'
    },
    {
      src: 'https://images.unsplash.com/photo-1570194883446-a3c3c7340c49?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnb2ElMjBiZWFjaCUyMHNoYWNrc3xlbnwwfHx8fDE3NjM2OTc3OTl8MA&ixlib=rb-4.0.3&w=1080&h=720&fit=crop&crop=entropy',
      caption: 'A beach party in Goa',
      'data-ai-hint': 'goa nightlife party'
    },
    {
      src: 'https://images.unsplash.com/photo-1620336292023-0622c815777a?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxnb2ElMjBjaHVyY2glMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzYzNzAyMjgxfDA&ixlib=rb-4.0.3&w=1080&h=720&fit=crop&crop=entropy',
      caption: 'Basilica of Bom Jesus, Old Goa',
      'data-ai-hint': 'goa church architecture'
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
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxHb2F8ZW58MHx8fHwxNzYzNzAyMjgxfDA&ixlib=rb-4.0.3&w=400&h=500&fit=crop&crop=entropy',
      caption: 'North Goa beach'
    },
    {
      name: 'South Goa',
      slug: 'south-goa',
      image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGdvYSUyMHBlYWNlZnVsJTIwYmVhY2h8ZW58MHx8fHwxNzYzNjk3Nzk5fDA&ixlib=rb-4.0.3&w=400&h=500&fit=crop&crop=entropy',
      caption: 'South Goa peaceful beach'
    },
  ];

  const goaAttractions = (attractions as Attraction[]).filter(a => a.stateId === 'goa');

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
                                    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
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

    

    

    




    

