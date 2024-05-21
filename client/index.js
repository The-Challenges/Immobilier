/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider, PaperProvider } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme} from 'react-native-paper';
// notification
import PushNotification from "react-native-push-notification";
// notification


PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    },
        requestPermissions: Platform.OS === 'ios'

})

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };





export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => App);
