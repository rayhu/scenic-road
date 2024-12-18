import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import log from "../utils/logger";

// Import the logger

interface Landmark {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface LandmarkListScreenProps {
  landmarks: Landmark[];
}

const LandmarkListScreen: React.FC<LandmarkListScreenProps> = ({
  landmarks,
}) => {
  const navigation = useNavigation();

  React.useEffect(() => {
    log.info("LandmarkListScreen mounted");
    return () => {
      log.info("LandmarkListScreen unmounted");
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={landmarks}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.landmarkItem}
            onPress={() => {
              log.debug(`Navigating to details of ${item.name}`);
              navigation.navigate("LandmarkDetail", { landmark: item });
            }}
          >
            <Text style={styles.landmarkName}>{item.name}</Text>
            <Text style={styles.landmarkDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  landmarkItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#f9f9f9",
  },
  landmarkName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  landmarkDescription: {
    fontSize: 14,
    color: "gray",
  },
});

export default LandmarkListScreen;
