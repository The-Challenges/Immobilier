import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Button, TouchableOpacity,Alert } from 'react-native';
import axios from 'axios';
// import { sendLandRequest } from '../socketserv';
import socketserv from '../socketserv';

const TermsAndConditionsScreen = ({ route,navigation }) => {
    const [accepted, setAccepted] = useState(false);
    const {user,land,house } = route.params;
    
    
    const handleAcceptanceToggle = () => setAccepted(!accepted);

    const handleSendRequest = () => {
        if (land) {
            socketserv.emit('send_land_request', { user, land });
console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa',user)
            const url = `http://192.168.11.225:4000/api/reqtest/${user.userId}/${land.id}`;
            axios.post(url)
                .then(() => {
                    console.log('Land request sent successfully');
                    Alert.alert('Request Sent land', 'Your request has been sent successfully!');
                    navigation.navigate('HomeTabs');
                })
                .catch((error) => {
                    console.error('Error sending land request:', error);
                    Alert.alert('Error', `Failed to send land request: ${error.response ? error.response.data : 'Unknown error'}`);
                });
        } else {
            socketserv.emit('send_house_request', { user, house });

            const url = `http://192.168.11.225:4000/api/reqtest/request/${user.userId}/${house.id}`;
            axios.post(url)
                .then(() => {
                    console.log('House request sent successfully');
                    Alert.alert('Request Sent to house', 'Your request has been sent successfully!');
                    navigation.navigate('HomeTabs');
                })
                .catch((error) => {
                    console.error('Error sending house request:', error);
                    Alert.alert('Error', `Failed to send house request: ${error.response ? error.response.data : 'Unknown error'}`);
                });
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Terms and Conditions</Text>
                <Text style={styles.text}>
                Welcome to  Immo, a mobile platform where you can manage payments securely, 
                    chat with the owner, and access location services. These Payment Terms and Conditions 
                    govern your use of our payment services.

                    {"\n\n"}1. Introduction
                    {"\n"}This document governs your relationship with  Immo. Access to and use of 
                    this website and the products and services available through this website are subject 
                    to the following terms, conditions, and notices.

                    {"\n\n"}2. Payment Terms
                    {"\n"}Users can make payments using registered credit/debit cards. Upon selecting a 
                    card as your payment method, you authorize us to charge the card for the agreed amount.
                </Text>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.checkboxContainer} onPress={handleAcceptanceToggle}>
                    <View style={accepted ? styles.checkboxChecked : styles.checkbox}>
                        {accepted && <View style={styles.checkboxInner} />}
                    </View>
                    <Text style={styles.checkboxLabel}>I accept the terms and conditions</Text>
                </TouchableOpacity>
                <Button
                    title="Send Request"
                    onPress={handleSendRequest}
                    disabled={!accepted}
                    color={accepted ? '#0E60E5' : '#CCCCCC'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333'
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555'
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFF'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    checkbox: {
        height: 24,
        width: 24,
        borderRadius: 12, // Round borders
        borderWidth: 2,
        borderColor: '#666',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
    },
    checkboxChecked: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#0E60E5',
        backgroundColor: '#0E60E5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8
    },
    checkboxInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#FFF',
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#666'
    }
});

export default TermsAndConditionsScreen