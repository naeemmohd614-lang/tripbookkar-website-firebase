
'use client';
import { hotels } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import type { Hotel } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Dumbbell, Dog, GlassWater, MapPin, Mic2, ParkingCircle, Sun, Utensils, Waves, Wifi, Zap } from 'lucide-react';

export default function HotelDetailPage() {
  const params = useParams();
  const hotelId = params.hotelId as string;

  const hotel = (hotels as Hotel[]).find((h) => h.hotelId === hotelId);

  if (!hotel) {
    notFound();
  }

  const mainImage = hotel.images && hotel.images[0] && hotel.images[0].src ? hotel.images[0] : null;

  const FacilityItem = ({ icon: Icon, label, available }: { icon: React.ElementType, label: string, available: boolean }) => (
    <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${available ? 'text-green-500' : 'text-red-500'}`} />
        <span>{label}</span>
    </div>
  );

  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
                <CardHeader className="p-0">
                    <div className="relative h-64 md:h-96">
                        {mainImage && (
                            <Image
                            src={mainImage.src}
                            alt={`Main image for ${hotel.name}`}
                            fill
                            className="object-cover"
                            priority
                            data-ai-hint={mainImage.caption}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <h1 className="text-3xl md:text-4xl font-headline font-bold text-white shadow-lg">{hotel.name}</h1>
                            <p className="text-lg text-gray-200 mt-1 shadow-md">{hotel.brand}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin className="w-5 h-5" />
                        <span>{hotel.address}</span>
                    </div>

                    <h2 className="text-2xl font-headline text-brand-blue border-b pb-2 mb-4">About this hotel</h2>
                    <p className="text-foreground/80 leading-relaxed">{hotel.about}</p>
                    
                    {hotel.distance && Object.keys(hotel.distance).length > 0 &&
                      <div className="mt-4 text-sm text-muted-foreground">
                        {Object.entries(hotel.distance).map(([key, value]) => (
                          <p key={key}><strong>{value}</strong> from {key}</p>
                        ))}
                      </div>
                    }

                    {hotel.facilities && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-headline text-brand-blue border-b pb-2 mb-4">Facilities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <FacilityItem icon={Waves} label="Pool" available={hotel.facilities.pool} />
                                <FacilityItem icon={Sun} label="Spa" available={hotel.facilities.spa} />
                                <FacilityItem icon={Dumbbell} label="Gym" available={hotel.facilities.gym} />
                                <FacilityItem icon={Wifi} label="Wi-Fi" available={hotel.facilities.wifi} />
                                <FacilityItem icon={ParkingCircle} label="Parking" available={hotel.facilities.parking} />
                                <FacilityItem icon={Dog} label="Pet Friendly" available={hotel.facilities.petFriendly} />
                            </div>
                            <div className="mt-4 text-sm text-muted-foreground grid grid-cols-2 gap-x-4">
                                <p><strong>Check-in:</strong> {hotel.facilities.checkIn}</p>
                                <p><strong>Check-out:</strong> {hotel.facilities.checkOut}</p>
                            </div>
                        </div>
                    )}


                    {hotel.roomCategories && hotel.roomCategories.length > 0 && (
                      <div className="mt-8">
                        <h2 className="text-2xl font-headline text-brand-blue border-b pb-2 mb-4 flex items-center gap-2"><GlassWater />Room Categories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {hotel.roomCategories.map(room => (
                              <Card key={room.name} className="bg-secondary/50">
                                  <CardContent className="p-4 flex justify-between items-center">
                                      <div>
                                          <p className="font-semibold">{room.name}</p>
                                          <p className="text-sm text-muted-foreground">{room.count} rooms available</p>
                                      </div>
                                       {room.size && <p className="text-sm font-semibold">{room.size}</p>}
                                  </CardContent>
                              </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {hotel.diningExperiences && hotel.diningExperiences.length > 0 && (
                      <div className="mt-8">
                        <h2 className="text-2xl font-headline text-brand-blue border-b pb-2 mb-4 flex items-center gap-2"><Utensils />Dining Experiences</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hotel.diningExperiences.map(dining => (
                                <div key={dining.name} className="flex items-start gap-3">
                                  <Check className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                  <div>
                                    <p className="font-semibold">{dining.name}</p>
                                    <p className="text-sm text-muted-foreground">{dining.type}</p>
                                  </div>
                                </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {hotel.experiencesAndActivities && hotel.experiencesAndActivities.length > 0 && (
                      <div className="mt-8">
                        <h2 className="text-2xl font-headline text-brand-blue border-b pb-2 mb-4 flex items-center gap-2"><Zap />Experiences & Activities</h2>
                        <ul className="space-y-2">
                          {hotel.experiencesAndActivities.map(activity => (
                              <li key={activity} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-500" />
                                <span>{activity}</span>
                              </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {hotel.weddingVenues && hotel.weddingVenues.length > 0 && (
                      <div className="mt-8">
                        <h2 className="text-2xl font-headline text-brand-blue border-b pb-2 mb-4 flex items-center gap-2"><Mic2 />Wedding Venues</h2>
                        <ul className="space-y-2">
                          {hotel.weddingVenues.map(venue => (
                              <li key={venue} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-500" />
                                <span>{venue}</span>
                              </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle>Contact Hotel</CardTitle>
                <CardDescription>For inquiries and bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                    To get the best price or to know more about this property, please contact us.
                </p>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button size="lg" className="w-full">Enquire Now</Button>
                <Button size="lg" variant="secondary" className="w-full">Call Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
