

'use client';
import { cities, hotels, states, attractions } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import type { City, Hotel, State, Attraction } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Castle, ShoppingBag, Star, Utensils, MapPin, Building, Waves, Paintbrush, Sun, Sailboat, Music, Zap, Landmark, Leaf } from 'lucide-react';
import Link from 'next/link';
import HotelCard from '@/components/hotel-card';

// Helper function to create a slug
function slugify(text: string) {
    if (!text) return '';
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function CityPage() {
  const params = useParams();
  const stateId = params.stateId as string;
  const cityId = params.cityId as string;

  const state = (states as State[]).find((s) => s.stateId === stateId);
  const city = (cities as City[]).find((c) => c.cityId === cityId);

  if (!state || !city) {
    notFound();
  }

  const cityHotels = (hotels as Hotel[]).filter(
    (hotel) => hotel.cityId === cityId
  );
  
  const heroImage = {
      "src": `https://picsum.photos/seed/city-${cityId}/1920/600`,
      "caption": `panoramic view of ${city.name}`
  };
  
  if (cityId === 'jaipur') {
     const jaipurHeroImage = {
        "src": "https://images.unsplash.com/photo-1599661046223-140c147242da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxqYWwlMjBtYWhhbCUyMGphaXB1cnxlbnwwfHx8fDE3NjM0NTU2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "caption": "jal mahal jaipur"
    };

    const jaipurHighlights = [
        { icon: Star, text: 'The Pink City', color: 'text-pink-500' },
        { icon: Castle, text: 'Royal Forts & Palaces', color: 'text-orange-500' },
        { icon: ShoppingBag, text: 'Vibrant Bazaars', color: 'text-sky-500' },
        { icon: Utensils, text: 'Rich Culinary Heritage', color: 'text-green-500' },
    ];

    const jaipurAttractions: Attraction[] = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'jaipur');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image
                    src={jaipurHeroImage.src}
                    alt={`A scenic view of ${city.name}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={jaipurHeroImage.caption}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Jaipur</h1>
                    <p className="text-lg text-gray-200 mt-2">The vibrant heart of Rajasthan</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to {state.name}
                        </Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Jaipur</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Jaipur, the capital of Rajasthan, is a city that effortlessly blends the old and the new. Famously known as the 'Pink City' due to the distinct color of its buildings, it was founded in 1727 by Maharaja Sawai Jai Singh II. A delight for shoppers, foodies, and history buffs alike, the city is a treasure trove of majestic forts, opulent palaces, vibrant bazaars, and delectable cuisine.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        {jaipurHighlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full">
                                        <Icon className={`h-8 w-8 ${highlight.color}`} />
                                    </div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Jaipur</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {jaipurAttractions.map(attraction => (
                            <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                                <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                                    </CardHeader>
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
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                     {cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (
                            <HotelCard key={hotel.hotelId} hotel={hotel} />
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this city yet.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'jodhpur') {
    const jodhpurHeroImage = {
       src: 'https://picsum.photos/seed/jodhpur-hero/1920/600',
       caption: 'mehrangarh fort jodhpur'
    };

    const jodhpurHighlights = [
        { icon: Paintbrush, text: 'The Blue City', color: 'text-blue-500' },
        { icon: Castle, text: 'Majestic Fort', color: 'text-orange-500' },
        { icon: ShoppingBag, text: 'Antique Markets', color: 'text-sky-500' },
        { icon: Utensils, text: 'Spicy Delicacies', color: 'text-red-500' },
    ];

    const jodhpurAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'jodhpur');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={jodhpurHeroImage.src} alt="Panoramic view of Jodhpur, the Blue City" fill className="object-cover" priority data-ai-hint={jodhpurHeroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Jodhpur</h1>
                    <p className="text-lg text-gray-200 mt-2">The Sun City of Rajasthan</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Jodhpur</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Jodhpur, famously known as the 'Blue City', is a historic city in Rajasthan. It's dominated by the mighty Mehrangarh Fort, which looms over the city's blue-painted houses. Jodhpur offers a rich tapestry of history, culture, and cuisine, from its bustling old city bazaars to its magnificent palaces.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        {jodhpurHighlights.map(highlight => (
                            <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Jodhpur</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {jodhpurAttractions.map(attraction => (
                            <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                                <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg">{attraction.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>


                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                     {cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.hotelId} hotel={hotel} />))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'udaipur') {
    const udaipurHeroImage = {
       src: 'https://picsum.photos/seed/udaipur-hero/1920/600',
       caption: 'udaipur lake palace'
    };

    const udaipurHighlights = [
        { icon: Waves, text: 'City of Lakes', color: 'text-cyan-500' },
        { icon: Castle, text: 'Grand Palaces', color: 'text-amber-500' },
        { icon: Sailboat, text: 'Romantic Boat Rides', color: 'text-blue-500' },
        { icon: Paintbrush, text: 'Art & Culture', color: 'text-purple-500' },
    ];

    const udaipurAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'udaipur');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={udaipurHeroImage.src} alt="Udaipur Lake Palace view" fill className="object-cover" priority data-ai-hint={udaipurHeroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Udaipur</h1>
                    <p className="text-lg text-gray-200 mt-2">The Venice of the East</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Udaipur</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Often called the 'Venice of the East', Udaipur is renowned for its beautiful lakes, grand palaces, and romantic ambiance. Set around a series of artificial lakes and known for its lavish royal residences, the city is a jewel of Rajasthan.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        {udaipurHighlights.map(highlight => (
                            <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Udaipur</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {udaipurAttractions.map(attraction => (
                            <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                                <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg">{attraction.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                     {cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.hotelId} hotel={hotel} />))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'jaisalmer') {
    const jaisalmerHeroImage = {
       src: 'https://picsum.photos/seed/jaisalmer-hero/1920/600',
       caption: 'camel safari jaisalmer'
    };

    const jaisalmerHighlights = [
        { icon: Castle, text: 'The Golden Fort', color: 'text-yellow-500' },
        { icon: Sun, text: 'Desert Safari', color: 'text-orange-500' },
        { icon: Building, text: 'Ornate Havelis', color: 'text-amber-600' },
        { icon: Music, text: 'Folk Culture', color: 'text-red-500' },
    ];

    const jaisalmerAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'jaisalmer');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={jaisalmerHeroImage.src} alt="Camel safari in the Thar Desert near Jaisalmer" fill className="object-cover" priority data-ai-hint={jaisalmerHeroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Jaisalmer</h1>
                    <p className="text-lg text-gray-200 mt-2">The Golden City</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Jaisalmer</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                        Jaisalmer, the 'Golden City', is an exotic desert destination that seems to rise from the sands of the Thar Desert. Its centerpiece is the magnificent Jaisalmer Fort, a living fort with a bustling community within its walls. Discover ornate havelis, venture into the desert for a camel safari, and immerse yourself in the rich folk traditions of Rajasthan.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        {jaisalmerHighlights.map(highlight => (
                            <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Jaisalmer</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {jaisalmerAttractions.map(attraction => (
                            <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                                <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg">{attraction.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{attraction.city}</div>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                     {cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.hotelId} hotel={hotel} />))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }
  
  if (cityId === 'agra') {
    const heroImage = {
       src: 'https://picsum.photos/seed/agra-hero/1920/600',
       caption: 'taj mahal view'
    };

    const highlights = [
        { icon: Landmark, text: 'Taj Mahal', color: 'text-rose-500' },
        { icon: Castle, text: 'Mughal Forts', color: 'text-amber-600' },
        { icon: Utensils, text: 'Petha & Chaat', color: 'text-green-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'agra');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="A scenic view of the Taj Mahal" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Agra</h1>
                    <p className="text-lg text-gray-200 mt-2">The City of the Taj</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Agra</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                       Home to the iconic Taj Mahal, Agra is a city steeped in Mughal history. Situated on the banks of the Yamuna River, it boasts magnificent forts, grand mausoleums, and bustling markets, offering a glimpse into India's glorious past.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => (
                            <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Agra</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {cityAttractions.map(attraction => (
                            <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                                <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg">{attraction.name}</h3>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>


                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                     {cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.hotelId} hotel={hotel} />))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'varanasi') {
    const heroImage = {
       src: 'https://picsum.photos/seed/varanasi-hero/1920/600',
       caption: 'varanasi ghats at sunrise'
    };

    const highlights = [
        { icon: Sailboat, text: 'Sacred Ghats', color: 'text-sky-500' },
        { icon: Leaf, text: 'Spiritual Hub', color: 'text-green-500' },
        { icon: Utensils, text: 'Local Delicacies', color: 'text-orange-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'varanasi');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Varanasi ghats at sunrise" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Varanasi</h1>
                    <p className="text-lg text-gray-200 mt-2">The Spiritual Capital of India</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Varanasi</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      One of the world's oldest living cities, Varanasi (also known as Kashi or Benares) is a spiritual epicenter. Situated on the banks of the sacred River Ganges, it is a city of ancient temples, bustling ghats, and profound rituals that define the rhythm of life and death.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => (
                            <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Varanasi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {cityAttractions.map(attraction => (
                            <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                                <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                                    <CardHeader className="p-0">
                                        <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                                    </CardHeader>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg">{attraction.name}</h3>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>


                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                     {cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.hotelId} hotel={hotel} />))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }
  
  if (cityId === 'lucknow') {
    const heroImage = {
       src: 'https://picsum.photos/seed/lucknow-hero/1920/600',
       caption: 'bara imambara lucknow'
    };

    const highlights = [
        { icon: Landmark, text: 'Nawabi Architecture', color: 'text-amber-600' },
        { icon: Utensils, text: 'Awadhi Cuisine', color: 'text-red-500' },
        { icon: ShoppingBag, text: 'Chikankari Craft', color: 'text-purple-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'lucknow');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Bara Imambara in Lucknow" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Lucknow</h1>
                    <p className="text-lg text-gray-200 mt-2">The City of Nawabs</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Lucknow</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                       Lucknow, the 'City of Nawabs', is a bastion of culture, art, and history. Renowned for its gracious hospitality, exquisite Awadhi cuisine, and intricate Chikankari embroidery, the city is dotted with magnificent monuments from its Mughal and British past.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => (
                            <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                <div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {cityAttractions.length > 0 && 
                  <div className="my-16">
                      <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Lucknow</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {cityAttractions.map(attraction => (
                              <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}>
                                  <Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow">
                                      <CardHeader className="p-0">
                                          <Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} />
                                      </CardHeader>
                                      <CardContent className="p-4">
                                          <h3 className="font-bold text-lg">{attraction.name}</h3>
                                          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p>
                                      </CardContent>
                                  </Card>
                              </Link>
                          ))}
                      </div>
                  </div>
                }


                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                     {cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.hotelId} hotel={hotel} />))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3>
                            <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }

  // Fallback for other cities
  return (
    <div>
        <div className="relative h-64 md:h-80 w-full">
            <Image
                src={heroImage.src}
                alt={`A scenic view of ${city.name}`}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.caption}
            />
            <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">{city.name}</h1>
            </div>
        </div>
        <div className="container mx-auto px-4 py-12">
            <Card className="mb-12 shadow-lg -mt-24 relative z-10 max-w-4xl mx-auto">
                <CardContent className="p-6 flex justify-between items-center">
                    <div>
                        <CardTitle className="font-headline text-3xl text-brand-blue">{city.name}, {state.name}</CardTitle>
                        <CardDescription className="text-base pt-2">{city.description}</CardDescription>
                    </div>
                    <Button asChild variant="outline">
                        <Link href={`/states/${stateId}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to {state.name}
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <h2 className="text-3xl font-headline font-bold text-brand-blue mb-8 text-center">
                Hotels in {city.name}
            </h2>
            {cityHotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cityHotels.map((hotel) => (
                    <HotelCard key={hotel.hotelId} hotel={hotel} />
                ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this city yet.</h3>
                <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                </div>
            )}
        </div>
    </div>
  )
}
