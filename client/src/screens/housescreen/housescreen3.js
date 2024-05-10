import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function Screen7({ formData, handleChange, navigateToNext }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Climate Control</Text>
            {[
                { field: 'airConditioning', label: 'Air Conditioning', icon: 'air-conditioner', iconColor: '#00ced1' },
                { field: 'heating', label: 'Heating', icon: 'radiator', iconColor: '#db7093' },
                { field: 'solarPanels', label: 'Solar Panels', icon: 'solar-power', iconColor: '#ffd700' },
                { field: 'highEnergyEfficiency', label: 'High Energy Efficiency', icon: 'leaf', iconColor: '#228b22' }
            ].map(({ field, label, icon, iconColor }) => (
                <View style={styles.switchContainer} key={field}>
                    <Icon name={icon} size={24} color={iconColor} />
                    <Text style={styles.switchLabel}>{label}</Text>
                    <Switch
                        onValueChange={(value) => handleChange(field, value)}
                        value={formData[field]}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={formData[field] ? "#f5dd4b" : "#f4f3f4"}
                    />
                </View>
            ))}
            {/* Navigation Button */}
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
        fontSize: 24, // Changed from "24" to 24
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
        fontSize: 16, // Changed from "16" to 16
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
        fontSize: 18, // Changed from "18" to 18
        color: '#ffffff',
        fontWeight: '500',
    },
});

export default Screen7;