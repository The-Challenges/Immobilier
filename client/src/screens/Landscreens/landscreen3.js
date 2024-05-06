import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Screen4({ formData, handleChange, navigateToNext, navigateToPrevious }) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Verification Details</Text>
            {/* Additional verification inputs */}
            <Button title="Previous" onPress={navigateToPrevious} />
            <Button title="Next" onPress={navigateToNext} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default Screen4;
