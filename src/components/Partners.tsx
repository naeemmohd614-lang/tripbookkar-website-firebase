
'use client';

import { trustedPartners } from "@/lib/data";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Partners() {
    return (
        <section className="py-12 md:py-24">
            <div className="container">
                <SectionTitle title="Trusted by Leading Airlines & Hotels" />
                <div className="relative mt-10 w-full overflow-hidden">
                    <div className="flex w-max animate-marquee-slow [animation-play-state:running]">
                        {[...trustedPartners, ...trustedPartners].map((partner, index) => (
                            <Button key={`${partner.slug}-${index}`} variant="outline" asChild className="mx-2 text-muted-foreground hover:text-primary hover:border-primary flex-shrink-0">
                                <Link href={`/brands/${partner.slug}`}>{partner.name}</Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
