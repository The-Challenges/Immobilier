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


// Import screens
import FrPage from "./src/components/first/frPage";
import Two from "./src/components/two/two";
import Login from "./src/components/Authentification/login";
import Signup from "./src/components/Authentification/signup";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import RecommendedScreen from "./src/screens/RecommendedScreen";
import Chat from "./src/components/chat/chat";
import Chatroom from "./src/components/chat/allrooms";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for logged-in users
function HomeTabs() {
  return (


    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let Component = Icon; 
          let Component = Icon;  
          switch (route.name) {
            case 'HomeScreen':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Details':
              iconName = 'information-outline';
              break;
            case 'Recommended':
              iconName = 'star-outline';
              break;
              case 'Chatroom':  
              iconName = 'chatbox-ellipses-outline';
              Component = Icon2;
            case 'Chatroom':  
            iconName = 'chatbox-ellipses-outline';
            Component = Icon2;
              break;
              
              default:
                iconName = 'alert-circle-outline';
                break;
              }
              return <Component name={iconName} size={size} color={color} />;
            },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Recommended" component={RecommendedScreen} />
      <Tab.Screen name="Chatroom" component={Chatroom} />
      {/* <Tab.Screen name="Chat" component={Chat} /> */}
    </Tab.Navigator>
 
  );
}

// Main stack navigator
function App() {
  return (
    <NavigationContainer>
<Stack.Screen
      name="ProfileDetails"
      component={ProfileDetails}
      options={{ title: '' }} 
    /> 
     <Stack.Screen name="Listings" component={Listings} />
    <Stack.Screen name="Contact" component={Contact} />
    <Stack.Screen name="Apartment" component={Apartment} />
    <Stack.Screen name="Notifications" component={NotificationPage} />
    <Stack.Screen name="Land" component={Lands} />
      <Stack.Navigator initialRouteName="FrPage">
        <Stack.Screen name="FrPage" component={FrPage} options={{ headerShown: false }} />
        <Stack.Screen name="Two" component={Two} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name='chat' component={Chat} options={{ headerShown: false }}     />
        <Stack.Screen name='Details' component={DetailsScreen} options={{headerShown : false}} />

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
              <Icon
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
  );
}

export default App;
