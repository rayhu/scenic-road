import axios from "axios";

import { getApiKey } from "./apiKeyService";

export const fetchLandmarks = async (latitude: number, longitude: number) => {
  const GOOGLE_API_KEY = await getApiKey("GOOGLE_API_KEY");
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=landmark&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    const places = response.data.results.map((place: any) => ({
      name: place.name,
      description: place.vicinity,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    }));
    return places;
  } catch (error) {
    console.error("Error fetching places from Google:", error);
    return [];
  }
};
