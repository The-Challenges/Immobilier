/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import editProfile from './src/components/UserProfile/editProfile';
import UserProfile from './src/components/UserProfile/UserProfile';
import FullCreateHouse from './src/components/UserProfile/cratePosts/AddHouse';
// import CreateHouse from './src/components/UserProfile/cratePosts/CreateHouse';
import AddLand from './src/components/UserProfile/cratePosts/AddLand';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="EditProfile" component={editProfile} />
        <Stack.Screen name="AddHouse" component={FullCreateHouse} />
        {/* <Stack.Screen name="CreateHouse" component={CreateHouse} /> */}
        <Stack.Screen name="AddLand" component={AddLand} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
