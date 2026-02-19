"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Bookmark, Settings } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const navItems = [
        { name: 'HOME', href: '/', icon: Home },
        { name: 'AGENDA', href: '/agenda', icon: Calendar },
        { name: 'SCHEDULE', href: '/my-agenda', icon: Bookmark },
        { name: 'INFO', href: '/admin', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent-blue/30 overflow-x-hidden">
            {/* Main Content */}
            <main className="pb-32 min-h-screen">
                <div className="max-w-xl mx-auto px-6">
                    {children}
                </div>
            </main>

            {/* Bottom Navigation (Matches Screenshot) */}
            <div className="fixed bottom-0 left-0 right-0 z-[60] bg-black border-t border-zinc-900 h-20">
                <nav className="h-full flex justify-between items-stretch max-w-lg mx-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex-1 flex flex-col items-center justify-center gap-1 transition-all relative",
                                    isActive ? "border-t-[3px] border-[#D4AF37] -mt-[0px]" : "border-t-[3px] border-transparent"
                                )}
                            >
                                <div className={cn(
                                    "p-1.5 rounded-md transition-all",
                                    isActive ? "bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]" : "text-zinc-600"
                                )}>
                                    <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                                </div>
                                <span className={cn(
                                    "text-[8px] font-black tracking-widest uppercase",
                                    isActive ? "text-white" : "text-zinc-600"
                                )}>
                                    {item.name.split(' ')[0]}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};
