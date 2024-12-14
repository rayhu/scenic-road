import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { fetchLandmarks } from '../services/anthropicService';
//import { fetchLandmarks } from '../services/openaiService';

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [landmarks, setLandmarks] = useState<any[]>([]);

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
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
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
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>Scenic Road</Text>
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
            radius={50}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(0, 0, 255, 0.3)"
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
          />
        ))}
      </MapView>
      <Button title="Refresh Location" onPress={() => { /* Refresh logic */ }} />
    </View>
  );
};

export default HomeScreen; 