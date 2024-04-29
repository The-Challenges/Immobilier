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
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import X from './src/components/chat'
import SearchBar from './src/components/searchBar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import list from './src/components/list'


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
        name='list'
        component={list}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen
          name="chat"
          component={X}
          options={{
            headerShown: false
          }}
         
        />
        <Stack.Screen 
         name='search'
         component={SearchBar}
         options={{
           headerShown: false
         }}
       />

    
       
      </Stack.Navigator>

    
  </NavigationContainer>
  );
}



export default App;
