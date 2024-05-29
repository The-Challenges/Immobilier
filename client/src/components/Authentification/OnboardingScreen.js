import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Find Your Dream Home With Us',
    text: 'Discover your perfect home with an immersive experience and access to the most comprehensive listings, including unique properties you won’t find anywhere else.',
    animation: require('../../animations/2.json'),
    backgroundColors: ['#4a90e2', '#005a9d'],
  },
  {
    key: '2',
    title: 'Explore World Class Smart Real Estate',
    text: 'Discover real estate for sale, new homes, new lands, find property records, condos & apartments.',
    animation: require('../../animations/3.json'),
    backgroundColors: ['#4a90e2', '#005a9d'],
  },
  {
    key: '3',
    title: 'The Perfect Choice for Your Future',
    text: 'Find a luxury residence that suits you, we will help you to find the most suitable residence for you.',
    animation: require('../../animations/4.json'),
    backgroundColors: ['#4a90e2', '#005a9d'],
  }
];

const OnboardingScreen = ({ navigation }) => {
  const sliderRef = useRef(null);

  const renderSlide = ({ item, index }) => {
    const nextSlideIndex = index + 1;
    const isLastSlide = index === slides.length - 1;

    return (
      <LinearGradient colors={item.backgroundColors} style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <LottieView
          source={item.animation}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Text style={styles.text}>{item.text}</Text>
        {!isLastSlide && (
          <TouchableOpacity style={styles.nextButton} onPress={() => sliderRef.current?.goToSlide(nextSlideIndex, true)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
        {isLastSlide && (
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity style={styles.doneButtonStyle} onPress={() => navigation.navigate('signup')}>
        <Text style={styles.doneButtonText}>Sign Up</Text>
      </TouchableOpacity>
    );
  };

  return (
    <AppIntroSlider
      ref={sliderRef}
      renderItem={renderSlide}
      data={slides}
      onDone={() => navigation.navigate('Login')}
      renderDoneButton={renderDoneButton}
      activeSlideAlignment="start"
      showNextButton={false}
      showPrevButton={false}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'AvenirNext-DemiBold',
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'AvenirNext-Regular',
  },
  lottie: {
    width: width * 0.8,
    height: height * 0.3,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButton: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  doneButtonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doneButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dotStyle: {
    backgroundColor: '#dcdcdc',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  activeDotStyle: {
    backgroundColor: '#FFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default OnboardingScreen;
