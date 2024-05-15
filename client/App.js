


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ProfileDetails from './src/components/profile/profileDetails';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Listings from './src/screens/Profile/Listings';
import Contact from './src/screens/Profile/Contact';
import Search from './src/screens/Profile/SearchBar';
import NotificationPage from './src/screens/Profile/Notification';
import Apartment from './src/screens/Profile/Apartment';
import Lands from './src/screens/Profile/Land';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import them from './src/font/font'
import FrPage from "./src/components/first/frPage";
import Two from "./src/components/two/two";
import Login from "./src/components/Authentification/login";
import Signup from "./src/components/Authentification/signup";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FilterScreen from "./src/screens/FilterScreen";
import RecommendedScreen from "./src/screens/RecommendedScreen";
import ResultsScreen from "./src/screens/ResultsScreen"
import Chat from "./src/components/chat/chat";
import FilterScreenLands from "./src/screens/FilterScreenLand";
import ResultsScreenLand from "./src/screens/ResultsScreenLand";




import SeeAllHouses from "./src/screens/SeeAllHouses";
import SeeAllLands from "./src/screens/SeeAllLands";


// import Chatroom from "./src/components/chat/allrooms";

import HomeTabs from './hpmetaps';
import Onboarding from './src/components/Authentification/OnboardingScreen';
import splach from './src/components/Authentification/SplashScreen'
import EditProfile from './src/screens/Profile/editProfile';
import AddLand from './src/components/profile/cratePosts/AddLand'
import AddHouse from './src/components/profile/cratePosts/AddHouse'




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
          <Stack.Screen name='DetailsScreen' component={DetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }}  />
          <Stack.Screen name='FilterScreen' component={FilterScreen} options={{ headerShown: false }}  />
          <Stack.Screen name='ResultsScreen' component={ResultsScreen} options={{ headerShown: false }}  />
          <Stack.Screen name='SeeAllHouses' component={SeeAllHouses} options={{ headerShown: false }}  />
          <Stack.Screen name='SeeAllLands' component={SeeAllLands} options={{ headerShown: false }}  />
          <Stack.Screen name='FilterScreenLands' component={FilterScreenLands} options={{ headerShown: false }}  />
          <Stack.Screen name='ResultsScreenLand' component={ResultsScreenLand} options={{ headerShown: false }}  />


          <Stack.Screen name='ProfilDetail' component={ProfileDetails} options={{ headerShown: false }}  />
          <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }}  />
          <Stack.Screen name='splash' component={splach} options={{ headerShown: false }}  />
          <Stack.Screen name='apartement' component={Apartment} options={{ headerShown: false }}  />
          <Stack.Screen name='Land' component={Lands} options={{ headerShown: false }}  />


          {/* <Stack.Screen name='ProfileDetails' component={ProfileDetails} /> */}
          <Stack.Screen name='EditProfile' component={EditProfile} />
          <Stack.Screen name='AddHouse' component={AddHouse} />
          <Stack.Screen name='AddLand' component={AddLand} />
          <Stack.Screen 

          name='RecommendedScreen'
          component={RecommendedScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Recommended Houses',
            headerStyle: {
              backgroundColor: '#faebd7', 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 2 }, 
              shadowOpacity: 0.1, 
              shadowRadius: 3, 
              elevation: 5, 
            },
            headerTitleStyle: {
              fontWeight: 'bold', 
              fontSize: 22, 
              fontFamily: 'Roboto, "Helvetica Neue", sans-serif', 
            },
            headerTintColor: 'black', 
            headerLeft: () => (
              <Icon2
                name="arrow-back-sharp"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 15 }}
              />
            ),
          })}
      />

           

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  )

}



export default App;