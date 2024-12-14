import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LandmarkListScreen from './screens/LandmarkListScreen';
import LandmarkDetailScreen from './screens/LandmarkDetailScreen';

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
            title: 'Scenic Road', 
          }}
        />
        <Stack.Screen
          name="LandmarkList"
          component={LandmarkListScreen}
        />
        <Stack.Screen
          name="LandmarkDetail"
          component={LandmarkDetailScreen}
        />
      </Stack.Navigator>
  );
};

export default App;
