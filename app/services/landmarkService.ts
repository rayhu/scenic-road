import { LocationObject } from "expo-location";
import { v4 as uuidv4 } from "uuid";

import { PROVIDERS } from "../config/providers";
import { fetchLandmarks as fetchAnthropicLandmarks } from "../services/anthropicService";
import { fetchLandmarks as fetchGoogleLandmarks } from "../services/googleService";
import {
  fetchLandmarks as fetchOpenAILandmarks,
  fetchStory,
} from "../services/openaiService";
import { Landmark, rawLandmark } from "../types/landmark";
import log from "../utils/logger";

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

  let rawLandmarksList: rawLandmark[] = [];
  switch (selectedProvider) {
    case PROVIDERS.OPENAI:
      rawLandmarksList = await fetchOpenAILandmarks(latitude, longitude);
      break;
    case PROVIDERS.ANTHROPIC:
      rawLandmarksList = await fetchAnthropicLandmarks(latitude, longitude);
      break;
    case PROVIDERS.GOOGLE:
      rawLandmarksList = await fetchGoogleLandmarks(latitude, longitude);
      break;
    default:
      log.warn("Unknown provider");
  }

  const landmarksList: Landmark[] = rawLandmarksList.map(
    (landmark: rawLandmark) => ({
      ...landmark,
      key: uuidv4(), // Assign a UUID
    }),
  );

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
