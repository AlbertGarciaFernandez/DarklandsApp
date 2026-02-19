import React, { useState, useMemo } from 'react';
import { StyleSheet, FlatList, View, Animated, TouchableOpacity } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { EventCard } from '../components/EventCard';
import { DayFilter } from '../components/DayFilter';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../data/types';
import { useFavorites } from '../hooks/useFavorites';
import { useEvents } from '../hooks/useEvents';
import { Event } from '../data/types';
import { colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainStatus'>;

export const AgendaScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { isFavorite } = useFavorites();
    const { events } = useEvents();

    const dates = useMemo(() => {
        const allDates = events.map(e => e.date);
        return Array.from(new Set(allDates)).sort();
    }, [events]);

    const [selectedDate, setSelectedDate] = useState(dates[0] || '');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const categories = ['ALL', 'PARTIES', 'WORKSHOPS'];

    const filteredEvents = useMemo(() => {
        let filtered = events.filter(e => e.date === selectedDate);

        if (selectedCategory === 'PARTIES') {
            filtered = filtered.filter(e => e.type === 'Party');
        } else if (selectedCategory === 'WORKSHOPS') {
            filtered = filtered.filter(e => e.type === 'Workshop');
        }

        return filtered;
    }, [selectedDate, selectedCategory, events]);

    const handleEventPress = (event: Event) => {
        navigation.navigate('EventDetails', { eventId: event.id });
    };

    const renderItem = ({ item }: { item: Event }) => {
        const eventWithFav = { ...item, isFavorite: isFavorite(item.id) };
        return <EventCard event={eventWithFav} onPress={() => handleEventPress(item)} />;
    };

    const ListHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.topBar}>
                <View style={styles.logoBox}>
                    {/* Placeholder for small logo */}
                </View>
                <Typography variant="h1" style={styles.screenTitle}>AGENDA</Typography>
                <Typography variant="caption" style={styles.subLocation}>ANTWERP • BELGIUM</Typography>
            </View>

            <View style={styles.filterWrapper}>
                <DayFilter
                    dates={dates}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                />
            </View>

            <View style={styles.filterTabs}>
                {categories.map(cat => {
                    const isActive = selectedCategory === cat;
                    return (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setSelectedCategory(cat)}
                            style={isActive ? styles.filterTabActive : styles.filterTab}
                        >
                            <Typography variant="caption" style={{
                                color: isActive ? colors.background : colors.secondary,
                                fontWeight: isActive ? 'bold' : 'normal'
                            }}>
                                {cat}
                            </Typography>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.liveNowHeader}>
                <View style={styles.redDot} />
                <Typography variant="h3" style={{ color: colors.live, fontSize: 16 }}>LIVE NOW</Typography>
            </View>
        </View>
    );

    return (
        <Container safeArea={true} style={styles.container}>
            <FlatList
                data={filteredEvents}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={ListHeader}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        backgroundColor: colors.background,
    },
    headerContainer: {
        backgroundColor: colors.background,
        paddingBottom: 16,
    },
    topBar: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    logoBox: {
        width: 40,
        height: 20,
        backgroundColor: '#1a1a1a',
        marginBottom: 8,
    },
    screenTitle: {
        fontSize: 42,
        lineHeight: 42,
        color: colors.primary,
        letterSpacing: 2,
    },
    subLocation: {
        color: colors.gold,
        letterSpacing: 4,
        marginTop: 4,
        fontSize: 10,
    },
    filterWrapper: {
        marginBottom: 16,
    },
    filterTabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 8,
        marginBottom: 24,
    },
    filterTab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 2,
    },
    filterTabActive: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.primary,
        borderRadius: 2,
    },
    liveNowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    redDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.live,
        marginRight: 8,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
});
