import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Arrows from "../assets/svgs/arrow";
import colors from "../lib/configs/colors";
import BottomArrow from "../assets/svgs/bottomArrow";
import Size from "../lib/hooks/useResponsiveSize";
import routes from "../lib/configs/routes";
import AxiosInstance from "../lib/configs/axios";
import { IUser } from "../lib/configs/types";
import { setLocalData } from "../lib/hooks/localStorage";

const WelcomeScreen = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IUser>({
    messagesCount: 0,
    unReadCount: 0,
    user: {
      first_name: "",
      id: "",
      image: "",
      last_name: "",
    },
  });

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get("/users/current-user")
      .then(async (res) => {
        setData(res.data.data);
        await setLocalData("userData", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Arrows style={styles.arrow} />
      {loading ? (
        <ActivityIndicator color={colors.white} size="large" />
      ) : (
        <>
          <Image style={styles.person} source={{ uri: data.user.image }} />
          <Text style={styles.title}>Hello, {data.user?.first_name}</Text>
          <Text style={styles.subtitle}>
            You have {data.unReadCount} unread messages out of{" "}
            {data.messagesCount}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: routes.MESSAGES_SCREEN,
                params: {
                  fullName: `${data.user.first_name} ${data.user.last_name}`,
                  image: data.user.image,
                  id: data.user.id,
                  unreadCount: data.unReadCount,
                },
              })
            }
          >
            <Text style={styles.buttonText}>View Messages</Text>
          </TouchableOpacity>
        </>
      )}
      <BottomArrow style={styles.arrow2} />
      <StatusBar barStyle="light-content" />
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

  person: {
    width: Size.calcAverage(150),
    height: Size.calcAverage(150),
    borderRadius: Size.calcAverage(150),
    borderWidth: 2,
    borderColor: colors.green300,
  },

  title: {
    fontSize: Size.calcAverage(30),
    marginTop: Size.calcHeight(20),
    color: colors.white,
    fontFamily: "Poppins_700Bold",
  },

  subtitle: {
    fontSize: Size.calcAverage(16),
    marginTop: Size.calcHeight(4),
    width: "70%",
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    color: colors.white,
    opacity: 0.8,
  },

  button: {
    backgroundColor: colors.green100,
    paddingVertical: Size.calcHeight(12),
    paddingHorizontal: Size.calcWidth(24),
    borderRadius: 8,
    marginTop: Size.calcHeight(30),
  },

  buttonText: {
    fontSize: Size.calcAverage(18),
    color: colors.white,
    fontFamily: "Poppins_700Bold",
  },
});

export default WelcomeScreen;
