import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import { fetchLandmarks } from '../services/openaiService';

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [landmarks, setLandmarks] = useState<string>('');

  // const getLandmarks = async (location: Location.LocationObject) => {
  //   if (!location) return;
  //   const latitude = location.coords.latitude;
  //   const longitude = location.coords.longitude;
  //   const landmarksList = await fetchLandmarks(latitude, longitude);
  //   setLandmarks(landmarksList);
  // };


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
        // getLandmarks(location);
      }
    });
  }, []);

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
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
      </MapView>
      <Button title="Refresh Location" onPress={() => { /* Refresh logic */ }} />
    </View>
  );
};

export default HomeScreen; 