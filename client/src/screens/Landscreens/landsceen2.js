import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon set

function Screen2({ formData, handleChange, handleLocationSelection, navigateToNext }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
        handleLocationSelection(coordinate); // This function should update the form data with the selected location
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {selectedLocation && <Marker coordinate={selectedLocation} />}
            </MapView>
            <TouchableOpacity onPress={navigateToNext} style={styles.iconContainer}>
                <Icon name="navigate-next" size={40} color="#5A67D8" />
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
    iconContainer: {
        position: 'absolute',
        top: 30,
        right: 20,
    },
});

export default Screen2;
