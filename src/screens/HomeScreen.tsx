import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../data/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

type HomeNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
    const navigation = useNavigation<HomeNavigationProp>();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const navigateTo = (screen: keyof MainTabParamList) => {
        navigation.navigate(screen);
    };

    return (
        <Container safeArea={false} style={styles.container}>
            <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>

                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.95)']}
                        style={styles.heroOverlay}
                    />
                    {/* Decorative background circle */}
                    <View style={[styles.decorativeCircle, { top: -100, right: -100 }]} />

                    <Animated.View style={[styles.heroContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                        <View style={styles.badge}>
                            <Typography variant="caption" style={styles.badgeText}>OFFICIAL APP</Typography>
                        </View>
                        <Typography variant="h1" style={styles.heroTitle}>BEYOND DARKLANDS</Typography>
                        <Typography variant="body" style={styles.heroSubtitle}>
                            Everything you need for your festival experience in one place.
                        </Typography>
                    </Animated.View>
                </View>

                {/* Live Updates Notification */}
                <Animated.View style={[styles.notificationContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.notificationHeader}>
                        <View style={styles.liveIndicator} />
                        <Typography variant="caption" style={styles.liveText}>LIVE UPDATES</Typography>
                    </View>
                    <Typography variant="body" style={styles.notificationText}>
                        Welcome to Darklands 2026. Check the agenda for the latest schedule changes.
                    </Typography>
                </Animated.View>

                {/* Quick Actions Grid */}
                <View style={styles.gridContainer}>
                    <TouchableOpacity
                        style={[styles.gridItem, styles.gridItemLarge]}
                        onPress={() => navigateTo('Agenda')}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[colors.surface, colors.surfaceHighlight]}
                            style={styles.cardGradient}
                        >
                            <Ionicons name="calendar" size={32} color={colors.accent} />
                            <Typography variant="h2" style={styles.cardTitle}>PROGRAM</Typography>
                            <Typography variant="caption" style={styles.cardSubtitle}>BROWSE FULL SCHEDULE</Typography>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.gridItemSDK}
                            onPress={() => navigateTo('MyAgenda')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={[colors.surface, colors.surfaceHighlight]}
                                style={styles.cardGradient}
                            >
                                <Ionicons name="bookmark" size={24} color={colors.primary} />
                                <Typography variant="h3" style={styles.cardTitleSmall}>MY SCHEDULE</Typography>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.gridItemSDK}
                            onPress={() => alert('Info section coming soon')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={[colors.surface, colors.surfaceHighlight]}
                                style={styles.cardGradient}
                            >
                                <Ionicons name="information-circle-outline" size={24} color={colors.secondary} />
                                <Typography variant="h3" style={styles.cardTitleSmall}>INFO</Typography>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer/Sponsor Area */}
                <View style={styles.footer}>
                    <Typography variant="caption" style={styles.footerText}>ANTWERP, BELGIUM • MAR 03-09</Typography>
                </View>

            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    heroContainer: {
        height: 480,
        justifyContent: 'flex-end',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a', // Fallback
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    decorativeCircle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: colors.accent,
        position: 'absolute',
        opacity: 0.1,
        zIndex: 0,
    },
    heroContent: {
        zIndex: 2,
        marginBottom: 20,
    },
    badge: {
        backgroundColor: colors.accent,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 16,
    },
    badgeText: {
        color: '#000',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    heroTitle: {
        fontSize: 48,
        lineHeight: 52,
        marginBottom: 12,
        color: colors.primary,
    },
    heroSubtitle: {
        color: colors.secondary,
        maxWidth: '80%',
        fontSize: 18,
    },
    notificationContainer: {
        marginHorizontal: 16,
        marginTop: -30,
        marginBottom: 24,
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: colors.live,
        zIndex: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    liveIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.live,
        marginRight: 6,
    },
    liveText: {
        color: colors.live,
        fontWeight: 'bold',
    },
    notificationText: {
        color: colors.primary,
        fontSize: 14,
    },
    gridContainer: {
        paddingHorizontal: 16,
    },
    gridItem: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        height: 160,
    },
    gridItemLarge: {
        width: '100%',
    },
    cardGradient: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    cardTitle: {
        fontSize: 32,
        marginTop: 8,
        color: colors.primary,
    },
    cardTitleSmall: {
        marginTop: 8,
        fontSize: 18,
    },
    cardSubtitle: {
        color: colors.accent,
        marginTop: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gridItemSDK: {
        width: (width - 48) / 2,
        height: 140,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
    },
    footer: {
        padding: 24,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        marginHorizontal: 16,
        marginTop: 16,
    },
    footerText: {
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 2,
    },
});
