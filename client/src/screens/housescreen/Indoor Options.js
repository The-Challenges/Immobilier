import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Screen3({ formData, handleChange, navigateToNext }) {
    const options = [
        { field: 'Ensuite', label: 'Ensuite', icon: 'shower', iconColor: '#ff6347' },
        { field: 'Study', label: 'Study', icon: 'bookshelf', iconColor: '#daa520' },
        { field: 'Alarm System', label: 'Alarm System', icon: 'alarm', iconColor: '#6495ed' },
        { field: 'FloorBoards', label: 'Floorboards', icon: 'texture', iconColor: '#deb887' },
        { field: 'Rumpus room', label: 'Rumpus Room', icon: 'sofa', iconColor: '#ff4500' },
        { field: 'Dishwasher', label: 'Dishwasher', icon: 'dishwasher', iconColor: '#b0c4de' },
        { field: 'Built in robe', label: 'Built-in Robes', icon: 'wardrobe-outline', iconColor: '#2e8b57' },
        { field: 'Broadband', label: 'Broadband', icon: 'wifi', iconColor: '#4682b4' },
        { field: 'Gym', label: 'Gym', icon: 'airbag', iconColor: '#a52a2a' },
        { field: 'Workshop', label: 'Workshop', icon: 'toolbox', iconColor: '#483d8b' },
        { field: 'Unknown', label: 'Unknown', icon: 'alert-circle-outline', iconColor: '#ccc' }
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Indoor Options</Text>
            {options.map(({ field, label, icon, iconColor }) => (
                <View style={styles.switchContainer} key={field}>
                    <Icon name={icon} size={24} color={iconColor} />
                    <Text style={styles.switchLabel}>{label}</Text>
                    <Switch
                        onValueChange={(value) => {
                            const updatedOptions = value
                                ? [...formData.indoorOptions, field]
                                : formData.indoorOptions.filter(opt => opt !== field);
                            handleChange('indoorOptions', updatedOptions);
                        }}
                        value={formData.indoorOptions.includes(field)}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={formData.indoorOptions.includes(field) ? "#f5dd4b" : "#f4f3f4"}
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

export default Screen3;
