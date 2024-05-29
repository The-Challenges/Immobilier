// Screen1.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure this package is installed

function Screen1({ formData, handleChange, navigateToNext }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 20 }}>
            <Text style={styles.title}>Property Details</Text>
            
            {/* Title */}
            <View style={styles.inputContainer}>
                <Icon name="format-title" size={24} color="#4CAF50" />
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('title', text)}
                    value={formData.title}
                    placeholder="Enter title"
                />
            </View>
            
            {/* Price */}
            <View style={styles.inputContainer}>
                <Icon name="cash-100" size={24} color="#4CAF50" />
                <Text style={styles.label}>Price:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('price', Number(text))}
                    keyboardType="numeric"
                    value={String(formData.price)}
                    placeholder="Enter price"
                />
            </View>

            {/* Number of Bedrooms */}
            <View style={styles.inputContainer}>
                <Icon name="bed-queen" size={24} color="#E91E63" />
                <Text style={styles.label}>Number of Bedrooms:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('numberBedrooms', Number(text))}
                    keyboardType="numeric"
                    value={String(formData.numberBedrooms)}
                    placeholder="Enter number of bedrooms"
                />
            </View>

            {/* Number of Bathrooms */}
            <View style={styles.inputContainer}>
                <Icon name="shower" size={24} color="#03A9F4" />
                <Text style={styles.label}>Number of Bathrooms:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('numberBathrooms', Number(text))}
                    keyboardType="numeric"
                    value={String(formData.numberBathrooms)}
                    placeholder="Enter number of bathrooms"
                />
            </View>

            {/* Location Input with Icon */}
            <View style={styles.inputContainer}>
                <Icon name="map-marker-radius" size={24} color="#3F51B5" />
                <Text style={styles.label}>Location:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange('location', text)}
                    value={formData.location}
                    placeholder="Enter location"
                />
            </View>

            {/* Parking Available */}
            <View style={styles.switchContainer}>
                <Icon name="car-parking-lights" size={24} color="#9C27B0" />
                <Text style={styles.switchLabel}>Parking Available:</Text>
                <Switch
                    onValueChange={(value) => handleChange('parking', value)}
                    value={formData.parking}
                />
            </View>

            {/* Purchase Option */}
            <View style={styles.optionContainer}>
                <Icon name="credit-card-outline" size={24} color="#673AB7" />
                <Text style={styles.optionLabel}>Purchase Option:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={formData.purchaseOption}
                    onValueChange={(itemValue) => handleChange('purchaseOption', itemValue)}
                >
                    <Picker.Item label="Finance" value="Finance" />
                    <Picker.Item label="Cash" value="Cash" />
                </Picker>
            </View>

            {/* Property Type */}
            <View style={styles.optionContainer}>
                <Icon name="office-building" size={24} color="#795548" />
                <Text style={styles.optionLabel}>Property Type:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={formData.propertyType}
                    onValueChange={(itemValue) => handleChange('propertyType', itemValue)}
                >
                    <Picker.Item label="Villa" value="Villa" />
                    <Picker.Item label="Rural" value="Rural" />
                    <Picker.Item label="Retirement Living" value="Retirement Living" />
                    <Picker.Item label="All Types" value="All types" />
                </Picker>
            </View>

            {/* House Age */}
            <View style={styles.optionContainer}>
                <Icon name="timer-sand" size={24} color="#607D8B" />
                <Text style={styles.optionLabel}>House Age:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={formData.houseAge}
                    onValueChange={(itemValue) => handleChange('houseAge', itemValue)}
                >
                    <Picker.Item label="Established" value="Established" />
                    <Picker.Item label="New" value="New" />
                    <Picker.Item label="All Types" value="All types" />
                </Picker>
            </View>

            {/* Next Button */}
            <TouchableOpacity onPress={navigateToNext} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        padding: 10,
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
        flex: 1,
    },
    input: {
        height: 50,
        flex: 1,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fafafa',
        fontSize: 16,
        color: '#333',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    switchLabel: {
        fontSize: 18,
        flex: 1,
        marginLeft: 10,
        color: '#333',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionLabel: {
        fontSize: 18,
        color: '#333',
        flex: 1,
        marginLeft: 10,
    },
    picker: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fafafa',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#5A67D8',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default Screen1;
