import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface Landmark {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface LandmarkTextboxProps {
  landmarks: Landmark[];
}

const LandmarkTextbox: React.FC<LandmarkTextboxProps> = ({ landmarks }) => {
  return (
    <View style={styles.textbox}>
      {/* <Text>{JSON.stringify(landmarks)}</Text> */}
      <ScrollView>
        {landmarks.map((landmark, index) => (
          <View key={index} style={styles.landmarkItem}>
            <Text style={styles.landmarkName}>{landmark.name}</Text>
            <Text style={styles.landmarkDescription}>
              {landmark.description}
            </Text>
            <Text style={styles.landmarkCoordinates}>
              Lat: {landmark.latitude}, Lon: {landmark.longitude}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textbox: {
    position: "absolute",
    bottom: 100,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    maxHeight: "30%",
    borderColor: "gray",
    borderWidth: 1,
  },
  landmarkItem: {
    marginBottom: 10,
  },
  landmarkName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  landmarkDescription: {
    fontSize: 14,
    color: "gray",
  },
  landmarkCoordinates: {
    fontSize: 12,
    color: "darkgray",
  },
});

export default LandmarkTextbox;
