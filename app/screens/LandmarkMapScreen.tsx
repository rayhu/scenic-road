import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React from "react";
import { Text, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

import { playTextToSpeech } from "../services/textToSpeechService";
import { RootStackParamList } from "../types";
import log from "../utils/logger";

interface Landmark {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  story?: string;
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

  React.useEffect(() => {
    log.info("LandmarkMapScreen mounted");
    return () => {
      log.info("LandmarkMapScreen unmounted");
    };
  }, []);

  const handleMarkerLongPress = (landmark: Landmark) => {
    navigation.navigate("LandmarkDetail", { landmark });
  };

  const handleMarkerPress = async (landmark: Landmark) => {
    log.info(`Playing audio for ${landmark.name}`);
    if (landmark.story) {
      await playTextToSpeech(`The story of ${landmark.name}`);
      await playTextToSpeech(landmark.story);
    } else {
      await playTextToSpeech(
        `There is no story for ${landmark.name} yet, would you like to write one?`,
      );
    }
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
