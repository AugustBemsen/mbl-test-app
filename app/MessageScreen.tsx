import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../lib/configs/colors";
import Size from "../lib/hooks/useResponsiveSize";
import Circles from "../assets/svgs/circles";
import MessageIcon from "../assets/svgs/messageIcon";
import fonts from "../lib/configs/fonts";
import truncateString from "../lib/snippets/truncate";
import chats from "../lib/data/chats";

const MessageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.user}>
          <Image source={require("../assets/daniel.png")} style={styles.img} />
          <Text style={styles.userName}>Daniel Bemsen</Text>
        </View>
        <TouchableOpacity>
          <MessageIcon unreadCount={4} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.messages}
        data={chats}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.message}>
            <Image
              source={require("../assets/daniel.png")}
              style={styles.chatImg}
            />
            <View style={styles.chatWrap}>
              <View style={styles.chatFlex}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={[styles.chatFlex, { marginTop: 3 }]}>
                <Text style={styles.text}>
                  {truncateString({
                    str: item.message,
                    maxLength: 25,
                  })}
                </Text>
                {item.unreadCount > 0 && (
                  <View style={styles.counts}>
                    <Text style={styles.count}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Circles style={styles.circles} />
      <StatusBar backgroundColor={colors.green300} />
    </SafeAreaView>
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

  circles: {
    position: "absolute",
    bottom: -30,
    right: 16,
    width: "100%",
    opacity: 0.9,
  },
});

export default MessageScreen;