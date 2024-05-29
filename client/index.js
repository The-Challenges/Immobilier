/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import {name as appName} from './app.json';
import { Provider, PaperProvider } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme} from 'react-native-paper';





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

AppRegistry.registerComponent(appName, () => Main);
