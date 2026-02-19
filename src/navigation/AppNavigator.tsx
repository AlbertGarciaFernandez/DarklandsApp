import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// Screens
import { AgendaScreen } from '../screens/AgendaScreen';
import { MyAgendaScreen } from '../screens/MyAgendaScreen';
import { AdminScreen } from '../screens/AdminScreen';
import { EventDetailsScreen } from '../screens/EventDetailsScreen';

// Types
import { RootStackParamList, MainTabParamList } from '../data/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

import { HomeScreen } from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.secondary,
                tabBarLabelStyle: {
                    fontFamily: typography.caption.fontFamily,
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Agenda') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'MyAgenda') {
                        iconName = focused ? 'bookmark' : 'bookmark-outline';
                    } else if (route.name === 'Admin') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Agenda" component={AgendaScreen} />
            <Tab.Screen name="MyAgenda" component={MyAgendaScreen} options={{ title: 'My Agenda' }} />
            <Tab.Screen name="Admin" component={AdminScreen} />
        </Tab.Navigator>
    );
};

export const AppNavigator = () => {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerTintColor: colors.primary,
                    headerTitleStyle: {
                        fontFamily: typography.h3.fontFamily,
                        fontWeight: 'bold',
                    },
                    contentStyle: {
                        backgroundColor: colors.background,
                    },
                }}
            >
                <Stack.Screen
                    name="MainStatus"
                    component={MainTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EventDetails"
                    component={EventDetailsScreen}
                    options={{ title: 'Event Details', headerBackTitle: 'Back' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
