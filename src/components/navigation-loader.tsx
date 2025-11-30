
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import PageLoader from '@/components/page-loader';

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // We don't want to show the loader on the initial load.
    // This could be handled differently, but this is a simple way.
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // This is a bit of a hack to listen for route changes.
    // A better approach might be to use a layout that wraps around
    // the children and uses router events, but that's more complex
    // with the App Router.
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);
    
    // We're simulating router events by listening to clicks on `a` tags
    // and form submissions. This is not foolproof but covers most cases.
    
    const links = document.querySelectorAll('a');
    links.forEach(link => link.addEventListener('click', handleStart));
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.addEventListener('submit', handleStart));

    // When the pathname or search params change, the new page has loaded.
    handleComplete();
    
    return () => {
      links.forEach(link => link.removeEventListener('click', handleStart));
      forms.forEach(form => form.removeEventListener('submit', handleStart));
    };
  }, [pathname, searchParams]);

  return <PageLoader isLoading={isLoading} />;
}
