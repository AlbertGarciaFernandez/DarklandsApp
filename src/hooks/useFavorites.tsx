import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextType {
    favorites: string[];
    toggleFavorite: (eventId: string) => void;
    isFavorite: (eventId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem('favorites');
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load favorites', e);
        }
    };

    const saveFavorites = async (newFavorites: string[]) => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (e) {
            console.error('Failed to save favorites', e);
        }
    };

    const toggleFavorite = (eventId: string) => {
        const newFavorites = favorites.includes(eventId)
            ? favorites.filter(id => id !== eventId)
            : [...favorites, eventId];

        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const isFavorite = (eventId: string) => favorites.includes(eventId);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
