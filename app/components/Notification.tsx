import React, { useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface NotificationProps {
  message: string;
  onDismiss: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onDismiss }) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    // Fade in the notification
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Dismiss the notification after 5 seconds
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onDismiss());
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss, opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    zIndex: 1000,
  },
  message: {
    color: "white",
    textAlign: "center",
  },
});

export default Notification;
