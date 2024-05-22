
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen'
// import DetailsScreen from './src/screens/DetailsScreen'
import RecommendedScreen from './src/screens/RecommendedScreen'
import Chatroom from './src/components/chat/allrooms'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import ProfileDetails from './src/components/profile/profileDetails';
import GoogleMaps from './src/screens/googleMaps';
import NotificationsScreen from './src/components/notification';




const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let Component = Icon;  
          switch (route.name) {
            case 'HomeScreen':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'ProfilDetail':
              iconName = 'user';
              Component= Icon3 ;
              break;
            case 'Recommended':
              iconName = 'star-outline';
              break;
            case 'Chatroom':  
            iconName = 'chatbox-ellipses-outline';
            Component = Icon2;
              break;
                 case 'Notifications':
              iconName = 'bell' ? 'bell' : 'bell-outline';
              Component = Icon4;
              break
          
            default:
              iconName = 'alert-circle-outline';   
              break;
          }
          return <Component name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="ProfilDetail" component={ProfileDetails} options={{ headerShown: false }} />
      <Tab.Screen name="Recommended" component={RecommendedScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chatroom" component={Chatroom} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Chat" component={Chat} /> */}
      <Tab.Screen name="GoogleMaps" component={GoogleMaps} options={{ headerShown: false }}  />

    </Tab.Navigator>
  );
}

export default HomeTabs;
