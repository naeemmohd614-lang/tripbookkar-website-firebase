
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Award, Shield, Phone, Users, Heart, Briefcase, GraduationCap, Gift, Building, Search, Send, Calendar, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: "Family Hotel Booking",
    icon: Users,
    description: "Aapki family ke liye perfect hotel. Hum baccho ke liye suvidhaon aur safety ka khas dhyan rakhte hain.",
    benefits: ["Kid-Friendly Amenities", "Spacious Family Rooms", "Verified Safe Hotels"],
    trustLine: "Har hotel family ke liye 100% safe aur verified hai."
  },
  {
    title: "Honeymoon Booking",
    icon: Heart,
    description: "Aapke special moments ke liye romantic getaways. Hum privacy aur luxury ka vaada karte hain.",
    benefits: ["Private Pool Villas", "Romantic Dinners", "Couple Spa & Activities"],
    trustLine: "Aapki privacy aur comfort hamari priority hai."
  },
  {
    title: "Anniversary Stay Booking",
    icon: Gift,
    description: "Apni saalgirah ko yaadgaar banayein. Hum aapke liye special arrangements jaise cake, decor aur surprises plan karte hain.",
    benefits: ["Special Decorations", "Complimentary Cake & Wine", "Exclusive Experiences"],
    trustLine: "Har celebration ko hum aapke liye khaas banate hain."
  },
  {
    title: "Group Booking (Friends/Family/Corporate)",
    icon: Users,
    description: "Bade group ke liye best deals. Chahe dosto ka trip ho ya family vacation, hum sabke liye aasan booking provide karte hain.",
    benefits: ["Bulk Booking Discounts", "Customized Itineraries", "Easy Coordination"],
    trustLine: "Bade groups ke liye hamara process simple aur vishvasniya hai."
  },
  {
    title: "Corporate Travel & Business Trips",
    icon: Briefcase,
    description: "Aapke business trips ke liye professional aur comfortable stays. Hum GST invoices aur seamless booking provide karte hain.",
    benefits: ["GST-enabled Invoices", "Hotels with Meeting Rooms", "Prime Business Locations"],
    trustLine: "Aapke business ke liye ek professional aur reliable partner."
  },
  {
    title: "Student Trips & Budget Stays",
    icon: GraduationCap,
    description: "Students ke liye safe aur budget-friendly options. Hum sasti aur acchi properties dhoondhne mein madad karte hain.",
    benefits: ["Affordable Prices", "Safe & Verified Hostels/Hotels", "Group Discounts for Students"],
    trustLine: "Har student ke liye safety aur budget hamari zimmedari hai."
  },
  {
    title: "Wedding Guests Accommodation",
    icon: Building,
    description: "Shaadi mein aaye mehmaano ke liye best accommodation. Hum venue ke paas best hotels bulk rate par book karte hain.",
    benefits: ["Bulk Deals near Venue", "Hassle-free Management", "Comfortable Stay for Guests"],
    trustLine: "Aapke mehmaano ka khayal, hamari team rakhegi."
  },
  {
    title: "List Your Property (Partner with Us)",
    icon: Building,
    description: "Hotel owner hain? Apni property TripBookKar par list karein aur apni bookings badhayein. Hum aapko regular business denge.",
    benefits: ["Increase Your Occupancy", "Reach More Customers", "Dedicated Partner Support"],
    trustLine: "Join karein hamara trusted hotel network aur business grow karein."
  }
];

const whyChooseUsPoints = [
  { icon: Shield, title: "Verified Hotels", description: "Sirf best aur 100% verified hotels, aapki safety aur comfort ke liye." },
  { icon: Award, title: "Best Price Guarantee", description: "Hum aapko market mein sabse acchi deals aur prices dene ka vaada karte hain." },
  { icon: CheckCircle, title: "Tailor-Made Packages", description: "Aapki zaroorat ke hisaab se hum aapka trip plan aur customize karte hain." },
  { icon: Phone, title: "24/7 Customer Support", description: "Hamari expert team aapki madad ke liye 24 ghante, 7 din uplabdh hai." },
  { icon: CheckCircle, title: "Secure Payments", description: "Aapki payments 100% safe aur secure hain, bina kisi chinta ke." },
  { icon: Calendar, title: "Instant Confirmation", description: "Booking karein aur paayein instant confirmation, koi waiting nahi." }
];

const samplePackages = [
  {
    title: "Family Comfort Package",
    bullets: ["Spacious rooms", "Kid's play area", "Free breakfast"],
  },
  {
    title: "Romantic Honeymoon Suite",
    bullets: ["Private pool access", "Candlelight dinner", "Couple's spa voucher"],
  },
  {
    title: "Corporate Quick-Book Package",
    bullets: ["Airport transfer", "Business center access", "GST Invoice"],
  }
];

const testimonials = [
  { name: "Priya Sharma", text: "TripBookKar ne hamari family trip ko bahut aasan bana diya. Hotels bilkul waise hi the jaise bataye gaye the. Highly recommended!" },
  { name: "Rohan & Anjali", text: "Honeymoon ke liye inki service best hai. Sab kuch perfectly planned tha. Thank you for making our trip special." },
  { name: "Amit Verma", text: "My corporate bookings are always smooth with TripBookKar. Professional service and great hotels. Keep it up!" }
];

const faqItems = [
    {
        question: "TripBookKar par hotel booking kaise karein?",
        answer: "Bahut aasan hai! Aap hamari website par search karein, apni pasand ka hotel chunein, aur 'Book Now' button par click karein. Ya aap hamein 8950652665 par call karke bhi booking karwa sakte hain."
    },
    {
        question: "Kya group bookings ke liye koi special discount hai?",
        answer: "Ji haan! Hum friends, family aur corporate groups ke liye special discounted rates offer karte hain. Behtar deals ke liye aap 'Get Custom Quote' form bharein ya hamein call karein."
    },
    {
        question: "Payment options kya-kya hain?",
        answer: "Hum sabhi major payment methods accept karte hain jaise Credit/Debit Cards, Net Banking, UPI, aur Wallets. Aapki saari transactions 100% secure hoti hain."
    },
    {
        question: "Booking cancel karne par refund milta hai?",
        answer: "Refund policy hotel ke upar depend karti hai. Booking karte samay cancellation policy ko dhyan se padhein. Kisi bhi sahayata ke liye hamari support team se sampark karein."
    },
    {
        question: "Apni property (hotel/villa) ko kaise list kar sakte hain?",
        answer: "Agar aap hotel owner hain, toh hamare 'List Your Property' section mein diye gaye form ko bharein ya hamein call karein. Hamari team aapse jald hi sampark karegi."
    },
    {
        question: "Kya aap custom travel packages banate hain?",
        answer: "Bilkul! Hum aapki zaroorat aur budget ke anusaar tailor-made packages banate hain. 'Get Custom Quote' par click karein aur apni details share karein."
    }
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-brand-blue text-white py-20 md:py-32">
          <div className="absolute inset-0">
              <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBzZXJ2aWNlc3xlbnwwfHx8fDE3NjQyMDgzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Beautiful travel destination" layout="fill" objectFit="cover" className="opacity-20" data-ai-hint="beautiful travel destination"/>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">Aapki Har Trip Ke Liye, Hum Hain Na!</h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200 drop-shadow-lg">
                  Chahe family vacation ho ya business trip, hum aapke liye best hotels aur deals laate hain.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
                  {['Best Price', 'Verified Hotels', '24/7 Support', 'Instant Confirmation'].map(item => (
                      <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span>{item}</span>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
      {/* Services Section */}
        <section id="services" className="relative py-16 md:py-24">
            <div className="absolute inset-0 z-0">
                <Image src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0cmF2ZWwlMjBwbGFubmluZ3xlbnwwfHx8fDE3NjQyMDgzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Travel planning background" layout="fill" objectFit="cover" className="opacity-30" data-ai-hint="travel planning" />
            </div>
            <div className="absolute inset-0 bg-brand-blue/70 z-10"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-white drop-shadow-lg">Hamari Services</h2>
                    <p className="mt-2 text-lg text-gray-200 drop-shadow-lg">Aapki har zaroorat ke liye, ek perfect solution.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Icon className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <CardTitle className="font-headline text-xl text-gray-900">{service.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <ul className="space-y-2 text-sm">
                                        {service.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <p className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <Shield className="w-4 h-4" /> 
                                        {service.trustLine}
                                    </p>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="relative py-16 md:py-24">
        <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1520208422220-d12a3250a3c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxsdXh1cnklMjBob3RlbCUyMHJvb208ZW58MHx8fHwxNzY0MjA4NTEzfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Luxury hotel room view" layout="fill" objectFit="cover" className="z-0" />
        </div>
        <div className="absolute inset-0 bg-brand-blue/80 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">TripBookKar Hi Kyun?</h2>
                <p className="mt-2 text-lg text-gray-200">Kyunki hum aapke vishvas aur comfort ko sabse upar rakhte hain.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyChooseUsPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full mt-1">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                    <p className="text-gray-300 text-sm">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample Packages Section */}
        <section id="sample-packages" className="relative py-16 md:py-24">
            <div className="absolute inset-0">
                <Image src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0cmF2ZWwlMjBwbGFubmluZ3xlbnwwfHx8fDE3NjQyMDgzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Travel planning" layout="fill" objectFit="cover" className="z-0" />
            </div>
            <div className="absolute inset-0 bg-brand-blue/70 z-10"></div>
            <div className="container mx-auto px-4 relative z-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Sample Packages</h2>
                    <p className="mt-2 text-lg text-gray-200">Har zaroorat ke liye ek khaas package.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {samplePackages.map(pkg => (
                        <Card key={pkg.title} className="text-center bg-white/90 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl text-primary">{pkg.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 mb-4">
                                    {pkg.bullets.map(bullet => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      {/* How to Book Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1517849325420-a1c021b9b940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwbGFubmluZ3xlbnwwfHx8fDE3NjQyMDgzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="happy traveller" layout="fill" objectFit="cover" className="z-0" />
        </div>
        <div className="absolute inset-0 bg-brand-blue/70 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Booking Process: 4 Aasan Steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
                <div className="flex items-center justify-center bg-primary text-primary-foreground h-16 w-16 rounded-full mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="font-semibold text-lg mb-2 text-white">Search & Discover</h3>
                <p className="text-gray-200">Apni destination aur dates daalein.</p>
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center bg-primary text-primary-foreground h-16 w-16 rounded-full mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="font-semibold text-lg mb-2 text-white">Choose Hotel</h3>
                <p className="text-gray-200">Apni pasand ka hotel select karein.</p>
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center bg-primary text-primary-foreground h-16 w-16 rounded-full mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="font-semibold text-lg mb-2 text-white">Get Quote</h3>
                <p className="text-gray-200">Hamein call karein ya quote request karein.</p>
            </div>
             <div className="text-center">
                <div className="flex items-center justify-center bg-primary text-primary-foreground h-16 w-16 rounded-full mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="font-semibold text-lg mb-2 text-white">Confirm & Pay</h3>
                <p className="text-gray-200">Best price par booking confirm karein.</p>
            </div>
          </div>
           <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button size="lg" asChild>
                <Link href="/hotels">
                    <Search className="mr-2 h-5 w-5" /> Book Now
                </Link>
             </Button>
             <Button size="lg" variant="outline">
                <Link href="/contact">
                    <Send className="mr-2 h-5 w-5" /> Get Custom Quote
                </Link>
             </Button>
             <Button size="lg" variant="outline">
                <a href="tel:8950652665" className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" /> Call Now: 8950652665
                </a>
             </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">Hamare Happy Customers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                            </div>
                            <p className="text-muted-foreground italic">&quot;{testimonial.text}&quot;</p>
                            <p className="text-right font-bold mt-4">- {testimonial.name}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary/40 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">Aksar Puche Jaane Wale Sawaal (FAQs)</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>
      </section>
    </div>
  );
}
