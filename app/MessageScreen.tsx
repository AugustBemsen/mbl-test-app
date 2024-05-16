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
import chats from "../lib/data/chats";
import MessageList from "../components/messageList";

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
        renderItem={({ item }) => <MessageList {...item} />}
      />
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

  circles: {
    position: "absolute",
    bottom: -30,
    right: 16,
    width: "100%",
    opacity: 0.9,
  },
});

export default MessageScreen;
