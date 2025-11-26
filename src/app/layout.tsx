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
};

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-current">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.29 4.95L2.06 22l5.3-1.38c1.44.77 3.06 1.18 4.69 1.18h.01c5.46 0 9.9-4.45 9.9-9.91 0-5.46-4.44-9.9-9.9-9.9zM18 16.4c-.2-.1-.58-.28-1.12-.56s-1.14.2-1.38.48c-.24.28-.78.98-1 1.2-0.21.21-.43.23-.77.08-1.57-.68-2.78-1.59-3.9-2.95-.91-1.09-1.53-2.19-1.53-2.22 0-.02.16-.21.33-.37.2-.2.34-.4.5-.63.17-.2.25-.38.16-.67-.09-.28-1-2.4-1.37-3.28-.35-.85-.71-.72-.98-.72h-.47c-.28 0-.68.1-.9.3S6.3 7.8 6.3 8.85c0 1.05.78 2.45 1.23 3.1 1.1 1.57 2.4 3 4.22 4.1.4.24.75.38 1.25.56.71.26 1.18.23 1.56.08.43-.17.9-.73 1.3-1.38.35-.55.35-.9.24-1.08l-.11-.12z"/>
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
                <Button asChild size="icon" className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg">
                    <a href="https://wa.me/918950652665" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                        <WhatsAppIcon />
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
