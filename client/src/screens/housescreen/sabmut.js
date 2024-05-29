import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import storage from '../../components/Authentification/storage'; // Import your storage module

function Screen6({ formData, handleChange, handleSubmit }) {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userData = await storage.load({ key: 'loginState' });
                setUserId(userData.user.userId);
            } catch (error) {
                console.error('Failed to retrieve user ID:', error);
            }
        };
        fetchUserId();
    }, []);

    const optionCategories = {
        climateOptions: formData.climateOptions || [],
        indoorOptions: formData.indoorOptions || [],
        outdoorOptions: formData.outdoorOptions || [],
        viewOptions: formData.viewOptions || [],
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
        const detailsToShow = ['title', 'price', 'numberBedrooms', 'numberBathrooms', 'propertyType', 'houseAge', 'garage', 'parking'];

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
            {options.map(option => (
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

    const submitForm = async () => {
        try {
            const latitude = formData.latitude || 37.78825;
            const longitude = formData.longitude || -122.4324;

            const payload = {
                ...formData,
                userId, // Include userId here
                numberbathrooms: formData.numberBathrooms,
                numberbedrooms: formData.numberBedrooms,
                alt: latitude,
                long: longitude,
                climateOptions: formData.climateOptions,
                indoorOptions: formData.indoorOptions,
                outdoorOptions: formData.outdoorOptions,
                viewOptions: formData.viewOptions
            };

            console.log('Payload being sent:', JSON.stringify(payload, null, 2));

            const response = await axios.post('http://192.168.104.29:4000/api/house/postHouse', payload);

            if (response.status === 200 || response.status === 201) {
                setModalVisible(true);
            } else {
                throw new Error(`Failed to submit data: Status Code ${response.status}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            Alert.alert('Error', `Submission failed: ${error.message}`);
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

            <TouchableOpacity style={styles.button} onPress={submitForm}>
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
                                navigation.navigate('HomeTabs');
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
