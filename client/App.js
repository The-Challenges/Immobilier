import React, { useEffect, useState } from 'react';
import { View ,StyleSheet} from 'react-native';
import { Button, Dialog, Portal, Text, PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import socketserv from './src/components/request/socketserv';
import HomeTabs from './hpmetaps';
import Login from './src/components/Authentification/login';
import Signup from './src/components/Authentification/signup';
import splach from './src/components/Authentification/SplashScreen';
import FrPage from "./src/components/first/frPage";
import Two from "./src/components/two/two";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FilterScreen from "./src/screens/FilterScreen";
import RecommendedScreen from "./src/screens/RecommendedScreen";
import ResultsScreen from "./src/screens/ResultsScreen";
import Chat from "./src/components/chat/chat";
import FilterScreenLands from "./src/screens/FilterScreenLand";
import ResultsScreenLand from "./src/screens/ResultsScreenLand";
import ProfileDetails from './src/components/profile/profileDetails';
import Icon2 from 'react-native-vector-icons/Ionicons';
import them from './src/font/font';
import Received from "./src/components/profile/requestreceived";
import ViewDetailsLand from './src/viewDetLand';
import ViewDetailsHouse from './src/viewDetHouse';
import AddLand from './src/components/profile/cratePosts/AddLand';
import AddHouse from './src/components/profile/cratePosts/AddHouse';
import EditProfile from './src/screens/Profile/editProfile';
import TermsAndConditions from './src/components/request/sendRe/TermsAndConditions';
import UserProfile from "./src/components/UserProfile/UserProfile";
import Onboarding from './src/components/Authentification/OnboardingScreen';
import SeeAllHouses from "./src/screens/SeeAllHouses";
import SeeAllLands from "./src/screens/SeeAllLands";
import axios from 'axios'
import requestreceivedlands from "./src/components/profile/requestreceivedlands"
import requeststatus from "./src/components/profile/requeststatus"
import requeststatuslands from "./src/components/profile/requeststatuslands"

import chat from './src/components/chat/chat'
import { API_AD } from './config';


LogBox.ignoreLogs([
  'Warning: componentWillReceiveProps has been renamed',
  'Warning: TextElement: Support for defaultProps will be removed from function components in a future major release.'
]);

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
    <PaperProvider >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResultsScreen" component={ResultsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SeeAllHouses" component={SeeAllHouses} options={{ headerShown: false }} />
          <Stack.Screen name="SeeAllLands" component={SeeAllLands} options={{ headerShown: false }} />
          <Stack.Screen name="ViewDetailsLand" component={ViewDetailsLand} options={{ headerShown: false }} />
          <Stack.Screen name="ViewDetailsHouse" component={ViewDetailsHouse} options={{ headerShown: false }} />
          <Stack.Screen name="FilterScreenLands" component={FilterScreenLands} options={{ headerShown: false }} />
          <Stack.Screen name="ResultsScreenLand" component={ResultsScreenLand} options={{ headerShown: false }} />
          <Stack.Screen name="ProfilDetail" component={ProfileDetails} options={{ headerShown: false }} />
          <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
          <Stack.Screen name="Received" component={Received} options={{ headerShown: false }} />
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          <Stack.Screen name="splash" component={splach} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="AddHouse" component={AddHouse} />
          <Stack.Screen name="AddLand" component={AddLand} />
          <Stack.Screen name="chat" component={chat} options={{ headerShown: false }}/>
          <Stack.Screen name='requestreceivedlands' component={requestreceivedlands} options={{ headerShown: false }}  />
          <Stack.Screen name='requeststatus' component={requeststatus} options={{ headerShown: false }}  />
          <Stack.Screen name='requeststatuslands' component={requeststatuslands} options={{ headerShown: false }}  />
          {/* <Stack.Screen name='Subscription' component={Subscription} options={{ headerShown: false }}  /> */}
          <Stack.Screen
            name="RecommendedScreen"
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
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ headerShown: false }} />
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
