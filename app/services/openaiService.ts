import axios from "axios";

import { getApiKey } from "./apiKeyService";

export const fetchLandmarks = async (latitude: number, longitude: number) => {
  const OPENAI_API_KEY = await getApiKey("openai");

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
      "https://api.openai.com/v1/chat/completions",
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 20, // Lower temperature for more deterministic output
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null,
        stream: false,
        logprobs: null,
        echo: false,
        response_format: { type: "json_object" },
        best_of: 1,
        logit_bias: null,
        user: null,
        function_call: {
          name: "landmark_list",
          description:
            "A list of landmarks with their names, descriptions, and coordinates",
          parameters: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                latitude: { type: "number" },
                longitude: { type: "number" },
              },
              required: ["name", "description", "latitude", "longitude"],
            },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    const jsonResponse = JSON.parse(response.data.choices[0].text.trim()); // Parse the JSON string

    return jsonResponse;
  } catch (error) {
    console.error("Error fetching landmarks:", error);
    return [];
  }
};
