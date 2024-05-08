import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function Screen3({ formData, handleChange, navigateToNext }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Indoor Options</Text>
            {[
                { field: 'ensuite', label: 'Ensuite', icon: 'shower', iconColor: '#ff6347' },
                { field: 'study', label: 'Study', icon: 'bookshelf', iconColor: '#daa520' },
                { field: 'alarmSystem', label: 'Alarm System', icon: 'alarm', iconColor: '#6495ed' },
                { field: 'floorboards', label: 'Floorboards', icon: 'texture', iconColor: '#deb887' },
                { field: 'rumpusRoom', label: 'Rumpus Room', icon: 'sofa', iconColor: '#ff4500' },
                { field: 'dishwasher', label: 'Dishwasher', icon: 'dishwasher', iconColor: '#b0c4de' },
                { field: 'builtInRobes', label: 'Built-in Robes', icon: 'wardrobe-outline', iconColor: '#2e8b57' },
                { field: 'broadband', label: 'Broadband', icon: 'wifi', iconColor: '#4682b4' },
                { field: 'gym', label: 'Gym', icon: 'dumbbell', iconColor: '#a52a2a' },
                { field: 'workshop', label: 'Workshop', icon: 'toolbox', iconColor: '#483d8b' }
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

export default Screen3;
