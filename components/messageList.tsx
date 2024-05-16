import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

import colors from "../lib/configs/colors";
import truncateString from "../lib/snippets/truncate";
import Size from "../lib/hooks/useResponsiveSize";
import fonts from "../lib/configs/fonts";
import routes from "../lib/configs/routes";

interface MessageListProps {
  name: string;
  unreadCount: number;
  message: string;
  time: string;
}

const MessageList: React.FC<MessageListProps> = ({
  message,
  name,
  unreadCount,
  time,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.message}
      onPress={() => router.push(routes.CHAT_SCREEN)}
    >
      <Image source={require("../assets/daniel.png")} style={styles.chatImg} />
      <View style={styles.chatWrap}>
        <View style={styles.chatFlex}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={[styles.chatFlex, { marginTop: 3 }]}>
          <Text style={styles.text}>
            {truncateString({
              str: message,
              maxLength: 25,
            })}
          </Text>
          {unreadCount > 0 && (
            <View style={styles.counts}>
              <Text style={styles.count}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  message: {
    padding: Size.calcWidth(16),
    backgroundColor: colors.black200,
    borderRadius: 15,
    marginTop: Size.calcHeight(20),
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userName: {
    fontSize: Size.calcAverage(20),
    color: colors.white,
  },

  chatImg: {
    width: Size.calcAverage(50),
    height: Size.calcAverage(50),
  },

  chatWrap: {
    flex: 1,
    marginLeft: Size.calcWidth(15),
  },

  chatFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  time: {
    fontSize: Size.calcAverage(12),
    color: colors.white,
    fontFamily: fonts.font500,
  },

  text: {
    fontSize: Size.calcAverage(14),
    color: colors.white200,
    fontFamily: fonts.font400,
  },

  counts: {
    width: Size.calcAverage(24),
    height: Size.calcAverage(24),
    backgroundColor: colors.green300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },

  count: {
    fontSize: Size.calcAverage(14),
    color: colors.white,
    fontFamily: fonts.font700,
  },
});

export default MessageList;
