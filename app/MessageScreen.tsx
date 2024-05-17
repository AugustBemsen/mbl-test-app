import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import colors from "../lib/configs/colors";
import Size from "../lib/hooks/useResponsiveSize";
import Circles from "../assets/svgs/circles";
import MessageIcon from "../assets/svgs/messageIcon";
import chats from "../lib/data/chats";
import MessageList from "../components/messageList";
import { getLocalData } from "../lib/hooks/localStorage";
import AxiosInstance from "../lib/configs/axios";
import { IMessage } from "../lib/configs/types";
import useIsDesktop from "../lib/hooks/useIsDesktop";
import useIsMobileBrowser from "../lib/hooks/isMobileBrowser";

const getUserData = async () =>
  JSON.parse((await getLocalData("userData")) as string);

const MessageScreen = () => {
  const isDesktop = useIsDesktop();
  const isMobileBrowser = useIsMobileBrowser();

  const params = useLocalSearchParams<{
    fullName: string;
    image: string;
    id: string;
    unreadCount: string;
  }>();

  const { fullName, id, image, unreadCount } = params;
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<IMessage[] | []>();
  const [metrics, setMetrics] = useState<{
    unReadCount: number;
    messagesCount: number;
  }>();

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get("/messages/user-messages")
      .then(async (res) => {
        const result = res.data?.data;
        setMessages(result?.messages);
        setMetrics({
          messagesCount: result?.messagesCount,
          unReadCount: result?.unReadCount,
        });
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={
          isDesktop || isMobileBrowser
            ? [styles.nav, styles.desktopNav]
            : styles.nav
        }
      >
        <View style={styles.user}>
          <Image source={{ uri: image }} style={styles.img} />
          <Text style={styles.userName}>{fullName}</Text>
        </View>
        <TouchableOpacity>
          <MessageIcon
            unreadCount={Number(metrics?.unReadCount || unreadCount)}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={colors.white} size="large" />
        </View>
      ) : (
        <FlatList
          style={
            isDesktop
              ? [styles.messages, styles.desktopMessages]
              : styles.messages
          }
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <MessageList {...item} />}
        />
      )}
      <Circles style={styles.circles} />
      <StatusBar backgroundColor={colors.green300} barStyle="light-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    position: "relative",
  },

  desktopNav: {
    paddingTop: Size.calcHeight(20),
    paddingHorizontal: Size.calcWidth(70),
  },

  nav: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.green300,
    paddingHorizontal: Size.calcWidth(20),
    paddingBottom: Size.calcHeight(15),
  },

  user: {
    flexDirection: "row",
    alignItems: "center",
  },

  img: {
    width: Size.calcAverage(45),
    height: Size.calcAverage(45),
    borderColor: colors.black,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: Size.calcAverage(45),
  },

  userName: {
    fontSize: Size.calcAverage(20),
    color: colors.white,
  },

  messages: {
    paddingHorizontal: Size.calcWidth(20),
  },

  desktopMessages: {
    paddingHorizontal: Size.calcWidth(70),
  },

  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  circles: {
    position: "absolute",
    bottom: -30,
    right: 16,
    width: "100%",
    opacity: 0.9,
  },
});

export default MessageScreen;
