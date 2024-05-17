import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

import colors from "../lib/configs/colors";
import truncateString from "../lib/snippets/truncate";
import Size from "../lib/hooks/useResponsiveSize";
import fonts from "../lib/configs/fonts";
import routes from "../lib/configs/routes";
import { IMessage } from "../lib/configs/types";
import { formatDate } from "../lib/snippets/formatDate";

const MessageList: React.FC<IMessage> = ({
  subject,
  isRead,
  content,
  _id,
  sender,
  updated_at,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.message}
      onPress={() =>
        router.push({
          pathname: routes.CHAT_SCREEN,
          params: {
            fullName: `${sender.first_name} ${sender.last_name}`,
            image: sender.image,
            id: _id,
          },
        })
      }
    >
      <Image src={sender.image} style={styles.chatImg} />
      <View style={styles.chatWrap}>
        <View style={styles.chatFlex}>
          <Text style={styles.userName}>{subject}</Text>
          <Text style={styles.time}>{formatDate(updated_at)}</Text>
        </View>
        <View style={[styles.chatFlex, { marginTop: 3 }]}>
          <Text style={styles.text}>
            {truncateString({
              str: content,
              maxLength: 25,
            })}
          </Text>
          {!isRead && (
            <View style={styles.counts}>
              <Text style={styles.count}>{1}</Text>
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
    borderRadius: Size.calcAverage(50),
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
