import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import colors from "../lib/configs/colors";

const MainScreen = (): JSX.Element => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.safeAreaContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Text>Hello World</Text>
      <StatusBar />
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.green100,
    alignItems: "center",
    justifyContent: "center",
  },
});
