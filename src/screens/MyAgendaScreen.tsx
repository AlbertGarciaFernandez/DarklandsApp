import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { EventCard } from '../components/EventCard';
import { useFavorites } from '../hooks/useFavorites';
import { useEvents } from '../hooks/useEvents';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../data/types';
import { Event } from '../data/types';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type StackProp = NativeStackNavigationProp<RootStackParamList, 'MainStatus'>;
type TabProp = BottomTabNavigationProp<MainTabParamList>;

export const MyAgendaScreen = () => {
    const { isFavorite, favorites } = useFavorites();
    const { events } = useEvents();
    const navigation = useNavigation<StackProp>();
    const tabNavigation = useNavigation<TabProp>();

    const dates = React.useMemo(() => {
        const allDates = events.map(e => e.date);
        return Array.from(new Set(allDates)).sort();
    }, [events]);

    const [selectedDate, setSelectedDate] = React.useState(dates[0] || '');

    const favoriteEvents = events
        .filter(e => isFavorite(e.id) && e.date === selectedDate)
        .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.start || '00:00'}`);
            const dateB = new Date(`${b.date}T${b.start || '00:00'}`);
            return dateA.getTime() - dateB.getTime();
        });

    const handleEventPress = (event: Event) => {
        navigation.navigate('EventDetails', { eventId: event.id });
    };

    const formatDateShort = (dateString: string) => {
        const [y, m, d] = dateString.split('-').map(Number);
        const dateObj = new Date(y, m - 1, d);
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return {
            day: days[dateObj.getDay()],
            num: d < 10 ? `0${d}` : `${d}`
        };
    };

    const renderItem = ({ item }: { item: Event }) => {
        return (
            <View style={styles.timelineItem}>
                {/* Timeline Axis */}
                <View style={styles.timelineAxis}>
                    <Typography variant="h3" style={{ fontSize: 18, color: colors.primary }}>{item.start}</Typography>
                    <Typography variant="caption" style={{ color: colors.secondary }}>{item.end}</Typography>

                    {/* Dashed Line */}
                    <View style={styles.dashLine} />
                </View>

                {/* Card Content */}
                <View style={{ flex: 1 }}>
                    <EventCard event={{ ...item, isFavorite: true }} onPress={() => handleEventPress(item)} />
                </View>
            </View>
        );
    };

    return (
        <Container safeArea={true} style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: 24 }} /> {/* spacer */}
                <Typography variant="caption" style={styles.headerTitle}>MY SCHEDULE</Typography>
                <TouchableOpacity onPress={() => alert('Filter')}>
                    <View style={styles.filterIcon}>
                        <Ionicons name="options" size={16} color={colors.primary} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Date Tabs */}
            <View style={styles.dateTabs}>
                {dates.map((dateStr) => {
                    const isActive = selectedDate === dateStr;
                    const { day, num } = formatDateShort(dateStr);
                    return (
                        <TouchableOpacity
                            key={dateStr}
                            onPress={() => setSelectedDate(dateStr)}
                            style={isActive ? styles.tabActive : styles.tabInactive}
                        >
                            <Typography variant="caption" style={{
                                fontWeight: isActive ? 'bold' : 'normal',
                                color: isActive ? '#000' : colors.secondary
                            }}>
                                {day} {num}
                            </Typography>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {favoriteEvents.length === 0 ? (
                <View style={styles.emptyState}>
                    <View style={styles.dashBox}>
                        <View style={styles.plusCircle}>
                            <Ionicons name="add" size={24} color={colors.secondary} />
                        </View>
                        <Typography variant="caption" style={{ color: colors.secondary, marginTop: 16 }}>FREE WINDOW</Typography>
                        <Typography variant="h3" style={{ color: colors.primary }}>{selectedDate ? 'Nothing scheduled' : '01:30 - 05:00'}</Typography>
                        <TouchableOpacity
                            style={styles.discoverButton}
                            onPress={() => tabNavigation.navigate('Agenda')}
                        >
                            <Typography variant="caption" style={{ color: colors.primary }}>DISCOVER EVENTS</Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={favoriteEvents}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 16,
    },
    headerTitle: {
        letterSpacing: 2,
        fontSize: 14,
        color: colors.secondary,
    },
    filterIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.surfaceHighlight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateTabs: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 24,
        gap: 8,
    },
    tabActive: {
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        transform: [{ skewX: '-10deg' }],
    },
    tabInactive: {
        backgroundColor: '#1E1E1E',
        paddingVertical: 8,
        paddingHorizontal: 16,
        transform: [{ skewX: '-10deg' }],
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    timelineItem: {
        flexDirection: 'row',
    },
    timelineAxis: {
        width: 60,
        marginRight: 16,
        alignItems: 'flex-start',
    },
    dashLine: {
        width: 1,
        flex: 1,
        backgroundColor: colors.border,
        borderStyle: 'dashed',
        marginTop: 8,
        marginLeft: 4,
    },
    emptyState: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    dashBox: {
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    plusCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.surfaceHighlight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discoverButton: {
        marginTop: 24,
        borderWidth: 1,
        borderColor: colors.secondary,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
});
