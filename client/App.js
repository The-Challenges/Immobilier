import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import RequestsList from '../client/src/components/profile/requestreceived';
import AllRequests from '../client/src/components/profile/AllRequests';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RequestsList">
          <Stack.Screen 
            name="RequestsList" 
            component={RequestsList} 
            options={{ title: "Manage Requests" }} 
          />
          <Stack.Screen 
            name="AllRequests" 
            component={AllRequests} 
            options={{ title: "All Requests" }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
