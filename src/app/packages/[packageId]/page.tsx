'use client';
import { featuredPackages } from '@/lib/data';
import { useParams, notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function PackageDetailPage() {
    const params = useParams();
    const packageId = params.packageId as string;
    const pkg = featuredPackages.find((p) => p.id === packageId);

    if (!pkg) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-brand-blue">{pkg.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{pkg.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{pkg.days} Days / {pkg.nights} Nights</span>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-2">Itinerary</h3>
                        <ul className="space-y-2">
                            {pkg.itinerary.map(item => (
                                <li key={item.day}>
                                    <strong>Day {item.day}:</strong> {item.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
