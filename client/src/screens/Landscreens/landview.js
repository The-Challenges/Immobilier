import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Viewoptions({ formData, handleChange, navigateToNext, navigateToPrevious }) {
    const options = [
        { field: 'mountain', label: 'Mountain', icon: 'terrain', iconColor: '#1E90FF' },
        { field: 'water views', label: 'Water Views', icon: 'water', iconColor: '#3CB371' },
        { field: 'city skyline', label: 'City Skyline', icon: 'city', iconColor: '#6a5acd' },
        { field: 'Unknown', label: 'Unknown', icon: 'alert-circle-outline', iconColor: '#ccc' }
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>View Options</Text>
            {options.map(({ field, label, icon, iconColor }) => (
                <View style={styles.switchContainer} key={field}>
                    <Icon name={icon} size={24} color={iconColor} />
                    <Text style={styles.switchLabel}>{label}</Text>
                    <Switch
                        onValueChange={(value) => {
                            const updatedOptions = value
                                ? [...formData.viewOptions, field]
                                : formData.viewOptions.filter(opt => opt !== field);
                            handleChange('viewOptions', updatedOptions);
                        }}
                        value={formData.viewOptions.includes(field)}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={formData.viewOptions.includes(field) ? "#f5dd4b" : "#f4f3f4"}
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

export default Viewoptions;
