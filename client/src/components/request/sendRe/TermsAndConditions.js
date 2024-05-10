import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const TermsAndConditionsScreen = ({ navigation }) => {
    const [accepted, setAccepted] = useState(false);

    const handleAcceptanceToggle = () => setAccepted(!accepted);
    const navigateToPayment = () => {
        if (accepted) {
            navigation.navigate('fraisPayment'); // Ensure this matches your navigation setup
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
                    title="Proceed to Payment"
                    onPress={navigateToPayment}
                    disabled={!accepted}
                    color={accepted ? '#0E60E5' : '#0E60E5'}
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

export default TermsAndConditionsScreen;
