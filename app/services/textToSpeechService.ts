import * as Speech from "expo-speech";

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
