import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { config } from "../config/config";
import log from "../utils/logger";

// Import the logger

const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
const ONE_MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000; // One month in milliseconds

export const fetchAndStoreApiKeys = async (serviceName: string) => {
  try {
    const url = `${config.SERVER_URL}/get-service-secret/${serviceName}`;
    log.info("Fetching API key from url:", url);
    const response = await axios.get(url, {
      headers: {
        "x-api-key": config.SERVER_API_KEY || "default_secret_key", // Use env variable or fallback
      },
    });

    const { service_secret, valid } = response.data;

    // Check if the server response indicates key invalidation
    if (!valid) {
      await SecureStore.deleteItemAsync(serviceName);
      log.info(`Key for ${serviceName} invalidated by server response.`);
      return;
    }

    // Store the service secret securely
    await SecureStore.setItemAsync(serviceName, service_secret);

    // Store the current time as the last update time
    const currentTime = new Date().toISOString();
    await SecureStore.setItemAsync("API_KEYS_LAST_UPDATE", currentTime);

    return service_secret;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 403) {
        log.error("Invalid API Key");
      } else if (error.response.status === 404) {
        log.error("Service not found");
      } else {
        log.error("Error fetching service secret:", error.response.data);
      }
    } else {
      log.error("Error fetching service secret:", error.message);
    }
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
        log.warn("Stored key is older than a month, it is now expired.");
        // Remove expired keys from the store
        await SecureStore.deleteItemAsync(keyName);
        throw new Error("API key expired");
      } else if (currentTime - lastUpdateTime > ONE_WEEK_IN_MS) {
        log.warn(
          "Stored key is older than a week, attempting to fetch new keys.",
        );
        await fetchAndStoreApiKeys(keyName);
      }
    }

    // Attempt to fetch new keys if the server is reachable
    try {
      await fetchAndStoreApiKeys(keyName);
    } catch (error: any) {
      log.warn("Server not reachable, using stored key if available.", error);
    }

    return await SecureStore.getItemAsync(keyName);
  } catch (error: any) {
    log.error("Error retrieving API key:", error);
    throw error;
  }
};
