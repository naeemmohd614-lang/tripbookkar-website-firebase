'use client';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchForm() {
  const router = useRouter();

  const handleSearch = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <form
      action={handleSearch}
      className="bg-white p-2 rounded-lg shadow-lg flex items-center gap-2"
    >
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          name="query"
          placeholder="e.g., 'Goa', 'Jaipur', or '5 star hotel bangalore'"
          className="pl-10 h-12 text-md border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <Button type="submit" size="lg" className="h-12">
        Search
      </Button>
    </form>
  );
}
