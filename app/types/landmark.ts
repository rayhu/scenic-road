import { LocationObject } from "expo-location";

// the landmark data returned by the provider
export interface rawLandmark {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  story?: string;
}

// the landmark data with a unique key to be cached and indexed
export interface Landmark extends rawLandmark {
  key: string;
}

export interface LandmarksData {
  lastRetrieved: Date | null;
  landmarks: Landmark[];
  provider: string;
  location: LocationObject | null;
}
