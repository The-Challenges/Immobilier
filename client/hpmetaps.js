import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import RecommendedScreen from './src/screens/RecommendedScreen';
import Chatroom from './src/components/chat/allrooms';
import ProfileDetails from './src/components/profile/profileDetails';
// import ReceiverRequestsScreen from './src/components/request/sendRe/responseReq';  // Assuming this is the screen for managing requests
import NotificationsScreen from './src/components/request/notificationreq';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather'; // Make sure to install if not already

const Tab = createBottomTabNavigator();

function HomeTabs({ userId }) {

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
            case 'ProfileDetails':
              iconName = 'user';
              Component = Icon3;
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
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileDetails" component={ProfileDetails} options={{ headerShown: false }} />
      <Tab.Screen name="Recommended" component={RecommendedScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chatroom" component={Chatroom} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Requests" component={ReceiverRequestsScreen} options={{ headerShown: false }} /> */}
      <Tab.Screen 
        name="Notifications" 
        component={() => <NotificationsScreen userId={userId} />} 
        options={{ headerShown: false }}
      />

    </Tab.Navigator>
  );
}

export default HomeTabs;
