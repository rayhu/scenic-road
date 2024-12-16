import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  getSelectedProvider,
  handleProviderChange,
} from "../config/providerConfig";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedProvider, setSelectedProvider] = useState<string>("OpenAI");

  useEffect(() => {
    // Retrieve the selected provider when the component mounts
    getSelectedProvider(setSelectedProvider);
  }, []);

  const changeProvider = (provider: string) => {
    handleProviderChange(provider, setSelectedProvider);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Select AI Provider</Text>
      <Button
        title="OpenAI"
        onPress={() => changeProvider("OpenAI")}
        color={selectedProvider === "OpenAI" ? "blue" : "gray"}
      />
      <Button
        title="Anthropic"
        onPress={() => changeProvider("Anthropic")}
        color={selectedProvider === "Anthropic" ? "blue" : "gray"}
      />
      <Button
        title="Google"
        onPress={() => changeProvider("Google")}
        color={selectedProvider === "Google" ? "blue" : "gray"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
});

export default SettingsScreen;
