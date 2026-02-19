"use client";

import React, { useMemo, useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useFavorites } from '@/hooks/useFavorites';
import { Oswald } from 'next/font/google';
import { cn } from '@/utils/cn';
import { Filter, Bookmark, Plus, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const oswald = Oswald({ subsets: ["latin"] });

export default function MySchedulePage() {
    const { events } = useEvents();
    const { isFavorite, toggleFavorite } = useFavorites();

    const dates = useMemo(() => {
        const allDates = events.map(e => e.date);
        return Array.from(new Set(allDates)).sort();
    }, [events]);

    const [selectedDate, setSelectedDate] = useState(dates[0] || '');

    const savedEvents = useMemo(() => {
        return events
            .filter(e => isFavorite(e.id) && e.date === selectedDate)
            .sort((a, b) => (a.start || '').localeCompare(b.start || ''));
    }, [events, isFavorite, selectedDate]);

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return {
            name: days[d.getDay()],
            num: d.getDate().toString().padStart(2, '0')
        };
    };

    return (
        <div className="space-y-8 pt-6 px-4 max-w-lg mx-auto pb-40">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white bg-white/5">
                        <Filter size={18} />
                    </button>
                    <div className="w-10 h-10 bg-[#0A1A1A] flex items-center justify-center rounded border border-white/10 text-[#00E5FF]">
                        <div className="text-[6px] tracking-widest font-oswald text-center leading-tight">DRK<br />LNDS</div>
                    </div>
                </div>
                <h1 className={cn("text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-bold", oswald.className)}>
                    MY SCHEDULE
                </h1>
            </header>

            {/* Date Tabs (Screenshot style) */}
            <div className="grid grid-cols-3 gap-0 border border-zinc-800 rounded-none bg-black">
                {dates.slice(0, 3).map((dateStr) => {
                    const isSelected = selectedDate === dateStr;
                    const { name, num } = formatDate(dateStr);
                    return (
                        <button
                            key={dateStr}
                            onClick={() => setSelectedDate(dateStr)}
                            className={cn(
                                "py-4 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden",
                                isSelected
                                    ? "bg-white text-black"
                                    : "bg-transparent text-zinc-600 hover:text-zinc-400"
                            )}
                        >
                            <span className="text-[10px] font-black tracking-widest uppercase mb-1">{name}</span>
                            <span className={cn("text-2xl font-black", oswald.className)}>{num}</span>
                            {isSelected && (
                                <div className="absolute top-0 right-0 w-3 h-3 bg-black transform rotate-45 translate-x-1.5 -translate-y-1.5" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Timeline View */}
            <div className="relative pl-6 space-y-12 py-4">
                {/* Vertical Line */}
                <div className="absolute left-[3px] top-4 bottom-0 w-[1px] bg-zinc-800" />

                <AnimatePresence mode="popLayout">
                    {savedEvents.map((event, idx) => {
                        const isFirst = idx === 0;
                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="relative pb-8"
                            >
                                {/* Timeline Node */}
                                <div className={cn(
                                    "absolute -left-[27px] top-1.5 w-1.5 h-1.5 rounded-sm z-10",
                                    isFirst ? "bg-[#FF003C] shadow-[0_0_10px_#FF003C]" : "bg-zinc-700"
                                )} />
                                {isFirst && (
                                    <div className="absolute -left-[27px] top-1.5 w-1.5 h-[100px] bg-gradient-to-b from-[#FF003C] to-transparent opacity-50 blur-[1px]" />
                                )}

                                <div className="space-y-4">
                                    <div className="flex items-baseline gap-3">
                                        <span className={cn("text-3xl font-black text-white", oswald.className)}>{event.start}</span>
                                        <span className="text-sm font-bold text-zinc-600 tracking-widest uppercase">{event.end}</span>
                                        {isFirst && (
                                            <div className="ml-auto px-2 py-0.5 bg-[#FF003C]/20 border border-[#FF003C]/50 text-[#FF003C] text-[8px] font-black tracking-widest rounded-sm uppercase animate-pulse">
                                                LIVE NOW
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        href={`/agenda/${event.id}`}
                                        className="flex bg-[#121212] border border-zinc-900 group shadow-2xl relative overflow-hidden h-32"
                                    >
                                        {/* Image Placeholder */}
                                        <div className="w-32 h-full bg-zinc-900/50 flex items-center justify-center border-r border-zinc-900 group-hover:bg-zinc-800/50 transition-colors">
                                            {/* In real app, next/image here */}
                                            <div className="text-zinc-700 transform group-hover:scale-110 transition-transform duration-500">
                                                {/* Fallback pattern */}
                                                <div className="w-10 h-10 rounded-full bg-zinc-800" />
                                            </div>
                                        </div>

                                        <div className="flex-1 p-5 flex flex-col justify-between relative">
                                            <div>
                                                <h3 className={cn("text-2xl font-black text-white group-hover:text-white/80 transition-colors leading-[0.9] uppercase mb-2", oswald.className)}>
                                                    {event.title}
                                                </h3>
                                                <div className="flex flex-col gap-1 text-zinc-500 text-[9px] font-bold tracking-widest uppercase">
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin size={10} className="text-zinc-600" />
                                                        {event.area} • STAGE 1
                                                    </div>
                                                    <div className="inline-flex px-1.5 py-0.5 border border-zinc-800 text-zinc-600 w-fit mt-1">
                                                        {event.type}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleFavorite(event.id);
                                                }}
                                                className="absolute bottom-5 right-5 px-3 py-1.5 border border-zinc-800 text-[8px] font-black text-white hover:bg-white hover:text-black transition-all uppercase"
                                            >
                                                REMOVE
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Free Window (Dashed box from screenshot) */}
                <div className="relative pt-8">
                    {/* Node */}
                    <div className="absolute -left-[27px] top-9 w-1.5 h-1.5 bg-zinc-700 rounded-sm z-10" />

                    <div className="space-y-4">
                        <div className="flex items-baseline gap-3 opacity-50">
                            <span className={cn("text-3xl font-black text-white", oswald.className)}>01:30</span>
                            <span className="text-sm font-bold text-zinc-600 tracking-widest uppercase">05:00</span>
                        </div>

                        <div className="flex flex-col items-center justify-center py-12 border border-dashed border-zinc-800 bg-black/50 gap-4 group hover:border-zinc-700 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-[#121212] flex items-center justify-center text-zinc-700 group-hover:text-white transition-colors group-hover:scale-110 duration-300">
                                <Plus size={20} />
                            </div>
                            <div className="text-center space-y-1">
                                <span className="block text-[8px] font-black text-zinc-600 tracking-[0.3em] uppercase group-hover:text-zinc-500 transition-colors">FREE WINDOW</span>
                                <span className={cn("block text-xl font-black text-zinc-500 uppercase group-hover:text-zinc-300 transition-colors", oswald.className)}>01:30 - 05:00</span>
                            </div>
                            <Link
                                href="/agenda"
                                className="mt-2 px-6 py-3 border border-zinc-800 text-[9px] font-black text-zinc-400 tracking-widest uppercase hover:text-white hover:border-zinc-600 transition-all"
                            >
                                DISCOVER EVENTS
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
