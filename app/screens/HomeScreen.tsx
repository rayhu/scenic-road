import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

// import { fetchLandmarks } from "../services/openaiService";
import { fetchLandmarks } from "../services/googleService";
import LandmarkListScreen from "./LandmarkListScreen";
import LandMarkMapScreen from "./LandmarkMapScreen";

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [landmarks, setLandmarks] = useState<any[]>([]);
  const [isMapView, setIsMapView] = useState<boolean>(true);

  const getLandmarks = async () => {
    if (!location) return;
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const landmarksList = await fetchLandmarks(latitude, longitude);
    console.log("Recieved Landmarks: ", landmarksList);
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

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Button title="Map View" onPress={() => setIsMapView(true)} />
        <Button title="List View" onPress={() => setIsMapView(false)} />
        <Button title="Fetch Landmarks" onPress={getLandmarks} />
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
});

export default HomeScreen;
