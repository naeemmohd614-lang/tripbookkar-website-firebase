'use client';

interface BrandLogoProps {
  brand: {
    name: string;
    slug: string;
    href: string;
  };
}

export default function BrandLogo({ brand }: BrandLogoProps) {
  // This is a placeholder component.
  // In a real app, you would have logic to display different brand logos.
  return (
    <div className="flex items-center justify-center w-full h-full">
      <span className="font-bold text-center text-sm">{brand.name}</span>
    </div>
  );
}
