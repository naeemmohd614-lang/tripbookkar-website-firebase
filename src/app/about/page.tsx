
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Shield, Phone, Handshake } from 'lucide-react';
import Image from 'next/image';
import LoadingLink from '@/components/loading-link';
import SectionTitle from '@/components/shared/SectionTitle';

const teamMembers = [
  {
    name: "Sanjida",
    role: "Founder & CEO",
    avatar: "https://picsum.photos/seed/sanjida/200/200",
    bio: "A travel enthusiast with a vision to make luxury travel accessible and seamless for everyone.",
  },
  {
    name: "Priya Singh",
    role: "Head of Operations",
    avatar: "https://picsum.photos/seed/priya-singh/200/200",
    bio: "Ensuring every trip is perfectly planned and executed, from booking to post-travel support.",
  },
  {
    name: "Rahul Verma",
    role: "Lead Travel Consultant",
    avatar: "https://picsum.photos/seed/rahul-verma/200/200",
    bio: "An expert in crafting personalized itineraries that turn dream vacations into reality.",
  }
];

const whyChooseUsPoints = [
  { icon: Shield, title: "Verified Hotels", description: "We partner only with trusted and verified hotels to ensure your safety and comfort." },
  { icon: Award, title: "Best Price Guarantee", description: "We promise the most competitive deals and prices in the market for luxury stays." },
  { icon: Handshake, title: "Tailor-Made Packages", description: "We customize your trip according to your needs, budget, and travel style." },
  { icon: Phone, title: "24/7 Customer Support", description: "Our expert team is available round the clock to assist you at every step of your journey." },
];

export default function AboutUsPage() {
  const heroImage = {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop",
      caption: "beautiful landscape"
  }

  return (
    <div className="bg-background text-foreground">
      <section className="relative h-72 md:h-96 w-full">
        <Image
          src={heroImage.src}
          alt="A team of happy travelers on an adventure"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint={heroImage.caption}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white z-20">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">About TripBookKar</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-lg">
            Crafting Unforgettable Journeys with a Personal Touch.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Our Story" subtitle="A Passion for Perfect Travel" />
              <p className="text-muted-foreground leading-relaxed">
                Founded by a team of avid travelers, TripBookKar was born from a simple idea: to make booking luxury and boutique hotels in India a seamless, reliable, and delightful experience. We grew tired of unpredictable quality and impersonal service. So, we decided to create a platform where every hotel is handpicked and every trip is crafted with personal care.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Today, we are a trusted partner for thousands of travelers, helping them discover the finest properties and create lasting memories.
              </p>
            </div>
             <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-xl">
                 <Image src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=1170&auto=format&fit=crop" alt="Our Mission" fill className="object-cover" data-ai-hint="teamwork planning"/>
             </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionTitle title="Why Choose Us?" subtitle="Your Journey, Our Commitment." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyChooseUsPoints.map((point) => {
              const Icon = point.icon;
              return (
                <Card key={point.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{point.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{point.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionTitle title="Meet Our Team" subtitle="The Passionate People Behind Your Perfect Trip" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-headline font-bold">Ready to Start Your Journey?</h2>
          <p className="mt-2 max-w-2xl mx-auto">
            Explore our curated collection of hotels or get in touch for a custom-planned holiday.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild variant="secondary" size="lg">
              <LoadingLink href="/hotels">Explore Hotels</LoadingLink>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <LoadingLink href="/contact">Contact Us</LoadingLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
