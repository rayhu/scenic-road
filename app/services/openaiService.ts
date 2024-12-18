import axios from "axios";

import log from "../utils/logger";
// Import the logger

// Replace with the actual API endpoint
import { getApiKey } from "./apiKeyService";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"; // Replace with the actual API endpoint

export const fetchLandmarks = async (latitude: number, longitude: number) => {
  const OPENAI_API_KEY = await getApiKey("openai");

  const prompt = `List some famous landmarks near latitude ${latitude} and longitude ${longitude}.
  The landmarks should be in the format of a list of strings, each representing a landmark. 
  The landmark description should be a funny interesting description of the landmark, with history and interesting facts.
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
      OPENAI_API_URL,
      {
        model: "gpt-4o",
        max_tokens: 512,
        // "stream": false,
        // temperature: 20, // Lower temperature for more deterministic output
        response_format: {
          type: "json_object",
        },
        // function_call: {
        //   name: "landmark_list",
        //   description:
        //     "A list of landmarks with their names, descriptions, and coordinates",
        //   parameters: {
        //     type: "array",
        //     items: {
        //       type: "object",
        //       properties: {
        //         name: { type: "string" },
        //         description: { type: "string" },
        //         latitude: { type: "number" },
        //         longitude: { type: "number" },
        //       },
        //       required: ["name", "description", "latitude", "longitude"],
        //     },
        //   },
        // },
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgeable and helpful assistant called ChatGPT.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );
    log.debug("API Response:", JSON.stringify(response.data, null, 2));
    const jsonResponse = response.data.choices[0].message.content;
    const cleanedJsonResponse = jsonResponse.replace(/```json|```/g, "").trim();
    log.debug(cleanedJsonResponse);
    // Parse the JSON string
    const parsedResponse = JSON.parse(cleanedJsonResponse.trim());

    // Normalize the response to an array
    const landmarks = Array.isArray(parsedResponse.landmarks)
      ? parsedResponse.landmarks
      : [parsedResponse];

    return landmarks;
  } catch (error) {
    log.error("Error fetching landmarks:", error);
    return [];
  }
};
