'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePageLoaderStore } from './page-loader';

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsLoading } = usePageLoaderStore();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;

    if (!query || query.trim() === '') {
      // Don't do anything if the search query is empty
      return;
    }
    
    setIsLoading(true);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-muted p-1 rounded-md flex items-center gap-1"
    >
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          name="query"
          placeholder="Search destinations or hotels..."
          className="pl-8 h-9 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          defaultValue={searchParams.get('q') || ''}
        />
      </div>
      <Button type="submit" size="sm" className="h-8">
        Search
      </Button>
    </form>
  );
}
