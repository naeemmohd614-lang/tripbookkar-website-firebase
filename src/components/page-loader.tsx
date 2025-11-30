'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { create } from 'zustand';

interface PageLoaderState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const usePageLoaderStore = create<PageLoaderState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));


export default function PageLoader() {
  const isLoading = usePageLoaderStore((state) => state.isLoading);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
