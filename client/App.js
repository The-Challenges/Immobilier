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
import login from "./src/components/Authentification/login";
import signup from "./src/components/Authentification/signup";
import ProfileDetails from './src/components/profile/profileDetails';
import Listings from './src/components/profile/Listings';
import Contact from './src/components/profile/Contact';
import Search from './src/components/profile/SearchBar';
import NotificationPage from './src/components/profile/Notification';
import Apartment from './src/components/profile/Apartment';
import Lands from './src/components/profile/Land';

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
 
   {/* <Stack.Screen
          name="login"
          component={login}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="signup"
          component={signup}
          options={{ title: 'Sign Up' }} 
        /> */}
    <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetails}
          options={{ title: '' }} // Customize the title if needed
        /> 
         <Stack.Screen name="Listings" component={Listings} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Apartment" component={Apartment} />
        <Stack.Screen name="Notifications" component={NotificationPage} />
        <Stack.Screen name="Land" component={Lands} />
      </Stack.Navigator>

    
  </NavigationContainer>
  </PaperProvider>
  );
}



export default App;
