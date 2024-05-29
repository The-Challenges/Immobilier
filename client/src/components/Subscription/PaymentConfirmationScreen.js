import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentConfirmationScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0); 

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('HomeTabs');
    }, 3000);

    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      clearTimeout(timer);
    };
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        <Icon name="check-circle" size={100} color="#4a90e2" style={styles.icon} />
        <Text style={styles.text}>Payment Confirmed!</Text>
        <Text style={styles.subText}>Thank you for your purchase.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default PaymentConfirmationScreen;
