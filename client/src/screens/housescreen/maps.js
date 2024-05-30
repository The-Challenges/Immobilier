import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Screen4({ formData, handleChange, navigateToNext }) {
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: formData.latitude || 37.78825,
        longitude: formData.longitude || -122.4324,
    });

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        handleChange('latitude', latitude);
        handleChange('longitude', longitude);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {selectedLocation && <Marker coordinate={selectedLocation} />}
            </MapView>
            {selectedLocation && (
                <View style={styles.coordinatesContainer}>
                    <Text>Latitude: {selectedLocation.latitude.toFixed(4)}</Text>
                    <Text>Longitude: {selectedLocation.longitude.toFixed(4)}</Text>
                </View>
            )}
            <TouchableOpacity onPress={navigateToNext} style={styles.nextButton}>
                <Icon name="navigate-next" size={40} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    map: {
        flex: 1,
    },
    nextButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#5A67D8',
        borderRadius: 50,
        padding: 10,
    },
    coordinatesContainer: {
        position: 'absolute',
        bottom: 70,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
        borderRadius: 8,
        elevation: 5,
    },
});

export default Screen4;
