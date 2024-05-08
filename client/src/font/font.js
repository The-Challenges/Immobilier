import * as React from 'react';
import { configureFonts, MD2LightTheme, PaperProvider } from 'react-native-paper';
const fontConfig = {
   
    android: {
      regular: {
        
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    }
  };
  
  const theme = {
    ...MD2LightTheme,
    fonts: configureFonts({config: fontConfig, isV3: false}),
  };

  module.exports=theme