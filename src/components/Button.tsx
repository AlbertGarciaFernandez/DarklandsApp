import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Typography } from './Typography';
import { colors } from '../theme/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outlined';
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', style }) => {
    const containerStyle = variant === 'primary' ? styles.primaryContainer : styles.outlinedContainer;
    const textStyle = variant === 'primary' ? styles.primaryText : styles.outlinedText;

    return (
        <TouchableOpacity style={[styles.container, containerStyle, style]} onPress={onPress}>
            <Typography variant="button" style={textStyle}>{title}</Typography>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryContainer: {
        backgroundColor: colors.primary,
    },
    outlinedContainer: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    primaryText: {
        color: colors.background,
    },
    outlinedText: {
        color: colors.primary,
    },
});
