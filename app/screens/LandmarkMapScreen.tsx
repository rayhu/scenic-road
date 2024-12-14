import { RouteProp } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import React from "react";
import { Text, View } from "react-native";
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import MapView, { Circle, Marker } from "react-native-maps";

type MapScreenRouteProp = RouteProp<
  { params: { landmarks: any[]; location: Location.LocationObject } },
  "params"
>;

const MapScreen: React.FC = () => {
  const route = useRoute<MapScreenRouteProp>();
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { landmarks = [], location } = route.params || {};

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
        {/* {landmarks.map((landmark, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: landmark.latitude,
              longitude: landmark.longitude,
            }}
            title={landmark.name}
            description={landmark.description}
            pinColor="pink"
          />
        ))} */}
      </MapView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

export default MapScreen;
