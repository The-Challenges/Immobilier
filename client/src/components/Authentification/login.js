import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Animated } from 'react-native';
import axios from 'axios';
import { Button, IconButton } from 'react-native-paper';
import storage from './storage';

const Signin = ({ navigation }) => {
  const navigateToSignup = () => {
    navigation.navigate('signup');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const spinValue = useRef(new Animated.Value(0)).current; 

  const startSpin = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,  
      })
    ).start();
  };

  useEffect(() => {
    startSpin();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.103.17:4000/api/auth/login', {
        email,
        password,
      });

      console.log(response.data);

      if (response.data && response.data.user) {
        const { user, token } = response.data;
        Alert.alert('Login successful', `Welcome, ${user.firstName}!`);

        await storage.save({
          key: 'loginState',
          data: {
            token,
            user,
          },
        });

        navigation.navigate('Home');
      } else {
        Alert.alert('Login failed', 'No user data found in response');
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        Alert.alert('Login failed', error.response.data.message);
      } else {
        Alert.alert('Login failed', 'An unexpected error occurred');
      }
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']  
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: 'https://i.ibb.co/wWMcYf3/Screenshot-11.png' }}
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
      />
      <Text style={styles.title}>Login to Your Account</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      <Button style={[styles.button, { backgroundColor: '#F5F7C4' }]} mode="contained" onPress={handleSubmit} labelStyle={{ color: '#000' }}>
        Login
      </Button>
      <TouchableOpacity>
        <Text style={[styles.forgotPassword, { color: '#000' }]}>Forgot Password?</Text>
      </TouchableOpacity>
      <Text style={styles.or}>Or</Text>
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#F5F7C4' }]}>
        <IconButton icon="google" color="#000" style={styles.icon} />
        <Text style={[styles.socialButtonText, { color: '#000' }]}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#F5F7C4' }]}>
        <IconButton icon="facebook" color="#000" style={styles.icon} />
        <Text style={[styles.socialButtonText, { color: '#000' }]}>Sign in with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSignup}>
        <Text style={[styles.createAccount, { color: '#000' }]}>Don't have an account? Create one</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: '#4CAF50',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 14,
  },
  or: {
    color: '#999',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
