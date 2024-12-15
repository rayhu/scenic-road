import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { config } from "../config/config";

const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
const ONE_MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000; // One month in milliseconds

export const fetchAndStoreApiKeys = async () => {
  try {
    const response = await axios.get(config.SERVER_URL, {
      auth: {
        username: "admin", // Use your server's credentials
        password: "secret",
      },
    });

    const { OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY, invalidate } =
      response.data;

    // Check if the server response indicates key invalidation
    if (invalidate) {
      await SecureStore.deleteItemAsync("OPENAI_API_KEY");
      await SecureStore.deleteItemAsync("ANTHROPIC_API_KEY");
      await SecureStore.deleteItemAsync("GOOGLE_API_KEY");
      console.log("Keys invalidated by server response.");
      return;
    }

    // Store keys securely
    await SecureStore.setItemAsync("OPENAI_API_KEY", OPENAI_API_KEY);
    await SecureStore.setItemAsync("ANTHROPIC_API_KEY", ANTHROPIC_API_KEY);
    await SecureStore.setItemAsync("GOOGLE_API_KEY", GOOGLE_API_KEY);

    // Store the current time as the last update time
    const currentTime = new Date().toISOString();
    await SecureStore.setItemAsync("API_KEYS_LAST_UPDATE", currentTime);

    return { OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY };
  } catch (error) {
    console.error("Error fetching API keys:", error);
    throw error;
  }
};

export const getApiKey = async (keyName: string) => {
  try {
    const lastUpdate = await SecureStore.getItemAsync("API_KEYS_LAST_UPDATE");
    const currentTime = new Date().getTime();

    // Check if the stored key is older than a week or a month
    if (lastUpdate) {
      const lastUpdateTime = new Date(lastUpdate).getTime();
      if (currentTime - lastUpdateTime > ONE_MONTH_IN_MS) {
        console.warn("Stored key is older than a month, it is now expired.");
        // Remove expired keys from the store
        await SecureStore.deleteItemAsync("OPENAI_API_KEY");
        await SecureStore.deleteItemAsync("ANTHROPIC_API_KEY");
        await SecureStore.deleteItemAsync("GOOGLE_API_KEY");
        throw new Error("API key expired");
      } else if (currentTime - lastUpdateTime > ONE_WEEK_IN_MS) {
        console.warn(
          "Stored key is older than a week, attempting to fetch new keys.",
        );
        await fetchAndStoreApiKeys();
      }
    }

    // Attempt to fetch new keys if the server is reachable
    try {
      await fetchAndStoreApiKeys();
    } catch (error) {
      console.warn("Server not reachable, using stored key if available.");
    }

    return await SecureStore.getItemAsync(keyName);
  } catch (error) {
    console.error("Error retrieving API key:", error);
    throw error;
  }
};
