
import "react-native-reanimated";
import { Button } from "@/components/button";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, Alert } from "react-native";
import { WidgetProvider } from "@/contexts/WidgetContext";
import React, { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { useNetworkState } from "expo-network";
import { SystemBars } from "react-native-edge-to-edge";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const networkState = useNetworkState();

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (networkState.isConnected === false) {
      Alert.alert(
        "Connessione Internet",
        "Sembra che tu non sia connesso a Internet. Alcune funzionalità potrebbero non funzionare correttamente.",
        [{ text: "OK" }]
      );
    }
  }, [networkState.isConnected]);

  if (!loaded) {
    return null;
  }

  const customTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6366F1',
      background: '#F8FAFC',
      card: '#FFFFFF',
      text: '#1E293B',
      border: '#E2E8F0',
      notification: '#EC4899',
    },
  };

  const customDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#818CF8',
      background: '#0F172A',
      card: '#1E293B',
      text: '#F1F5F9',
      border: '#475569',
      notification: '#F472B6',
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WidgetProvider>
        <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customTheme}>
          <SystemBars style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen name="formsheet" options={{ presentation: "formSheet" }} />
            <Stack.Screen name="transparent-modal" options={{ 
              presentation: "transparentModal",
              animation: "fade",
            }} />
          </Stack>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </WidgetProvider>
    </GestureHandlerRootView>
  );
}
