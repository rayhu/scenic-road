import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  getSelectedProvider,
  handleProviderChange,
} from "../config/providerConfig";
import { PROVIDERS } from "../config/providers";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedProvider, setSelectedProvider] = useState<string>(
    PROVIDERS.OPENAI,
  );

  useEffect(() => {
    const fetchProvider = async () => {
      // Retrieve the selected provider when the component mounts
      const provider = await getSelectedProvider(PROVIDERS.GOOGLE);
      setSelectedProvider(provider);
    };

    fetchProvider(); // Call the async function
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
        title={PROVIDERS.OPENAI}
        onPress={() => changeProvider(PROVIDERS.OPENAI)}
        color={selectedProvider === PROVIDERS.OPENAI ? "blue" : "gray"}
      />
      <Button
        title={PROVIDERS.ANTHROPIC}
        onPress={() => changeProvider(PROVIDERS.ANTHROPIC)}
        color={selectedProvider === PROVIDERS.ANTHROPIC ? "blue" : "gray"}
      />
      <Button
        title={PROVIDERS.GOOGLE}
        onPress={() => changeProvider(PROVIDERS.GOOGLE)}
        color={selectedProvider === PROVIDERS.GOOGLE ? "blue" : "gray"}
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
