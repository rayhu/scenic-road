import React, { useEffect, useMemo } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CountdownTimer from "./CountdownTimer";

interface NotificationProps {
  message: string;
  onDismiss: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onDismiss }) => {
  const opacity = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    // Fade in the notification
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return () => {
      // Ensure any cleanup if needed
    };
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        <CountdownTimer initialCount={5} onComplete={onDismiss} />
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <Text style={styles.dismissText}>X</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    color: "white",
    textAlign: "center",
    flex: 1,
  },
  dismissButton: {
    padding: 5,
  },
  dismissText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Notification;
