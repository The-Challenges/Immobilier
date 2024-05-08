import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import ProfileDetails from './src/components/profile/profileDetails';
import Listings from './src/components/profile/Listings';
import Contact from './src/components/profile/Contact';
import Search from './src/components/profile/SearchBar';
import NotificationPage from './src/components/profile/Notification';
import Apartment from './src/components/profile/Apartment';
import Lands from './src/components/profile/Land';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

// import RequestsList from './src/components/profile/'
import them from './src/font/font'
import FrPage from "./src/components/first/frPage";
import Two from "./src/components/two/two";
import Login from "./src/components/Authentification/login";
import Signup from "./src/components/Authentification/signup";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import RecommendedScreen from "./src/screens/RecommendedScreen";
import Chat from "./src/components/chat/chat";
import Chatroom from "./src/components/chat/allrooms";
import HomeTabs from './hpmetaps';
import Onboarding from './src/components/Authentification/OnboardingScreen';
import splach from './src/components/Authentification/SplashScreen'
const Stack = createNativeStackNavigator();


function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider  font={them}   >
      <NavigationContainer>

        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen name="FrPage" component={FrPage} options={{ headerShown: false }} />
          <Stack.Screen name="Two" component={Two} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name='chat' component={Chat} options={{ headerShown: false }} />
          <Stack.Screen name='Details' component={DetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ProfilDetail' component={ProfileDetails} options={{ headerShown: false }}  />
          <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }}  />
          <Stack.Screen name='splash' component={splach} options={{ headerShown: false }}  />


          <Stack.Screen 
            name='RecommendedScreen'
            component={RecommendedScreen}
          options={{ headerShown: false }} />

        {/* <Stack.Navigator initialRouteName="RequestsList">
          <Stack.Screen 
            name="RequestsList" 
            component={RequestsList} 
            options={{ title: "Manage Requests" }} 
          />
          <Stack.Screen 
            name="AllRequests" 
            component={AllRequests} 
            options={{ title: "All Requests" }} 
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  )

}

export default App;
