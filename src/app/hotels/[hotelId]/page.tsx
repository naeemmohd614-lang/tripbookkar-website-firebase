'use client';
import { hotels } from '@/lib/data';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { Star, MapPin, Wifi, Dumbbell, Utensils, Sprout, Ruler, ParkingCircle, Dog, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const facilityIcons: { [key: string]: React.ReactNode } = {
    pool: <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.42 12.63 2 16.05h5.5l-3.52-3.52a.78.78 0 0 1 1.1-1.1L8.6 15.05V10h.5a2.5 2.5 0 0 1 2.5 2.5v.5a2.5 2.5 0 0 1-2.5 2.5H3"/><path d="M18.58 12.63 15 16.05h5.5l-3.52-3.52a.78.78 0 0 1 1.1-1.1L21.6 15.05V10h.5a2.5 2.5 0 0 1 2.5 2.5v.5a2.5 2.5 0 0 1-2.5 2.5H16"/><path d="M10 6.5a2.5 2.5 0 0 1 5 0v11a2.5 2.5 0 0 1-5 0v-11Z"/></svg>,
    spa: <Sprout className="w-5 h-5 mr-2" />,
    wifi: <Wifi className="w-5 h-5 mr-2" />,
    gym: <Dumbbell className="w-5 h-5 mr-2" />,
    parking: <ParkingCircle className="w-5 h-5 mr-2" />,
    petFriendly: <Dog className="w-5 h-5 mr-2" />,
};

export default function HotelDetailPage() {
  const params = useParams();
  const hotelId = params.hotelId as string;
  const hotel = hotels.find((h) => h.id === hotelId);

  if (!hotel) {
    notFound();
  }

  const hotelImage = hotel.images[0];
  
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
                                        src={hotelImage.src}
                                        alt={hotel.name}
                                        fill
                                        className="object-cover"
                                        priority
                                        data-ai-hint={hotelImage.caption}
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
                                <h3 className="text-xl font-headline font-bold text-brand-blue mb-2">About this hotel</h3>
                                <p className="text-muted-foreground">{hotel.about}</p>
                            </div>

                            <Separator className="my-6" />

                            <div>
                                <h3 className="text-xl font-headline font-bold text-brand-blue mb-4">Room Categories</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {hotel.roomCategories.map(category => (
                                    <Card key={category.name} className="bg-secondary/50">
                                      <CardContent className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{category.name}</p>
                                            <p className="text-sm text-muted-foreground">{category.count} rooms available</p>
                                        </div>
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
                                    {Object.entries(hotel.facilities).map(([key, value]) => {
                                        if (typeof value === 'boolean' && key !== 'checkIn' && key !== 'checkOut') {
                                            const facilityKey = key as keyof typeof hotel.facilities;
                                            const icon = value ? <CheckCircle className="w-5 h-5 mr-2 text-green-600" /> : <XCircle className="w-5 h-5 mr-2 text-destructive" />;
                                            const facilityName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                            return (
                                                <div key={key} className="flex items-center">
                                                    {icon}
                                                    <span>{facilityName}</span>
                                                </div>
                                            )
                                        }
                                        return null;
                                    })}
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4 text-muted-foreground">
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 mr-2" />
                                        <span>Check-in: {hotel.facilities.checkIn}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 mr-2" />
                                        <span>Check-out: {hotel.facilities.checkOut}</span>
                                    </div>
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
