'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Package, HeartPulse, Cake, Sun, Building2, Tent, Sparkles, Handshake, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchForm from "@/components/search-form";
import PackageCard from "@/components/package-card";
import Recommendations from "@/components/recommendations";
import { featuredPackages } from "@/lib/data";
import HotelCard from "@/components/hotel-card";
import type { Hotel, Interest, State, MonthDestination, City } from "@/lib/types";
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function Home() {
  const firestore = useFirestore();

  const hotelsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'hotels'), orderBy('rating', 'desc'), limit(3));
  }, [firestore]);

  const { data: featuredHotels, isLoading: hotelsLoading } = useCollection<Hotel>(hotelsQuery);
  
  const interestsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'interests'), orderBy('name'));
  }, [firestore]);

  const { data: interests, isLoading: interestsLoading } = useCollection<Interest>(interestsQuery);

  const statesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'states'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: states, isLoading: statesLoading } = useCollection<State>(statesQuery);
  
  const citiesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'cities'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: cities, isLoading: citiesLoading } = useCollection<City>(citiesQuery);

  const destinationsByMonthQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'monthlyDestinations'));
  }, [firestore]);

  const { data: destinationsByMonthData, isLoading: destinationsLoading } = useCollection<MonthDestination>(destinationsByMonthQuery);
  
  const sortedDestinationsByMonth = React.useMemo(() => {
    if (!destinationsByMonthData) return [];
    return destinationsByMonthData.sort((a, b) => new Date(`1 ${a.name} 2000`).getMonth() - new Date(`1 ${b.name} 2000`).getMonth());
  }, [destinationsByMonthData]);


  const heroImage = {
      "src": "https://images.unsplash.com/photo-1672841828271-54340a6fbcd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTc2MzM3MzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "caption": "tropical beach"
    };

  
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

  const testimonials = [
    {
        name: "Priya Sharma",
        location: "Delhi",
        text: "Our honeymoon in the Maldives was magical! TripBookKar planned everything so perfectly. Thank you!",
        avatar: "https://picsum.photos/seed/avatar1/100/100"
    },
    {
        name: "Rahul Mehta",
        location: "Mumbai",
        text: "Professional & prompt service. Got great hotel deals for our Rajasthan family trip.",
        avatar: "https://picsum.photos/seed/avatar2/100/100"
    },
    {
        name: "Neha & Arjun",
        location: "Bangalore",
        text: "Very smooth process and friendly staff at TripBookKar. Will book again soon!",
        avatar: "https://picsum.photos/seed/avatar3/100/100"
    }
  ];

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
        </div>
      </section>
      
      <section className="bg-secondary/30 text-foreground py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-accent-foreground">Why Choose TripBookKar?</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">At TripBookKar, we believe travel should be easy, enjoyable and extraordinary. From luxury stays to tailor-made trips, we manage every detail for a perfect travel experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <p className="text-4xl font-bold">100+</p>
              <p className="text-muted-foreground">Domestic Destinations</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <p className="text-4xl font-bold">99%</p>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Handshake className="w-8 h-8 text-primary" />
              </div>
              <p className="text-4xl font-bold">100%</p>
              <p className="text-muted-foreground">Customized Holidays</p>
            </div>
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
          {interestsLoading && <p className="text-center">Loading interests...</p>}
          {interests && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {interests.map((interest) => {
                const interestImage = {
                    "src": interest.image.src,
                    "caption": interest.image.caption
                };
                return (
                  <Link href={`/interests/${interest.id}`} key={interest.id}>
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
          )}
        </div>
      </section>

      <section id="destinations" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">
              Top Tourist Destinations in India
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Explore India's most popular states and cities for your next getaway.
            </p>
          </div>
          {statesLoading && <p className="text-center">Loading states...</p>}
          {states && (
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
          )}
        </div>
      </section>

      <section id="destinations-by-month" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">
              Destinations By Month
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Find the perfect place to travel for every month of the year.
            </p>
          </div>
          {destinationsLoading && <p className="text-center">Loading destinations...</p>}
          {sortedDestinationsByMonth && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sortedDestinationsByMonth.map((month) => {
                const destImage = {
                  src: month.pageImage.src,
                  caption: month.pageImage.caption,
                };
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
          )}
        </div>
      </section>

       <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-orange-400">
              What Our Travellers Say
            </h2>
            <p className="mt-2 text-lg text-gray-300">
              Real stories from our happy customers. Your satisfaction is our priority.
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-gray-800 border-gray-700 text-center h-full flex flex-col justify-between">
                      <CardContent className="p-6">
                        <Avatar className="mx-auto mb-4 h-20 w-20 border-2 border-orange-400">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-300 italic">"{testimonial.text}"</p>
                      </CardContent>
                      <CardFooter className="flex-col items-center justify-center p-4 bg-gray-900/50">
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.location}</p>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white bg-white/10 hover:bg-white/20 border-white/20" />
            <CarouselNext className="text-white bg-white/10 hover:bg-white/20 border-white/20" />
          </Carousel>
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
