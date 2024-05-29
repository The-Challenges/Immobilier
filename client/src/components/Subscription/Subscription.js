import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const plans = [
  { plan: 'Premium', price: '29,99$', features: ['Service', 'Add-ons', 'Advantages', 'Bonuses'], icon: require('../../images/kingss.webp') },
];

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const { plan, price, features, icon } = plans[0]; 
  const buttonTextGetStarted = 'GET STARTED';
  const buttonTextSkip = 'NOT NOW';

  return (
    <View style={styles.fullScreen}>
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('HomeTabs')}>
        <Text style={styles.skipButtonText}>{buttonTextSkip}</Text>
      </TouchableOpacity>
      <Image source={icon} style={styles.iconStyle} resizeMode="contain" />
      <Text style={styles.planType}>{plan}</Text>
      <Text style={styles.price}>{price}</Text>
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Text key={index} style={styles.feature}>{`+ ${feature}`}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentScreen')}>
        <Text style={styles.buttonText}>{buttonTextGetStarted}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#4a90e2',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconStyle: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  planType: {
    color: '#4a90e2',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  price: {
    color: '#4a90e2',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'center',
  },
  feature: {
    color: '#4a90e2',
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
    flexBasis: '50%' 
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,  
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SubscriptionScreen;
