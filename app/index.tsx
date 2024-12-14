import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
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
    </Stack.Navigator>
  );
};

export default App;
