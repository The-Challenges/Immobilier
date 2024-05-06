import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon set

function Screen6({ formData, navigateToNext }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Summary of Inputs</Text>
            {/* Screen 1 */}
            <View style={styles.item}>
                <Icon name="attach-money" size={20} color="#000" />
                <Text style={styles.text}>Price Range: {formData.priceRange}</Text>
            </View>
            <View style={styles.item}>
                <Icon name="bathtub" size={20} color="#000" />
                <Text style={styles.text}>Bathrooms: {formData.bathrooms}</Text>
            </View>
            <View style={styles.item}>
                <Icon name="bed" size={20} color="#000" />
                <Text style={styles.text}>Bedrooms: {formData.bedrooms}</Text>
            </View>
            {/* Screen 2 */}
            <View style={styles.item}>
                <Icon name="directions-car" size={20} color="#000" />
                <Text style={styles.text}>Car Spaces: {formData.carSpaces}</Text>
            </View>
            <View style={styles.item}>
                <Icon name="calendar-today" size={20} color="#000" />
                <Text style={styles.text}>Purchase Timeframe: {formData.purchaseTimeframe}</Text>
            </View>
            {/* Screen 3 */}
            {[
                { field: 'undercoverParking', label: 'Undercover Parking', icon: 'garage', iconColor: '#6a5acd' },
                { field: 'fullyFenced', label: 'Fully Fenced', icon: 'fence', iconColor: '#228b22' },
                { field: 'tennisCourt', label: 'Tennis Court', icon: 'tennis', iconColor: '#ff6347' },
                { field: 'garage', label: 'Garage', icon: 'garage-alert', iconColor: '#ff4500' },
                { field: 'outdoorArea', label: 'Outdoor Area', icon: 'tree', iconColor: '#2e8b57' },
                { field: 'shed', label: 'Shed', icon: 'warehouse', iconColor: '#4682b4' },
                { field: 'outdoorSpa', label: 'Outdoor Spa', icon: 'hot-tub', iconColor: '#b0c4de' },
                { field: 'airConditioning', label: 'Air Conditioning', icon: 'air-conditioner', iconColor: '#00ced1' },
                { field: 'heating', label: 'Heating', icon: 'radiator', iconColor: '#db7093' },
                { field: 'solarPanels', label: 'Solar Panels', icon: 'solar-power', iconColor: '#ffd700' },
                { field: 'highEnergyEfficiency', label: 'High Energy Efficiency', icon: 'leaf', iconColor: '#228b22' }
            ].map(({ field, label, icon, iconColor }) => (
                <View style={styles.item} key={field}>
                    <Icon name={icon} size={20} color={iconColor} />
                    <Text style={styles.text}>{label}: {formData[field] ? 'Yes' : 'No'}</Text>
                </View>
            ))}
            {/* Screen 5 */}
            <View style={styles.item}>
                <Icon name="image" size={20} color="#000" />
                <Text style={styles.text}>Selected Image: {formData.imageUrl ? 'Yes' : 'No'}</Text>
            </View>
            {/* Add more items if needed */}
            <Button title="Confirm and Proceed" onPress={navigateToNext} style={styles.button} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginLeft: 10, // Adds spacing between the icon and text
    },
    button: {
        marginTop: 20,
        backgroundColor: '#5A67D8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    }
});

export default Screen6;
