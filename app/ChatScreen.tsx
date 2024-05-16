import React, { useState, useRef } from "react";
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
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Arrows from "../assets/svgs/arrow";
import BottomArrow from "../assets/svgs/bottomArrow";
import CenterArrow from "../assets/svgs/centerArrow";
import colors from "../lib/configs/colors";
import ChatBubble from "../components/chatBubble";
import SendIcon from "../assets/svgs/sendIcon";
import Size from "../lib/hooks/useResponsiveSize";
import BackIcon from "../assets/svgs/backIcon";

const ChatScreen = () => {
  type chatType = {
    id: number;
    isUser: boolean;
    message: string;
  };

  const router = useRouter();
  const chatSafeArea = useSafeAreaInsets().top;

  // Create a ref for the FlatList
  const chatListRef = useRef<FlatList | null>(null);

  const [chatMessages, setChatMessages] = useState<chatType[]>([
    {
      id: 1,
      isUser: false,
      message: "Hello, i'm Ziya, what are we fixing today!",
    },
  ]);

  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {};

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
            <Image
              source={require("../assets/daniel.png")}
              style={styles.img}
            />
            <Text style={styles.userName}>Daniel Bemsen</Text>
          </View>
        </View>
        <FlatList
          ref={(ref) => (chatListRef.current = ref)}
          onContentSizeChange={() =>
            chatListRef.current?.scrollToEnd({ animated: true })
          }
          style={[styles.chatSection]}
          data={chatMessages}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <ChatBubble isUser={item.isUser} message={item.message} />
          )}
        />
        <View style={styles.chatActions}>
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            placeholderTextColor={colors.white}
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.send} onPress={handleSendMessage}>
            <SendIcon />
          </TouchableOpacity>
        </View>

        <StatusBar backgroundColor={colors.green300} />
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
});

export default ChatScreen;
