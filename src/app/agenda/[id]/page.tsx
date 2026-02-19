"use client";

import React from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useFavorites } from '@/hooks/useFavorites';
import { useParams, useRouter } from 'next/navigation';
import { Oswald } from 'next/font/google';
import { cn } from '@/utils/cn';
import { ArrowLeft, Clock, MapPin, Share2, Plus, Calendar, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const oswald = Oswald({ subsets: ["latin"] });

export default function EventDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { events } = useEvents();
    const { isFavorite, toggleFavorite } = useFavorites();

    const id = params.id as string;
    const event = events.find(e => e.id === id);

    if (!event) return <div className="p-8 text-white">Event not found</div>;

    const isFav = isFavorite(id);

    return (
        <div className="min-h-screen bg-black pb-32 relative">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="fixed top-6 left-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors"
            >
                <ArrowLeft size={20} />
            </button>

            {/* Share Button */}
            <button
                className="fixed top-6 right-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-colors"
            >
                <Share2 size={18} />
            </button>

            {/* Immersive Hero Section */}
            <div className="relative w-full h-[70vh] overflow-hidden">
                {/* Image Placeholder / Gradient */}
                <div className="absolute inset-0 bg-zinc-900">
                    {/* Fallback pattern */}
                    <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-700 via-black to-black" />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content aligned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[8px] font-black tracking-[0.2em] uppercase rounded-sm">
                            {event.type}
                        </span>
                        <div className="flex items-center gap-1 text-[8px] font-black tracking-[0.2em] text-[#00E5FF] uppercase">
                            <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-pulse" />
                            RECOMMENDED
                        </div>
                    </div>

                    <h1 className={cn("text-5xl font-black text-white leading-[0.9] uppercase", oswald.className)}>
                        {event.title}
                    </h1>

                    <div className="flex flex-col gap-2 pt-2">
                        <div className="flex items-center gap-3 text-zinc-300">
                            <Calendar size={14} className="text-zinc-500" />
                            <span className="text-xs font-bold tracking-widest uppercase">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-300">
                            <Clock size={14} className="text-zinc-500" />
                            <span className="text-xs font-bold tracking-widest uppercase">{event.start} - {event.end}</span>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-300">
                            <MapPin size={14} className="text-zinc-500" />
                            <span className="text-xs font-bold tracking-widest uppercase">{event.area}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-6 py-8 space-y-10">
                {/* Description */}
                <div className="space-y-4">
                    <h3 className={cn("text-lg font-black text-white uppercase tracking-widest border-l-2 border-[#D4AF37] pl-3", oswald.className)}>
                        ABOUT THE EVENT
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light">
                        {event.description || "Experience the ultimate underground atmosphere with improved sound systems and immersive light shows. This event brings together the best of the scene for a night of unforgettable energy."}
                    </p>
                </div>

                {/* Performers / Lineup (Mock) */}
                <div className="space-y-4">
                    <h3 className={cn("text-lg font-black text-white uppercase tracking-widest border-l-2 border-[#D4AF37] pl-3", oswald.className)}>
                        LINEUP
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['DJ AXON', 'NIGHTBOUND', 'KINETIC', 'VOID'].map((artist) => (
                            <div key={artist} className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-zinc-900" />
                                <span className="text-[10px] font-black tracking-widest text-white">{artist}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-0 left-0 right-0 z-40 p-6 pt-24 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none">
                <div className="max-w-md mx-auto pointer-events-auto">
                    <button
                        onClick={() => toggleFavorite(id)}
                        className={cn(
                            "w-full h-14 rounded-full flex items-center justify-center gap-3 text-[10px] font-black tracking-[0.2em] transition-all uppercase shadow-2xl relative overflow-hidden group",
                            isFav
                                ? "bg-zinc-900 border border-zinc-800 text-zinc-500"
                                : "bg-white text-black hover:bg-zinc-200"
                        )}
                    >
                        {/* Glow effect for main button */}
                        {!isFav && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
                        )}

                        {isFav ? (
                            <>
                                <Check size={16} strokeWidth={3} />
                                ADDED TO SCHEDULE
                            </>
                        ) : (
                            <>
                                <Plus size={16} strokeWidth={3} />
                                ADD TO SCHEDULE
                            </>
                        )}
                    </button>
                    {/* Secondary text if favorite */}
                    {isFav && (
                        <div className="text-center mt-3">
                            <button onClick={() => toggleFavorite(id)} className="text-[8px] font-bold text-zinc-600 tracking-widest uppercase hover:text-red-500 transition-colors">
                                REMOVE FROM SCHEDULE
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
