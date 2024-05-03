import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import login from "./login";
import storage from './storage';

const SignupScreen = ({ navigation }) => {
  const [firstName, setfirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.11.110:4000/api/auth/signup', {
        firstName,
        email,
        password,
      });
  
      const { user, token } = response.data;
  
      await storage.save({
        key: 'loginState',
        data: {
          token,
          user,
        },
      });
  
      navigation.navigate('login');
    } catch (error) {
      Alert.alert('Signup failed', error.response.data.error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Sign You Up!</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={firstName}
            onChangeText={text => setfirstName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#F5F7C4' }]} onPress={handleSubmit}>
          <Text style={[styles.buttonText, { color: '#000' }]}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.terms}>
        By registering for an account, you are consenting to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and confirming that you have reviewed and accepted the{' '}
        <Text style={styles.link}>Global Privacy Statement</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    color: '#000000',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
