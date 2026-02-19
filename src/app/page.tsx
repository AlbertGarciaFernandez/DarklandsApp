"use client";

import React from 'react';
import { Oswald } from 'next/font/google';
import { cn } from '@/utils/cn';
import { Calendar, Bookmark, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const oswald = Oswald({ subsets: ["latin"] });

export default function HomePage() {
    return (
        <div className="pt-12 pb-20 space-y-10 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-[#00E5FF] text-black text-[10px] font-black tracking-widest uppercase rounded-sm">
                    OFFICIAL APP
                </div>

                <h1 className={cn("text-[64px] font-black text-white leading-[0.85] uppercase tracking-tighter", oswald.className)}>
                    BEYOND<br />DARKLANDS
                </h1>

                <p className="text-zinc-500 text-lg max-w-[280px] leading-snug">
                    Everything you need for your festival experience in one place.
                </p>
            </div>

            {/* Live Updates Card */}
            <div className="relative bg-[#121212] border-l-[4px] border-[#FF003C] p-6 rounded-xl overflow-hidden group">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF003C] animate-pulse" />
                    <span className="text-[10px] font-black tracking-widest text-[#FF003C] uppercase">
                        LIVE UPDATES
                    </span>
                </div>
                <p className="text-white text-sm leading-relaxed">
                    Welcome to Darklands 2026. Check the agenda for the latest schedule changes.
                </p>
            </div>

            {/* Grid Menu */}
            <div className="grid grid-cols-2 gap-4">
                {/* Full Width Program Card */}
                <Link
                    href="/agenda"
                    className="col-span-2 bg-[#121212] p-8 rounded-2xl border border-zinc-900 hover:border-zinc-700 transition-all group"
                >
                    <div className="p-3 bg-[#00E5FF] text-black rounded-lg w-fit mb-6 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                        <Calendar size={24} strokeWidth={3} />
                    </div>
                    <h2 className={cn("text-[40px] font-black text-white uppercase leading-none mb-2", oswald.className)}>
                        PROGRAM
                    </h2>
                    <div className="flex items-center gap-2 text-[#00E5FF] text-[10px] font-black tracking-widest uppercase">
                        BROWSE FULL SCHEDULE <ArrowRight size={12} strokeWidth={3} />
                    </div>
                </Link>

                {/* Smaller Half Width Cards */}
                <Link
                    href="/my-agenda"
                    className="bg-[#121212] p-6 rounded-2xl border border-zinc-900 hover:border-zinc-700 transition-all flex flex-col justify-between aspect-square"
                >
                    <div className="text-white mb-4">
                        <Bookmark size={24} strokeWidth={3} />
                    </div>
                    <h2 className={cn("text-xl font-black text-white uppercase leading-tight", oswald.className)}>
                        MY<br />SCHEDULE
                    </h2>
                </Link>

                <Link
                    href="/admin"
                    className="bg-[#121212] p-6 rounded-2xl border border-zinc-900 hover:border-zinc-700 transition-all flex flex-col justify-between aspect-square"
                >
                    <div className="text-zinc-500 mb-4">
                        <Info size={24} strokeWidth={3} />
                    </div>
                    <h2 className={cn("text-xl font-black text-white uppercase leading-tight", oswald.className)}>
                        INFO
                    </h2>
                </Link>
            </div>

            {/* Footer Text */}
            <div className="pt-8 text-center">
                <div className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em]">
                    ANTWERP, BELGIUM • MAR 03-09
                </div>
            </div>
        </div>
    );
}
