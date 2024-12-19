import { LocationObject } from "expo-location";

import { PROVIDERS } from "../config/providers";
import { fetchLandmarks as fetchAnthropicLandmarks } from "../services/anthropicService";
import { fetchLandmarks as fetchGoogleLandmarks } from "../services/googleService";
import {
  fetchLandmarks as fetchOpenAILandmarks,
  fetchStory,
} from "../services/openaiService";
import log from "../utils/logger";

interface Landmark {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  story?: string;
}

interface LandmarksData {
  lastRetrieved: Date | null;
  landmarks: Landmark[];
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

  let landmarksList: Landmark[] = [];
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

  // Fetch stories for each landmark
  for (let landmark of landmarksList) {
    try {
      const story = await fetchStory(landmark.name, latitude, longitude);
      landmark.story = story;
    } catch (error) {
      log.error(`Error fetching story for ${landmark.name}:`, error);
    }
  }

  const landmarksData = {
    lastRetrieved: new Date(),
    landmarks: landmarksList,
    provider: selectedProvider,
    location: location,
  };

  log.info("Landmarks and stories fetched successfully.");
  return {
    landmarksData,
    notification: "Landmarks and stories fetched successfully.",
  };
};
