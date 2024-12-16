import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Notification from "../components/Notification";
import { getSelectedProvider } from "../config/providerConfig";
import { fetchLandmarks as fetchAnthropicLandmarks } from "../services/anthropicService";
import { fetchLandmarks as fetchGoogleLandmarks } from "../services/googleService";
import { fetchLandmarks as fetchOpenAILandmarks } from "../services/openaiService";
import LandmarkListScreen from "./LandmarkListScreen";
import LandMarkMapScreen from "./LandmarkMapScreen";

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [landmarks, setLandmarks] = useState<any[]>([]);
  const [isMapView, setIsMapView] = useState<boolean>(true);
  const [selectedProvider, setSelectedProvider] = useState<string>("OpenAI");
  const [notification, setNotification] = useState<string | null>(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchProvider = async () => {
        await getSelectedProvider(setSelectedProvider);
      };

      fetchProvider();

      const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      };

      requestLocationPermission();
    }, []),
  );

  const getLandmarks = async () => {
    if (!location) return;
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    let landmarksList = [];
    switch (selectedProvider) {
      case "OpenAI":
        landmarksList = await fetchOpenAILandmarks(latitude, longitude);
        break;
      case "Anthropic":
        landmarksList = await fetchAnthropicLandmarks(latitude, longitude);
        break;
      case "Google":
        landmarksList = await fetchGoogleLandmarks(latitude, longitude);
        break;
      default:
        console.warn("Unknown provider");
    }

    setLandmarks(landmarksList);
    setNotification(
      `Retrieved ${landmarksList.length} landmarks using ${selectedProvider}`,
    );
  };

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
        <Button title="Fetch Landmarks" onPress={getLandmarks} />
        <TouchableOpacity style={styles.gearButton} onPress={goToSettings}>
          <Icon name="ios-settings" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {isMapView ? (
          <LandMarkMapScreen landmarks={landmarks} location={location} />
        ) : (
          <LandmarkListScreen landmarks={landmarks} />
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
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  content: {
    flex: 1, // Ensures the content area takes up available space
  },
  gearButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});

export default HomeScreen;
