
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "TripBookKar - Your Ultimate Travel Companion",
  description: "Discover and book hotels, and plan your perfect trip with TripBookKar.",
  icons: {
    icon: '/generated-pages/TripBookKar1.png',
  },
};

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.149-.67-.149l-.67-1.629c-.273-.656-.546-.565-.67-.565-.125 0-.273 0-.422.025-.148.025-.371.149-.568.347-.198.198-.767.766-.767 1.852s.792 2.148.917 2.321c.125.172 1.52 2.318 3.687 3.231.596.266 1.063.425 1.422.544.56.187 1.035.162 1.422.099.434-.075 1.342-.544 1.539-1.07.198-.52.198-1.07.149-1.164-.05-.099-.198-.149-.297-.198zM12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z"/>
    </svg>
);


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
             <div className="fixed bottom-5 right-5 z-50">
                <Button asChild size="icon" className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg">
                    <a href="https://wa.me/918950652665" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                        <WhatsAppIcon />
                        <span className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-black ring-2 ring-white"></span>
                    </a>
                </Button>
            </div>
            <div className="fixed bottom-5 left-5 z-50">
                <Button asChild size="icon" className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                    <a href="mailto:travel@tripbookkar.com" aria-label="Send an Email">
                        <Mail className="h-6 w-6" />
                    </a>
                </Button>
            </div>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
