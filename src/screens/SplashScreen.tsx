import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../theme/colors';
import { Typography } from '../components/Typography';

interface SplashScreenProps {
    onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }).start(onFinish);
            }, 2000);
        });
    }, [fadeAnim, scaleAnim, onFinish]);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
                {/* Placeholder for Logo - replaced by Typographic Logo for now */}
                <Typography variant="h1" style={styles.logoText}>DARKLANDS</Typography>
                <View style={styles.separator} />
                <Typography variant="caption" style={styles.subText}>OFFICIAL EXPERIENCE</Typography>
                <Typography variant="caption" style={styles.yearText}>2026</Typography>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 56,
        letterSpacing: 2,
        color: colors.primary,
        fontWeight: '900', // Extra bold if available
        textAlign: 'center',
    },
    separator: {
        width: 60,
        height: 4,
        backgroundColor: colors.accent,
        marginVertical: 24,
    },
    subText: {
        fontSize: 14,
        letterSpacing: 6,
        color: colors.secondary,
        marginBottom: 8,
    },
    yearText: {
        fontSize: 14,
        letterSpacing: 8,
        color: colors.accent,
    },
});
