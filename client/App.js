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
import chat from "./src/components/chat"





const Stack = createNativeStackNavigator();

function App() {

  const isDarkMode = useColorScheme() === 'dark';
  console.log(process.env.API_URL,'aab');
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
<PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="first" component={first}  options={{ headerShown: false }}  />
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
    
       
      </Stack.Navigator>
  </NavigationContainer>
  </PaperProvider>
  );
}



export default App;
