import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function Screen6({ formData }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const optionCategories = {
        climateOptions :['Air conditioning', 'Heating', 'Solar panets', 'High energy effcincy', 'Unknown'],
        indoorOptions :['Ensuite', 'Study', 'Alarm System', 'FloorBoards', 'Rumpus room', 'Dishwasher', 'Built in robe', 'Broadband', 'Gym', 'Workshop', 'Unknown'],
        outdoorOptions :['Swimming pool', 'Balcony', 'Undercover parking', 'Fully fenced', 'Tennis court', 'Garage', 'Outdoor area', 'Shed', 'Outdoor spa', 'Unknown'],
       viewOptions :['mountain', 'city skyline', 'water views']
    };

    const detailIcons = {
        title: 'home-outline',
        price: 'cash-multiple',
        numberBedrooms: 'bed-empty',
        numberBathrooms: 'shower',
        location: 'map-marker',
        garage: 'garage',
        parking: 'car',
        propertyType: 'office-building',
        purchaseOption: 'hand-pointing-right',
        houseAge: 'calendar-range',
        isVerified: 'check-all'
    };

    const renderOptions = (options, title, iconName) => (
        <View style={styles.card}>
            <Icon name={iconName} size={30} color="#4CAF50" />
            <Text style={styles.header}>{title}</Text>
            {options.filter(option => formData[option]).map(option => (
                <Text key={option} style={styles.optionText}>{option}</Text>
            ))}
        </View>
    );

    const renderPropertyDetails = () => (
        Object.entries(detailIcons).map(([key, icon]) => (
            <View style={styles.detailRow} key={key}>
                <Icon name={icon} size={20} color="#333" />
                <Text style={styles.detailText}>{`${key.replace(/([A-Z])/g, ' $1')}: ${formData[key]}`}</Text>
            </View>
        ))
    );

    const handleConfirm = async () => {
        try {
            const response = await axios.post('http://192.168.11.62:4000/api/house/postHouse', formData);
            if (response.status === 200 || response.status === 201) {
                setModalVisible(true);
            } else {
                throw new Error(`Failed to submit data: Status Code ${response.status}`);
            }
        } catch (error) {
            Alert.alert('Error', `Submission failed: ${error.message}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: formData.latitude || 37.78825,
                    longitude: formData.longitude || -122.4324,
                    latitudeDelta: 0.022,
                    longitudeDelta: 0.021
                }}>
                <Marker
                    coordinate={{ latitude: formData.latitude || 37.78825, longitude: formData.longitude || -122.4324 }}
                    title="Property Location"
                    pinColor="#007BFF"
                />
            </MapView>
            <View style={styles.card}>
                {renderPropertyDetails()}
            </View>
            {renderOptions(optionCategories.climateOptions, 'Climate Features', 'weather-sunny')}
            {renderOptions(optionCategories.indoorOptions, 'Indoor Features', 'sofa')}
            {renderOptions(optionCategories.outdoorOptions, 'Outdoor Features', 'tree')}
            {renderOptions(optionCategories.viewOptions, 'Views', 'eye-outline')}
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Icon name="check" size={24} color="#fff" />
                <Text style={styles.buttonText}>Confirm and Submit</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Your house has been added successfully!</Text>
                        <Text style={styles.modalText}>Wait for confirmation from admin.</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                navigation.navigate('HomeScreen');
                            }}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    map: {
        height: 200,
        width: '100%',
        marginBottom: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#007BFF'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    optionText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonClose: {
        backgroundColor: "#007BFF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default Screen6;
