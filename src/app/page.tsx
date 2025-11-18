import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SearchForm from "@/components/search-form";
import PackageCard from "@/components/package-card";
import Recommendations from "@/components/recommendations";
import { popularDestinations, featuredPackages, destinationsByMonth } from "@/lib/data";

export default function Home() {
  const heroImage = {
      "src": "https://images.unsplash.com/photo-1672841828271-54340a6fbcd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTc2MzM3MzAzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "caption": "tropical beach"
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

      <section id="destinations" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-brand-blue">
              Popular Destinations
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Explore hotels in these top-rated cities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((dest) => {
              const destImage = {
                  "src": `https://picsum.photos/seed/${dest.imageId}/1080/720`,
                  "caption": `${dest.city} view`
              };
              return (
                <Link href={`/search?q=${dest.city}`} key={dest.city}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="relative h-64">
                         {destImage && (
                          <Image
                            src={destImage.src}
                            alt={`View of ${dest.city}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={destImage.caption}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="font-bold text-xl text-white font-headline">{dest.city}</h3>
                          <p className="text-sm text-gray-200">{dest.state}</p>
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
              const monthImageHints = {
                'January': 'winter snow',
                'February': 'northern lights',
                'March': 'cherry blossom',
                'April': 'tulip field',
                'May': 'venice canal',
                'June': 'tropical beach',
                'July': 'savannah elephant',
                'August': 'bali temple',
                'September': 'jungle elephant',
                'October': 'autumn lake',
                'November': 'vietnam rice',
                'December': 'skiing mountain',
              };
              const destImage = {
                  "src": `https://picsum.photos/seed/${month.imageId}/1080/400`,
                  "caption": monthImageHints[month.name as keyof typeof monthImageHints] || "travel destination"
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
