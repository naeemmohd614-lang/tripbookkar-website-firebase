import { featuredPackages } from '@/lib/data';
import PackageCard from '@/components/package-card';

export default function PackagesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-brand-blue">
          Travel Packages
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Curated experiences for every traveler.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
