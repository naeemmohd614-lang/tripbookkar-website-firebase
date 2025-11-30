
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
import PageLoader from "@/components/page-loader";
import Image from "next/image";

export const metadata: Metadata = {
  title: "TripBookKar - Your Ultimate Travel Companion",
  description: "Discover and book hotels, and plan your perfect trip with TripBookKar.",
  icons: {
    icon: '/generated-pages/TripBookKar1.png',
  },
};

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white fill-current">
        <path d="M12.038 23.999C18.662 23.999 24 18.661 24 12C24 5.337 18.662 0 12.038 0C5.414 0 0 5.337 0 12c0 2.113.556 4.102 1.564 5.832L0 24l4.232-1.522A11.95 11.95 0 0 0 12.038 24zM8.132 6.844c.15-.299.314-.314.479-.314.15 0 .314.015.429.015.15.014.344.074.524.373.194.314.673 1.63.733 1.769.06.134.12.299.03.479-.09.194-.149.223-.299.373-.149.149-.299.179-.429.239-.119.06-.284.089-.419.03a1.918 1.918 0 0 1-1.123-.628c-.464-.524-1.079-1.753-1.124-1.813-.045-.06-.374-1.033.224-1.618.149-.149.328-.209.433-.239.119-.03.224-.03.314-.03.104 0 .224.015.343.149z"/>
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
            <PageLoader />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
             <div className="fixed bottom-5 right-5 z-50">
                <Button asChild size="icon" className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg">
                    <a href="https://wa.me/918295486610" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
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
