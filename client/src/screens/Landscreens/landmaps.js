import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';

function Screen2({ formData, handleChange, navigateToNext, navigateToPrevious }) {
    const [polygonCoords, setPolygonCoords] = useState(formData.polygon || []);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [userLocation, setUserLocation] = useState(formData.location || null);

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestLocationPermission();
        } else {
            getCurrentLocation();
        }
        watchUserLocation();
    }, []);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "This app needs access to your location.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getCurrentLocation();
            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setInitialRegion({
                    ...initialRegion,
                    latitude,
                    longitude
                });
                setUserLocation({ latitude, longitude });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    const watchUserLocation = () => {
        Geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, distanceFilter: 10 }
        );
    };

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setPolygonCoords([...polygonCoords, { latitude, longitude }]);
    };

    const handleClearPolygon = () => {
        setPolygonCoords([]);
    };

    const handleUndoLastPoint = () => {
        setPolygonCoords(polygonCoords.slice(0, -1));
    };

    const handleConfirmPolygon = () => {
        handleChange('location', userLocation);
        handleChange('polygon', polygonCoords);
        navigateToNext();
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                onPress={handleMapPress}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                {polygonCoords.length > 0 && (
                    <Polygon coordinates={polygonCoords} strokeColor="#000" fillColor="rgba(255, 0, 0, 0.5)" />
                )}
                {polygonCoords.map((coord, index) => (
                    <Marker key={index} coordinate={coord} />
                ))}
                {userLocation && <Marker coordinate={userLocation} pinColor="blue" />}
            </MapView>
            {polygonCoords.length > 0 && (
                <View style={styles.coordinatesContainer}>
                    <Text>Polygon Coordinates:</Text>
                    {polygonCoords.map((coord, index) => (
                        <Text key={index}>Lat: {coord.latitude.toFixed(4)}, Lon: {coord.longitude.toFixed(4)}</Text>
                    ))}
                </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleUndoLastPoint} style={styles.undoButton}>
                    <Text style={styles.undoButtonText}>Undo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClearPolygon} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirmPolygon} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToPrevious} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    map: {
        flex: 1
    },
    coordinatesContainer: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
        borderRadius: 8,
        elevation: 5
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
        left: 20,
        right: 20,
        justifyContent: 'space-between'
    },
    undoButton: {
        backgroundColor: '#FFA500',
        borderRadius: 50,
        padding: 15,
        alignItems: 'center'
    },
    undoButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    clearButton: {
        backgroundColor: '#FF0000',
        borderRadius: 50,
        padding: 15,
        alignItems: 'center'
    },
    clearButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    confirmButton: {
        backgroundColor: '#5A67D8',
        borderRadius: 50,
        padding: 15,
        alignItems: 'center'
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    backButton: {
        backgroundColor: '#555',
        borderRadius: 50,
        padding: 15,
        alignItems: 'center'
    }
});

export default Screen2;
