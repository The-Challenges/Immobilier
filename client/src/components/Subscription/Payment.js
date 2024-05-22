import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const validateInputs = () => {
    let valid = true;
    let errors = {};

    if (!name) {
      errors.name = 'Name on card is required';
      valid = false;
    }

    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumber || !cardNumberRegex.test(cardNumber)) {
      errors.cardNumber = 'Invalid card number';
      valid = false;
    }

    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryDate || !expiryDateRegex.test(expiryDate)) {
      errors.expiryDate = 'Invalid expiry date';
      valid = false;
    }

    const securityCodeRegex = /^[0-9]{3}$/;
    if (!securityCode || !securityCodeRegex.test(securityCode)) {
      errors.securityCode = 'Invalid CVV';
      valid = false;
    }

    const zipCodeRegex = /^[0-9]{5}$/;
    if (!zipCode || !zipCodeRegex.test(zipCode)) {
      errors.zipCode = 'Invalid ZIP code';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handlePayment = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await fetch('http://192.168.103.20:4000/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 500.00,
          currency: 'usd',
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        const text = await response.text();
        console.error(`HTTP error! status: ${response.status}, message: ${text}`);
        alert('An error occurred while processing your payment. Please try again later.');
        return;
      }

      if (contentType && contentType.indexOf('application/json') !== -1) {
        const paymentIntentResponse = await response.json();
        if (paymentIntentResponse.clientSecret) {
          navigation.navigate('PaymentConfirmation');
        } else {
          alert('Failed to create payment intent.');
        }
      } else {
        const text = await response.text();
        throw new Error(`Unexpected content type: ${contentType}, message: ${text}`);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert(`Error processing payment: ${error.message}`);
    }
  };

  const formatExpiryDate = (text) => {
    if (text.length === 2 && !text.includes('/')) {
      setExpiryDate(text + '/');
    } else {
      setExpiryDate(text);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Pay Invoice</Text>
      <Image 
        source={{ uri: 'https://freepngimg.com/download/credit_card/25826-5-major-credit-card-logo-image.png' }}
        style={styles.logo}
      />
      <View style={styles.amountContainer}>
        <TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="orange" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name on card"
          value={name}
          onChangeText={setName}
        />
      </View>
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      <View style={styles.inputContainer}>
        <Icon name="credit-card" size={20} color="orange" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Card number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
      </View>
      {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
      <View style={styles.row}>
        <View style={[styles.inputContainer, styles.flex2]}>
          <Icon name="calendar" size={20} color="orange" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Expiry date (MM/YY)"
            value={expiryDate}
            onChangeText={formatExpiryDate}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.inputContainer, styles.flex1]}>
          <Icon name="lock" size={20} color="orange" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            value={securityCode}
            onChangeText={setSecurityCode}
            keyboardType="numeric"
          />
        </View>
      </View>
      {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
      {errors.securityCode && <Text style={styles.errorText}>{errors.securityCode}</Text>}
      <View style={styles.inputContainer}>
        <Icon name="map-marker" size={20} color="orange" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="ZIP/Postal code"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="numeric"
        />
      </View>
      {errors.zipCode && <Text style={styles.errorText}>{errors.zipCode}</Text>}
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay $29.99</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  editButton: {
    color: '#007BFF',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex2: {
    flex: 2,
  },
  flex1: {
    flex: 1,
    marginLeft: 10,
  },
  payButton: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default PaymentScreen;
