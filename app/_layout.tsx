import "../global.css";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Kanit_300Light,
  Kanit_400Regular,
  Kanit_500Medium,
  Kanit_900Black,
} from "@expo-google-fonts/kanit";

// Web-only global setup: dark class + no white flash + no horizontal scroll
if (typeof document !== "undefined") {
  document.documentElement.classList.add("dark");
  document.documentElement.style.backgroundColor = "#0C0C0C";
  document.body.style.backgroundColor = "#0C0C0C";
  document.body.style.margin = "0";
  document.body.style.overflowX = "clip";
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Kanit_300Light,
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: "#0C0C0C" }} />;

  return (
    <View style={{ flex: 1, backgroundColor: "#0C0C0C" }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}