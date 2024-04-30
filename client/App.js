import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import HomeScreen from './src/screens/HomeScreen';
//  import DetailsScreen from './src/screens/DetailsScreen';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View,Text } from 'react-native';

const Tab = createBottomTabNavigator();
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        {/* <Tab.Screen name="OnBoardScreen" component={OnBoardScreen} /> */}
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        {/* <Tab.Screen name="DetailsScreen" component={DetailsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
