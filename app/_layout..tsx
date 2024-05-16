import React from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Stack } from "expo-router";
import colors from "../lib/configs/colors";
import routes from "../lib/configs/routes";

export default function Layout() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  //  TODO: handle auth and protect routes

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        autoHideHomeIndicator: true,
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.black,
        },
      }}
    >
      <Stack.Screen
        name={routes.MESSAGES_SCREEN}
        options={{
          title: "Messages",
        }}
      />

      <Stack.Screen
        name={routes.CHAT_SCREEN}
        options={{
          title: "Messages",
        }}
      />
    </Stack>
  );
}
