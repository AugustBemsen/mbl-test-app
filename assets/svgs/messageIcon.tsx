import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import colors from "../../lib/configs/colors";
import Size from "../../lib/hooks/useResponsiveSize";
import fonts from "../../lib/configs/fonts";

interface Props {
  unreadCount: number;
}

const MessageIcon: FC<Props> = ({ unreadCount }) => {
  return (
    <View style={styles.container}>
      <Svg
        width={Size.calcAverage(30)}
        height={Size.calcAverage(30)}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M17 21.25H7C3.35 21.25 1.25 19.15 1.25 15.5V8.5C1.25 4.85 3.35 2.75 7 2.75H17C20.65 2.75 22.75 4.85 22.75 8.5V15.5C22.75 19.15 20.65 21.25 17 21.25ZM7 4.25C4.14 4.25 2.75 5.64 2.75 8.5V15.5C2.75 18.36 4.14 19.75 7 19.75H17C19.86 19.75 21.25 18.36 21.25 15.5V8.5C21.25 5.64 19.86 4.25 17 4.25H7Z"
          fill={colors.white}
        />
        <Path
          d="M11.9998 12.87C11.1598 12.87 10.3098 12.61 9.65978 12.08L6.52978 9.57997C6.20978 9.31997 6.14978 8.84997 6.40978 8.52997C6.66978 8.20997 7.13978 8.14997 7.45978 8.40997L10.5898 10.91C11.3498 11.52 12.6398 11.52 13.3998 10.91L16.5298 8.40997C16.8498 8.14997 17.3298 8.19997 17.5798 8.52997C17.8398 8.84997 17.7898 9.32997 17.4598 9.57997L14.3298 12.08C13.6898 12.61 12.8398 12.87 11.9998 12.87Z"
          fill={colors.white}
        />
      </Svg>
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: Size.calcWidth(30),
    height: Size.calcHeight(30),
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "red",
    borderRadius: 8,
    width: Size.calcWidth(16),
    height: Size.calcHeight(16),
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "white",
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.font700,
  },
});

export default MessageIcon;
