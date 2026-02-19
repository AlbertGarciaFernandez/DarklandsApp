import React, { useState } from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FavoritesProvider } from './src/hooks/useFavorites';
import { EventsProvider } from './src/hooks/useEvents';
import { SplashScreen } from './src/screens/SplashScreen';
import {
  useFonts,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_700Bold
} from '@expo-google-fonts/oswald';
import { View } from 'react-native';

import { ToastProvider } from './src/hooks/useToast';

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  let [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  if (isShowSplash) {
    return <SplashScreen onFinish={() => setIsShowSplash(false)} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <EventsProvider>
        <FavoritesProvider>
          <ToastProvider>
            <AppNavigator />
          </ToastProvider>
        </FavoritesProvider>
      </EventsProvider>
    </SafeAreaProvider>
  );
}
