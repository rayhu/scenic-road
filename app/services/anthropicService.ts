import axios from "axios";

import { getApiKey } from "./apiKeyService";

export const fetchLandmarks = async (latitude: number, longitude: number) => {
  const ANTHROPIC_API_KEY = await getApiKey("ANTHROPIC_API_KEY");

  const prompt = `List some famous landmarks near latitude ${latitude} and longitude ${longitude}.
  The landmarks should be in the format of a list of strings, each representing a landmark.
  Please provide the response in the following JSON format:
    [
      {
        "name": "Landmark Name",
        "description": "Landmark Description",
        "latitude": 0.0,
        "longitude": 0.0
      }
    ]
  `;

  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/claude/completions",
      {
        model: "claude-v1",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7, // Adjust temperature as needed
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ANTHROPIC_API_KEY}`,
        },
      },
    );

    // Assuming the response is in the expected format
    const jsonResponse = JSON.parse(response.data.choices[0].text.trim());
    return jsonResponse;
  } catch (error) {
    console.error("Error fetching landmarks:", error);
    return [];
  }
};
