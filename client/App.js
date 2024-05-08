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
import { PaperProvider } from 'react-native-paper';

import SplashScreen from './src/components/Authentification/SplashScreen';
import first from "./src/components/Authentification/frPage";
import OnboardingScreen from "./src/components/Authentification/OnboardingScreen";
import getstarted from "./src/components/Authentification/getstarted";
import login from "./src/components/Authentification/login";
import Home from "../client/src/screens/HomeScreen";
import signup from "../client/src/components/Authentification/signup"
import request from "../client/src/components/profile/requestreceived"
import requeststatus from "../client/src/components/profile/requeststatus"

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  console.log(process.env.API_URL, 'aab');
  
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
             <Stack.Screen 
            name="Requests" 
            component={request} 
            options={{ headerShown: true }} 
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;