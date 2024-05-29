import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/logs.png')}
        style={styles.logo}
      />
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../animations/loader.json')} 
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.2,
    resizeMode: 'contain',
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, 
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
