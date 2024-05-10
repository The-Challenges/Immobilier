import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

const PaymentScreen = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePayment = () => {
        if (!cardNumber || !expiryDate || !cvv) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }
        Alert.alert('Success', 'Your payment has been processed securely.');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Secure Payment</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCardNumber}
                        value={cardNumber}
                        placeholder="Card Number"
                        keyboardType="numeric"
                        placeholderTextColor="#888"
                    />
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[styles.input, styles.inputHalf]}
                            onChangeText={setExpiryDate}
                            value={expiryDate}
                            placeholder="MM/YY"
                            keyboardType="numeric"
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={[styles.input, styles.inputHalf]}
                            onChangeText={setCvv}
                            value={cvv}
                            placeholder="CVV"
                            keyboardType="numeric"
                            secureTextEntry
                            placeholderTextColor="#888"
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handlePayment}>
                        <Text style={styles.buttonText}>Confirm Payment</Text>
                    </TouchableOpacity>
                    <Text style={styles.securityText}>Transactions are encrypted and secure.</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },
    content: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center'
    },
    input: {
        height: 50,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputHalf: {
        width: '48%'
    },
    button: {
        backgroundColor: '#0E60E5',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    securityText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 20
    }
});

export default PaymentScreen;
