import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

function Screen6({ formData, navigateToNext }) {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleConfirm = () => {
        toggleModal();
        navigateToNext(); // Placeholder for navigation function
    };

    return (
        <SafeAreaView style={styles.fullScreen}>
            <ScrollView style={styles.scrollViewContent}>
                <Text style={styles.title}>Summary of Inputs</Text>
                {Object.entries(formData).map(([key, value]) => (
                    <View style={styles.item} key={key}>
                        <Icon name={iconMapping[key] || "checkbox-blank-circle-outline"} size={40} color={iconColors[key] || "#000"} />
                        <Text style={styles.text}>{`${key}: ${value}`}</Text>
                    </View>
                ))}
            </ScrollView>
            <Button title="Confirm and Proceed" onPress={toggleModal} color="#5A67D8" />
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Are you sure you want to proceed?</Text>
                    <View style={styles.buttonRow}>
                        <Button title="Yes" onPress={handleConfirm} color="#4CAF50" />
                        <Button title="No" onPress={toggleModal} color="#f44336" />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const iconMapping = {
    priceRange: "cash-plus",
    bathrooms: "shower",
    bedrooms: "bed-king",
    carSpaces: "car-multiple",
    purchaseTimeframe: "calendar-range",
    undercoverParking: "garage-open",
    fullyFenced: "gate",
    tennisCourt: "tennis-ball",
    garage: "garage-alert-outline",
    outdoorArea: "tree-outline",
    shed: "warehouse",
    outdoorSpa: "spa-outline",
    airConditioning: "air-filter",
    heating: "fireplace",
    solarPanels: "solar-power",
    highEnergyEfficiency: "leaf",
    landsize: "image-area",
    garden: "flower-tulip-outline",
    pool: "swimming",
    backyard: "fence",
    patio: "window-shutter-open",
    balcony: "window-open",
    kitchen: "fridge-outline",
    livingRoom: "sofa",
    diningRoom: "table-furniture",
    securitySystem: "security",
    petFriendly: "dog-side",
    waterfront: "waves",
    view: "binoculars",
    roofType: "roofing",
    flooring: "floor-plan",
    ageOfHome: "home-city-outline",
    recentRenovations: "toolbox-outline",
    schoolCatchment: "school",
    publicTransport: "bus-stop",
    shops: "storefront-outline",
    quietArea: "pine-tree-box"
};

const iconColors = {
    priceRange: "#4CAF50",
    bathrooms: "#03A9F4",
    bedrooms: "#673AB7",
    carSpaces: "#FF9800",
    purchaseTimeframe: "#3F51B5",
    undercoverParking: "#9C27B0",
    fullyFenced: "#795548",
    tennisCourt: "#4CAF50",
    garage: "#f44336",
    outdoorArea: "#8BC34A",
    shed: "#607D8B",
    outdoorSpa: "#03A9F4",
    airConditioning: "#00BCD4",
    heating: "#FFC107",
    solarPanels: "#FFEB3B",
    highEnergyEfficiency: "#CDDC39",
    landsize: "#9E9E9E",
    garden: "#4CAF50",
    pool: "#03A9F4",
    backyard: "#8BC34A",
    patio: "#795548",
    balcony: "#607D8B",
    kitchen: "#FF5722",
    livingRoom: "#795548",
    diningRoom: "#3F51B5",
    securitySystem: "#F44336",
    petFriendly: "#FFC107",
    waterfront: "#2196F3",
    view: "#673AB7",
    roofType: "#9E9E9E",
    flooring: "#607D8B",
    ageOfHome: "#9C27B0",
    recentRenovations: "#FF9800",
    schoolCatchment: "#CDDC39",
    publicTransport: "#795548",
    shops: "#FF5722",
    quietArea: "#4CAF50"
};


const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        marginTop: 20
    },
    scrollViewContent: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
        color: '#333',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});

export default Screen6;
