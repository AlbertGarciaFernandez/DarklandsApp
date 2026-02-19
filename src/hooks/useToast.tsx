import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, SafeAreaView, Platform } from 'react-native';
import { Typography } from '../components/Typography';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface ToastContextType {
    showToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'info' | 'success' | 'warning'>('info');
    const slideAnim = useRef(new Animated.Value(-100)).current;

    const showToast = useCallback((msg: string, t: 'info' | 'success' | 'warning' = 'info') => {
        setMessage(msg);
        setType(t);
        setVisible(true);

        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();

        // Auto hide
        setTimeout(() => {
            hideToast();
        }, 3000);
    }, []);

    const hideToast = () => {
        Animated.timing(slideAnim, {
            toValue: -150,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
        });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {visible && (
                <SafeAreaView style={styles.toastWrapper} pointerEvents="none">
                    <Animated.View style={[styles.toastContainer, { transform: [{ translateY: slideAnim }] }]}>
                        <View style={[styles.indicator, { backgroundColor: type === 'success' ? colors.success : colors.accent }]} />
                        <View style={styles.content}>
                            <Typography variant="h3" style={styles.title}>
                                {type === 'success' ? 'SUCCESS' : 'NOTIFICATION'}
                            </Typography>
                            <Typography variant="body" style={styles.message} numberOfLines={2}>
                                {message}
                            </Typography>
                        </View>
                        <Ionicons
                            name={type === 'success' ? "checkmark-circle" : "information-circle"}
                            size={24}
                            color={colors.primary}
                            style={{ opacity: 0.8 }}
                        />
                    </Animated.View>
                </SafeAreaView>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const styles = StyleSheet.create({
    toastWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        alignItems: 'center',
    },
    toastContainer: {
        marginHorizontal: 16,
        marginTop: Platform.OS === 'android' ? 40 : 10,
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        width: '92%',
        maxWidth: 400,
    },
    indicator: {
        width: 4,
        height: '80%',
        borderRadius: 2,
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        color: colors.primary,
        marginBottom: 2,
    },
    message: {
        fontSize: 14,
        color: colors.secondary,
        lineHeight: 18,
    },
});
