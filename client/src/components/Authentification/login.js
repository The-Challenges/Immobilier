import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, RefreshControl, ScrollView } from 'react-native';
import axios from 'axios';
import { Button, IconButton } from 'react-native-paper';
import storage from './storage';
import { API_AD } from '../../../config';

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   // Simulate a refresh time delay
  //   setTimeout(() => {
  //     setRefreshing(false);
  //     navigation.navigate('HomeTabs');
  //   }, 1000);
  // }, []);

  const handleSubmit = async () => {
    try {

      const response = await axios.post(`http://192.168.11.225:4000/api/auth/login`, { email, password });
      if (response.data && response.data.user) {
        const { user, token } = response.data;
        console.log(user.userId); // Make sure this logs the expected value
        await storage.save({ key: 'loginState', data: { token, user } });
        navigation.navigate('HomeTabs');
        // onRefresh();
      } else {
        Alert.alert('Login failed', 'No user data found in response');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login failed', 'An unexpected error occurred');
      if (error.response) {
        Alert.alert('Login failed', error.response.data.message);
      } else {
        Alert.alert('Login failed', 'An unexpected error occurred');
      }
    }
  };
  // onRefresh={onRefresh}
  return (
  <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing}  />}>
      <Image source={{ uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/real-estate-logo%2C-real-estate-company-logo-design-template-8ee9c59179ae1793f475915d6f19f9ff_screen.jpg?ts=1665168739' }} style={styles.logo} />
      <Text style={styles.title}>Login to Your Account</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      <Button
        style={[styles.button, { backgroundColor: '#4a90e2' }]}
        mode="contained"
        onPress={handleSubmit}
        labelStyle={[styles.buttonText, { color: '#FFFFFF', fontWeight: 'bold' }]}  // Added fontWeight: 'bold'
      >
        Login
      </Button>
      <Text style={styles.or}>OR</Text>
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4a90e2' }]}>
        <IconButton icon="google" color="#FFFFFF" style={styles.icon} />
        <Text style={[styles.socialButtonText, { color: '#FFFFFF' }]}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4a90e2' }]}>
        <IconButton icon="facebook" color="#FFFFFF" style={styles.icon} />
        <Text style={[styles.socialButtonText, { color: '#FFFFFF' }]}>Sign in with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSignup}>
        <Text style={[styles.createAccount, { color: '#000' }]}>Don't have an account? Create one</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#4a90e2',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,  // Reduced spacing to accommodate OR text
    borderRadius: 25,
  },
  forgotPassword: {
    color: '#4a90e2',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 14,
  },
  or: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
    marginBottom: 10,  // Adjusted for better spacing
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#FFF',  // Ensure text is white
  },
  createAccount: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});

export default Signin;
