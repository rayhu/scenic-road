import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Notification from "../components/Notification";
import { getSelectedProvider } from "../config/providerConfig";
import { PROVIDERS } from "../config/providers";
import { getLandmarks } from "../services/landmarkService";
import { areLocationsAlmostSame } from "../utils/locationUtils";
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
  const [selectedProvider, setSelectedProvider] = useState<string>(
    PROVIDERS.GOOGLE,
  );
  const [notification, setNotification] = useState<string | null>(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const fetchProvider = async (): Promise<string> => {
          const provider = await getSelectedProvider(PROVIDERS.GOOGLE);
          setSelectedProvider(provider);
          return provider;
        };
        const requestLocationPermission =
          async (): Promise<Location.LocationObject | null> => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
              console.log("Permission to access location was denied");
              return null;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            // console.log("Fetched location:", currentLocation);
            return currentLocation;
          };
        try {
          const currentLocation = await requestLocationPermission();
          if (!currentLocation) {
            console.log("Location permission not granted");
            return;
          }
          setLocation(currentLocation);
          const provider = await fetchProvider();
          const providerChanged = provider !== landmarksData.provider;
          const locationChanged = !areLocationsAlmostSame(
            landmarksData.location,
            currentLocation,
          );
          console.log("providerChanged", providerChanged);
          console.log("new provider", selectedProvider);
          console.log("old provider", landmarksData.provider);
          console.log("locationChanged", locationChanged);
          console.log(
            "previousLocation",
            JSON.stringify(landmarksData.location, null, 2),
          );
          console.log(
            "currentLocation",
            JSON.stringify(currentLocation, null, 2),
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
          console.error("Error fetching data", error);
        }
      };
      fetchData();
    }, []),
  );

  const goToSettings = () => {
    navigation.navigate("Settings");
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
        <Button
          title="Refresh"
          onPress={() => getLandmarks(selectedProvider, location)}
        />
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
  content: {
    flex: 1, // Ensures the content area takes up available space
  },
  gearButton: {
    top: 5,
    right: 20,
  },
});

export default HomeScreen;
