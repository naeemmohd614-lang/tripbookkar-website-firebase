
'use client'
import React from 'react';
import Link from 'next/link';
import { useFirestore, useCollection, deleteDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import { bulkImportData } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';


function BulkImportMenu() {
    const { toast } = useToast();
    const [isImporting, setIsImporting] = React.useState<string | null>(null);

    const dataTypes = [
        'marriott', 'taj', 'oberoi', 'the-leela', 'hyatt', 'the-lalit', 'hilton', 'ihg', 'accor', 'radisson', 'other-hotels'
    ];

    const handleImport = async (type: string) => {
        setIsImporting(type);
        const result = await bulkImportData(type);
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
                    Bulk Import Hotels
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Import Hotels by Brand</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dataTypes.map(type => (
                    <DropdownMenuItem 
                        key={type} 
                        onClick={() => handleImport(type)}
                        disabled={isImporting === type}
                    >
                        {isImporting === type ? 'Importing...' : `Import ${type.replace(/[-_]/g, ' ')}`}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default function HotelsPage(){
  const firestore = useFirestore();
  const { toast } = useToast();

  const hotelsQuery = firestore ? collection(firestore, 'hotels') : null;

  const { data: hotels, isLoading } = useCollection<Hotel>(hotelsQuery);

  const handleDelete = (hotelId: string) => {
    if (!firestore) return;
    const hotelRef = doc(firestore, 'hotels', hotelId);
    deleteDocumentNonBlocking(hotelRef);
    toast({
        title: "Hotel Deleted",
        description: "The hotel has been removed from the database.",
    });
  };

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
                          <TableHead>Name</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Price/Night</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {hotelsByBrand[brand].map((h: Hotel) => (
                          <TableRow key={h.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium text-gray-900">{h.name}</TableCell>
                            <TableCell className="text-sm text-gray-500">{h.city}, {h.state}</TableCell>
                            <TableCell className="text-sm text-gray-500">{formatPrice(h.basePrice)}</TableCell>
                            <TableCell className="text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span>{h.rating ? h.rating.toFixed(1) : 'N/A'}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-4">
                                 <Link href={`/admin/hotels/${h.id}`} className="text-blue-600 hover:text-blue-800">
                                    <Pencil size={18} />
                                </Link>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 h-8 w-8">
                                      <Trash2 size={18} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the hotel
                                        "{h.name}" and remove its data from our servers.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(h.id!)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
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
