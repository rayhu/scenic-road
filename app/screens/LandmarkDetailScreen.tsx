import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type LandmarkDetailScreenRouteProp = RouteProp<
  { params: { landmark: { name: string; description: string } } },
  "params"
>;

const LandmarkDetailScreen: React.FC = () => {
  const route = useRoute<LandmarkDetailScreenRouteProp>();
  const { landmark } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{landmark.name}</Text>
      <Text style={styles.description}>{landmark.description}</Text>
      <Button
        title="Introduction"
        onPress={() => {
          /* Call OpenAI API and TTS */
        }}
      />
      <Button
        title="Navigate"
        onPress={() => {
          /* Open navigation app */
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  description: {
    marginVertical: 8,
  },
});

export default LandmarkDetailScreen;
