import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { colors } from '../theme/colors';
import { Event } from '../data/types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface EventCardProps {
    event: Event & { isFavorite?: boolean };
    onPress: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
    // Generate a consistent color based on event type
    const getCategoryColor = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes('party')) return colors.live; // Red
        if (t.includes('workshop')) return colors.accent; // Cyan
        if (t.includes('social')) return colors.gold; // Gold
        return colors.primary; // White
    };

    const categoryColor = getCategoryColor(event.type);

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
            <View style={[styles.borderStrip, { backgroundColor: categoryColor }]} />

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <View style={styles.categoryBadge}>
                        <Typography variant="caption" style={[styles.categoryText, { color: categoryColor }]}>
                            {event.type.toUpperCase()}
                        </Typography>
                    </View>
                    {event.isFavorite && (
                        <Ionicons name="heart" size={18} color={colors.live} />
                    )}
                </View>

                <Typography variant="h2" style={styles.title} numberOfLines={2}>{event.title}</Typography>

                <View style={styles.metaRow}>
                    <Typography variant="body" style={styles.time}>{event.start} - {event.end}</Typography>
                    <Typography variant="caption" style={styles.location}> / {event.area.toUpperCase()}</Typography>
                </View>

                {/* Progress bar simulation for aesthetic */}
                {event.title.includes("Opening") && (
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBarFill, { width: '40%', backgroundColor: colors.live }]} />
                        <View style={styles.progressTextRow}>
                            <Typography variant="caption" style={{ fontSize: 8, color: colors.secondary }}>STARTED 45M AGO</Typography>
                            <Typography variant="caption" style={{ fontSize: 8, color: colors.secondary }}>REMAINING: 15M</Typography>
                        </View>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        borderRadius: 0, // Squared corners
        backgroundColor: '#0a0a0a', // Almost black
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    borderStrip: {
        width: 4,
        height: '100%',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    categoryBadge: {
        paddingHorizontal: 0,
    },
    categoryText: {
        fontSize: 10,
        letterSpacing: 1.5,
        fontWeight: 'bold',
    },
    title: {
        color: colors.primary,
        fontSize: 24, // Bigger title
        lineHeight: 26,
        marginBottom: 8,
        fontStyle: 'italic', // Slanted look
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 4,
    },
    time: {
        color: colors.gold,
        fontSize: 14,
        fontWeight: 'bold',
    },
    location: {
        color: colors.secondary,
        fontSize: 12,
        marginLeft: 4,
    },
    progressBarContainer: {
        marginTop: 12,
    },
    progressBarFill: {
        height: 2,
        marginBottom: 4,
    },
    progressTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
