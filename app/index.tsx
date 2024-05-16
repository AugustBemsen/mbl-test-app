import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import Arrows from "../assets/svgs/arrow";
import Daniel from "../assets/svgs/daniel";
import colors from "../lib/configs/colors";
import BottomArrow from "../assets/svgs/bottomArrow";

const WelcomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Arrows style={styles.arrow} />
      <Daniel />
      <Text style={styles.title}>Hello, Daniel</Text>
      <Text style={styles.subtitle}>You have 3 unread messages out of 10</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("Login")}
      >
        <Text style={styles.buttonText}>View Messages</Text>
      </TouchableOpacity>
      <BottomArrow style={styles.arrow2} />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    position: "relative",
  },

  arrow: {
    position: "absolute",
    top: -10,
    right: -10,
  },

  arrow2: {
    position: "absolute",
    bottom: -10,
    left: -10,
  },

  title: {
    fontSize: 30,
    marginTop: 20,
    color: colors.white,
    fontFamily: "Poppins_700Bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 4,
    width: "70%",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    color: colors.white,
    opacity: 0.8,
  },

  button: {
    backgroundColor: colors.green100,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 30,
  },

  buttonText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: "Poppins_700Bold",
  },
});

export default WelcomeScreen;
