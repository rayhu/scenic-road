import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Button, Text, View } from "react-native";

type LandmarkDetailScreenRouteProp = RouteProp<
  { params: { landmark: { name: string } } },
  "params"
>;

const LandmarkDetailScreen: React.FC = () => {
  const route = useRoute<LandmarkDetailScreenRouteProp>();
  const { landmark } = route.params;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24 }}>{landmark.name}</Text>
      <Text style={{ marginVertical: 8 }}>Description of the landmark...</Text>
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

export default LandmarkDetailScreen;
