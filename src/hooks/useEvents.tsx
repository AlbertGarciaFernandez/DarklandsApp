import React, { createContext, useContext, useState, useEffect } from 'react';
import initialEvents from '../data/events.json';
import { Event } from '../data/types';

interface EventsContextType {
    events: Event[];
    updateEvents: (newEvents: Event[]) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>(initialEvents);

    const updateEvents = (newEvents: Event[]) => {
        setEvents(newEvents);
    };

    return (
        <EventsContext.Provider value={{ events, updateEvents }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventsProvider');
    }
    return context;
};
