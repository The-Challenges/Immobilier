import React from 'react';
import { ScrollView, View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Screen8 = ({ formData }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);

    // Form submission
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://192.168.104.3:4000/api/land/AddLand', formData);
            if (response.status === 200 || response.status === 201) {
                setModalVisible(true);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            setModalVisible(true); // Optionally handle error cases differently
        }
    };
    

    // Capitalize labels
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    const fields = [
        { key: 'title', label: 'Title', icon: 'home-outline' },
        { key: 'price', label: 'Price', icon: 'cash-multiple' },
        { key: 'size', label: 'Size (acres)', icon: 'image-area' },
        { key: 'TerrainType', label: 'Terrain Type', icon: 'mountain' },
        { key: 'Zoning', label: 'Zoning', icon: 'city' },
        { key: 'purchaseoption', label: 'Purchase Option', icon: 'hand-pointing-right' }
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

    const renderField = ({ key, label, icon }) => (
        <View style={styles.detailRow} key={key}>
            <Icon name={icon} size={24} color="#333" />
            <Text style={styles.detailText}>{`${capitalize(label)}: ${formData[key]}`}</Text>
        </View>
    );

    const renderOptions = (options, formData) => (
        options.filter(option => formData[option.key]).map(option => (
            <View style={styles.detailRow} key={option.key}>
                <Icon name={option.icon} size={24} color={option.iconColor} />
                <Text style={styles.detailText}>{option.label}</Text>
            </View>
        ))
    );

    return (
        <ScrollView style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: formData.location.latitude,
                    longitude: formData.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker coordinate={formData.location} title="Selected Location" />
            </MapView>
            <View style={styles.card}>
                {fields.map(field => renderField(field))}
                <Text style={styles.header}>Selected Views</Text>
                {renderOptions(views, formData)}
                <Text style={styles.header}>Accessibility Options</Text>
                {renderOptions(accessibilities, formData)}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
            <Text style={styles.modalText}>Your land has been added successfully!</Text>
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
    }
});

export default Screen8;
