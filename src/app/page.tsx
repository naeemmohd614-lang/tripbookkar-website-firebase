'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Package, HeartPulse, Cake, Sun, Building2, Tent, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchForm from "@/components/search-form";
import PackageCard from "@/components/package-card";
import Recommendations from "@/components/recommendations";
import { states, featuredPackages, destinationsByMonth } from "@/lib/data";
import HotelCard from "@/components/hotel-card";
import type { Hotel } from "@/lib/types";
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';


export default function Home() {
  const firestore = useFirestore();
  const hotelsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'hotels'), orderBy('rating', 'desc'), limit(3));
  }, [firestore]);

  const { data: featuredHotels, isLoading: hotelsLoading } = useCollection<Hotel>(hotelsQuery);

  const heroImage = {
      "src": "https://images.unsplash.com/photo-1672841828271-54340a6fbcd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTc2MzM3MzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "caption": "tropical beach"
    };

  const interests = [
    { name: 'Beaches', imageId: 'https://images.unsplash.com/photo-1626951876321-3b7137628f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxiZWFjaCUyMHN1bnNldHxlbnwwfHx8fDE3NjM2MjQ2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'beach sunset', href: '/interests/beaches' },
    { name: 'Mountains', imageId: 'https://images.unsplash.com/photo-1526239187794-f8c27c7872ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb3VudGFpbiUyMHJhbmdlfGVufDB8fHx8MTc2MzYyMTIyNnww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'mountain range', href: '/interests/mountains' },
    { name: 'Heritage', imageId: 'https://images.unsplash.com/photo-1650343301290-e22780fe2609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhbmNpZW50JTIwdGVtcGxlfGVufDB8fHx8MTc2MzY2MDg1Mnww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'ancient temple', href: '/interests/heritage' },
    { name: 'Wildlife', imageId: 'https://images.unsplash.com/photo-1634273182550-40960b2d6f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0aWdlciUyMHdpbGRsaWZlfGVufDB8fHx8MTc2MzYzMzY1MXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'tiger wildlife', href: '/interests/wildlife' },
    { name: 'Adventure', imageId: 'https://images.unsplash.com/photo-1634707983128-0236c567a345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtb3VudGFpbiUyMGNsaW1iaW5nfGVufDB8fHx8MTc2MzY5MjgxOXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'mountain climbing', href: '/interests/adventure' },
    { name: 'Spiritual', imageId: 'https://images.unsplash.com/photo-1645148284392-e2b0fae3262d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx5b2dhJTIwbWVkaXRhdGlvbnxlbnwwfHx8fDE3NjM2OTI4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'yoga meditation', href: '/interests/spiritual' },
    { name: 'Wellness Resorts', imageId: 'https://images.unsplash.com/photo-1700522924565-9fad1c05469e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzcGElMjBtZWRpdGF0aW9ufGVufDB8fHx8MTc2MzY5MjgyMHww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'spa meditation', href: '/interests/wellness', icon: HeartPulse },
    { name: 'Weddings', imageId: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxkZXN0aW5hdGlvbiUyMHdlZGRpbmd8ZW58MHx8fHwxNzYzNjkyODE5fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'destination wedding', href: '/interests/weddings', icon: Cake },
    { name: 'Desert Experiences', imageId: 'https://images.unsplash.com/photo-1650556443811-4f515ca1b1f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzYW5kJTIwZHVuZXN8ZW58MHx8fHwxNzYzNjkyODE5fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'sand dunes', href: '/interests/desert', icon: Sun },
    { name: 'Boutique Hotels', imageId: 'https://images.unsplash.com/photo-1762472662611-d0391e522521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjaGFybWluZyUyMGhvdGVsfGVufDB8fHx8MTc2MzY5MjgxOXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'charming hotel', href: '/interests/boutique', icon: Building2 },
    { name: 'Luxury Tents', imageId: 'https://images.unsplash.com/photo-1714326029322-fcc1464df757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxnbGFtcGluZyUyMHRlbnR8ZW58MHx8fHwxNzYzNjgxOTA0fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'glamping tent', href: '/interests/luxury-tents', icon: Tent },
    { name: 'Milestone Celebrations', imageId: 'https://images.unsplash.com/photo-1759124650346-43900f8479d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzcGVjaWFsJTIwb2NjYXNpb24lMjBwYXJ0eXxlbnwwfHx8fDE3NjM2OTI4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'special occasion party', href: '/interests/milestone-celebrations', icon: Sparkles },
  ];
  
  const stateImages: { [key: string]: { src: string, caption: string } } = {
    karnataka: { src: 'https://images.unsplash.com/photo-1662904264665-f53f797a47fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsYW5kc2NhcGUlMjBvZiUyMEthcm5hdGFrYXxlbnwwfHx8fDE3NjM2NzA4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Karnataka' },
    goa: { src: 'https://images.unsplash.com/photo-1750379819414-9b4d3ab443dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsYW5kc2NhcGUlMjBvZiUyMEdvYXxlbnwwfHx8fDE3NjM2NzA4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Goa' },
    rajasthan: { src: 'https://images.unsplash.com/photo-1646204892121-1b7010701cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxsYW5kc2NhcGUlMjBvZiUyMFJhamFzdGhhbnxlbnwwfHx8fDE3NjM2NzA4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Rajasthan' },
    kerala: { src: 'https://images.unsplash.com/photo-1643534304426-c7b5148201bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxsYW5kc2NhcGUlMjBvZiUyMEtlcmFsYXxlbnwwfHx8fDE3NjM2NzA4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Kerala' },
    maharashtra: { src: 'https://images.unsplash.com/photo-1708867817499-148b23e2603d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxsYW5kc2NhcGUlMjBvZiUyME1haGFyYXNodHJhfGVufDB8fHx8MTc2MzY3MDg4N3ww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Maharashtra' },
    'himachal-pradesh': { src: 'https://images.unsplash.com/photo-1654189675562-4d96b0a3de42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxsYW5kc2NhcGUlMjBvZiUyMEhpbWFjaGFsJTIwUHJhZGVzaHxlbnwwfHx8fDE3NjM2NzA4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Himachal Pradesh' },
    uttarakhand: { src: 'https://images.unsplash.com/photo-1623591999327-4197396028af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBvZiUyMFV0dGFyYWtoYW5kfGVufDB8fHx8MTc2MzY3MDg4Nnww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Uttarakhand' },
    'jammu-and-kashmir': { src: 'https://images.unsplash.com/photo-1661536663209-e5f22a92c722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsYW5kc2NhcGUlMjBvZiUyMEphbW11JTIwYW5kJTIwS2FzaG1pcnxlbnwwfHx8fDE3NjM2NzA4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Jammu and Kashmir' },
    sikkim: { src: 'https://images.unsplash.com/photo-1633323773495-42816a4e8920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsYW5kc2NhcGUlMjBvZiUyMFNpa2tpbXxlbnwwfHx8fDE3NjM2NzA4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Sikkim' },
    'west-bengal': { src: 'https://images.unsplash.com/photo-1699387948969-af05ca0cdacc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxsYW5kc2NhcGUlMjBvZiUyMFdlc3QlMjBCZW5nYWx8ZW58MHx8fHwxNzYzNjcwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of West Bengal' },
    'tamil-nadu': { src: 'https://images.unsplash.com/photo-1622182474659-f13d68140bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxsYW5kc2NhcGUlMjBvZiUyMFRhbWlsJTIwTmFkdXxlbnwwfHx8fDE3NjM2NzA4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Tamil Nadu' },
    'uttar-pradesh': { src: 'https://images.unsplash.com/photo-1762514121927-3d68faac1b84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxsYW5kc2NhcGUlMjBvZiUyMFV0dGFyJTIwUHJhZGVzaHxlbnwwfHx8fDE3NjM2NzA4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Uttar Pradesh' },
    'madhya-pradesh': { src: 'https://images.unsplash.com/photo-1642152655253-9f1b70c8a0d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxsYW5kc2NhcGUlMjBvZiUyME1hZGh5YSUyMFByYWRlc2h8ZW58MHx8fHwxNzYzNjcwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Madhya Pradesh' },
    gujarat: { src: 'https://images.unsplash.com/photo-1663693953045-2e97fc0b23c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxsYW5kc2NhcGUlMjBvZiUyMEd1amFyYXR8ZW58MHx8fHwxNzYzNjcwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Gujarat' },
    delhi: { src: 'https://images.unsplash.com/photo-1609670289875-590e8ec05c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBvZiUyMERlbGhpfGVufDB8fHx8MTc2MzY3MDg4N3ww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'landscape of Delhi' },
  };

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] text-white">
        {heroImage && (
          <Image
            src={heroImage.src}
            alt="A stunning view of a tropical beach with clear blue water and palm trees, representing a dream vacation."
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.caption}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            Find Your Next Stay
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-md">
            Discover the best hotels and deals for your dream vacation.
          </p>
          <div className="mt-8 w-full max-w-3xl">
            <SearchForm />
          </div>
        </div>
      </section>

      <section id="travel-by-interest" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">
              Travel by Interest
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Find the perfect trip based on what you love to do.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {interests.map((interest) => {
              const interestImage = {
                  "src": interest.imageId,
                  "caption": interest.hint
              };
              return (
                <Link href={interest.href} key={interest.name}>
                  <Card className="overflow-hidden group relative h-48 hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={interestImage.src}
                      alt={interest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={interestImage.caption}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <h3 className="font-bold text-2xl text-white font-headline tracking-wider">{interest.name}</h3>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="destinations" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">
              Explore Our States
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Discover hotels and experiences across India.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {states.map((state) => {
               const stateImage = stateImages[state.stateId] || { src: `https://picsum.photos/seed/${state.stateId}/400/300`, caption: `landscape of ${state.name}` };
              return (
                <Link href={`/states/${state.stateId}`} key={state.stateId}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="relative h-40">
                         {stateImage && (
                          <Image
                            src={stateImage.src}
                            alt={`View of ${state.name}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={stateImage.caption}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-3">
                          <h3 className="font-bold text-lg text-white font-headline">{state.name}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="destinations-by-month" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">
              Destinations By Month
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Find the perfect place to travel for every month of the year.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {destinationsByMonth.map((month) => {
              const monthImageUrls: { [key: string]: { src: string; caption: string } } = {
                'January': { src: 'https://images.unsplash.com/photo-1641566797195-5c5080f3c251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx3aW50ZXIlMjBzbm93fGVufDB8fHx8MTc2MzY4NDY2N3ww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'winter snow' },
                'February': { src: 'https://images.unsplash.com/photo-1488415032361-b7e238421f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxub3J0aGVybiUyMGxpZ2h0c3xlbnwwfHx8fDE3NjM2OTQ4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'northern lights' },
                'March': { src: 'https://images.unsplash.com/photo-1493589976221-c2357c31ad77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjaGVycnklMjBibG9zc29tfGVufDB8fHx8MTc2MzY5NDgzOHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'cherry blossom' },
                'April': { src: 'https://images.unsplash.com/photo-1619787110676-c0181304528d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx0dWxpcCUyMGZpZWxkfGVufDB8fHx8MTc2MzY1MDM1MXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'tulip field' },
                'May': { src: 'https://images.unsplash.com/photo-1653766846644-4e8a5498f69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx2ZW5pY2UlMjBjYW5hbHxlbnwwfHx8fDE3NjM2OTQ4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'venice canal' },
                'June': { src: 'https://images.unsplash.com/photo-1586500036065-bdaeac7a4feb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTc2MzU5MzAxMXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'tropical beach' },
                'July': { src: 'https://images.unsplash.com/photo-1738508798495-32d5de3f2eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzYXZhbm5haCUyMGVsZXBoYW50fGVufDB8fHx8MTc2MzY5NDgzOHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'savannah elephant' },
                'August': { src: 'https://images.unsplash.com/photo-1584493737987-b2f0c75a8729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxiYWxpJTIwdGVtcGxlfGVufDB8fHx8MTc2MzY2NDEzMXww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'bali temple' },
                'September': { src: 'https://images.unsplash.com/photo-1549366021-9f761d450615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxqdW5nbGUlMjBlbGVwaGFudHxlbnwwfHx8fDE3NjM2OTQ4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'jungle elephant' },
                'October': { src: 'https://images.unsplash.com/photo-1507830075634-ce51e8b19328?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxhdXR1bW4lMjBsYWtlfGVufDB8fHx8MTc2MzY5NDgzOHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'autumn lake' },
                'November': { src: 'https://images.unsplash.com/photo-1694152327372-39b2f9159f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx2aWV0bmFtJTIwcmljZXxlbnwwfHx8fDE3NjM2OTQ4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'vietnam rice' },
                'December': { src: 'https://images.unsplash.com/photo-1605199024013-5954321963dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxza2lpbmclMjBtb3VudGFpbnxlbnwwfHx8fDE3NjM2OTQ4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'skiing mountain' },
              };
              const destImage = monthImageUrls[month.name] || { src: `https://picsum.photos/seed/${month.imageId}/1080/400`, caption: "travel destination" };
              return (
                <Link href={`/destinations/${month.slug}`} key={month.name}>
                  <Card className="overflow-hidden group relative h-24 hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={destImage.src}
                      alt={month.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={destImage.caption}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <h3 className="font-bold text-xl text-white font-headline tracking-wider">{month.name}</h3>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Separator />

      <section id="packages" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">
              Featured Packages
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Curated travel packages for an unforgettable experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/packages">
                View All Packages <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      <section id="hotels" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">
              Featured Hotels
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Handpicked hotels for a luxurious and comfortable stay.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelsLoading && <p>Loading...</p>}
            {featuredHotels && featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/hotels">
                View All Hotels <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Separator />

      <section id="recommendations" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">
              Personalized For You
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Get hotel recommendations based on your travel interests.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Recommendations />
          </div>
        </div>
      </section>
    </div>
  );
}
