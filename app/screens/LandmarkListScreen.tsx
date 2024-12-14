import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type MapScreenRouteProp = RouteProp<{ params: { landmarks: any[] } }, "params">;

const LandmarkListScreen: React.FC = () => {
  const route = useRoute<MapScreenRouteProp>();
  const { landmarks = [] } = route.params || {};

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={landmarks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LandmarkDetail", { landmark: item })
            }
          >
            <Text style={{ fontSize: 18 }}>
              {item.name} - {item.distance}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LandmarkListScreen;
