
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
    <Image 
        src="https://images.unsplash.com/photo-1704383110020-86b408af4ac2?q=80&w=1109&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="WhatsApp Icon" 
        width={40} 
        height={40} 
        className="rounded-full"
    />
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
