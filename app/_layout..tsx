import React from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Stack } from "expo-router";
import colors from "../lib/configs/colors";

export default function Layout() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          autoHideHomeIndicator: true,
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.green100,
          },
        }}
      />
    );
  }
}
