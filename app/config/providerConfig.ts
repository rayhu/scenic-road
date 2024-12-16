import AsyncStorage from "@react-native-async-storage/async-storage";

import { PROVIDERS } from "./providers";

export const handleProviderChange = async (
  provider: string,
  setSelectedProvider: (provider: string) => void,
) => {
  setSelectedProvider(provider);
  try {
    await AsyncStorage.setItem("selectedProvider", provider);
  } catch (error) {
    console.error("Error saving provider:", error);
  }
};

export const getSelectedProvider = async (
  defaultProvider: string,
): Promise<string> => {
  try {
    const provider = await AsyncStorage.getItem("selectedProvider");
    return provider || defaultProvider;
  } catch (error) {
    console.error("Error retrieving provider:", error);
    return defaultProvider;
  }
};
