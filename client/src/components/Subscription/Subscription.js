import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const plans = [
  { plan: 'Free Trial', price: '0$', features: ['Service', 'Add-ons', 'Advantages', 'Bonuses'], icon: require('../../images/freefree.png')},
  { plan: 'Premium', price: '29,99$', features: ['Service', 'Add-ons', 'Advantages', 'Bonuses'], icon: require('../../images/king.png')},
];

const SubscriptionScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < plans.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert('No more plans');
    }
  };

  const handleSkip = () => {
    setCurrentIndex(plans.length - 1);
  };

  const { plan, price, features, icon } = plans[currentIndex];
  const buttonText = plan === 'Premium' ? 'GET STARTED' : 'START TRIAL';

  return (
    <View style={styles.fullScreen}>
      <Image source={icon} style={styles.iconStyle} resizeMode="contain" />
      <Text style={styles.planType}>{plan}</Text>
      <Text style={styles.price}>{price}</Text>
      <View style={styles.featuresContainer}>
        <View style={styles.column}>
          <Text style={styles.feature}>{`+ ${features[0]}`}</Text>
          <Text style={styles.feature}>{`+ ${features[1]}`}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.feature}>{`+ ${features[2]}`}</Text>
          <Text style={styles.feature}>{`+ ${features[3]}`}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={handleSkip}>
          <Text style={styles.navText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>
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
  iconStyle: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  planType: {
    color: '#F4BB18',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  price: {
    color: '#F4BB18',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    marginRight: 20,
    alignItems: 'center',
  },
  feature: {
    color: '#F4BB18',
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F4BB18',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#F4BB18',
  },
  navText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SubscriptionScreen;