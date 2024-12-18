import AsyncStorage from "@react-native-async-storage/async-storage";

import log from "../utils/logger";

// Import the logger

// import { PROVIDERS } from "./providers";

export const handleProviderChange = async (
  provider: string,
  setSelectedProvider: (provider: string) => void,
) => {
  setSelectedProvider(provider);
  try {
    await AsyncStorage.setItem("selectedProvider", provider);
    log.debug(`Provider changed to ${provider}`);
  } catch (error) {
    log.error("Error saving provider:", error);
  }
};

export const getSelectedProvider = async (
  defaultProvider: string,
): Promise<string> => {
  try {
    const provider = await AsyncStorage.getItem("selectedProvider");
    log.debug(`getSelectedProvider: ${provider}`);
    if (!provider) {
      log.debug(`No provider found, using default: ${defaultProvider}`);
    }
    return provider || defaultProvider;
  } catch (error) {
    log.error("Error retrieving provider:", error);
    return defaultProvider;
  }
};
