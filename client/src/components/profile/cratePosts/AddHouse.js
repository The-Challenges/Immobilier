import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import Screen1 from '../../../screens/housescreen/housescren1';
import Screen2 from '../../../screens/housescreen/housescren2';
import Screen3 from '../../../screens/housescreen/housescreen4';
import Screen4 from '../../../screens/housescreen/housescreen';
import Screen5 from '../../../screens/housescreen/housescreen6';
import Screen6 from '../../../screens/housescreen/housescreen7';
import Screen7 from '../../../screens/housescreen/housescreen3';
function FullCreateHouse() {
    const [formData, setFormData] = useState({
        // option: '',
        priceRange: '',
        bedrooms: '',
        bathrooms: '',
        carSpaces: '',
        purchaseTimeframe: '',
        landSize: '',
        location: '',
        address: '',
        isVerified: false,
        finance: false,
        cash: false,
        ensuite: false,
        study: false,
        alarmSystem: false,
        floorboards: false,
        rumpusRoom: false,
        dishwasher: false,
        builtInRobes: false,
        broadband: false,
        gym: false,
        workshop: false,
        swimmingPool: false,
        balcony: false,
        undercoverParking: false,
        fullyFenced: false,
        tennisCourt: false,
        garage: false,
        outdoorArea: false,
        shed: false,
        outdoorSpa: false,
        airConditioning: false,
        heating: false,
        solarPanels: false,
        highEnergyEfficiency: false
    });
    const [screenIndex, setScreenIndex] = useState(1);

    const handleChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const navigateToNext = () => {
        setScreenIndex(screenIndex + 1);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://your-api-url.com/houses', formData);
            if (response.status === 200) {
                Alert.alert("Success", "House has been listed successfully.");
            } else {
                throw new Error('Failed to list the house');
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };
    return (
        <>
            {screenIndex === 1 && (
                <Screen1
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                />
            )}
            {screenIndex === 2 && (
                <Screen2
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                />
            )}
            {screenIndex === 3 && (
                <Screen3
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                />
            )}
            {screenIndex === 4 && (
                    <Screen7
                        formData={formData}
                        handleChange={handleChange}
                        navigateToNext={navigateToNext}
                    />
                )}
            {screenIndex === 5 && (
                <Screen4
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                />
            )}
            {screenIndex === 6 && (
                <Screen5
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                />
            )}

             {screenIndex === 7 && (
                <Screen6
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            )}
        </>
    );
}

export default FullCreateHouse;
