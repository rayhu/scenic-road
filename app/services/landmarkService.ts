import { LocationObject } from "expo-location";

import { PROVIDERS } from "../config/providers";
import { fetchLandmarks as fetchAnthropicLandmarks } from "../services/anthropicService";
import { fetchLandmarks as fetchGoogleLandmarks } from "../services/googleService";
import { fetchLandmarks as fetchOpenAILandmarks } from "../services/openaiService";
import log from "../utils/logger";

interface LandmarksData {
  lastRetrieved: Date | null;
  landmarks: any[];
  provider: string;
  location: LocationObject | null;
}

export const getLandmarks = async (
  selectedProvider: string,
  location: LocationObject | null,
): Promise<{ landmarksData: LandmarksData; notification: string }> => {
  log.debug(
    `Fetching landmarks for provider: ${selectedProvider} for location: ${JSON.stringify(
      location,
      null,
      2,
    )}`,
  );
  if (!location) {
    log.warn("Location is not available.");
    return {
      landmarksData: {
        lastRetrieved: null,
        landmarks: [],
        provider: selectedProvider,
        location: null,
      },
      notification: "Location is not available.",
    };
  }

  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;

  let landmarksList = [];
  switch (selectedProvider) {
    case PROVIDERS.OPENAI:
      landmarksList = await fetchOpenAILandmarks(latitude, longitude);
      break;
    case PROVIDERS.ANTHROPIC:
      landmarksList = await fetchAnthropicLandmarks(latitude, longitude);
      break;
    case PROVIDERS.GOOGLE:
      landmarksList = await fetchGoogleLandmarks(latitude, longitude);
      break;
    default:
      log.warn("Unknown provider");
  }

  const landmarksData = {
    lastRetrieved: new Date(),
    landmarks: landmarksList,
    provider: selectedProvider,
    location: location,
  };

  log.info("Landmarks fetched successfully.");
  return {
    landmarksData,
    notification: "Landmarks fetched successfully.",
  };
};
