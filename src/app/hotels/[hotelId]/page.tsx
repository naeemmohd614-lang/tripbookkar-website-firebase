'use client';
import { hotels } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { Star, MapPin, Wifi, Dumbbell, Utensils, Sprout, Ruler } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const facilityIcons: { [key: string]: React.ReactNode } = {
    Pool: <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.42 12.63 2 16.05h5.5l-3.52-3.52a.78.78 0 0 1 1.1-1.1L8.6 15.05V10h.5a2.5 2.5 0 0 1 2.5 2.5v.5a2.5 2.5 0 0 1-2.5 2.5H3"/><path d="M18.58 12.63 15 16.05h5.5l-3.52-3.52a.78.78 0 0 1 1.1-1.1L21.6 15.05V10h.5a2.5 2.5 0 0 1 2.5 2.5v.5a2.5 2.5 0 0 1-2.5 2.5H16"/><path d="M10 6.5a2.5 2.5 0 0 1 5 0v11a2.5 2.5 0 0 1-5 0v-11Z"/></svg>,
    Spa: <Sprout className="w-4 h-4 mr-2" />,
    WiFi: <Wifi className="w-4 h-4 mr-2" />,
    Gym: <Dumbbell className="w-4 h-4 mr-2" />,
    Bar: <Utensils className="w-4 h-4 mr-2" />,
    'Beach Access': <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 22a2 2 0 0 0 2-2V7l-5-3-5 3v13a2 2 0 0 0 2 2Z"/><path d="M14 13h-4"/><path d="M14 17h-4"/><path d="M10 22V10M2 15l2-2 2 2 2-2 2 2 2-2 2 2"/></svg>,
    'Conference Room': <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12v-2M15 10v6"/><path d="M9 10v6"/><path d="M3 14h.01"/><path d="M7 14h.01"/><path d="M21 14h-.01"/><path d="M17 14h-.01"/><path d="M17 20h-2c-1.1 0-2-.9-2-2v-3.5a2.5 2.5 0 1 1 5 0V18c0 1.1-.9 2-2 2Z"/></svg>,
    Boating: <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a.5.5 0 0 1-.5-.5V14a.5.5 0 0 1 .5-.5"/><path d="M22 17h-2.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H22"/><path d="M2.5 13.5h16.73a2 2 0 0 1 1.96 2.32l-1.07 7.5A2 2 0 0 1 18.18 21H6.82a2 2 0 0 1-1.96-1.68l-1.07-7.5A2 2 0 0 1 5.73 9.5h1.93a2 2 0 0 1 1.96 1.68L12 21l2.38-9.82a2 2 0 0 1 1.96-1.68h3.38"/><path d="M6 9.5V4.5a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 .5.5v5"/></svg>,
    Restaurant: <Utensils className="w-4 h-4 mr-2" />,
    'Cultural Shows': <svg className="w-4 h-4 mr-2" xmlns="http://www.w3org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19a3 3 0 1 0 6 0"/><path d="M12 19a3 3 0 1 1-6 0"/><path d="M12 16a3 3 0 1 0 6 0"/><path d="M12 16a3 3- 0 1 1-6 0"/><path d="M7 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1.5a2 2 0 0 1 0 4h-3"/><path d="M17 9a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1.5a2 2 0 0 0 0 4h3"/></svg>,
    'Private Beach': <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 22a2 2 0 0 0 2-2V7l-5-3-5 3v13a2 2 0 0 0 2 2Z"/><path d="M14 13h-4"/><path d="M14 17h-4"/><path dM10 22V10M2 15l2-2 2 2 2-2 2 2 2-2 2 2"/></svg>,
    'Yoga Center': <Sprout className="w-4 h-4 mr-2" />,
};

export default function HotelDetailPage() {
  const params = useParams();
  const hotelId = params.hotelId as string;
  const hotel = hotels.find((h) => h.id === hotelId);

  if (!hotel) {
    notFound();
  }

  const hotelImage = PlaceHolderImages.find(p => p.id === hotel.images[0]);
  
  return (
    <div className="bg-secondary/30">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3">
                    <Card className="overflow-hidden shadow-lg">
                        <CardHeader className="p-0">
                            <div className="relative h-96">
                                {hotelImage && (
                                    <Image
                                        src={hotelImage.imageUrl}
                                        alt={hotel.name}
                                        fill
                                        className="object-cover"
                                        priority
                                        data-ai-hint={hotelImage.imageHint}
                                    />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <Badge variant="secondary" className="mb-2">{hotel.brand}</Badge>
                                    <CardTitle className="text-3xl font-headline text-brand-blue">{hotel.name}</CardTitle>
                                    <CardDescription className="flex items-center gap-1 text-md mt-1">
                                        <MapPin className="w-4 h-4" />
                                        {hotel.address}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-lg font-bold">
                                    <Star className="w-5 h-5 fill-white" />
                                    <span>{hotel.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            
                            <Separator className="my-6" />

                            <div>
                                <h3 className="text-xl font-headline font-bold text-brand-blue mb-4">Room Categories</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {hotel.roomCategories.map(category => (
                                    <Card key={category.name} className="bg-secondary/50">
                                      <CardContent className="p-4 flex justify-between items-center">
                                        <p className="font-semibold">{category.name}</p>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Ruler className="w-4 h-4 mr-2" />
                                          <span>{category.size}</span>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <div>
                                <h3 className="text-xl font-headline font-bold text-brand-blue mb-4">Facilities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-muted-foreground">
                                    {hotel.facilities.map(facility => (
                                        <div key={facility} className="flex items-center">
                                            {facilityIcons[facility] || <Sprout className="w-4 h-4 mr-2" />}
                                            <span>{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2">
                    <Card className="shadow-lg sticky top-24">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl text-brand-blue">Book Your Stay</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="flex justify-between items-baseline mb-6">
                                <div>
                                    <p className="text-muted-foreground">Starting from</p>
                                    <p className="font-bold text-3xl text-primary">
                                        ₹{hotel.priceBase.toLocaleString()}
                                        <span className="text-lg font-normal text-muted-foreground">/night</span>
                                    </p>
                                </div>
                                <Badge variant="secondary">Best Value</Badge>
                            </div>
                             <p className="text-sm text-muted-foreground mb-4">
                                Prices may vary depending on the season and availability. Select your dates to get the final price.
                             </p>
                        </CardContent>
                        <CardFooter>
                            <Button size="lg" className="w-full text-lg">
                                Check Availability & Book
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}
