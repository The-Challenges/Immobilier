import React from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Ensure this package is installed

function Screen2({ formData, handleChange, navigateToNext }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Amenities</Text>

            {/* Finance */}
            <View style={styles.switchContainer}>
                <Icon name="finance" size={24} color="#8a2be2" />
                <Text style={styles.switchLabel}>Finance</Text>
                <Switch
                    onValueChange={(value) => handleChange('finance', value)}
                    value={formData.finance}
                />
            </View>

            {/* Cash */}
            <View style={styles.switchContainer}>
                <Icon name="cash-multiple" size={24} color="#20b2aa" />
                <Text style={styles.switchLabel}>Cash</Text>
                <Switch
                    onValueChange={(value) => handleChange('cash', value)}
                    value={formData.cash}
                />
            </View>

            {/* Ensuite */}
            <View style={styles.switchContainer}>
                <Icon name="shower" size={24} color="#ff6347" />
                <Text style={styles.switchLabel}>Ensuite</Text>
                <Switch
                    onValueChange={(value) => handleChange('ensuite', value)}
                    value={formData.ensuite}
                />
            </View>

            {/* Study */}
            <View style={styles.switchContainer}>
                <Icon name="bookshelf" size={24} color="#daa520" />
                <Text style={styles.switchLabel}>Study</Text>
                <Switch
                    onValueChange={(value) => handleChange('study', value)}
                    value={formData.study}
                />
            </View>

            {/* Alarm System */}
            <View style={styles.switchContainer}>
                <Icon name="alarm" size={24} color="#6495ed" />
                <Text style={styles.switchLabel}>Alarm System</Text>
                <Switch
                    onValueChange={(value) => handleChange('alarmSystem', value)}
                    value={formData.alarmSystem}
                />
            </View>

            {/* Floorboards */}
            <View style={styles.switchContainer}>
                <Icon name="texture" size={24} color="#deb887" />
                <Text style={styles.switchLabel}>Floorboards</Text>
                <Switch
                    onValueChange={(value) => handleChange('floorboards', value)}
                    value={formData.floorboards}
                />
            </View>

            {/* Rumpus Room */}
            <View style={styles.switchContainer}>
                <Icon name="sofa" size={24} color="#ff4500" />
                <Text style={styles.switchLabel}>Rumpus Room</Text>
                <Switch
                    onValueChange={(value) => handleChange('rumpusRoom', value)}
                    value={formData.rumpusRoom}
                />
            </View>

            {/* Dishwasher */}
            <View style={styles.switchContainer}>
                <Icon name="dishwasher" size={24} color="#b0c4de" />
                <Text style={styles.switchLabel}>Dishwasher</Text>
                <Switch
                    onValueChange={(value) => handleChange('dishwasher', value)}
                    value={formData.dishwasher}
                />
            </View>

            {/* Built-in Robes */}
            <View style={styles.switchContainer}>
                <Icon name="wardrobe-outline" size={24} color="#2e8b57" />
                <Text style={styles.switchLabel}>Built-in Robes</Text>
                <Switch
                    onValueChange={(value) => handleChange('builtInRobes', value)}
                    value={formData.builtInRobes}
                />
            </View>

            {/* Broadband */}
            <View style={styles.switchContainer}>
                <Icon name="wifi" size={24} color="#4682b4" />
                <Text style={styles.switchLabel}>Broadband</Text>
                <Switch
                    onValueChange={(value) => handleChange('broadband', value)}
                    value={formData.broadband}
                />
            </View>

            {/* Gym */}
            <View style={styles.switchContainer}>
                <Icon name="dumbbell" size={24} color="#a52a2a" />
                <Text style={styles.switchLabel}>Gym</Text>
                <Switch
                    onValueChange={(value) => handleChange('gym', value)}
                    value={formData.gym}
                />
            </View>

            {/* Workshop */}
            <View style={styles.switchContainer}>
                <Icon name="toolbox" size={24} color="#483d8b" />
                <Text style={styles.switchLabel}>Workshop</Text>
                <Switch
                    onValueChange={(value) => handleChange('workshop', value)}
                    value={formData.workshop}
                />
            </View>

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

export default Screen2;
