import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';

interface TypographyProps extends TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button';
    color?: string;
    children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
    variant = 'body',
    color,
    style,
    children,
    ...props
}) => {
    const textStyle = typography[variant];
    const colorStyle = color ? { color } : {};

    return (
        <Text style={[textStyle, colorStyle, style]} {...props}>
            {children}
        </Text>
    );
};
