import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function Screen1({ formData, handleChange, navigateToNext }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Price:</Text>
            <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(text) => handleChange('price', text)}
                placeholder="Enter price"
            />
            <Text style={styles.label}>Location:</Text>
            <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(text) => handleChange('location', text)}
                placeholder="Enter location"
            />
            <Button title="Next" onPress={navigateToNext} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 15,
    }
});

export default Screen1;
