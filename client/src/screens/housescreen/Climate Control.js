import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Screen7({ formData, handleChange, navigateToNext }) {
    const options = [
        { field: 'Air conditioning', label: 'Air Conditioning', icon: 'air-conditioner', iconColor: '#00ced1' },
        { field: 'Heating', label: 'Heating', icon: 'radiator', iconColor: '#db7093' },
        { field: 'Solar panets', label: 'Solar Panels', icon: 'solar-power', iconColor: '#ffd700' },
        { field: 'High energy effcincy', label: 'High Energy Efficiency', icon: 'leaf', iconColor: '#228b22' },
        { field: 'Unknown', label: 'Unknown', icon: 'alert-circle-outline', iconColor: '#ccc' }
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Climate Control</Text>
                {options.map(({ field, label, icon, iconColor }) => (
                    <View style={styles.switchContainer} key={field}>
                        <Icon name={icon} size={24} color={iconColor} />
                        <Text style={styles.switchLabel}>{label}</Text>
                        <Switch
                            onValueChange={(value) => {
                                const updatedOptions = value
                                    ? [...formData.climateOptions, field]
                                    : formData.climateOptions.filter(opt => opt !== field);
                                handleChange('climateOptions', updatedOptions);
                            }}
                            value={formData.climateOptions.includes(field)}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={formData.climateOptions.includes(field) ? "#f5dd4b" : "#f4f3f4"}
                        />
                    </View>
                ))}
                <TouchableOpacity onPress={navigateToNext} style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f7',
        paddingVertical: 20,  // Added to prevent the contents from being too close to the top/bottom edges
    },
    innerContainer: {
        width: '100%',
        maxWidth: 400,
        paddingHorizontal: 20,
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

export default Screen7;
