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
import { PaperProvider } from 'react-native-paper';
import first from './src/components/first/frPage'
import two from './src/components/two/two'


function App() {

  const isDarkMode = useColorScheme() === 'dark';
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  console.log(process.env.API_URL,'aab');
  const Stack = createNativeStackNavigator();
  return (
<PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name='first'
        component={first}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen 
        name='two'
        component={two}
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
    
        {/* <Stack.Screen 
         name='search'
         component={SearchBar}
         options={{
           headerShown: false
         }}
       /> */}

    
       
      </Stack.Navigator>

    
  </NavigationContainer>
  </PaperProvider>
  );
}



export default App;
