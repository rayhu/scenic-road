import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

import LandmarkTextbox from "../components/LandmarkTextbox";
//import { fetchLandmarks } from '../services/anthropicService';
import { fetchLandmarks } from "../services/openaiService";
import LandmarkListScreen from "./LandmarkListScreen";
import LandMarkMapScreen from "./LandmarkMapScreen";

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [landmarks, setLandmarks] = useState<any[]>([]);
  const [isMapView, setIsMapView] = useState<boolean>(true);

  const getLandmarks = async (location: Location.LocationObject) => {
    if (!location) return;
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const landmarksList = await fetchLandmarks(latitude, longitude);
    setLandmarks(landmarksList);
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    requestLocationPermission().then(() => {
      if (location) {
        getLandmarks(location);
      }
    });
  }, [location]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Button title="Map View" onPress={() => setIsMapView(true)} />
        <Button title="List View" onPress={() => setIsMapView(false)} />
      </View>
      <View style={styles.content}>
        {isMapView ? (
          <LandMarkMapScreen landmarks={landmarks} location={location} />
        ) : (
          <LandmarkListScreen landmarks={landmarks} />
        )}
      </View>

      <LandmarkTextbox landmarks={landmarks} />
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
});

export default HomeScreen;
