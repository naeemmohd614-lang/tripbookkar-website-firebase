
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
import Image from "next/image";

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 fill-current">
        <path d="M12.038 23.999C18.662 23.999 24 18.661 24 12C24 5.337 18.662 0 12.038 0C5.414 0 0 5.337 0 12c0 2.113.556 4.102 1.564 5.832L0 24l4.232-1.522A11.95 11.95 0 0 0 12.038 24zM8.132 6.844c.15-.299.314-.314.479-.314.15 0 .314.015.429.015.15.014.344.074.524.373.194.314.673 1.63.733 1.769.06.134.12.299.03.479-.09.194-.149.223-.299.373-.149.149-.299.179-.429.239-.119.06-.284.089-.419.03a1.918 1.918 0 0 1-1.123-.628c-.464-.524-1.079-1.753-1.124-1.813-.045-.06-.374-1.033.224-1.618.149-.149.328-.209.433-.239.119-.03.224-.03.314-.03.104 0 .224.015.343.149z"/>
    </svg>
);


export default function ContactPage() {
    const [date, setDate] = React.useState<DateRange | undefined>(undefined);

    return (
        <div className="relative min-h-screen text-white">
            <Image
                src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwdXN8ZW58MHx8fHwxNzYzOTk3OTQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Contact us background"
                layout="fill"
                objectFit="cover"
                className="z-0 opacity-40"
                data-ai-hint="call center contact"
            />
             <div className="absolute inset-0 bg-gray-900/60 z-10" />

            <div className="relative z-20 container mx-auto px-4 py-12 md:py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Get in Touch</h1>
                    <p className="mt-4 text-lg text-gray-200">
                        Have questions or need help planning your trip? We&apos;re available 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Contact Info */}
                    <div className="lg:col-span-1">
                        <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-white">Contact Information</CardTitle>
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
                        <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-white">Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="full-name" className="text-gray-300">Full Name</Label>
                                            <Input id="full-name" placeholder="John Doe" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                                            <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                                            <Input id="phone" type="tel" placeholder="+91 12345 67890" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="travel-type" className="text-gray-300">Travel Type</Label>
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
                                        <Label htmlFor="destination" className="text-gray-300">Preferred Destination</Label>
                                        <Input id="destination" placeholder="e.g., Maldives, Rajasthan" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dates" className="text-gray-300">Travel Dates (From - To)</Label>
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
                                            <Label htmlFor="travellers" className="text-gray-300">Number of Travellers</Label>
                                            <Input id="travellers" type="number" defaultValue="1" className="bg-gray-700 border-gray-600 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="budget" className="text-gray-300">Budget (Optional)</Label>
                                            <Input id="budget" placeholder="e.g., ₹50,000" className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-gray-300">Message</Label>
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
