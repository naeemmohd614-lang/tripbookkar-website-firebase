

'use client';
import { cities, states, attractions } from '@/lib/data';
import { notFound, useParams }from 'next/navigation';
import type { City, Hotel, State, Attraction } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Castle, ShoppingBag, Star, Utensils, MapPin, Building, Waves, Paintbrush, Sun, Sailboat, Music, Zap, Landmark, Leaf, Mountain, TreePine, Church, Hand, Flower, Droplets, FerrisWheel, School, BookOpen, CableCar, Sprout, Cat, Train, Palmtree, Wind, Ship, Users2, ShieldCheck, HeartPulse, Drama, CookingPot, Diamond, ShoppingBasket, Anchor, Compass } from 'lucide-react';
import Link from 'next/link';
import HotelCard from '@/components/hotel-card';
import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';


// Helper function to create a slug
function slugify(text: string) {
    if (!text) return '';
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export default function CityPage() {
  const params = useParams();
  const stateId = params.stateId as string;
  const cityId = params.cityId as string;

  const firestore = useFirestore();

  const state = (states as State[]).find((s) => s.stateId === stateId);
  const city = (cities as City[]).find((c) => c.cityId === cityId);

  if (!state || !city) {
    notFound();
  }

  const cityHotelsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'hotels'), where('cityId', '==', cityId));
  }, [firestore, cityId]);

  const { data: cityHotels, isLoading } = useCollection<Hotel>(cityHotelsQuery);
  
  const heroImage = {
      "src": `https://picsum.photos/seed/city-${cityId}/1920/600`,
      "caption": `panoramic view of ${city.name}`
  };

  if (cityId === 'surat') {
    const heroImage = { src: 'https://picsum.photos/seed/surat-hero/1920/600', caption: 'tapi river surat' };
    const highlights = [ { icon: Diamond, text: 'Diamond Hub', color: 'text-sky-500' }, { icon: ShoppingBasket, text: 'Textile Market', color: 'text-orange-500' }, { icon: Utensils, text: 'Street Food', color: 'text-red-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'surat');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Tapi Riverfront in Surat" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Surat</h1>
                    <p className="text-lg text-gray-200 mt-2">The Diamond City of India</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Surat</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Surat, a major commercial hub in Gujarat, is renowned globally as the 'Diamond City' for its massive diamond cutting and polishing industry. It's also a powerhouse in textiles. Beyond its industries, Surat is a city for food lovers, famous for its unique street food culture.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Surat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'ahmedabad') {
    const heroImage = { src: 'https://picsum.photos/seed/ahmedabad-hero/1920/600', caption: 'sabarmati riverfront ahmedabad' };
    const highlights = [ { icon: Landmark, text: 'Heritage City', color: 'text-orange-500' }, { icon: BookOpen, text: 'Textile Hub', color: 'text-sky-500' }, { icon: Utensils, text: 'Foodie Paradise', color: 'text-red-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'ahmedabad');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Sabarmati Riverfront, Ahmedabad" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Ahmedabad</h1>
                    <p className="text-lg text-gray-200 mt-2">India's First UNESCO World Heritage City</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Ahmedabad</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Ahmedabad, the largest city in Gujarat, is a vibrant blend of history and modernity. From the tranquil Sabarmati Ashram to the bustling old city, a UNESCO World Heritage site, it's a hub of culture, textiles, and delectable street food.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Ahmedabad</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'kutch') {
    const heroImage = { src: 'https://picsum.photos/seed/kutch-hero/1920/600', caption: 'white rann of kutch full moon' };
    const highlights = [ { icon: Sun, text: 'White Desert', color: 'text-sky-500' }, { icon: Drama, text: 'Rann Utsav', color: 'text-orange-500' }, { icon: Hand, text: 'Rich Handicrafts', color: 'text-pink-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'kutch');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="The Great Rann of Kutch" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Kutch</h1>
                    <p className="text-lg text-gray-200 mt-2">The Land of White Sands</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Kutch</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Kutch is a land of contrasts, famous for its vast white salt desert, the Great Rann of Kutch. It is a hub of vibrant culture, intricate handicrafts, and the spectacular Rann Utsav festival, which celebrates the region's unique spirit.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Kutch</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'dwarka') {
    const heroImage = { src: 'https://picsum.photos/seed/dwarka-hero/1920/600', caption: 'dwarkadhish temple gomti river' };
    const highlights = [ { icon: Landmark, text: "Krishna's Kingdom", color: 'text-blue-500' }, { icon: Hand, text: 'Major Pilgrimage', color: 'text-orange-500' }, { icon: Anchor, text: 'Coastal Town', color: 'text-teal-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'dwarka');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Dwarkadhish Temple at Gomti Ghat" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Dwarka</h1>
                    <p className="text-lg text-gray-200 mt-2">The Kingdom of Lord Krishna</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Dwarka</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">One of the foremost Chardham pilgrimage sites, Dwarka is an ancient city believed to have been the capital of Lord Krishna's kingdom. It is home to the revered Dwarkadhish Temple, a stunning example of Chalukyan architecture.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Dwarka</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'somnath') {
    const heroImage = { src: 'https://picsum.photos/seed/somnath-hero/1920/600', caption: 'somnath temple evening' };
    const highlights = [ { icon: Landmark, text: 'First Jyotirlinga', color: 'text-amber-500' }, { icon: Waves, text: 'Arabian Sea', color: 'text-sky-500' }, { icon: Hand, text: 'Sacred Site', color: 'text-orange-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'somnath');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Somnath Temple at sunset" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Somnath</h1>
                    <p className="text-lg text-gray-200 mt-2">The Shrine Eternal</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Somnath</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Somnath is a major pilgrimage site, home to the first of the twelve Jyotirlinga shrines of Lord Shiva. The temple, located on the shores of the Arabian Sea, has been destroyed and rebuilt several times, standing as a testament to resilience and faith.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Somnath</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }
  
  if (cityId === 'kevadia') {
    const heroImage = { src: 'https://picsum.photos/seed/kevadia-hero/1920/600', caption: 'statue of unity aerial' };
    const highlights = [ { icon: Landmark, text: "World's Tallest Statue", color: 'text-orange-500' }, { icon: Compass, text: 'Integrated Development', color: 'text-sky-500' }, { icon: Zap, text: 'Tourist Hub', color: 'text-green-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'kevadia');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Aerial view of the Statue of Unity" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Kevadia</h1>
                    <p className="text-lg text-gray-200 mt-2">Home to the Statue of Unity</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Kevadia</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Kevadia has transformed into a world-class tourist destination, centered around the magnificent Statue of Unity. It's a model of integrated development, offering a diverse range of attractions including themed gardens, a jungle safari, river rafting, and much more.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Kevadia</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'kolkata') {
    const heroImage = { src: 'https://picsum.photos/seed/kolkata-hero/1920/600', caption: 'howrah bridge kolkata night' };
    const highlights = [ { icon: BookOpen, text: 'Cultural Capital', color: 'text-purple-500' }, { icon: Landmark, text: 'Colonial Architecture', color: 'text-amber-600' }, { icon: Utensils, text: 'Street Food Haven', color: 'text-red-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'kolkata');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Howrah Bridge at night, Kolkata" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Kolkata</h1>
                    <p className="text-lg text-gray-200 mt-2">The City of Joy</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Kolkata</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">India's former capital, Kolkata is a city of contrasts, where grand colonial architecture coexists with bustling markets and a rich intellectual and cultural heritage. From its iconic Howrah Bridge to its vibrant street food scene, the city is a feast for the senses.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Kolkata</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'darjeeling') {
    const heroImage = { src: 'https://picsum.photos/seed/darjeeling-hero/1920/600', caption: 'darjeeling tea estate' };
    const highlights = [ { icon: Leaf, text: 'Tea Gardens', color: 'text-green-500' }, { icon: Mountain, text: 'Kanchenjunga View', color: 'text-sky-500' }, { icon: Train, text: 'Toy Train', color: 'text-red-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'darjeeling');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Darjeeling Tea Gardens" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Darjeeling</h1>
                    <p className="text-lg text-gray-200 mt-2">The Queen of the Hills</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Darjeeling</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Famous for its rolling tea plantations, colonial-era architecture, and the charming Darjeeling Himalayan Railway (Toy Train), this hill station offers stunning views of the world's third-highest mountain, Kanchenjunga.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Darjeeling</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'siliguri') {
    const heroImage = { src: 'https://picsum.photos/seed/siliguri-hero/1920/600', caption: 'siliguri mahananda river' };
    const highlights = [ { icon: Zap, text: 'Gateway to Northeast', color: 'text-blue-500' }, { icon: ShoppingBag, text: 'Bustling Markets', color: 'text-orange-500' }, { icon: Leaf, text: 'Nearby Nature Parks', color: 'text-green-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'siliguri');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Mahananda River in Siliguri" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Siliguri</h1>
                    <p className="text-lg text-gray-200 mt-2">The Gateway to the Himalayas</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Siliguri</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Located at the foothills of the Himalayas, Siliguri is a bustling commercial hub and a crucial gateway to Darjeeling, Sikkim, and the northeastern states. It offers a mix of urban energy and natural beauty with its proximity to wildlife sanctuaries and tea gardens.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                {cityAttractions.length > 0 &&
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Siliguri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                }
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'kalimpong') {
    const heroImage = { src: 'https://picsum.photos/seed/kalimpong-hero/1920/600', caption: 'kalimpong valley view' };
    const highlights = [ { icon: Landmark, text: 'Buddhist Monasteries', color: 'text-orange-500' }, { icon: Flower, text: 'Flower Nurseries', color: 'text-pink-500' }, { icon: Mountain, text: 'Panoramic Views', color: 'text-sky-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'kalimpong');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="View of Kalimpong valley" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Kalimpong</h1>
                    <p className="text-lg text-gray-200 mt-2">A Serene Hill Station</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Kalimpong</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Perched on a ridge overlooking the Teesta River, Kalimpong is a quiet hill station known for its colonial-era buildings, Buddhist monasteries, and beautiful flower nurseries. It offers a peaceful atmosphere and stunning views of the Himalayas.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                {cityAttractions.length > 0 &&
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Kalimpong</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                }
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (
                            <HotelCard key={hotel.id} hotel={hotel} />
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
                        {jodhpurHighlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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
                        {udaipurHighlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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
                        {jaisalmerHighlights.map(highlight => {
                             const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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
                        {highlights.map(highlight => {
                             const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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
                        {highlights.map(highlight => {
                             const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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

  if (cityId === 'prayagraj') {
    const heroImage = {
       src: 'https://picsum.photos/seed/prayagraj-hero/1920/600',
       caption: 'triveni sangam prayagraj'
    };
    const highlights = [
        { icon: Users2, text: 'Kumbh Mela', color: 'text-orange-500' },
        { icon: Landmark, text: 'Historic Sites', color: 'text-amber-600' },
        { icon: ShieldCheck, text: 'Judicial Capital', color: 'text-blue-500' },
    ];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'prayagraj');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Triveni Sangam in Prayagraj" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Prayagraj</h1>
                    <p className="text-lg text-gray-200 mt-2">The Land of Confluence</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Prayagraj</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                       Formerly known as Allahabad, Prayagraj is a major pilgrimage center, famous for the Triveni Sangam, the holy confluence of the Ganga, Yamuna, and mythical Saraswati rivers. The city hosts the massive Kumbh Mela, attracting millions of devotees.
                    </p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Prayagraj</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link>))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'mathura') {
    const heroImage = { src: 'https://picsum.photos/seed/mathura-hero/1920/600', caption: 'krishna temple mathura' };
    const highlights = [
        { icon: Landmark, text: 'Birthplace of Krishna', color: 'text-blue-500' },
        { icon: Hand, text: 'Sacred Temples', color: 'text-orange-500' },
        { icon: Utensils, text: 'Famous Pedas', color: 'text-yellow-600' },
    ];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'mathura');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="A temple in Mathura" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Mathura</h1>
                    <p className="text-lg text-gray-200 mt-2">The Land of Lord Krishna</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Mathura</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      One of the seven sacred cities for Hindus, Mathura is revered as the birthplace of Lord Krishna. Located on the banks of the Yamuna, the city is dotted with temples and ghats, resonating with spiritual energy, especially during festivals like Janmashtami and Holi.
                    </p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Mathura</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  // Himachal Pages
  if (cityId === 'shimla') {
    const heroImage = {
       src: 'https://picsum.photos/seed/shimla-hero/1920/600',
       caption: 'shimla ridge view'
    };

    const highlights = [
        { icon: Landmark, text: 'Colonial Architecture', color: 'text-amber-600' },
        { icon: Mountain, text: 'Himalayan Views', color: 'text-sky-500' },
        { icon: ShoppingBag, text: 'Mall Road Shopping', color: 'text-purple-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'shimla');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="The Ridge, Shimla" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Shimla</h1>
                    <p className="text-lg text-gray-200 mt-2">The Queen of Hills</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Shimla</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                       The former summer capital of British India, Shimla is a charming hill station that exudes colonial-era grace. With its Victorian architecture, pedestrian-friendly Mall Road, and panoramic views of the surrounding Himalayas, Shimla is a perfect year-round destination.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Shimla</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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

  if (cityId === 'manali') {
    const heroImage = {
       src: 'https://picsum.photos/seed/manali-hero/1920/600',
       caption: 'solang valley paragliding'
    };

    const highlights = [
        { icon: Mountain, text: 'Snow-Capped Peaks', color: 'text-sky-500' },
        { icon: Zap, text: 'Adventure Sports', color: 'text-orange-500' },
        { icon: TreePine, text: 'Lush Valleys', color: 'text-green-600' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'manali');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Paragliding in Solang Valley, Manali" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Manali</h1>
                    <p className="text-lg text-gray-200 mt-2">Adventure Capital of Himachal</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Manali</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Nestled in the Beas River Valley, Manali is a high-altitude Himalayan resort town that's a magnet for adventure seekers and nature lovers. From skiing and paragliding in Solang Valley to trekking to ancient temples, Manali is a gateway to high-mountain adventure.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Manali</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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

  if (cityId === 'dharamshala') {
    const heroImage = {
       src: 'https://picsum.photos/seed/dharamshala-hero/1920/600',
       caption: 'dharamshala mountains cricket stadium'
    };

    const highlights = [
        { icon: Leaf, text: 'Spiritual Center', color: 'text-orange-500' },
        { icon: Mountain, text: 'Dhauladhar Views', color: 'text-sky-500' },
        { icon: Landmark, text: 'Tibetan Culture', color: 'text-purple-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'dharamshala');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="View of HPCA Stadium in Dharamshala" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Dharamshala</h1>
                    <p className="text-lg text-gray-200 mt-2">Home of the Dalai Lama</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Dharamshala</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                       Set against the majestic backdrop of the Dhauladhar mountain range, Dharamshala is a spiritual and serene destination. The upper part, McLeod Ganj, is famously known as the home of the Dalai Lama and the center of the Tibetan government-in-exile.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Dharamshala</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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

  if (cityId === 'dalhousie') {
    const heroImage = {
       src: 'https://picsum.photos/seed/dalhousie-hero/1920/600',
       caption: 'khajjiar dalhousie view'
    };

    const highlights = [
        { icon: Landmark, text: 'Colonial Charm', color: 'text-amber-600' },
        { icon: TreePine, text: 'Pine-Clad Valleys', color: 'text-green-600' },
        { icon: Mountain, text: 'Panoramic Views', color: 'text-sky-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'dalhousie');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Khajjiar, the 'Mini Switzerland of India' near Dalhousie" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Dalhousie</h1>
                    <p className="text-lg text-gray-200 mt-2">A Colonial-era Hill Station</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Dalhousie</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Named after Lord Dalhousie, this hill station is spread across five hills near the Dhauladhar mountain range. It's known for its pleasant climate, colonial-era architecture, and pine-clad valleys, offering a quiet and rejuvenating retreat.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Dalhousie</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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

  // Uttarakhand Pages
  if (cityId === 'rishikesh') {
    const heroImage = {
       src: 'https://picsum.photos/seed/rishikesh-hero/1920/600',
       caption: 'laxman jhula bridge rishikesh'
    };

    const highlights = [
        { icon: Leaf, text: 'Yoga Capital', color: 'text-green-500' },
        { icon: Waves, text: 'River Rafting', color: 'text-sky-500' },
        { icon: Hand, text: 'Spiritual Hub', color: 'text-orange-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'rishikesh');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Laxman Jhula bridge in Rishikesh" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Rishikesh</h1>
                    <p className="text-lg text-gray-200 mt-2">The Yoga Capital of the World</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Rishikesh</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                       Situated on the banks of the holy Ganges river, Rishikesh is a world-renowned center for yoga and meditation. This spiritual town is also a hub for adventure sports like white-water rafting, bungee jumping, and trekking, offering a unique blend of peace and thrill.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Rishikesh</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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

  if (cityId === 'nainital') {
    const heroImage = {
       src: 'https://picsum.photos/seed/nainital-hero/1920/600',
       caption: 'nainital lake aerial view'
    };

    const highlights = [
        { icon: Sailboat, text: 'Boating on Naini Lake', color: 'text-blue-500' },
        { icon: CableCar, text: 'Snow View Point Ropeway', color: 'text-sky-500' },
        { icon: ShoppingBag, text: 'Tibetan Market', color: 'text-purple-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'nainital');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Aerial view of Naini Lake in Nainital" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Nainital</h1>
                    <p className="text-lg text-gray-200 mt-2">The City of Lakes</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Nainital</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      A charming Himalayan lake town, Nainital is a popular hill station in the Kumaon region. Built around the emerald-green, crescent-shaped Naini Lake, it's a perfect destination for boating, trekking, and enjoying the cool mountain air.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Nainital</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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

  if (cityId === 'mussoorie') {
    const heroImage = {
       src: 'https://picsum.photos/seed/mussoorie-hero/1920/600',
       caption: 'mussoorie valley view'
    };

    const highlights = [
        { icon: Mountain, text: 'Himalayan Views', color: 'text-sky-500' },
        { icon: CableCar, text: 'Gun Hill Ropeway', color: 'text-purple-500' },
        { icon: Droplets, text: 'Kempty Falls', color: 'text-blue-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'mussoorie');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Valley view from Mussoorie" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Mussoorie</h1>
                    <p className="text-lg text-gray-200 mt-2">The Queen of the Hills</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Mussoorie</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Perched in the Garhwal Himalayan range, Mussoorie is a picturesque hill station that offers stunning views of the snow-capped peaks and the verdant Doon Valley. Its colonial-era charm, bustling Mall Road, and cascading waterfalls make it a timeless destination.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Mussoorie</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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

  if (cityId === 'dehradun') {
    const heroImage = {
       src: 'https://picsum.photos/seed/dehradun-hero/1920/600',
       caption: 'forest research institute dehradun'
    };

    const highlights = [
        { icon: School, text: 'Educational Hub', color: 'text-amber-600' },
        { icon: BookOpen, text: 'Institutes & Museums', color: 'text-sky-500' },
        { icon: FerrisWheel, text: 'Gateway to Hills', color: 'text-green-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'dehradun');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Forest Research Institute, Dehradun" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Dehradun</h1>
                    <p className="text-lg text-gray-200 mt-2">The Doon Valley</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Dehradun</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Nestled in the Doon Valley, Dehradun is the capital of Uttarakhand and a gateway to popular hill stations like Mussoorie. The city is renowned for its pleasant climate, picturesque setting, and as a center for prestigious educational and research institutions.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Dehradun</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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

  // J&K Pages
  if (cityId === 'srinagar') {
    const heroImage = {
       src: 'https://picsum.photos/seed/srinagar-hero/1920/600',
       caption: 'dal lake shikara'
    };

    const highlights = [
        { icon: Sailboat, text: 'Dal Lake', color: 'text-sky-500' },
        { icon: Flower, text: 'Mughal Gardens', color: 'text-pink-500' },
        { icon: ShoppingBag, text: 'Floating Markets', color: 'text-green-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'srinagar');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Shikara boats on Dal Lake, Srinagar" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Srinagar</h1>
                    <p className="text-lg text-gray-200 mt-2">The Jewel of Kashmir</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Srinagar</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Srinagar, the summer capital of Jammu and Kashmir, lies on the banks of the Jhelum River. It is famous for the serene Dal Lake, charming houseboats, and magnificent Mughal gardens. A city of unparalleled beauty, it's often referred to as 'Paradise on Earth'.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Srinagar</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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
  
  if (cityId === 'gulmarg') {
    const heroImage = {
       src: 'https://picsum.photos/seed/gulmarg-hero/1920/600',
       caption: 'gulmarg gondola snow'
    };

    const highlights = [
        { icon: CableCar, text: 'Gondola Ride', color: 'text-sky-500' },
        { icon: Mountain, text: 'Skiing & Snowboarding', color: 'text-blue-500' },
        { icon: Flower, text: 'Meadow of Flowers', color: 'text-green-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'gulmarg');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="View from Gulmarg Gondola" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Gulmarg</h1>
                    <p className="text-lg text-gray-200 mt-2">The Meadow of Flowers</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Gulmarg</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Gulmarg, meaning 'Meadow of Flowers', is a cup-shaped valley in the Pir Panjal Range. It's a premier hill resort and India’s top skiing destination. Famous for the Gulmarg Gondola, the highest cable car in the world, it offers unparalleled views and adventure.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Gulmarg</h3>
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
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
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
  
  if (cityId === 'pahalgam') {
    const heroImage = {
       src: 'https://picsum.photos/seed/pahalgam-hero/1920/600',
       caption: 'pahalgam betab valley'
    };

    const highlights = [
        { icon: Leaf, text: 'Valley of Shepherds', color: 'text-green-500' },
        { icon: Mountain, text: 'Pristine Landscapes', color: 'text-sky-500' },
        { icon: Hand, text: 'Base for Amarnath Yatra', color: 'text-orange-500' },
    ];

    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'pahalgam');

    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="View of Betaab Valley, Pahalgam" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Pahalgam</h1>
                    <p className="text-lg text-gray-200 mt-2">The Valley of Shepherds</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link>
                    </Button>
                </div>
                
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Pahalgam</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Pahalgam, the 'Valley of Shepherds', is a serene town on the banks of the Lidder River. Known for its pristine and untouched beauty, it's a paradise for nature lovers, trekkers, and those seeking tranquility. It also serves as the base for the annual Amarnath Yatra pilgrimage.
                    </p>
                </div>

                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => {
                            const Icon = highlight.icon;
                            return (
                                <div key={highlight.text} className="flex flex-col items-center text-center gap-3">
                                    <div className="bg-primary/10 p-4 rounded-full"><Icon className={`h-8 w-8 ${highlight.color}`} /></div>
                                    <p className="font-semibold text-muted-foreground">{highlight.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                     {cityHotels && cityHotels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h3 className="text-xl font-semibold text-muted-foreground">Hotels coming soon.</h3>
                            <p className="mt-2 text-muted-foreground">We are curating the best stays in Pahalgam. Check back later!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  }

  // Sikkim pages
  if (cityId === 'gangtok') {
    const heroImage = { src: 'https://picsum.photos/seed/gangtok-hero/1920/600', caption: 'gangtok city valley' };
    const highlights = [ { icon: Landmark, text: 'Monasteries', color: 'text-orange-500' }, { icon: CableCar, text: 'Ropeway', color: 'text-sky-500' }, { icon: Mountain, text: 'Himalayan Views', color: 'text-blue-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'gangtok');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="View of Gangtok city" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Gangtok</h1>
                    <p className="text-lg text-gray-200 mt-2">The Vibrant Capital of Sikkim</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Gangtok</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Gangtok, the capital of Sikkim, is a vibrant and charming hill station nestled in the eastern Himalayas. Known for its clean streets, stunning views of the Kanchenjunga, and a blend of traditional culture and modern life, Gangtok is a gateway to the rest of Sikkim.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Gangtok</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'pelling') {
    const heroImage = { src: 'https://picsum.photos/seed/pelling-hero/1920/600', caption: 'pelling kanchenjunga mountain' };
    const highlights = [ { icon: Mountain, text: 'Kanchenjunga Views', color: 'text-sky-500' }, { icon: Landmark, text: 'Ancient Monasteries', color: 'text-orange-500' }, { icon: Sprout, text: 'Pristine Nature', color: 'text-green-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'pelling');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="View of Kanchenjunga from Pelling" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Pelling</h1>
                    <p className="text-lg text-gray-200 mt-2">Up Close with Kanchenjunga</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Pelling</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Pelling is a small town in West Sikkim that offers the best views of the mighty Kanchenjunga. It's a perfect destination for nature lovers and those seeking peace, with its famous monasteries, waterfalls, and breathtaking landscapes.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Pelling</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'lachung') {
    const heroImage = { src: 'https://picsum.photos/seed/lachung-hero/1920/600', caption: 'lachung valley river' };
    const highlights = [ { icon: Flower, text: 'Yumthang Valley', color: 'text-pink-500' }, { icon: Mountain, text: 'Snowy Peaks', color: 'text-sky-500' }, { icon: Leaf, text: 'Untouched Nature', color: 'text-green-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'lachung');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Lachung Valley in Sikkim" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Lachung</h1>
                    <p className="text-lg text-gray-200 mt-2">Gateway to Yumthang Valley</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Lachung</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Lachung is a high-altitude mountain village in North Sikkim, close to the Tibetan border. It serves as the base for visits to the stunning Yumthang Valley (Valley of Flowers) and is known for its picturesque beauty, waterfalls, and apple orchards.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                 <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Lachung</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link>))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'namchi') {
    const heroImage = { src: 'https://picsum.photos/seed/namchi-hero/1920/600', caption: 'namchi char dham statue' };
    const highlights = [ { icon: Landmark, text: 'Pilgrimage Center', color: 'text-orange-500' }, { icon: Sprout, text: 'Tea Gardens', color: 'text-green-500' }, { icon: Mountain, text: 'Mountain Views', color: 'text-sky-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'namchi');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Char Dham complex in Namchi" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Namchi</h1>
                    <p className="text-lg text-gray-200 mt-2">The Cultural Capital of Sikkim</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Namchi</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Namchi, meaning 'Sky High', is the district headquarters of South Sikkim. It is fast developing into a tourist destination with its vast stretches of scenic landscapes and spiritual sites like the Char Dham complex and Samdruptse Hill.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Namchi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  // Tamil Nadu Cities
  if (cityId === 'chennai') {
    const heroImage = { src: 'https://picsum.photos/seed/chennai-hero/1920/600', caption: 'chennai kapaleeshwarar temple' };
    const highlights = [ { icon: Landmark, text: 'Cultural Hub', color: 'text-orange-500' }, { icon: Waves, text: 'Urban Beaches', color: 'text-sky-500' }, { icon: Utensils, text: 'South Indian Cuisine', color: 'text-red-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'chennai');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Kapaleeshwarar Temple, Chennai" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Chennai</h1>
                    <p className="text-lg text-gray-200 mt-2">The Gateway to South India</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Chennai</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Chennai, the capital of Tamil Nadu, is a vibrant metropolis that blends rich traditions with modern dynamism. Known for its Dravidian-style temples, long sandy beaches, colonial-era architecture, and a thriving culinary scene, Chennai offers a diverse and engaging urban experience.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Chennai</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'madurai') {
    const heroImage = { src: 'https://picsum.photos/seed/madurai-hero/1920/600', caption: 'meenakshi temple gopuram' };
    const highlights = [ { icon: Landmark, text: 'Temple City', color: 'text-amber-500' }, { icon: ShoppingBag, text: 'Bustling Markets', color: 'text-purple-500' }, { icon: Utensils, text: 'Authentic Cuisine', color: 'text-red-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'madurai');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Meenakshi Amman Temple Gopuram, Madurai" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Madurai</h1>
                    <p className="text-lg text-gray-200 mt-2">The Athens of the East</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Madurai</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">One of India's oldest continuously inhabited cities, Madurai is a cultural hotspot famous for the magnificent Meenakshi Amman Temple. The city is a celebration of Tamil culture, with a rich history, vibrant markets, and mouth-watering Chettinad cuisine.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Madurai</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }
  
  if (cityId === 'kanyakumari') {
    const heroImage = { src: 'https://picsum.photos/seed/kanyakumari-hero/1920/600', caption: 'kanyakumari sunrise' };
    const highlights = [ { icon: Sun, text: 'Sunrise & Sunset', color: 'text-orange-500' }, { icon: Ship, text: 'Ferry Rides', color: 'text-sky-500' }, { icon: Wind, text: 'Windy Beaches', color: 'text-blue-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'kanyakumari');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Sunrise at Kanyakumari" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Kanyakumari</h1>
                    <p className="text-lg text-gray-200 mt-2">The Southernmost Tip of India</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Kanyakumari</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Located at the southernmost tip of the Indian peninsula, Kanyakumari is a unique destination where the Bay of Bengal, the Arabian Sea, and the Indian Ocean meet. It's renowned for its spectacular sunrises and sunsets, the Vivekananda Rock Memorial, and the towering Thiruvalluvar Statue.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Kanyakumari</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'ooty') {
    const heroImage = { src: 'https://picsum.photos/seed/ooty-hero/1920/600', caption: 'ooty tea plantation' };
    const highlights = [ { icon: Mountain, text: 'Nilgiri Hills', color: 'text-green-500' }, { icon: Train, text: 'Toy Train', color: 'text-sky-500' }, { icon: Leaf, text: 'Tea Gardens', color: 'text-teal-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'ooty');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Tea plantations in Ooty" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Ooty</h1>
                    <p className="text-lg text-gray-200 mt-2">Queen of the Nilgiris</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Ooty</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Ooty, the 'Queen of Hill Stations', is a popular destination in the Nilgiri Hills. Known for its rolling hills covered in tea plantations, colonial-era architecture, serene lakes, and the charming Nilgiri Mountain Railway, Ooty offers a refreshing escape into nature.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Ooty</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'kodaikanal') {
    const heroImage = { src: 'https://picsum.photos/seed/kodaikanal-hero/1920/600', caption: 'kodaikanal lake view' };
    const highlights = [ { icon: Star, text: 'Star-shaped Lake', color: 'text-blue-500' }, { icon: TreePine, text: 'Lush Forests', color: 'text-green-500' }, { icon: Flower, text: 'Kurinji Flower', color: 'text-purple-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'kodaikanal');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Kodaikanal Lake" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Kodaikanal</h1>
                    <p className="text-lg text-gray-200 mt-2">The Princess of Hill Stations</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Kodaikanal</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Kodaikanal, known as the 'Princess of Hill Stations', is a misty hill town in Tamil Nadu. Centered around the man-made, star-shaped Kodaikanal Lake, it's a place of serene natural beauty with its rolling hills, lush forests, and gushing waterfalls.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                {cityAttractions.length > 0 &&
                  <div className="my-16">
                      <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Kodaikanal</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                  </div>
                }
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  // Madhya Pradesh Cities
  if (cityId === 'bhopal') {
    const heroImage = { src: 'https://picsum.photos/seed/bhopal-hero/1920/600', caption: 'bhopal upper lake' };
    const highlights = [ { icon: Waves, text: 'City of Lakes', color: 'text-sky-500' }, { icon: Landmark, text: 'Historical Mosques', color: 'text-green-500' }, { icon: Leaf, text: 'Greenest City', color: 'text-teal-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'bhopal');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Upper Lake, Bhopal" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Bhopal</h1>
                    <p className="text-lg text-gray-200 mt-2">The City of Lakes</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Bhopal</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Bhopal, the capital of Madhya Pradesh, is known as the 'City of Lakes' for its various natural and artificial lakes. It's a city that beautifully blends scenic beauty, history, and modern urban planning.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Bhopal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'indore') {
    const heroImage = { src: 'https://picsum.photos/seed/indore-hero/1920/600', caption: 'rajwada palace indore' };
    const highlights = [ { icon: Utensils, text: 'Street Food Capital', color: 'text-red-500' }, { icon: Landmark, text: 'Historical Palaces', color: 'text-amber-600' }, { icon: ShoppingBag, text: 'Vibrant Markets', color: 'text-sky-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'indore');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Rajwada Palace, Indore" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Indore</h1>
                    <p className="text-lg text-gray-200 mt-2">The Commercial Capital of MP</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Indore</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Indore, the largest city in Madhya Pradesh, is a bustling hub of commerce and culture. Famous for its vibrant street food at Sarafa Bazaar, majestic Rajwada Palace, and lively markets, Indore is a city that never sleeps.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Indore</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'gwalior') {
    const heroImage = { src: 'https://picsum.photos/seed/gwalior-fort/1920/600', caption: 'gwalior fort' };
    const highlights = [ { icon: Castle, text: 'Majestic Fort', color: 'text-amber-600' }, { icon: Music, text: 'City of Music', color: 'text-red-500' }, { icon: Landmark, text: 'Royal Palaces', color: 'text-sky-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'gwalior');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Gwalior Fort" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Gwalior</h1>
                    <p className="text-lg text-gray-200 mt-2">A City Steeped in History</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Gwalior</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Gwalior is a historic city known for its magnificent hilltop fort, often described as 'the pearl amongst the fortresses of Hind'. It's a city rich in musical heritage and royal history, with grand palaces and ancient temples.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Gwalior</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'khajuraho') {
    const heroImage = { src: 'https://picsum.photos/seed/khajuraho-hero/1920/600', caption: 'khajuraho temple sculpture' };
    const highlights = [ { icon: Landmark, text: 'UNESCO Temples', color: 'text-amber-600' }, { icon: Paintbrush, text: 'Erotic Sculptures', color: 'text-red-500' }, { icon: Hand, text: 'Spiritual Heritage', color: 'text-sky-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'khajuraho');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Khajuraho Temples" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Khajuraho</h1>
                    <p className="text-lg text-gray-200 mt-2">A Symphony in Stone</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Khajuraho</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Famous for its stunning temples adorned with intricate and erotic sculptures, Khajuraho is a UNESCO World Heritage site that showcases a masterpiece of Indian art and architecture. A testament to a rich cultural past.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Khajuraho</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }
  
  if (cityId === 'pachmarhi') {
    const heroImage = { src: 'https://picsum.photos/seed/pachmarhi-hero/1920/600', caption: 'pachmarhi hills' };
    const highlights = [ { icon: Leaf, text: 'Satpura Queen', color: 'text-green-500' }, { icon: Droplets, text: 'Waterfalls', color: 'text-sky-500' }, { icon: Hand, text: 'Ancient Caves', color: 'text-orange-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'pachmarhi');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Pachmarhi Hills" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Pachmarhi</h1>
                    <p className="text-lg text-gray-200 mt-2">The Queen of Satpura</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Pachmarhi</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Pachmarhi, the only hill station in Madhya Pradesh, is a serene destination known for its lush greenery, cascading waterfalls, and ancient Pandava caves. It's a perfect escape for nature lovers and history buffs.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Pachmarhi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link>))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
                </div>
            </div>
        </div>
    );
  }

  if (cityId === 'mandu') {
    const heroImage = { src: 'https://picsum.photos/seed/mandu-hero/1920/600', caption: 'jahaz mahal mandu' };
    const highlights = [ { icon: Landmark, text: 'Afghan Architecture', color: 'text-amber-600' }, { icon: HeartPulse, text: 'Romantic History', color: 'text-red-500' }, { icon: Castle, text: 'Historic Fort', color: 'text-sky-500' }];
    const cityAttractions = (attractions as Attraction[]).filter(attraction => attraction.cityId === 'mandu');
    return (
        <div>
             <div className="relative h-[50vh] w-full">
                <Image src={heroImage.src} alt="Jahaz Mahal, Mandu" fill className="object-cover" priority data-ai-hint={heroImage.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">Explore Mandu</h1>
                    <p className="text-lg text-gray-200 mt-2">The City of Joy</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12"><Button asChild variant="outline" size="sm"><Link href={`/states/${stateId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {state.name}</Link></Button></div>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-headline font-bold text-brand-blue">Welcome to Mandu</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">Mandu, or Mandavgarh, is an ancient fort city celebrated for its fine Afghan architecture and the legendary love story of Prince Baz Bahadur and Rani Roopmati. Perched on a hilltop, this city is dotted with magnificent palaces, mosques, and tombs.</p>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Key Highlights</h3>
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        {highlights.map(highlight => ( <div key={highlight.text} className="flex flex-col items-center text-center gap-3"><div className="bg-primary/10 p-4 rounded-full"><highlight.icon className={`h-8 w-8 ${highlight.color}`} /></div><p className="font-semibold text-muted-foreground">{highlight.text}</p></div> ))}
                    </div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Attractions in Mandu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{cityAttractions.map(attraction => ( <Link href={`/attractions/${attraction.attractionId}`} key={attraction.attractionId}><Card className="overflow-hidden h-full group hover:shadow-lg transition-shadow"><CardHeader className="p-0"><Image src={attraction.image.src} alt={attraction.image.caption} width={600} height={400} className="object-cover w-full h-48 group-hover:scale-105 transition-transform" data-ai-hint={attraction.image.caption} /></CardHeader><CardContent className="p-4"><h3 className="font-bold text-lg">{attraction.name}</h3><p className="text-sm text-muted-foreground mt-2 line-clamp-3">{attraction.description}</p></CardContent></Card></Link> ))}</div>
                </div>
                <div className="my-16">
                    <h3 className="text-2xl font-headline font-bold text-brand-blue text-center mb-8">Top Hotels in {city.name}</h3>
                    {cityHotels && cityHotels.length > 0 ? ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityHotels.map((hotel) => (<HotelCard key={hotel.id} hotel={hotel} />))}</div>) : ( <div className="text-center py-16 border-2 border-dashed rounded-lg"><h3 className="text-xl font-semibold text-muted-foreground">No hotels found.</h3><p className="mt-2 text-muted-foreground">Check back soon for updates.</p></div> )}
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
            {isLoading && <p>Loading hotels...</p>}
            {cityHotels && cityHotels.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cityHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                ))}
                </div>
            ) : (
                !isLoading && <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-muted-foreground">No hotels found for this city yet.</h3>
                <p className="mt-2 text-muted-foreground">Check back soon for updates.</p>
                </div>
            )}
        </div>
    </div>
  )
}
