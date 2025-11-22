'use client'
import React from 'react';
import Link from 'next/link';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Pencil, Trash2, Star, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Hotel } from '@/lib/types';
import { bulkImportHotels } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';


function BulkImportMenu() {
    const { toast } = useToast();
    const [isImporting, setIsImporting] = React.useState<string | null>(null);

    const hotelBrands = [
        'marriott', 'taj', 'oberoi', 'the-leela', 'hyatt', 'the-lalit', 'hilton', 'ihg', 'accor', 'radisson', 'other-hotels'
    ];

    const handleImport = async (brand: string) => {
        setIsImporting(brand);
        const result = await bulkImportHotels(brand);
        if (result.success) {
            toast({
                title: 'Import Successful',
                description: result.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Import Failed',
                description: result.message,
            });
        }
        setIsImporting(null);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Bulk Import
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Import Hotels by Brand</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {hotelBrands.map(brand => (
                    <DropdownMenuItem 
                        key={brand} 
                        onClick={() => handleImport(brand)}
                        disabled={isImporting === brand}
                    >
                        {isImporting === brand ? 'Importing...' : `Import ${brand.replace('-', ' ')}`}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default function HotelsPage(){
  const firestore = useFirestore();
  const hotelsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'hotels');
  }, [firestore]);

  const { data: hotels, isLoading } = useCollection<Hotel>(hotelsQuery);

  const hotelsByBrand = React.useMemo(() => {
    if (!hotels) return {};
    return hotels.reduce((acc, hotel) => {
        const brand = hotel.brand || 'Unbranded';
        if (!acc[brand]) {
            acc[brand] = [];
        }
        acc[brand].push(hotel);
        return acc;
    }, {} as { [key: string]: Hotel[] });
  }, [hotels]);

  const sortedBrands = React.useMemo(() => {
      return Object.keys(hotelsByBrand).sort((a, b) => a.localeCompare(b));
  }, [hotelsByBrand]);


  const formatPrice = (price: number) => {
    if (typeof price !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Management</h1>
        <div className="flex gap-4">
            <BulkImportMenu />
            <Button asChild>
              <Link href="/admin/hotels/new">+ Add New Hotel</Link>
            </Button>
        </div>
      </div>

       {isLoading && (
          <div className="text-center p-8">Loading hotels...</div>
       )}

      {!isLoading && sortedBrands.length > 0 ? (
         <Accordion type="single" collapsible className="w-full">
            {sortedBrands.map(brand => (
              <AccordionItem value={brand} key={brand}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {brand} ({hotelsByBrand[brand].length} hotels)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-auto border rounded-lg">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
                          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</TableHead>
                          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Night</TableHead>
                          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</TableHead>
                          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="bg-white divide-y divide-gray-200">
                        {hotelsByBrand[brand].map((h: Hotel) => (
                          <TableRow key={h.id} className="hover:bg-gray-50">
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{h.name}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.city}, {h.state}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(h.basePrice)}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span>{h.rating ? h.rating.toFixed(1) : 'N/A'}</span>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-4">
                                 <Link href={`/admin/hotels/${h.id}`} className="text-blue-600 hover:text-blue-800">
                                    <Pencil size={18} />
                                </Link>
                                <button className="text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
      ) : !isLoading && (
        <div className="text-center p-8 text-muted-foreground">No hotels found.</div>
      )}
    </div>
  );
}
