import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleProviderChange = async (
  provider: string,
  setSelectedProvider: (provider: string) => void,
) => {
  setSelectedProvider(provider);
  try {
    await AsyncStorage.setItem("selectedProvider", provider);
  } catch (error) {
    console.error("Error saving provider:", error);
  }
};

export const getSelectedProvider = async (
  setSelectedProvider: (provider: string) => void,
) => {
  try {
    const provider = await AsyncStorage.getItem("selectedProvider");
    if (provider) {
      setSelectedProvider(provider);
    }
  } catch (error) {
    console.error("Error retrieving provider:", error);
  }
};
