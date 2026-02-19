import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
    h1: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 32,
        color: colors.primary,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    h2: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
        color: colors.primary,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    h3: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 20,
        color: colors.primary,
    },
    body: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.secondary,
        lineHeight: 24,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.secondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    button: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 16,
        color: colors.background,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
};
