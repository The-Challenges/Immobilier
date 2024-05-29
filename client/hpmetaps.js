import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import ProfileDetails from './src/components/profile/profileDetails';
// import Chatroom from './src/components/chat/allrooms';
import GoogleMaps from './src/screens/googleMaps';
import Subscription from './src/components/Subscription/Subscription';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native';

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
            case 'ProfileDetails':
              iconName = 'user';
              Component = Icon3;
              break;
            case 'Chatroom':
              iconName = 'chatbox-ellipses-outline';
              Component = Icon2;
              break;
            case 'GoogleMaps':
              iconName = 'map';
              Component = Icon4;
              break;
            case 'Subscription':
              iconName = 'crown';
              Component = Icon5;
              break;
            default:
              iconName = 'alert-circle-outline';
              break;
          }
          return (
            <View style={focused ? styles.focusedTab : styles.defaultTab}>
              <Component name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: '#007AFF', // blue color for active state
        tabBarInactiveTintColor: '#888888', // gray color for inactive state
        tabBarShowLabel: false, // hide tab labels
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          borderTopWidth: 0,
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false, title: 'Home' }} />
      <Tab.Screen name="GoogleMaps" component={GoogleMaps} options={{ headerShown: false, title: 'Map' }} />
      {/* <Tab.Screen name="Chatroom" component={Chatroom} options={{ headerShown: false, title: 'Chat' }} /> */}
      <Tab.Screen name="Subscription" component={Subscription} options={{ headerShown: false, title: 'Subscription' }} />
      <Tab.Screen name="ProfileDetails" component={ProfileDetails} options={{ headerShown: false, title: 'Profile' }} />
    </Tab.Navigator>
  );
}

const styles = {
  defaultTab: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    padding: 10,
    borderRadius: 15,
  },
  focusedTab: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6EEFF',
    padding: 10,
    borderRadius: 15,
  },
};

export default HomeTabs;
