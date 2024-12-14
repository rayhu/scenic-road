import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Landmark {
  id: string;
  name: string;
  distance: string;
}

const landmarks: Landmark[] = [
  { id: '1', name: 'Landmark A', distance: '2 km' },
  { id: '2', name: 'Landmark B', distance: '5 km' },
];

const LandmarkListScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={landmarks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('LandmarkDetail', { landmark: item })}>
            <Text style={{ fontSize: 18 }}>{item.name} - {item.distance}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LandmarkListScreen;