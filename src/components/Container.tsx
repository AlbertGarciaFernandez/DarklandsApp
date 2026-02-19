import React from 'react';
import { View, StyleSheet, ViewStyle, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

interface ContainerProps {
    children: React.ReactNode;
    style?: ViewStyle;
    safeArea?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, style, safeArea = true }) => {
    const Wrapper = safeArea ? SafeAreaView : View;

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={colors.background} />
            <Wrapper style={[styles.container, style]}>
                {children}
            </Wrapper>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 16,
    },
});
