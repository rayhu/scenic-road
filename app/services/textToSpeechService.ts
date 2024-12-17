import axios from "axios";
import * as Speech from "expo-speech";

import { getApiKey } from "./apiKeyService";

const OPENAI_TTS_API_URL = "https://api.openai.com/v1/audio/speech"; // Hypothetical endpoint

export const openAITextToSpeech = async (
  text: string,
): Promise<Blob | null> => {
  try {
    const OPENAI_API_KEY = await getApiKey("openai");
    const response = await axios.post(
      OPENAI_TTS_API_URL,
      {
        model: "tts-1",
        input: text,
        voice: "default", // Specify voice if needed
        format: "mp3", // Specify audio format
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // Ensure the response is treated as a binary blob
      },
    );

    // Log the response headers and data for debugging
    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);

    // Check if the response is a valid blob
    if (response.data && response.headers["content-type"].includes("audio")) {
      return response.data; // This should be the audio blob
    } else {
      console.error("Unexpected response format:", response.data);
      return null;
    }
  } catch (error) {
    console.error(
      "Error fetching speech:",
      error.response?.data || error.message,
    );
    return null;
  }
};

// Example usage
(async () => {
  const text = "Hello, this is a test of the OpenAI TTS service.";
  const audioBlob = await openAITextToSpeech(text);

  if (audioBlob) {
    // Handle the audio blob, e.g., play it or save it
    console.log("Audio received successfully.");
  } else {
    console.log("Failed to receive audio.");
  }
})();

/**
 * Plays the audio of the given text using text-to-speech.
 * @param text - The text to be converted to speech.
 */
export const playTextToSpeech = (text: string) => {
  if (!text) {
    console.warn("No text provided for TTS");
    return;
  }

  Speech.speak(text, {
    language: "en", // Specify the language code if needed
    pitch: 1.0, // Adjust the pitch of the voice
    rate: 1.0, // Adjust the rate of speech
    onDone: () => console.log("Speech finished"),
    onError: (error) => console.error("Speech error:", error),
  });
};

/**
 * Stops any ongoing text-to-speech playback.
 */
export const stopTextToSpeech = () => {
  Speech.stop();
};
