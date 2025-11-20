'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon, Mail, MapPin, Phone, Send } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import React from "react";

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.149-.67-.149l-.67-1.629c-.273-.656-.546-.565-.67-.565-.125 0-.273 0-.422.025-.148.025-.371.149-.568.347-.198.198-.767.766-.767 1.852s.792 2.148.917 2.321c.125.172 1.52 2.318 3.687 3.231.596.266 1.063.425 1.422.544.56.187 1.035.162 1.422.099.434-.075 1.342-.544 1.539-1.07.198-.52.198-1.07.149-1.164-.05-.099-.198-.149-.297-.198zM12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z"/>
    </svg>
);


export default function ContactPage() {
    const [date, setDate] = React.useState<DateRange | undefined>(undefined);

    return (
        <div className="bg-gray-900 text-white py-12 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Get in Touch</h1>
                    <p className="mt-4 text-lg text-gray-400">
                        Have questions or need help planning your trip? We&apos;re available 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Contact Info */}
                    <div className="lg:col-span-1">
                        <Card className="bg-gray-800 border-gray-700 h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 text-gray-300">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-orange-400 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-white">Our Office</h4>
                                        <p>42 Rajpur Road, Dehradun, Uttarakhand, India</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-orange-400 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-white">Phone</h4>
                                        <p>+91 82954 86610</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-orange-400 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-white">Email</h4>
                                        <p>travel@tripbookkar.com</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                                        <Mail className="mr-2 h-4 w-4" /> Email Us
                                    </Button>
                                    <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                                        <WhatsAppIcon/> WhatsApp
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Enquiry Form */}
                    <div className="lg:col-span-2">
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold">Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="full-name">Full Name</Label>
                                            <Input id="full-name" placeholder="John Doe" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" type="tel" placeholder="+91 12345 67890" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="travel-type">Travel Type</Label>
                                            <Select>
                                                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                                    <SelectValue placeholder="Select a travel type" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                                    <SelectItem value="honeymoon">Honeymoon</SelectItem>
                                                    <SelectItem value="family">Family Vacation</SelectItem>
                                                    <SelectItem value="adventure">Adventure</SelectItem>
                                                    <SelectItem value="business">Business</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="destination">Preferred Destination</Label>
                                        <Input id="destination" placeholder="e.g., Maldives, Rajasthan" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dates">Travel Dates (From - To)</Label>
                                         <Popover>
                                            <PopoverTrigger asChild>
                                            <Button
                                                id="dates"
                                                variant={"outline"}
                                                className={cn(
                                                "w-full justify-start text-left font-normal bg-gray-700 border-gray-600 hover:bg-gray-600 text-white hover:text-white",
                                                !date && "text-gray-400"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date?.from ? (
                                                date.to ? (
                                                    <>
                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                    {format(date.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(date.from, "LLL dd, y")
                                                )
                                                ) : (
                                                <span>Pick a date range</span>
                                                )}
                                            </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                                className="text-white"
                                            />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="travellers">Number of Travellers</Label>
                                            <Input id="travellers" type="number" defaultValue="1" className="bg-gray-700 border-gray-600 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="budget">Budget (Optional)</Label>
                                            <Input id="budget" placeholder="e.g., ₹50,000" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Tell us more about your travel plans..." className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]" />
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                                            Send Enquiry <Send className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
