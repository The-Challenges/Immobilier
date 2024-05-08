import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import axios from 'axios';  // Import axios

function Screen6({ formData, navigateToNext }) {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleConfirm = async () => {
        toggleModal();
        // API call to submit formData
        try {
            const response = await axios.post('https://your-api-url.com/submit-data', formData);
            if (response.status === 200) {
                console.log('Data submitted successfully');
                navigateToNext(); // Proceed to the next step in your app flow
            } else {
                console.error('Failed to submit data:', response);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
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

// Example icon mapping and colors (you should customize this part as needed)
const iconMapping = {
    priceRange: "cash-multiple",
    bathrooms: "shower",
    bedrooms: "bed-king-outline",
    carSpaces: "car-estate",
    purchaseTimeframe: "calendar-clock",
    undercoverParking: "garage",
    fullyFenced: "gate",
    tennisCourt: "tennis",
    garage: "garage-alert",
    outdoorArea: "pine-tree",
    shed: "barn",
    outdoorSpa: "hot-tub",
    airConditioning: "air-conditioner",
    heating: "radiator-disabled",
    solarPanels: "solar-panel-large",
    highEnergyEfficiency: "leaf-maple",
    landsize: "image-size-select-large",
    garden: "flower-tulip",
    pool: "pool",
    backyard: "fence",
    patio: "awning",
    balcony: "balcony",
    kitchen: "fridge-industrial",
    livingRoom: "sofa-outline",
    diningRoom: "table-chair",
    securitySystem: "security-network",
    petFriendly: "dog-service",
    waterfront: "waves-arrow-up",
    view: "telescope",
    roofType: "home-roof",
    flooring: "floor-lamp",
    ageOfHome: "home-city",
    recentRenovations: "toolbox-outline",
    schoolCatchment: "school-outline",
    publicTransport: "bus-stop-covered",
    shops: "shopping-outline",
    quietArea: "silence",
    // Additional icon mappings for completeness
    energyRating: "flash-circle",
    lotSize: "image-size-select-actual",
    roofMaterial: "roofing",
    windows: "window-closed-variant",
    doors: "door-closed-lock",
    driveway: "road-variant",
    fireplace: "fireplace",
    furniture: "sofa-single",
    gym: "dumbbell",
    laundryRoom: "washing-machine",
    sauna: "sauna",
    workshop: "toolbox",
    basement: "stairs-down",
    attic: "stairs-up",
    guestHouse: "home-modern",
    wineCellar: "glass-wine",
    library: "bookshelf",
    office: "desk",
    elevator: "elevator",
    internet: "wifi",
    satelliteDish: "satellite-uplink",
    intercom: "phone-in-talk",
    cameras: "cctv",
    smokeDetectors: "smoke-detector",
    waterSupply: "water-pump",
    septicTank: "tank",
    gasSupply: "gas-cylinder",
    wasteDisposal: "trash-can",
    stormShelter: "weather-hurricane",
    smartHome: "home-automation"
};


// Icon colors from previous messages or custom color schemes
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
    quietArea: "#4CAF50",
    energyRating: "#fbc02d",
    lotSize: "#9ccc65",
    roofMaterial: "#b0bec5",
    windows: "#42a5f5",
    doors: "#5d4037",
    driveway: "#616161",
    fireplace: "#b71c1c",
    furniture: "#8d6e63",
    gym: "#d32f2f",
    laundryRoom: "#0288d1",
    sauna: "#7b1fa2",
    workshop: "#6d4c41",
    basement: "#546e7a",
    attic: "#455a64",
    guestHouse: "#f48fb1",
    wineCellar: "#6a1b9a",
    library: "#8e24aa",
    office: "#3949ab",
    elevator: "#1e88e5",
    internet: "#0d47a1",
    satelliteDish: "#2e7d32",
    intercom: "#c0ca33",
    cameras: "#ef6c00",
    smokeDetectors: "#757575",
    waterSupply: "#0277bd",
    septicTank: "#00695c",
    gasSupply: "#ff6f00",
    wasteDisposal: "#4e342e",
    stormShelter: "#424242",
    smartHome: "#7c4dff"
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
