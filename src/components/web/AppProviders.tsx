"use client";

import React, { useState } from 'react';
import { EventsProvider } from '@/hooks/useEvents';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { Layout } from '@/components/web/Layout';

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <EventsProvider>
            <FavoritesProvider>
                <Layout>
                    {children}
                </Layout>
            </FavoritesProvider>
        </EventsProvider>
    );
}
