
'use client';
import { brands } from '@/lib/data';
import LoadingLink from '@/components/loading-link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const marriottBrands = [
    "The Ritz-Carlton",
    "St. Regis",
    "Edition",
    "The Luxury Collection",
    "W Hotels",
    "JW Marriott",
    "Marriott",
    "Sheraton",
    "Le Méridien",
    "Westin",
    "Autograph Collection",
    "Renaissance Hotels",
    "Courtyard by Marriott",
    "Four Points by Sheraton",
    "Fairfield by Marriott",
    "Aloft Hotels"
];

export default function BrandsPage() {
  const brandData = brands.filter(b => marriottBrands.includes(b.name));

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold text-primary">
            Marriott Hotel Brands
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore our collection of world-class Marriott brands.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brandData.map((brand) => (
            <LoadingLink href={`/brands/${brand.brandSlug}`} key={brand.brandSlug}>
                <Card className="h-full flex items-center justify-center p-4 text-center bg-card hover:bg-accent hover:shadow-lg transition-all duration-300">
                    <CardTitle className="text-base font-medium">{brand.name}</CardTitle>
                </Card>
            </LoadingLink>
          ))}
        </div>

        <div className="text-center mt-12">
            <Button asChild size="lg">
                <LoadingLink href="/hotels?q=marriott">Explore All Marriott Hotels</LoadingLink>
            </Button>
        </div>
      </div>
    </div>
  );
}
