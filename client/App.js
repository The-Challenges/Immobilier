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
import AddPosts from './src/components/UserProfile/AddPosts';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
        />
        <Stack.Screen
          name="editProfile"
          component={editProfile}
        />
        <Stack.Screen
          name="AddPosts"
          component={AddPosts}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
