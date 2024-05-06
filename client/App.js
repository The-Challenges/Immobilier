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
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="getstarted" 
            component={getstarted} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="login" 
            component={login} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }} 
          />
             <Stack.Screen 
            name="signup" 
            component={signup} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
