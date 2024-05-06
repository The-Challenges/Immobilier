import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Screen5({ formData, handleChange, navigateToPrevious }) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Confirm Submission</Text>
            <Text>All data is ready for submission. Confirm to proceed.</Text>
            <Button title="Previous" onPress={navigateToPrevious} />
            {/* Submit button should actually handle the submission logic */}
            <Button title="Submit" onPress={() => console.log("Submit logic goes here")} />
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

export default Screen5;
