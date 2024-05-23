// // import React from 'react';
// // import {NavigationContainer} from '@react-navigation/native';

// // import {createNativeStackNavigator} from '@react-navigation/native-stack';
// // import { PaperProvider } from 'react-native-paper';
// // // import ProfileDetails from './src/components/profile/profileDetails';
// // // import Listings from './src/components/profile/Listings';
// // // import Contact from './src/components/profile/Contact';
// // // import Search from './src/components/profile/SearchBar';
// // // import NotificationPage from './src/components/profile/Notification';
// // // import Apartment from './src/components/profile/Apartment';
// // // import Lands from './src/components/profile/Land';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// // // import Icon2 from 'react-native-vector-icons/Ionicons';


// // // Import screens
// // // import FrPage from "./src/components/first/frPage";
// // // import Two from "./src/components/two/two";
// // // import Login from "./src/components/Authentification/login";
// // // import Signup from "./src/components/Authentification/signup";
// // import HomeScreen from "./src/screens/HomeScreen";
// // import DetailsScreen from "./src/screens/DetailsScreen";
// // import RecommendedScreen from "./src/screens/RecommendedScreen";
// // // import Chat from "./src/components/chat/chat";
// // // import Chatroom from "./src/components/chat/allrooms";

// // // const Stack = createNativeStackNavigator();
// // const Tab = createBottomTabNavigator();

// // // Tab Navigator for logged-in users
// // function App() {
// //   return (
// // <PaperProvider>
// //     {/* <NavigationContainer>
// //       <Stack.Navigator> */}
 
// //    {/* <Stack.Screen
// //           name="login"
// //           component={login}
// //           options={{ headerShown: false }} 
// //         />
// //         <Stack.Screen
// //           name="signup"
// //           component={signup}
// //           options={{ title: 'Sign Up' }} 
// //         /> */}
// //     {/* <Stack.Screen
// //           name="ProfileDetails"
// //           component={ProfileDetails}
// //           options={{ title: '' }} 
// //         /> 
// //          <Stack.Screen name="Listings" component={Listings} />
// //         <Stack.Screen name="Contact" component={Contact} />
// //         <Stack.Screen name="Apartment" component={Apartment} />
// //         <Stack.Screen name="Notifications" component={NotificationPage} />
// //         <Stack.Screen name="Land" component={Lands} />
// //       </Stack.Navigator>

    
// //   </NavigationContainer> */}

// //     {/* <Tab.Navigator
// //       screenOptions={({ route }) => ({
// //         tabBarIcon: ({ focused, color, size }) => {
// //           let iconName;
// //           let Component = Icon; 
// //           switch (route.name) {
// //             case 'HomeScreen':
// //               iconName = focused ? 'home' : 'home-outline';
// //               break;
// //             case 'Details':
// //               iconName = 'information-outline';
// //               break;
// //             case 'Recommended':
// //               iconName = 'star-outline';
// //               break;
// //             case 'Chatroom':  
// //             iconName = 'chatbox-ellipses-outline';
// //             Component = Icon2;
// //               break;
          
// //             default:
// //               iconName = 'alert-circle-outline';
// //               break;
// //           }
// //           return <Component name={iconName} size={size} color={color} />;
// //         },
// //         tabBarActiveTintColor: 'tomato',
// //         tabBarInactiveTintColor: 'gray',
// //       })}>

// //       <Tab.Screen name="HomeScreen" component={HomeScreen} />
// //       <Tab.Screen name="Details" component={DetailsScreen} />
// //       <Tab.Screen name="Recommended" component={RecommendedScreen} />
// //       <Tab.Screen name="Chatroom" component={Chatroom} />
// //       {/* <Tab.Screen name="Chat" component={Chat} /> */}
// //     {/* </Tab.Navigator> */} 
// //     </PaperProvider>
// //   );
// // }

// // // Main stack navigator
// // // function App() {
// // //   return (
// // //     <NavigationContainer>
// // //       <Stack.Navigator initialRouteName="FrPage">
// // //         <Stack.Screen name="FrPage" component={FrPage} options={{ headerShown: false }} />
// // //         <Stack.Screen name="Two" component={Two} options={{ headerShown: false }} />
// // //         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
// // //         <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
// // //         <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
// // //         <Stack.Screen name='chat' component={Chat} options={{ headerShown: false }}     />
// // //         <Stack.Screen name='Details' component={DetailsScreen} options={{headerShown : false}} />

// // //       </Stack.Navigator>
// // //     </NavigationContainer>
// // //   );
// // // }

// // export default App;


// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import ProfileDetails from './src/components/profile/profileDetails';
// import Icon2 from 'react-native-vector-icons/Ionicons';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { PaperProvider } from 'react-native-paper';
// import Listings from './src/screens/Profile/Listings';
// import Contact from './src/screens/Profile/Contact';
// import Search from './src/screens/Profile/SearchBar';
// import NotificationPage from './src/screens/Profile/Notification';
// import Apartment from './src/screens/Profile/Apartment';
// import Lands from './src/screens/Profile/Land';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import them from './src/font/font'
// import FrPage from "./src/components/first/frPage";
// import Two from "./src/components/two/two";
// import Login from "./src/components/Authentification/login";
// import Signup from "./src/components/Authentification/signup";
// import HomeScreen from "./src/screens/HomeScreen";
// import DetailsScreen from "./src/screens/DetailsScreen";
// import FilterScreen from "./src/screens/FilterScreen";
// import RecommendedScreen from "./src/screens/RecommendedScreen";
// import ResultsScreen from "./src/screens/ResultsScreen"
// import Chat from "./src/components/chat/chat";
// import Onboarding from "./src/components/Authentification/OnboardingScreen";
// import splash from "./src/components/Authentification/SplashScreen";

// import EditProfile from './src/screens/Profile/editProfile'
// // import UserProfile from "./src/components/UserProfile/UserProfile";

// import AddHouse from './src/components/profile/cratePosts/AddHouse'
// import AddLand from './src/components/profile/cratePosts/AddLand'
// import FilterScreenLands from "./src/screens/FilterScreenLand";
// import ResultsScreenLands from "./src/screens/ResultsScreenLand"




// import SeeAllHouses from "./src/screens/SeeAllHouses";
// import SeeAllLands from "./src/screens/SeeAllLands";


// // import Chatroom from "./src/components/chat/allrooms";

// import HomeTabs from './hpmetaps';

// const Stack = createNativeStackNavigator();

// // Main stack navigator
// function App() {




//   const Stack = createNativeStackNavigator();

//   return (
//     <PaperProvider  font={them}   >
//       <NavigationContainer>

//         <Stack.Navigator initialRouteName="splash">
//           {/* <Stack.Screen name="FrPage" component={FrPage} options={{ headerShown: false }} /> */}
//           {/* <Stack.Screen name="Two" component={Two} options={{ headerShown: false }} /> */}
//           {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
//           {/* <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />  */}
//           <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
//           <Stack.Screen name='chat' component={Chat} options={{ headerShown: false }} />


//         {/* walid */}
//           <Stack.Screen name='DetailsScreen' component={DetailsScreen} options={{ headerShown: false }} />
//           <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }}  />
//           <Stack.Screen name='FilterScreen' component={FilterScreen} options={{ headerShown: false }}  />
//           <Stack.Screen name='ResultsScreen' component={ResultsScreen} options={{ headerShown: false }}  />
//           <Stack.Screen name='FilterScreenLands' component={FilterScreenLands} options={{ headerShown: false }}  />
//           <Stack.Screen name='ResultsScreenLand' component={ResultsScreenLands} options={{ headerShown: false }}  />

//           <Stack.Screen name='SeeAllHouses' component={SeeAllHouses} options={{ headerShown: false }}  />
//           <Stack.Screen name='SeeAllLands' component={SeeAllLands} options={{ headerShown: false }}  />

//           <Stack.Screen name='ProfilDetail' component={ProfileDetails} options={{ headerShown: false }}  />
//           {/* <Stack.Screen name='UserProfile' component={UserProfile} options={{ headerShown: false }}  /> */}
//           {/* walid */}


//           {/* <Stack.Screen name='Received' component={Received} options={{ headerShown: false }}  /> */}
//           {/* <Stack.Screen name='requestreceivedlands' component={requestreceivedlands} options={{ headerShown: false }}  /> */}
//           {/* <Stack.Screen name='requeststatus' component={requeststatus} options={{ headerShown: false }}  /> */}
//           {/* <Stack.Screen name='requeststatuslands' component={requeststatuslands} options={{ headerShown: false }}  /> */}





//           {/* <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }}  /> */}
//           {/* <Stack.Screen name='splash' component={splach} options={{ headerShown: false }}  /> */}
//           <Stack.Screen name='apartement' component={Apartment} options={{ headerShown: false }}  />
//           <Stack.Screen name='Land' component={Lands} options={{ headerShown: false }}  />
//           {/* <Stack.Screen name='FilterScreenLands' component={FilterScreenLands} options={{ headerShown: false }}  /> */}
//           {/* <Stack.Screen name='ResultsScreenLand' component={ResultsScreenLand} options={{ headerShown: false }}  /> */}


//           {/* <Stack.Screen name='ProfileDetails' component={ProfileDetails} /> */}
//           <Stack.Screen name='EditProfile' component={EditProfile} />
//           <Stack.Screen name='AddHouse' component={AddHouse} />
//           <Stack.Screen name='AddLand' component={AddLand} />
//           <Stack.Screen 

//           name='RecommendedScreen'
//           component={RecommendedScreen}
//           options={({ navigation }) => ({
//             headerShown: true,
//             title: 'Recommended Houses',
//             headerStyle: {
//               backgroundColor: '#faebd7', 
//               shadowColor: '#000', 
//               shadowOffset: { width: 0, height: 2 }, 
//               shadowOpacity: 0.1, 
//               shadowRadius: 3, 
//               elevation: 5, 
//             },
//             headerTitleStyle: {
//               fontWeight: 'bold', 
//               fontSize: 22, 
//               fontFamily: 'Roboto, "Helvetica Neue", sans-serif', 
//             },
//             headerTintColor: 'black', 
//             headerLeft: () => (
//               <Icon2
//                 name="arrow-back-sharp"
//                 size={24}
//                 color="black"
//                 onPress={() => navigation.goBack()}
//                 style={{ marginLeft: 15 }}
//               />
//             ),
//           })}
//       />

           

//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>

//   )

// }



// export default App;


import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, PaperProvider } from 'react-native-paper';
import ProfileDetails from './src/components/profile/profileDetails';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import HomeScreen from "./src/screens/HomeScreen";
// import DetailsScreen from "./src/screens/DetailsScreen";
import FilterScreen from "./src/screens/FilterScreen";
// import RecommendedScreen from "./src/screens/RecommendedScreen";
import ResultsScreen from "./src/screens/ResultsScreen";
import Chat from "./src/components/chat/chat";
import Onboarding from "./src/components/Authentification/OnboardingScreen";
import EditProfile from './src/screens/Profile/editProfile'
import AddHouse from './src/components/profile/cratePosts/AddHouse'
import AddLand from './src/components/profile/cratePosts/AddLand'
import SeeAllHouses from "./src/screens/SeeAllHouses";
import SeeAllLands from "./src/screens/SeeAllLands";
import requeststatus from "./src/components/profile/requeststatus"
import requeststatuslands from "./src/components/profile/requeststatuslands"
import HomeTabs from './hpmetaps';
import splach from './src/components/Authentification/SplashScreen'
import Received from "./src/components/profile/requestreceived"
import requestreceivedlands from "./src/components/profile/requestreceivedlands"
import Subscription from "./src/components/Subscription/Subscription"
import FavoritesScreen from "./src/screens/FavoritesScreen"
import FilterScreenLands from "./src/screens/FilterScreenLand"
import ResultsScreenLand from './src/screens/ResultsScreenLand';
import PaymentScreen from './src/components/Subscription/Payment';
import PaymentConfirmationScreen from './src/components/Subscription/PaymentConfirmationScreen';
import Login from './src/components/Authentification/login'
import Signup from './src/components/Authentification/signup'
import socketserv from './src/components/request/socketserv';
import viewDetHouse from './src/viewDetHouse'
import viewDetLand from './src/viewDetLand'







const Stack = createNativeStackNavigator();

// Main stack navigator
function App() {
  const [visible, setVisible] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [responseVisible, setResponseVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const showResponseDialog = () => setResponseVisible(true);
  const hideResponseDialog = () => setResponseVisible(false);

  const handleAccept = async () => {
    if (requestData) {
      const { type, data } = requestData;
      const endpoint = type === 'land' ? `update-land-request/${data.user.id}/${data.land.id}` : `update-house-request/${data.user.id}/${data.land.id}`;

      try {
        console.log(`Sending update request to ${API_AD}/api/reqtest/${endpoint} with status: Confirmed`);
        await axios.put(`${API_AD}/api/reqtest/${endpoint}`, { status: 'Confirmed' });
        const responseEvent = type === 'land' ? 'respond_to_request_land' : 'respond_to_request_house';
        socketserv.emit(responseEvent, { ...data, status: 'Confirmed' });
      } catch (error) {
        console.error("Error updating request status:", error.response ? error.response.data : error.message);
      }

    }
    hideDialog();
  }
  const handleRefuse = async () => {
    if (requestData) {
      const { type, data } = requestData;
      const endpoint = type === 'land' ? `update-land-request/${data.user.id}/${data.land.id}` : `update-house-request/${data.user.id}/${data.house.id}`;

      try {
        console.log(`Sending update request to ${API_AD}/api/reqtest/${endpoint} with status: Rejected`);
        await axios.put(`${API_AD}/api/reqtest/${endpoint}`, { status: 'Rejected' });
        const responseEvent = type === 'land' ? 'respond_to_request_land' : 'respond_to_request_house';
        socketserv.emit(responseEvent, { ...data, status: 'Rejected' });
      } catch (error) {
        console.error("Error updating request status:", error.response ? error.response.data : error.message);
      }
    }
    hideDialog();
    ;
  }

  useEffect(() => {
    socketserv.on('connect', () => {
      console.log('Connected to server');
    });

    socketserv.on('requestLandCreated', (data) => {
      setRequestData({ type: 'land', data });
      setVisible(true);
      console.log('Land request received:', data);
    });

    socketserv.on('requestHouseCreated', (data) => {
      setRequestData({ type: 'house', data });
      setVisible(true);
      console.log('House request received:', data);
    });

    socketserv.on('request_response_house', (data) => {
      const { status } = data;
      setResponseMessage(`Your house request was ${status}`);
      showResponseDialog();
      console.log('House request response:', data);
    });

    socketserv.on('request_response_land', (data) => {
      const { status } = data;
      setResponseMessage(`Your land request was ${status}`);
      showResponseDialog();
      console.log('Land request response:', data);
    });

    return () => {

      socketserv.disconnect("disconnect");
    };
  }, []);


  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider font={them}   >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash">
          {/* <Stack.Screen name="FrPage" component={FrPage} options={{ headerShown: false }} />
          <Stack.Screen name="Two" component={Two} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} /> */}
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name='chat' component={Chat} options={{ headerShown: false }} />
          {/* <Stack.Screen name='DetailsScreen' component={DetailsScreen} options={{ headerShown: false }} /> */}
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name='FilterScreen' component={FilterScreen} options={{ headerShown: false }} />
          <Stack.Screen name='ResultsScreen' component={ResultsScreen} options={{ headerShown: false }} />
          <Stack.Screen name='SeeAllHouses' component={SeeAllHouses} options={{ headerShown: false }} />
          <Stack.Screen name='SeeAllLands' component={SeeAllLands} options={{ headerShown: false }} />
          <Stack.Screen name='ProfilDetail' component={ProfileDetails} options={{ headerShown: false }} />
          <Stack.Screen name='Received' component={Received} options={{ headerShown: false }} />
          <Stack.Screen name='requestreceivedlands' component={requestreceivedlands} options={{ headerShown: false }} />
          <Stack.Screen name='requeststatus' component={requeststatus} options={{ headerShown: false }} />
          <Stack.Screen name='requeststatuslands' component={requeststatuslands} options={{ headerShown: false }} />
          <Stack.Screen name='Subscription' component={Subscription} options={{ headerShown: false }} />
          <Stack.Screen name='PaymentScreen' component={PaymentScreen} options={{ headerShown: false }} />
          <Stack.Screen name='FavoritesScreen' component={FavoritesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
          <Stack.Screen name='splash' component={splach} options={{ headerShown: false }} /> */}
          <Stack.Screen name='apartement' component={Apartment} options={{ headerShown: false }} />
          <Stack.Screen name='Land' component={Lands} options={{ headerShown: false }} />
          <Stack.Screen name='FilterScreenLands' component={FilterScreenLands} options={{ headerShown: false }} />
          <Stack.Screen name='ResultsScreenLand' component={ResultsScreenLand} options={{ headerShown: false }} />
          <Stack.Screen name='ProfileDetails' component={ProfileDetails} options={{ headerShown: false }} />
          <Stack.Screen name='EditProfile' component={EditProfile} />
          <Stack.Screen name='AddHouse' component={AddHouse} options={{ headerShown: false }} />
          <Stack.Screen name='AddLand' component={AddLand} options={{ headerShown: false }} />
          <Stack.Screen name='viewDetHouse' component={viewDetHouse} options={{ headerShown: false }} />
          <Stack.Screen name='viewDetLand' component={viewDetLand} options={{ headerShown: false }} />


          

          {/* <Stack.Screen

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
          /> */}



        </Stack.Navigator>
      </NavigationContainer>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Request</Dialog.Title>
            <Dialog.Content>
              <Text>
                {requestData ? `New ${requestData.type} request received` : 'New request received'}
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleAccept}>Accept</Button>
              <Button onPress={handleRefuse}>Refuse</Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog visible={responseVisible} onDismiss={hideResponseDialog}>
            <Dialog.Content style={responseMessage.includes('Confirmed') ? styles.accepted : styles.refused}>
              <Dialog.Title>{responseMessage.includes('Confirmed') ? 'Request Accepted' : 'Request Refused'}</Dialog.Title>
              <Text style={styles.responseText}>{responseMessage}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideResponseDialog}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>

    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  accepted: {
    backgroundColor: 'green',
  },
  refused: {
    backgroundColor: 'red',
  },
  responseText: {
    color: 'white',
  },
});
export default App;