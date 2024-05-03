import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

function FullCreateHouse() {
    const [formData, setFormData] = useState({
        // option: '',
        priceRange: '',
        bedrooms: '',
        bathrooms: '',
        carSpaces: '',
        purchaseTimeframe: '',
        landSize: '',
        location: '',
        address: '',
        isVerified: false,
        finance: false,
        cash: false,
        ensuite: false,
        study: false,
        alarmSystem: false,
        floorboards: false,
        rumpusRoom: false,
        dishwasher: false,
        builtInRobes: false,
        broadband: false,
        gym: false,
        workshop: false,
        swimmingPool: false,
        balcony: false,
        undercoverParking: false,
        fullyFenced: false,
        tennisCourt: false,
        garage: false,
        outdoorArea: false,
        shed: false,
        outdoorSpa: false,
        airConditioning: false,
        heating: false,
        solarPanels: false,
        highEnergyEfficiency: false
    });
    const [showDetails, setShowDetails] = useState(false);

    const handleChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFocus = () => {
        setShowDetails(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://192.168.104.8:4000/house/create', formData);
            Alert.alert('Success', 'House created successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Failed to create house:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Failed to create house');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Create a New House</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('option', text)}
                    value={formData.option}
                    placeholder="Option"
                    onFocus={handleFocus}
                />
                {/* Always visible fields */}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('priceRange', text)}
                    value={formData.priceRange}
                    placeholder="Price Range"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('bedrooms', text)}
                    keyboardType="numeric"
                    value={formData.bedrooms}
                    placeholder="Bedrooms"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('bathrooms', text)}
                    keyboardType="numeric"
                    value={formData.bathrooms}
                    placeholder="Bathrooms"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('carSpaces', text)}
                    keyboardType="numeric"
                    value={formData.carSpaces}
                    placeholder="Car Spaces"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('purchaseTimeframe', text)}
                    value={formData.purchaseTimeframe}
                    placeholder="Purchase Timeframe"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('landSize', text)}
                    keyboardType="numeric"
                    value={formData.landSize}
                    placeholder="Land Size"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('location', text)}
                    value={formData.location}
                    placeholder="Location"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('address', text)}
                    value={formData.address}
                    placeholder="Address"
                />
                {/* Dynamically displayed boolean fields */}
                {showDetails && Object.keys(formData).filter(key => typeof formData[key] === 'boolean').map((key) => (
                    <View style={styles.switchContainer} key={key}>
                        <Text style={styles.switchLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}:</Text>
                        <Switch
                            onValueChange={(value) => handleChange(key, value)}
                            value={formData[key]}
                        />
                    </View>
                ))}
                <Button title="Submit" onPress={handleSubmit} color="#007BFF" />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    switchLabel: {
        fontSize: 16
    }
});

export default FullCreateHouse;
