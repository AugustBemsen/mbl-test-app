import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../lib/configs/colors";
import Size from "../lib/hooks/useResponsiveSize";
import fonts from "../lib/configs/fonts";
import useIsDesktop from "../lib/hooks/useIsDesktop";

interface ChatBubbleProps {
  subject: string;
  content: string;
  isUser?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  subject,
  isUser,
  content,
}) => {
  const isDesktop = useIsDesktop();
  return (
    <View style={styles.bubble}>
      <Text style={styles.subject}>{subject}</Text>
      <Text
        style={
          isDesktop ? [styles.content, styles.desktopContent] : styles.content
        }
      >
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    // maxWidth: "65%",
    padding: Size.calcAverage(20),
    borderRadius: Size.calcAverage(12),
    marginVertical: 7,
    backgroundColor: colors.green300,
  },

  subject: {
    fontSize: Size.calcAverage(20),
    color: colors.white,
    fontFamily: fonts.font700,
  },

  content: {
    fontSize: Size.calcAverage(16),
    color: colors.white200,
    fontFamily: fonts.font400,
  },

  desktopContent: {
    marginTop: Size.calcHeight(10),
    color: colors.white,
    opacity: 0.75,
  },
});

export default ChatBubble;
