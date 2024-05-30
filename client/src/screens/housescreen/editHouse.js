import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import UserProfile from '../../components/profile/profileDetails';

function Screen6({ formData, handleChange, handleSubmit, houseId }) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const optionCategories = {
        climateOptions: ['Air conditioning', 'Heating', 'Solar panels', 'High energy efficiency', 'Unknown'],
        indoorOptions: ['Ensuite', 'Study', 'Alarm System', 'FloorBoards', 'Rumpus room', 'Dishwasher', 'Built in robe', 'Broadband', 'Gym', 'Workshop', 'Unknown'],
        outdoorOptions: ['Swimming pool', 'Balcony', 'Undercover parking', 'Fully fenced', 'Tennis court', 'Garage', 'Outdoor area', 'Shed', 'Outdoor spa', 'Unknown'],
        viewOptions: ['mountain', 'city skyline', 'water views']
    };

    const detailIcons = {
        title: 'home-outline',
        price: 'cash-multiple',
        numberBedrooms: 'bed-empty',
        numberBathrooms: 'shower',
        propertyType: 'office-building',
        houseAge: 'calendar-range',
        garage: 'garage',
        parking: 'car',
    };

    const renderPropertyDetails = () => {
        const detailsToShow = ['title', 'price', 'parking', 'houseAge', 'numberBedrooms', 'numberBathrooms', 'propertyType', 'garage'];

        return detailsToShow.map((key) => (
            <View style={styles.detailRow} key={key}>
                <Icon name={detailIcons[key]} size={24} color="#4CAF50" />
                <Text style={styles.detailText}>
                    {`${key.replace(/([A-Z])/g, ' $1')}: `}
                    {key === 'garage' || key === 'parking' ? (
                        formData[key] ? <Icon name="check-circle" size={24} color="#4CAF50" /> : <Icon name="close-circle" size={24} color="#FF0000" />
                    ) : (
                        formData[key]
                    )}
                </Text>
            </View>
        ));
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

    const renderImageItem = ({ item }) => (
        <View style={styles.fileContainer}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );

    const renderPDFItem = ({ item }) => (
        <View style={styles.fileContainer}>
            <Icon name="file-pdf-box" size={100} color="#FF0000" />
            <Text style={styles.pdfText}>PDF Document</Text>
        </View>
    );

    const updateHouse = async () => {
        try {
            const response = await axios.put(`http://192.168.11.234:4000/api/house/updateHouse/${houseId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setModalVisible(true);
            } else {
                throw new Error(`Failed to update data: Status Code ${response.status}`);
            }
        } catch (error) {
            Alert.alert('Error', `Update failed: ${error.message}`);
        }
    };

    const images = formData.media.filter(item => !item.endsWith('.pdf'));
    const pdfs = formData.media.filter(item => item.endsWith('.pdf'));

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

            <Text style={styles.header}>Uploaded Images</Text>
            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderImageItem}
                horizontal
                style={styles.uploadedFiles}
            />

            <Text style={styles.header}>Uploaded PDFs</Text>
            <FlatList
                data={pdfs}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderPDFItem}
                horizontal
                style={styles.uploadedFiles}
            />

            <TouchableOpacity style={styles.button} onPress={updateHouse}>
                <Icon name="check" size={24} color="#fff" />
                <Text style={styles.buttonText}>Confirm and Update</Text>
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
                        <Text style={styles.modalText}>Your house has been updated successfully!</Text>
                        <Text style={styles.modalText}>Wait for confirmation from admin.</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                navigation.navigate('UserProfile'); // Navigate back to the user profile
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
    fileContainer: {
        marginRight: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    pdfText: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
    },
    uploadedFiles: {
        marginBottom: 20,
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
