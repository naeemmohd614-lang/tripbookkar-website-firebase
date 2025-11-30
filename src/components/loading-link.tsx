
'use client';

import React, { useEffect, useCallback } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { usePageLoaderStore } from './page-loader';

type LoadingLinkProps = LinkProps & React.PropsWithChildren<{
  className?: string;
}>;

const LoadingLink = React.forwardRef<HTMLAnchorElement, LoadingLinkProps>(({ children, ...props }, ref) => {
  const { setIsLoading } = usePageLoaderStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Memoize the current URL to avoid re-calculating on every render
  const currentUrl = React.useMemo(() => {
    return `${pathname}?${searchParams.toString()}`;
  }, [pathname, searchParams]);
  
  // This effect will run when the component mounts and whenever the route changes,
  // effectively turning off the loader on new page loads.
  useEffect(() => {
    setIsLoading(false);
  }, [currentUrl, setIsLoading]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = props.href.toString();
    const targetUrl = new URL(href, window.location.origin);

    // 1. Don't trigger for external links or special clicks
    if (targetUrl.origin !== window.location.origin || e.metaKey || e.ctrlKey) {
      return;
    }
    
    // 2. Don't trigger if it's the same URL (pathname + search params)
    if (targetUrl.pathname === pathname && targetUrl.search === window.location.search) {
        // If it's just a hash link on the same page, let it scroll without a loader.
        if (targetUrl.hash) {
            return;
        }
        e.preventDefault(); // Prevent full navigation for the exact same page
        return;
    }
    
    // 3. Set loading to true for all other internal navigation
    setIsLoading(true);

  }, [props.href, setIsLoading, pathname]);

  return (
    <Link {...props} ref={ref} onClick={handleClick}>
      {children}
    </Link>
  );
});

LoadingLink.displayName = 'LoadingLink';

export default LoadingLink;
