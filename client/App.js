import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import login from "./src/components/Authentification/login";
import signup from "./src/components/Authentification/signup";

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={login}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="signup"
          component={signup}
          options={{ title: 'Sign Up' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
