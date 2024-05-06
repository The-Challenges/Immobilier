import React from 'react';
<<<<<<< HEAD
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
=======
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
          let Component = Icon;  // Default to MaterialCommunityIcons
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
            case 'Chatroom':  // Assuming you want to use the regular Icon for 'Chatroom'
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
