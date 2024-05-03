/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  useColorScheme,

} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';


import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import first from './src/components/first/frPage'
import two from './src/components/two/two'
import Signin from "./src/components/Authentification/login";
import signup from "./src/components/Authentification/signup";
import chat from "./src/components/chat/chat"




const Stack = createNativeStackNavigator();

function App() {

  const isDarkMode = useColorScheme() === 'dark';
  // console.log(process.env.API_URL,'aab');
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
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

<Stack.Screen name="HomeScreen" component={HomeScreen}   options={{ headerShown: false }} />

<Stack.Screen name="DetailsScreen" component={DetailsScreen}   options={{ headerShown: false }} />

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
  </PaperProvider>
  );
}



export default App;
