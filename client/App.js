import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';



import FrPage from "./src/components/first/frPage";
import Two from "./src/components/two/two";
import Login from "./src/components/Authentification/login";
import Signup from "./src/components/Authentification/signup";
// import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
// import RecommendedScreen from "./src/screens/RecommendedScreen"
import Icon from 'react-native-vector-icons/Ionicons';
import UserProfile from './src/components/UserProfile/UserProfile';
import AddHouse from './src/components/UserProfile/cratePosts/AddHouse'
// import AddLand from './src/components/UserProfile/cratePosts/AddLand'
import EditProfile from './src/components/UserProfile/editProfile'
// import RecommendedScreen from "./src/screens/RecommendedScreen";
import Chat from "./src/components/chat/chat";
// import Chatroom from "./src/components/chat/allrooms";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for logged-in users
function HomeTabs() {
  return (
<PaperProvider>
    <NavigationContainer style>
      <Stack.Navigator>

        {/* <Stack.Screen name="first" component={first}  options={{ headerShown: false }}  />

        <Stack.Screen name="two" component={two}   options={{ headerShown: false }} />

     <Stack.Screen
          name="login"
          component={Signin}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="signup"
          component={signup}
          options={{ title: 'Sign Up' }} 
        />
         <Stack.Screen name="chat" component={chat}   options={{ headerShown: false }} />
     */}

{/* <Stack.Screen name="HomeScreen" component={HomeScreen}   options={{ headerShown: false }} />

<Stack.Screen name="DetailsScreen" component={DetailsScreen}   options={{ headerShown: false }} /> */}
<Stack.Screen name="UserProfile" component={UserProfile} />
<Stack.Screen name="AddHouse" component={AddHouse} />
{/* <Stack.Screen name="AddLand" component={AddLand} /> */}
<Stack.Screen name="EditProfile" component={EditProfile} />
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
      <Icon
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
  </PaperProvider>
  );
}

// Main stack navigator
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FrPage">
        <Stack.Screen name="FrPage" component={FrPage} options={{ headerShown: false }} />
        <Stack.Screen name="Two" component={Two} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name='chat' component={Chat} options={{ headerShown: false }}     />
        <Stack.Screen name='Details' component={DetailsScreen} options={{headerShown : false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
