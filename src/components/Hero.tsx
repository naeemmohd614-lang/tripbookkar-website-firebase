
'use client';

import { motion, AnimatePresence, useTime, useTransform } from 'framer-motion';
import {
  Search,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useState, useEffect } from 'react';
import { trustedPartners as partners } from '@/lib/data';
import BrandLogo from '@/components/BrandLogo';
import Logo from '@/components/shared/Logo';

const ORBIT_RADIUS_LG_OUTER = 400;
const ORBIT_RADIUS_LG_INNER = 280;
const ORBIT_RADIUS_MD_OUTER = 320;
const ORBIT_RADIUS_MD_INNER = 220;
const ORBIT_RADIUS_SM_OUTER = 240;
const ORBIT_RADIUS_SM_INNER = 160;

const heroVideos = [
    "https://cdn.pixabay.com/video/2022/10/16/135169-761273586_large.mp4"
];

const hotelPartners = partners.map(p => {
    let href = `/brands/${p.slug}`;
    if (['marriott', 'taj', 'oberoi', 'ihg', 'hyatt', 'radisson', 'the-leela', 'hilton', 'accor'].includes(p.slug)) {
       href = `/brands/${p.slug}`;
    }
    return { ...p, href };
});

const outerOrbitPartners = hotelPartners.slice(0, Math.ceil(hotelPartners.length / 2));
const innerOrbitPartners = hotelPartners.slice(Math.ceil(hotelPartners.length / 2));


function OrbitingLogo({
  item,
  index,
  total,
  radius,
  duration,
}: {
  item: { name: string; slug: string; href: string; logo?: string; };
  index: number;
  total: number;
  radius: number;
  duration: number;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const time = useTime();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const rotate = useTransform(
    time,
    [0, duration * 1000],
    [0, 360],
    { clamp: false }
  );
  
  const angle = (index / total) * 360;
  
  const x = useTransform(rotate, (r) => Math.cos(((r + angle) * Math.PI) / 180) * radius);
  const y = useTransform(rotate, (r) => Math.sin(((r + angle) * Math.PI) / 180) * radius);


  if (!isMounted) {
    return null;
  }
  
  return (
    <motion.div
      key={item.slug}
      className="absolute flex items-center justify-center w-20 h-20 text-primary"
      style={{
        x,
        y,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{
        scale: 0.5,
        opacity: 0,
      }}
      animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 70, damping: 20, delay: index * 0.1 } }}
      transition={{
        x: { type: 'tween', duration: duration, ease: 'linear', repeat: Infinity },
        y: { type: 'tween', duration: duration, ease: 'linear', repeat: Infinity },
      }}
    >
      <Link href={item.href} className="w-full h-full flex items-center justify-center p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <BrandLogo brand={item} />
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Explore {item.name} Hotels</p>
          </TooltipContent>
        </Tooltip>
      </Link>
    </motion.div>
  );
}

export default function Hero() {
  const title = "Book India’s Top 5-Star Hotels with TripBookKar";
  const titleWords = title.split(" ");
  const [currentVideo, setCurrentVideo] = useState(0);

   useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
    }, 7000); // Change video every 7 seconds
    return () => clearTimeout(timer);
  }, [currentVideo]);

  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleWord = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };


  return (
    <section className="relative w-full h-screen min-h-[750px] md:min-h-[800px] overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
         <AnimatePresence>
            <motion.video
            key={heroVideos[currentVideo]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover"
            src={heroVideos[currentVideo]}
            autoPlay
            loop
            muted
            playsInline
            />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
      </div>


      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <TooltipProvider>
            {/* Desktop Orbits */}
            <div className="hidden lg:block">
                <motion.div
                    className="absolute rounded-full border-2 border-dashed border-white/10"
                    style={{ width: ORBIT_RADIUS_LG_OUTER * 2, height: ORBIT_RADIUS_LG_OUTER * 2, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 90, ease: 'linear' }}
                />
                 <motion.div
                    className="absolute rounded-full border border-dashed border-white/10"
                    style={{ width: ORBIT_RADIUS_LG_INNER * 2, height: ORBIT_RADIUS_LG_INNER * 2, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 70, ease: 'linear' }}
                />
                {outerOrbitPartners.map((item, i) => (
                    <OrbitingLogo key={`lg-outer-${item.slug}`} item={item} index={i} total={outerOrbitPartners.length} radius={ORBIT_RADIUS_LG_OUTER} duration={90} />
                ))}
                {innerOrbitPartners.map((item, i) => (
                    <OrbitingLogo key={`lg-inner-${item.slug}`} item={item} index={i} total={innerOrbitPartners.length} radius={ORBIT_RADIUS_LG_INNER} duration={70} />
                ))}
            </div>

             {/* Tablet Orbits */}
            <div className="hidden md:block lg:hidden">
                 <motion.div
                    className="absolute rounded-full border border-dashed border-white/10"
                    style={{ width: ORBIT_RADIUS_MD_OUTER * 2, height: ORBIT_RADIUS_MD_OUTER * 2, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
                 />
                  <motion.div
                    className="absolute rounded-full border border-dashed border-white/10"
                    style={{ width: ORBIT_RADIUS_MD_INNER * 2, height: ORBIT_RADIUS_MD_INNER * 2, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
                 />
                 {outerOrbitPartners.map((item, i) => (
                    <OrbitingLogo key={`md-outer-${item.slug}`} item={item} index={i} total={outerOrbitPartners.length} radius={ORBIT_RADIUS_MD_OUTER} duration={80} />
                 ))}
                  {innerOrbitPartners.map((item, i) => (
                    <OrbitingLogo key={`md-inner-${item.slug}`} item={item} index={i} total={innerOrbitPartners.length} radius={ORBIT_RADIUS_MD_INNER} duration={60} />
                 ))}
            </div>

             {/* Mobile Orbits */}
            <div className="block md:hidden">
                 <motion.div
                    className="absolute rounded-full border border-dashed border-white/10"
                    style={{ width: ORBIT_RADIUS_SM_OUTER * 2, height: ORBIT_RADIUS_SM_OUTER * 2, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 70, ease: 'linear' }}
                 />
                 <motion.div
                    className="absolute rounded-full border border-dashed border-white/10"
                    style={{ width: ORBIT_RADIUS_SM_INNER * 2, height: ORBIT_RADIUS_SM_INNER * 2, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
                 />
                 {outerOrbitPartners.map((item, i) => (
                    <OrbitingLogo key={`sm-outer-${item.slug}`} item={item} index={i} total={outerOrbitPartners.length} radius={ORBIT_RADIUS_SM_OUTER} duration={70} />
                 ))}
                 {innerOrbitPartners.map((item, i) => (
                    <OrbitingLogo key={`sm-inner-${item.slug}`} item={item} index={i} total={innerOrbitPartners.length} radius={ORBIT_RADIUS_SM_INNER} duration={50} />
                 ))}
            </div>
          </TooltipProvider>

          <motion.div
            className="relative flex items-center justify-center w-48 h-48"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.div 
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative w-40 h-40">
                <Image 
                    src="/generated-pages/TripBookKar1.png" 
                    alt="TripBookKar Logo" 
                    fill
                    className="object-contain"
                />
            </div>
          </motion.div>
        </div>
        
        <div className="relative z-20 mt-auto pb-20 md:pb-24 max-w-4xl">
            <motion.h1 
                className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-white drop-shadow-lg"
                variants={titleContainer}
                initial="hidden"
                animate="visible"
            >
              {titleWords.map((word, index) => (
                <motion.span key={index} variants={titleWord} className="inline-block mr-2.5">
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p 
                className="mt-4 max-w-xl mx-auto text-lg text-slate-200 drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                Exclusive luxury stays at unbeatable prices.
            </motion.p>
        </div>
      </div>
    </section>
  );
}
