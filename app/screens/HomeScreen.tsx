import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Notification from "../components/Notification";
import { getSelectedProvider } from "../config/providerConfig";
import { DEFAULT_PROVIDER } from "../config/providers";
import { getLandmarks } from "../services/landmarkService";
import { playTextToSpeech } from "../services/textToSpeechService";
import { areLocationsAlmostSame } from "../utils/locationUtils";
import log from "../utils/logger";
import LandmarkListScreen from "./LandmarkListScreen";
import LandMarkMapScreen from "./LandmarkMapScreen";

interface LandmarksData {
  lastRetrieved: Date | null;
  landmarks: any[];
  provider: string;
  location: Location.LocationObject | null;
}

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [landmarksData, setLandmarksData] = useState<LandmarksData>({
    lastRetrieved: null,
    landmarks: [],
    provider: "",
    location: null,
  });
  const [isMapView, setIsMapView] = useState<boolean>(true);
  const [selectedProvider, setSelectedProvider] =
    useState<string>(DEFAULT_PROVIDER);
  const [notification, setNotification] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const fetchProvider = async (): Promise<string> => {
          const provider = await getSelectedProvider(DEFAULT_PROVIDER);
          setSelectedProvider(provider);
          return provider;
        };
        const requestLocationPermission =
          async (): Promise<Location.LocationObject | null> => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
              log.info("Permission to access location was denied");
              return null;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            log.info("Fetched location:", currentLocation);
            return currentLocation;
          };
        try {
          const currentLocation = await requestLocationPermission();
          if (!currentLocation) {
            log.info("Location permission not granted");
            return;
          }
          setLocation(currentLocation);
          const provider = await fetchProvider();
          const providerChanged = provider !== landmarksData.provider;
          const locationChanged = !areLocationsAlmostSame(
            landmarksData.location,
            currentLocation,
          );
          log.info("providerChanged", providerChanged);
          log.debug(
            `new provider: ${selectedProvider}, old provider: ${landmarksData.provider}`,
          );
          log.info("locationChanged", locationChanged);
          log.debug(
            `previousLocation: ${JSON.stringify(landmarksData.location, null, 2)}`,
          );
          log.debug(
            `currentLocation: ${JSON.stringify(currentLocation, null, 2)}`,
          );
          if (providerChanged || locationChanged) {
            return getLandmarks(selectedProvider, currentLocation).then(
              ({ landmarksData, notification }) => {
                setLandmarksData(landmarksData);
                setNotification(notification);
              },
            );
          }
        } catch (error) {
          log.error("Error fetching data", error);
        }
      };
      fetchData();
    }, [landmarksData.location, landmarksData.provider, selectedProvider]),
  );

  const goToSettings = () => {
    navigation.navigate("Settings");
  };

  const handlePlayPress = async () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      try {
        setIsPlaying(true);
        for (let i = 0; i < landmarksData.landmarks.length; i++) {
          const landmark = landmarksData.landmarks[i];
          if (landmarksData.landmarks.length === 1) {
            await playTextToSpeech("Nearby Landmark: ");
          } else if (i === 0) {
            await playTextToSpeech("First landmark: ");
          } else {
            await playTextToSpeech("Next landmark: ");
          }
          await playTextToSpeech(landmark.name);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await playTextToSpeech(landmark.description);
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
        setIsPlaying(false);
      } catch (error) {
        log.error("Error playing landmark description:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {notification && (
        <Notification
          message={notification}
          onDismiss={() => setNotification(null)}
        />
      )}
      <View style={styles.topBar}>
        <Button title="Map View" onPress={() => setIsMapView(true)} />
        <Button title="List View" onPress={() => setIsMapView(false)} />
        <TouchableOpacity
          onPress={async () => {
            try {
              const { landmarksData, notification } = await getLandmarks(
                selectedProvider,
                location,
              );
              setLandmarksData(landmarksData);
              setNotification(notification);
            } catch (error) {
              log.error("Error refreshing landmarks:", error);
            }
          }}
          style={styles.refreshButton}
        >
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.gearButton} onPress={goToSettings}>
          <Ionicons name="settings" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {isMapView ? (
          <LandMarkMapScreen
            landmarks={landmarksData.landmarks}
            location={location}
          />
        ) : (
          <LandmarkListScreen landmarks={landmarksData.landmarks} />
        )}
      </View>
      <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={60}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  refreshButton: {
    padding: 10,
  },
  content: {
    flex: 1,
  },
  gearButton: {
    top: 5,
    right: 20,
  },
  playButton: {
    position: "absolute",
    bottom: 1,
    alignSelf: "center",
    zIndex: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
});

export default HomeScreen;
