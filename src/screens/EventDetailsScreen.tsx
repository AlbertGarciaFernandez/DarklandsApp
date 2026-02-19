import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFavorites } from '../hooks/useFavorites';
import { useEvents } from '../hooks/useEvents';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '../hooks/useToast';

export const EventDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { eventId } = route.params as { eventId: string };
    const { toggleFavorite, isFavorite } = useFavorites();
    const { events } = useEvents();
    const { showToast } = useToast();

    const event = events.find(e => e.id === eventId);
    const isFav = isFavorite(eventId);

    const handleToggleFavorite = () => {
        toggleFavorite(eventId);
        if (!isFav) {
            showToast('Event added to your schedule', 'success');
        } else {
            showToast('Event removed from schedule', 'info');
        }
    };

    if (!event) return null;

    return (
        <Container safeArea={false} style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={colors.primary} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Ionicons name="heart-outline" size={24} color={colors.primary} />
                    <Ionicons name="share-social-outline" size={24} color={colors.primary} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Immersive Header Image Background simulation */}
                <View style={styles.heroContainer}>
                    {/* In a real app, use ImageBackground here */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.3)', colors.background]}
                        style={styles.heroGradient}
                    />

                    <View style={styles.heroContent}>
                        <View style={styles.headlineTag}>
                            <Typography variant="caption" style={styles.headlineText}>HEADLINE EVENT</Typography>
                        </View>
                        <Typography variant="h1" style={styles.title}>{event.title}</Typography>
                    </View>
                </View>

                {/* Info Grid */}
                <View style={styles.infoGrid}>
                    <View style={styles.gridItem}>
                        <Ionicons name="time" size={20} color={colors.accent} style={{ marginBottom: 8 }} />
                        <Typography variant="caption" style={{ color: colors.secondary }}>TIME</Typography>
                        <Typography variant="h3" style={{ color: colors.primary }}>{event.start} - {event.end}</Typography>
                    </View>
                    <View style={[styles.gridItem, { borderLeftWidth: 1, borderLeftColor: colors.border }]}>
                        <Ionicons name="location" size={20} color={colors.accent} style={{ marginBottom: 8 }} />
                        <Typography variant="caption" style={{ color: colors.secondary }}>LOCATION</Typography>
                        <Typography variant="h3" style={{ color: colors.primary }}>{event.area}</Typography>
                    </View>
                </View>

                {/* Description Divider */}
                <View style={styles.divider}>
                    <View style={{ width: 24, height: 2, backgroundColor: colors.accent, marginRight: 8 }} />
                    <Typography variant="h3" style={{ color: colors.primary, fontSize: 16 }}>DESCRIPTION</Typography>
                </View>

                <Typography variant="body" style={styles.description}>
                    {event.description || 'Kick off the festival with an explosive start. The Opening Night sets the tone for the entire week, featuring world class DJs and an immersive light show.'}
                </Typography>

                {/* Action Button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleToggleFavorite}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={[colors.accent, '#00C4E6']} // Teal gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.allowButtonGradient}
                    >
                        <Ionicons name={isFav ? "checkmark" : "add"} size={24} color="#000" style={{ marginRight: 8 }} />
                        <Typography variant="button" style={{ color: '#000', fontSize: 16 }}>
                            {isFav ? "ADDED TO SCHEDULE" : "ADD TO SCHEDULE"}
                        </Typography>
                    </LinearGradient>
                </TouchableOpacity>

            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroContainer: {
        height: 420,
        justifyContent: 'flex-end',
        padding: 24,
        position: 'relative',
        backgroundColor: '#1a1a1a', // Fallback for image
    },
    heroGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    topBar: {
        position: 'absolute',
        top: 20, // Adjusted for web/safe area
        left: 24,
        right: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 99, // Ensure it's on top
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        marginBottom: 24,
    },
    headlineTag: {
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    headlineText: {
        color: colors.background,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    title: {
        fontSize: 48,
        lineHeight: 48,
        color: colors.primary,
        fontStyle: 'italic',
    },
    infoGrid: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.border,
        height: 100,
    },
    gridItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    description: {
        paddingHorizontal: 24,
        color: colors.secondary,
        lineHeight: 24,
        marginBottom: 32,
    },
    addButton: {
        marginHorizontal: 16,
        borderRadius: 4,
        overflow: 'hidden',
        height: 56,
    },
    allowButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
