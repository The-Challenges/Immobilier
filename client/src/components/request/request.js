import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import io from 'socket.io-client';
import storage from '../Authentification/storage';
import { API_AD } from '../../../config';
const Request = () => {
  const [requests, setRequests] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const loginState = await storage.load({ key: 'loginState' });
        setToken(loginState.token);
      } catch (error) {
        console.error('Failed to load token', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      const socket = io(`${API_AD}`, {
        query: { token }  // Pass the token here for authentication
      });

      socket.on('land_request_received', (data) => {
        setRequests(prevRequests => [...prevRequests, { ...data, type: 'land' }]);
      });

      socket.on('house_request_received', (data) => {
        setRequests(prevRequests => [...prevRequests, { ...data, type: 'house' }]);
      });

      return () => socket.disconnect();  // Cleanup on component unmount
    }
  }, [token]);

  const handleResponse = (requestId, type, response) => {
    if (!token) return;  // Ensure there's a token before trying to send a response

    const eventName = type === 'land' ? 'respond_to_land_request' : 'respond_to_house_request';
    const socket = io(`${API_AD}`, {
      query: { token }
    });

    socket.emit(eventName, { requestId, response });
    setRequests(prevRequests => prevRequests.filter(req => req.requestId !== requestId));
    socket.disconnect();  // Disconnect after sending the response
  };

  if (!token) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Requests</Text>
      {requests.map((request, index) => (
        <View key={index} style={styles.requestItem}>
          <Text>Type: {request.type}</Text>
          <Text>From: {request.senderId}</Text>
          <Button title="Accept" onPress={() => handleResponse(request.requestId, request.type, 'accepted')} />
          <Button title="Reject" onPress={() => handleResponse(request.requestId, request.type, 'rejected')} />
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  requestItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default Request;
