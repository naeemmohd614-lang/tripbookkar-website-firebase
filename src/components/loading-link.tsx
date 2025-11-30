'use client';

import React, { useEffect } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { usePageLoaderStore } from './page-loader';

type LoadingLinkProps = LinkProps & React.PropsWithChildren<{
  className?: string;
}>;

export default function LoadingLink({ children, ...props }: LoadingLinkProps) {
  const { setIsLoading } = usePageLoaderStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Hide loader whenever the path changes (navigation completes)
    setIsLoading(false);
  }, [pathname, searchParams, setIsLoading]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't show loader for same-page links, external links, or right-clicks/ctrl-clicks
    const href = props.href.toString();
    const currentPath = window.location.pathname;

    if (href === currentPath || href.startsWith('#') || href.startsWith('http') || e.metaKey || e.ctrlKey) {
      return;
    }
    
    setIsLoading(true);
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
