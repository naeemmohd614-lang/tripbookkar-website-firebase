
'use client';
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HotelLoadingSkeleton() {
    const pulseAnimation = {
        scale: [1, 1.02, 1],
        opacity: [0.7, 0.9, 0.7],
    };

    const transition = {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-8 flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Loading hotel details, please wait...</p>
            </div>
            <motion.div 
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <motion.div className="lg:col-span-3" animate={pulseAnimation} transition={transition}>
                        <Skeleton className="w-full aspect-video rounded-lg" />
                    </motion.div>

                    <div className="lg:col-span-2">
                        <Card className="bg-background/80 backdrop-blur-sm border-border/20">
                            <CardHeader>
                                <motion.div animate={pulseAnimation} transition={transition}>
                                    <Skeleton className="h-5 w-24 mb-4 rounded-md" />
                                </motion.div>
                                <motion.div animate={pulseAnimation} transition={{ ...transition, delay: 0.1 }}>
                                    <Skeleton className="h-12 w-3/4 rounded-md" />
                                </motion.div>
                                 <motion.div animate={pulseAnimation} transition={{ ...transition, delay: 0.2 }}>
                                    <Skeleton className="h-6 w-full mt-4 rounded-md" />
                                </motion.div>
                            </CardHeader>
                            <CardContent>
                                 <motion.div animate={pulseAnimation} transition={{ ...transition, delay: 0.3 }}>
                                    <Skeleton className="h-8 w-1/2 mb-4 rounded-md" />
                                </motion.div>
                                 <motion.div className="space-y-2" animate={pulseAnimation} transition={{ ...transition, delay: 0.4 }}>
                                    <Skeleton className="h-4 w-full rounded-md" />
                                    <Skeleton className="h-4 w-full rounded-md" />
                                    <Skeleton className="h-4 w-5/6 rounded-md" />
                                </motion.div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-8">
                    <div className="lg:col-span-2 space-y-8">
                         <motion.div animate={pulseAnimation} transition={{ ...transition, delay: 0.5 }}>
                            <Skeleton className="h-48 w-full rounded-lg" />
                         </motion.div>
                         <motion.div animate={pulseAnimation} transition={{ ...transition, delay: 0.6 }}>
                            <Skeleton className="h-48 w-full rounded-lg" />
                         </motion.div>
                    </div>
                    <div className="lg:col-span-1">
                         <motion.div animate={pulseAnimation} transition={{ ...transition, delay: 0.7 }}>
                             <Skeleton className="h-48 w-full rounded-lg" />
                         </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
