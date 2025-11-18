import SeoGenerator from '@/components/seo-generator';
import { Shield } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="bg-secondary/30 min-h-[calc(100vh-4rem)] py-12">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-center text-center gap-4 mb-8">
                <Shield className="h-12 w-12 text-brand-blue" />
                <div>
                    <h1 className="text-4xl font-headline font-bold text-brand-blue">
                    Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">Content and Site Management Tools</p>
                </div>
            </div>
            
            <SeoGenerator />

        </div>
    </div>
  );
}
