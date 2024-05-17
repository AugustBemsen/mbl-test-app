import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Arrows from "../assets/svgs/arrow";
import BottomArrow from "../assets/svgs/bottomArrow";
import CenterArrow from "../assets/svgs/centerArrow";
import colors from "../lib/configs/colors";
import ChatBubble from "../components/chatBubble";
import SendIcon from "../assets/svgs/sendIcon";
import Size from "../lib/hooks/useResponsiveSize";
import BackIcon from "../assets/svgs/backIcon";
import AxiosInstance from "../lib/configs/axios";
import { IMessage } from "../lib/configs/types";

const ChatScreen = () => {
  const params = useLocalSearchParams<{
    fullName: string;
    image: string;
    id: string;
  }>();

  const { fullName, id, image } = params;
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const [chatMessage, setChatMessages] = useState<{
    id: string;
    subject: string;
    content: string;
  }>({
    content: "",
    id: "",
    subject: "",
  });

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(`/messages/open-message/${id}`)
      .then(async (res) => {
        const result = res.data.data;
        setChatMessages({
          id: result._id,
          content: result.content,
          subject: result.subject,
        });
        console.log(result);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Arrows style={styles.arrow} />
        <CenterArrow style={styles.centerArrow} />
        <BottomArrow style={styles.bottomArrow} />
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.user}>
            <Image source={{ uri: image }} style={styles.img} />
            <Text style={styles.userName}>{fullName}</Text>
          </View>
        </View>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator color={colors.white} size="large" />
          </View>
        ) : (
          <View style={[styles.chatSection]}>
            <ChatBubble
              isUser={false}
              content={chatMessage.content}
              subject={chatMessage.subject}
            />
          </View>
        )}

        <StatusBar backgroundColor={colors.green300} barStyle="light-content" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    position: "relative",
  },

  nav: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.green300,
    paddingHorizontal: Size.calcWidth(20),
    paddingBottom: Size.calcHeight(15),
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Size.calcWidth(15),
  },

  img: {
    width: Size.calcAverage(35),
    height: Size.calcAverage(35),
    borderColor: colors.black,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: Size.calcAverage(45),
  },

  userName: {
    fontSize: Size.calcAverage(20),
    color: colors.white,
  },

  arrow: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: -2,
  },

  centerArrow: {
    position: "absolute",
    top: "80%",
    left: "55%",
    transform: [
      { translateY: -0.5 * Dimensions.get("window").height },
      { translateX: -0.5 * Dimensions.get("window").width },
    ],
    zIndex: -2,
  },

  bottomArrow: {
    position: "absolute",
    bottom: -5,
    left: -10,
    zIndex: -2,
  },

  chatSection: {
    paddingHorizontal: Size.calcHeight(30),
    marginBottom: Size.calcHeight(80),
    marginTop: Size.calcHeight(15),
  },

  chatActions: {
    paddingHorizontal: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    right: 0,
    left: 0,
    width: "100%",
  },

  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.green200,
    padding: 10,
    borderRadius: 10,
    height: 60,
    backgroundColor: colors.green300,
    color: colors.white,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },

  send: {
    width: 50,
    height: 50,
    backgroundColor: colors.green100,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },

  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatScreen;
