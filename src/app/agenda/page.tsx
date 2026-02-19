"use client";

import React, { useMemo, useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useFavorites } from '@/hooks/useFavorites';
import { Oswald } from 'next/font/google';
import { cn } from '@/utils/cn';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const oswald = Oswald({ subsets: ["latin"] });

export default function AgendaPage() {
    const { events } = useEvents();
    const { isFavorite, toggleFavorite } = useFavorites();

    const dates = useMemo(() => {
        const allDates = events.map(e => e.date);
        return Array.from(new Set(allDates)).sort();
    }, [events]);

    const [selectedDate, setSelectedDate] = useState(dates[0] || '');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const filteredEvents = useMemo(() => {
        let filtered = events.filter(e => e.date === selectedDate);
        if (selectedCategory === 'PARTIES') {
            filtered = filtered.filter(e => e.type.toUpperCase() === 'PARTY');
        } else if (selectedCategory === 'WORKSHOPS') {
            filtered = filtered.filter(e => e.type.toUpperCase() === 'WORKSHOP');
        }
        return filtered;
    }, [selectedDate, selectedCategory, events]);

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return {
            name: days[d.getDay()],
            num: d.getDate().toString().padStart(2, '0')
        };
    };

    const getCategoryStyles = (type: string) => {
        const t = type.toUpperCase();
        if (t === 'PARTY') return { color: '#FF003C', border: 'border-l-[#FF003C]' };
        if (t === 'SOCIAL') return { color: '#D4AF37', border: 'border-l-[#D4AF37]' };
        if (t === 'WORKSHOP') return { color: '#00E5FF', border: 'border-l-[#00E5FF]' };
        return { color: '#FFFFFF', border: 'border-l-zinc-700' };
    };

    return (
        <div className="space-y-6 pt-6 px-4 max-w-lg mx-auto pb-40">
            {/* Header */}
            <header className="space-y-1">
                <h1 className={cn("text-6xl font-black tracking-widest text-white uppercase leading-none", oswald.className)}>
                    AGENDA
                </h1>
                <div className="text-[10px] tracking-[0.4em] text-[#D4AF37] font-bold uppercase pl-1">
                    ANTWERP • BELGIUM
                </div>
            </header>

            {/* Date Selector */}
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-2">
                {dates.map((dateStr) => {
                    const isSelected = selectedDate === dateStr;
                    const { name, num } = formatDate(dateStr);
                    return (
                        <button
                            key={dateStr}
                            onClick={() => setSelectedDate(dateStr)}
                            className={cn(
                                "flex flex-col items-center justify-center min-w-[72px] h-[86px] rounded-none border-2 transition-all duration-300",
                                isSelected
                                    ? "bg-[#121212] border-[#D4AF37] text-white"
                                    : "bg-transparent border-zinc-900 text-zinc-600 hover:border-zinc-800"
                            )}
                        >
                            <span className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", isSelected ? "text-[#D4AF37]" : "text-zinc-600")}>
                                {name}
                            </span>
                            <span className={cn("text-4xl font-black leading-none", oswald.className)}>
                                {num}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2">
                {['ALL', 'PARTIES', 'WORKSHOPS'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-5 py-2 text-[11px] font-black tracking-widest uppercase border transition-all",
                            selectedCategory === cat
                                ? "bg-white text-black border-white"
                                : "bg-[#0A0A0A] text-zinc-500 border-zinc-900 hover:text-white"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 pt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF003C] animate-pulse" />
                <span className={cn("text-[11px] font-black tracking-[0.2em] text-[#FF003C] uppercase", oswald.className)}>
                    LIVE NOW
                </span>
            </div>

            {/* Events List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredEvents.map((event) => {
                        const isFav = isFavorite(event.id);
                        const styles = getCategoryStyles(event.type);

                        return (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <Link
                                    href={`/agenda/${event.id}`}
                                    className={cn(
                                        "block relative bg-black border-y border-r border-zinc-900 border-l-[6px] p-6 group transition-all hover:bg-[#0A0A0A]",
                                        styles.border
                                    )}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2.5">
                                            <div className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: styles.color }}>
                                                {event.type}
                                            </div>

                                            <h3 className={cn("text-[32px] font-black text-white italic uppercase leading-[0.85] tracking-tight", oswald.className)}>
                                                {event.title}
                                            </h3>

                                            <div className="flex items-baseline gap-2 pt-1">
                                                <span className="text-[14px] font-bold text-[#D4AF37] tracking-widest uppercase">
                                                    {event.start} - {event.end}
                                                </span>
                                                <span className="text-zinc-700 font-bold">/</span>
                                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.1em]">
                                                    {event.area}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleFavorite(event.id);
                                            }}
                                            className="p-1 -mt-1 -mr-1"
                                        >
                                            <Heart
                                                size={20}
                                                className={cn(
                                                    "transition-all duration-300",
                                                    isFav ? "fill-[#FF003C] text-[#FF003C] scale-110" : "text-zinc-800 hover:text-white"
                                                )}
                                                strokeWidth={3}
                                            />
                                        </button>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
