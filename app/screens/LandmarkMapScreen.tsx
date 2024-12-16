import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React from "react";
import { Text, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

import { playTextToSpeech } from "../services/textToSpeechService";
import { RootStackParamList } from "../types";

interface Landmark {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface LandMarkMapScreenProps {
  landmarks: Landmark[];
  location: Location.LocationObject | null;
}

const LandMarkMapScreen: React.FC<LandMarkMapScreenProps> = ({
  landmarks,
  location,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleMarkerLongPress = (landmark: Landmark) => {
    navigation.navigate("LandmarkDetail", { landmark });
  };

  const handleMarkerPress = (landmark: Landmark) => {
    console.log(`Playing audio for ${landmark.name}`);
    playTextToSpeech(landmark.name + " is located at " + landmark.description);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, textAlign: "center" }}>Scenic Road</Text>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Circle
            center={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            radius={350}
            strokeColor="rgba(0, 0, 255, 0.8)"
            fillColor="rgba(0, 0, 255, 0.5)"
          />
        )}
        {landmarks.map((landmark, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: landmark.latitude,
              longitude: landmark.longitude,
            }}
            title={landmark.name}
            description={landmark.description}
            pinColor="pink"
            onPress={() => handleMarkerPress(landmark)}
            onCalloutPress={() => handleMarkerPress(landmark)}
            onLongPress={() => handleMarkerLongPress(landmark)}
          />
        ))}
      </MapView>
    </View>
  );
};

export default LandMarkMapScreen;
