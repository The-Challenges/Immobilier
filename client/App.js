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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import X from './src/components/chat'
import SearchBar from './src/components/searchBar';
import list from './src/components/list'
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import RecommendedScreen from './src/screens/RecommendedScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';  





const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* <Stack.Screen 
        name='list'
        component={list}
        options={{
        headerShown: false
        }}
        /> */}

        {/* <Stack.Screen
          name="chat"
          component={X}
          options={{
          headerShown: false
          }}
         />  */}
         
        
         {/* <Stack.Screen 
         name='search'
         component={SearchBar}
         options={{
         headerShown: false
         }}
         />  */}

        <Stack.Screen 
         name='HomeScreen'
         component={HomeScreen}
         options={{
           headerShown: false
         }}
       />

        

         <Stack.Screen 
         name='DetailsScreen'
         component={DetailsScreen}
         options={{
           headerShown: false
         }}
       />

<Stack.Screen 
  name='RecommendedScreen'
  component={RecommendedScreen}
  options={({ navigation }) => ({
    headerShown: true,
    title: 'Recommended Houses',
    headerStyle: {
      backgroundColor: '#f8f8f8', 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1, 
      shadowRadius: 3, 
      elevation: 5, 
    },
    headerTitleStyle: {
      fontWeight: 'bold', // Bold font for the title
      fontSize: 20, // Slightly larger font size for visibility
      fontFamily: 'Roboto, "Helvetica Neue", sans-serif', // Elegant, professional font family
    },
    headerTintColor: 'black', // Ensuring all header text and icons are black for consistency
    headerLeft: () => (
      <Icon
        name="arrow-back"
        size={24}
        color="dark"
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 15 }}
      />
    ),
  })}
/>

      
    
       
      </Stack.Navigator>
  </NavigationContainer>
      

  );
}



export default App;
