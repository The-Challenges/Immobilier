import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_AD } from '../../../config';

const NotificationsScreen = ({ userId }) => {
    const [requests, setRequests] = useState({ sent: [], received: [] });

    useEffect(() => {
        const fetchRequests = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                try {
                    const response = await axios.get(`${API_AD}/api/request/allrequests/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log('Response data:', response.data)
                    setRequests(response.data);
                } catch (error) {
                    console.error('Failed to fetch requests:', error);
                    Alert.alert('Error', 'Failed to fetch requests');
                }
            }
        };
        fetchRequests();
    }, [userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sent Requests</Text>
            {Array.isArray(requests.sent) && requests.sent.map((request, index) => (
                <View key={index} style={styles.requestItem}>
                    <Text>Land ID: {request.land.id} - Status: {request.status}</Text>
                </View>
            ))}
            <Text style={styles.title}>Received Requests</Text>
            {Array.isArray(requests.received) && requests.received.map((request, index) => (
                <View key={index} style={styles.requestItem}>
                    <Text>Land ID: {request.Land.id} - Status: {request.status}</Text>
                </View>
            ))}
        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    requestItem: {
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});

export default NotificationsScreen;