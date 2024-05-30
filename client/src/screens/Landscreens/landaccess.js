import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function AccessScreen({ formData, handleChange, navigateToNext, navigateToPrevious }) {
    const accessOptions = [
        { field: 'Airport', label: 'Airport', icon: 'airplane-takeoff', iconColor: '#1E90FF' },
        { field: 'Public transportation', label: 'Public transportation', icon: 'bus', iconColor: '#3CB371' },
        { field: 'Highway', label: 'Highway', icon: 'road-variant', iconColor: '#6a5acd' },
        { field: 'road access', label: 'Road Access', icon: 'road', iconColor: '#FF4500' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Access Option</Text>
            {accessOptions.map(({ field, label, icon, iconColor }) => (
                <View style={styles.switchContainer} key={field}>
                    <Icon name={icon} size={24} color={iconColor} />
                    <Text style={styles.switchLabel}>{label}</Text>
                    <Switch
                        onValueChange={(value) => {
                            const updatedOptions = value
                                ? [...formData.accessOptions, field]
                                : formData.accessOptions.filter(opt => opt !== field);
                            handleChange('accessOptions', updatedOptions);
                        }}
                        value={formData.accessOptions.includes(field)}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={formData.accessOptions.includes(field) ? "#f5dd4b" : "#f4f3f4"}
                    />
                </View>
            ))}
            <TouchableOpacity onPress={navigateToNext} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToPrevious} style={styles.button}>
                <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
        width: '100%',
    },
    switchLabel: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
        color: '#333',
    },
    button: {
        backgroundColor: '#5A67D8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default AccessScreen;
