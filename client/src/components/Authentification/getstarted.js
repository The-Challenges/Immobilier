import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const GetStartedScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={{ uri: 'https://e0.pxfuel.com/wallpapers/148/104/desktop-wallpaper-modern-house-house-phone-thumbnail.jpg' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={[styles.headerText, styles.italic]}>Dream Home</Text>
        <Text style={[styles.subText, styles.italic]}>A perfect solution to make your own house dream come true</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={[styles.buttonText, styles.italic]}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 50,
  },
  headerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  subText: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#F5F7C4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', 
  },
  italic: {
    fontStyle: 'italic', 
  },
});

export default GetStartedScreen;
