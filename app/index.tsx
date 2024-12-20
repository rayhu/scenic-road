import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import HomeScreen from "./screens/HomeScreen";
import LandmarkDetailScreen from "./screens/LandmarkDetailScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    // No NavitatorContinaer here
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // Hide header globally
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Scenic Road",
        }}
      />
      <Stack.Screen
        name="LandmarkDetail"
        component={LandmarkDetailScreen}
        options={{
          title: "Landmark Details",
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default App;
