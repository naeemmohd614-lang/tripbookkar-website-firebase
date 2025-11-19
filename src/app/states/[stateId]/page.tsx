
'use client';
import { states, hotels, cities as allCities, attractions } from '@/lib/data';
import { notFound, useParams }from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Users, Calendar, Clock, Package as PackageIcon, Hotel as HotelIcon, Castle, Sun, Landmark, MapPin, Waves, Martini, Zap, Leaf, Utensils, Sailboat, Building, Mountain, Users2, ShieldCheck, TreePine, Church, Star, ShoppingBag, Paintbrush, Music, HeartPulse, SwatchBook, Bell, Hand, Flower, CableCar, Sprout, BookOpen, Cat } from 'lucide-react';
import type { State, Hotel, City, Attraction } from '@/lib/types';
import HotelCard from '@/components/hotel-card';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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

    const wbAttractions = (attractions as Attraction[]).filter(a => a.city === 'Kolkata' || a.city === 'Darjeeling');
    
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

    const sikkimAttractions = (attractions as Attraction[]).filter(a => a.city === 'Gangtok' || a.city === 'Pelling' || a.city === 'Namchi');
    
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
        { src: 'https://picsum.photos/seed/jnk-carousel-1/1200/600', caption: 'Dal Lake, Srinagar', 'data-ai-hint': 'srinagar dal lake' },
        { src: 'https://picsum.photos/seed/jnk-carousel-2/1200/600', caption: 'Gulmarg in snow', 'data-ai-hint': 'gulmarg snow mountains' },
        { src: 'https://picsum.photos/seed/jnk-carousel-3/1200/600', caption: 'Pahalgam Valley', 'data-ai-hint': 'pahalgam valley river' }
    ];

    const jnkHighlights = [
        { icon: Sailboat, text: 'Shikara Rides', color: 'text-sky-500' },
        { icon: Mountain, text: 'Snow-clad Peaks', color: 'text-blue-500' },
        { icon: Flower, text: 'Lush Valleys', color: 'text-green-500' },
    ];
    
    const jnkCities = ['Srinagar', 'Gulmarg', 'Pahalgam'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      return {
        name: cityName,
        cityId: cityId,
        image: `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: `${cityName} city`
      };
    });

    const jnkAttractions = (attractions as Attraction[]).filter(a => a.city === 'Srinagar' || a.city === 'Gulmarg');
    
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
        { src: 'https://picsum.photos/seed/uttarakhand-carousel-1/1200/600', caption: 'Rishikesh, Uttarakhand', 'data-ai-hint': 'rishikesh ganges river' },
        { src: 'https://picsum.photos/seed/uttarakhand-carousel-2/1200/600', caption: 'Nainital Lake', 'data-ai-hint': 'nainital lake boats' },
        { src: 'https://picsum.photos/seed/uttarakhand-carousel-3/1200/600', caption: 'Auli Ski Resort', 'data-ai-hint': 'auli skiing snow' }
    ];

    const uttarakhandHighlights = [
        { icon: Hand, text: 'Pilgrimage Sites', color: 'text-orange-500' },
        { icon: Flower, text: 'Yoga &amp; Wellness', color: 'text-green-500' },
        { icon: Mountain, text: 'Himalayan Treks', color: 'text-sky-600' },
    ];
    
    const uttarakhandCities = ['Rishikesh', 'Nainital', 'Mussoorie', 'Dehradun'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      return {
        name: cityName,
        cityId: cityId,
        image: `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: `${cityName} city`
      };
    });

    const uttarakhandAttractions = (attractions as Attraction[]).filter(a => a.city === 'Rishikesh' || a.city === 'Nainital');
    
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
        { src: 'https://picsum.photos/seed/himachal-carousel-1/1200/600', caption: 'Shimla, Himachal Pradesh', 'data-ai-hint': 'shimla city' },
        { src: 'https://picsum.photos/seed/himachal-carousel-2/1200/600', caption: 'Solang Valley, Manali', 'data-ai-hint': 'manali valley snow' },
        { src: 'https://picsum.photos/seed/himachal-carousel-3/1200/600', caption: 'Rohtang Pass', 'data-ai-hint': 'rohtang pass mountains' }
    ];

    const himachalHighlights = [
        { icon: Mountain, text: 'Himalayan Views', color: 'text-sky-500' },
        { icon: Zap, text: 'Adventure Sports', color: 'text-orange-500' },
        { icon: TreePine, text: 'Pine Forests', color: 'text-green-600' },
    ];
    
    const himachalCities = ['Shimla', 'Manali', 'Dharamshala', 'Dalhousie'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      return {
        name: cityName,
        cityId: cityId,
        image: `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: `${cityName} city`
      };
    });

    const himachalAttractions = (attractions as Attraction[]).filter(a => a.city === 'Shimla' || a.city === 'Manali');
    
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
        { src: 'https://images.unsplash.com/photo-1654057892249-c2cf38a50ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8THVja25vdyUyMHxlbnwwfHx8fDE3NjM1MjgyNDh8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'Bara Imambara, Lucknow', 'data-ai-hint': 'lucknow architecture' },
        { src: 'https://picsum.photos/seed/up-carousel-2/1200/600', caption: 'Ghats of Varanasi', 'data-ai-hint': 'varanasi ghats' },
        { src: 'https://picsum.photos/seed/up-carousel-3/1200/600', caption: 'Taj Mahal, Agra', 'data-ai-hint': 'taj mahal' },
    ];

    const upHighlights = [
        { icon: Landmark, text: 'Iconic Monuments', color: 'text-amber-600' },
        { icon: Sailboat, text: 'Spiritual Ghats', color: 'text-sky-500' },
        { icon: Utensils, text: 'Mughal Cuisine', color: 'text-green-500' },
    ];
    
    const upCities = ['Agra', 'Varanasi', 'Lucknow'].map(cityName => {
      const city = (allCities as City[]).find(c => c.name === cityName);
      const cityId = city ? city.cityId : slugify(cityName);
      return {
        name: cityName,
        cityId: cityId,
        image: `https://picsum.photos/seed/city-${cityId}/400/500`,
        caption: `${cityName} city`
      };
    });

    const upAttractions = (attractions as Attraction[]).filter(a => a.city === 'Agra' || a.city === 'Varanasi');
    
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
  
  const rajasthanAttractions = (attractions as Attraction[]).filter(a => a.city === 'Jaipur' || a.city === 'Jodhpur' || a.city === 'Udaipur');


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
