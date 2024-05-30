import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Screen2({ formData, handleChange, navigateToNext }) {
    const options = [
        { field: 'Swimming pool', label: 'Swimming Pool', icon: 'pool', iconColor: '#1E90FF' },
        { field: 'Balcony', label: 'Balcony', icon: 'balcony', iconColor: '#3CB371' },
        { field: 'Undercover parking', label: 'Undercover Parking', icon: 'garage', iconColor: '#6a5acd' },
        { field: 'Fully fenced', label: 'Fully Fenced', icon: 'fence', iconColor: '#228b22' },
        { field: 'Tennis court', label: 'Tennis Court', icon: 'tennis', iconColor: '#ff6347' },
        { field: 'Garage', label: 'Garage', icon: 'garage-alert', iconColor: '#ff4500' },
        { field: 'Outdoor area', label: 'Outdoor Area', icon: 'tree', iconColor: '#2e8b57' },
        { field: 'Shed', label: 'Shed', icon: 'warehouse', iconColor: '#4682b4' },
        { field: 'Outdoor spa', label: 'Outdoor Spa', icon: 'hot-tub', iconColor: '#b0c4de' },
        { field: 'Unknown', label: 'Unknown', icon: 'alert-circle-outline', iconColor: '#ccc' }
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Outdoor Options</Text>
            {options.map(({ field, label, icon, iconColor }) => (
                <View style={styles.switchContainer} key={field}>
                    <Icon name={icon} size={24} color={iconColor} />
                    <Text style={styles.switchLabel}>{label}</Text>
                    <Switch
                        onValueChange={(value) => {
                            const updatedOptions = value
                                ? [...formData.outdoorOptions, field]
                                : formData.outdoorOptions.filter(opt => opt !== field);
                            handleChange('outdoorOptions', updatedOptions);
                        }}
                        value={formData.outdoorOptions.includes(field)}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={formData.outdoorOptions.includes(field) ? "#f5dd4b" : "#f4f3f4"}
                    />
                </View>
            ))}
            <TouchableOpacity onPress={navigateToNext} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default Screen2;
