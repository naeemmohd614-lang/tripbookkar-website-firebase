import { hotels } from '@/lib/data';
import HotelCard from '@/components/hotel-card';
import SearchForm from '@/components/search-form';
import { Hotel } from '@/lib/types';

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q?.toLowerCase() || '';

  const filteredHotels = query
    ? (hotels as Hotel[]).filter(
        (hotel: Hotel) =>
          hotel.name.toLowerCase().includes(query) ||
          hotel.city.toLowerCase().includes(query) ||
          hotel.state.toLowerCase().includes(query) ||
          hotel.brand.toLowerCase().includes(query)
      )
    : (hotels as Hotel[]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <SearchForm />
      </div>

      <h1 className="text-3xl font-headline font-bold text-brand-blue mb-2">
        {query ? `Search results for "${query}"` : 'All Hotels'}
      </h1>
      <p className="text-muted-foreground mb-8">
        Found {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'}.
      </p>

      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold text-muted-foreground">No hotels found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your search query.</p>
        </div>
      )}
    </div>
  );
}
