import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker, Polygon } from 'react-native-maps';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Screen8 = ({ formData, landId, navigateToPrevious }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const navigation = useNavigation();

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://192.168.11.234:4000/api/land/updateLand/${landId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setModalVisible(true);
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            console.error('Update Error:', error);
            Alert.alert('Update Error', 'Failed to update the land. Please try again later.');
        }
    };

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const fields = [
        { key: 'title', label: 'Title', icon: 'home-outline', iconColor: '#007BFF' },
        { key: 'price', label: 'Price', icon: 'cash-multiple', iconColor: '#28A745' },
        { key: 'size', label: 'Size (m²)', icon: 'image-area', iconColor: '#FFC107' },
        { key: 'TerrainType', label: 'Terrain Type', icon: 'mountain', iconColor: '#17A2B8' },
        { key: 'Zoning', label: 'Zoning', icon: 'city', iconColor: '#DC3545' },
        { key: 'purchaseoption', label: 'Purchase Option', icon: 'hand-pointing-right', iconColor: '#6F42C1' },
        { key: 'isVerified', label: 'Verified', icon: 'check-circle', iconColor: formData.isVerified ? '#4CAF50' : '#FF6347', isBoolean: true }
    ];

    const views = [
        { key: 'mountain', label: 'Mountain', icon: 'mountain', iconColor: '#4CAF50' },
        { key: 'water views', label: 'Water Views', icon: 'water', iconColor: '#1E90FF' },
        { key: 'city skyline', label: 'City Skyline', icon: 'city', iconColor: '#FF4500' }
    ];

    const accessibilities = [
        { key: 'Airport', label: 'Airport', icon: 'airplane-takeoff', iconColor: '#3CB371' },
        { key: 'Public transportation', label: 'Public Transportation', icon: 'bus', iconColor: '#FFD700' },
        { key: 'Highway', label: 'Highway', icon: 'road-variant', iconColor: '#6A5ACD' },
        { key: 'road access', label: 'Road Access', icon: 'road', iconColor: '#FF6347' }
    ];

    const renderField = ({ key, label, icon, iconColor, isBoolean }) => (
        <View style={styles.detailRow} key={key}>
            <Icon name={icon} size={24} color={iconColor} />
            <Text style={styles.detailText}>{`${capitalize(label)}: `}</Text>
            {isBoolean ? (
                <Icon name={formData[key] ? 'check-circle' : 'close-circle'} size={24} color={formData[key] ? '#4CAF50' : '#FF6347'} />
            ) : (
                <Text style={styles.detailText}>{formData[key] !== 'Unknown' ? formData[key] : <Icon name='close-circle' size={24} color='#FF6347' />}</Text>
            )}
        </View>
    );

    const renderOptions = (options, data) => (
        options.filter(option => data[option.key] && data[option.key] !== 'Unknown').map(option => (
            <View style={styles.detailRow} key={option.key}>
                <Icon name={option.icon} size={24} color={option.iconColor} />
                <Text style={styles.detailText}>{option.label}</Text>
            </View>
        ))
    );

    const renderMedia = (media) => {
        const images = media.filter(item => !item.endsWith('.pdf'));
        const pdfs = media.filter(item => item.endsWith('.pdf'));

        return (
            <View>
                {images.length > 0 && (
                    <>
                        <Text style={styles.header}>Uploaded Images</Text>
                        <ScrollView horizontal style={styles.imageRow}>
                            {images.map((image, index) => (
                                <Image source={{ uri: image }} style={styles.image} key={index} />
                            ))}
                        </ScrollView>
                    </>
                )}
                {pdfs.length > 0 && (
                    <>
                        <Text style={styles.header}>Uploaded PDFs</Text>
                        {pdfs.map((pdf, index) => (
                            <View style={styles.pdfRow} key={index}>
                                <Icon name="file-pdf-box" size={40} color="#FF0000" />
                                <Text style={styles.pdfText}>PDF Document {index + 1}</Text>
                            </View>
                        ))}
                    </>
                )}
            </View>
        );
    };

    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('UserProfile'); // Adjust the route name as necessary
    };

    return (
        <ScrollView style={styles.container}>
            {formData.location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: formData.location.latitude,
                        longitude: formData.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker coordinate={formData.location} title="Selected Location" />
                    {formData.polygon && formData.polygon.length > 0 && (
                        <Polygon coordinates={formData.polygon} strokeColor="#000" fillColor="rgba(255, 0, 0, 0.5)" />
                    )}
                </MapView>
            )}
            <View style={styles.card}>
                {fields.map(field => renderField(field))}
                <Text style={styles.header}>Selected Views</Text>
                {renderOptions(views, formData)}
                <Text style={styles.header}>Accessibility Options</Text>
                {renderOptions(accessibilities, formData)}
                {formData.media && formData.media.length > 0 && renderMedia(formData.media)}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Icon name="check" size={24} color="#fff" />
                <Text style={styles.buttonText}>Confirm and Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.backButton]} onPress={navigateToPrevious}>
                <Icon name="arrow-left" size={24} color="#fff" />
                <Text style={styles.buttonText}>Back</Text>
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
                        <Text style={styles.modalText}>Your land has been updated successfully!</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleModalClose}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

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
        borderColor: '#007BFF',
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
    button: {
        flexDirection: 'row',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#555',
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
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    mediaContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    imageRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    pdfRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    pdfText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default Screen8;
