import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { getUserId } from '../../../utils/authUtils';  // Correct path to the authUtils.js
import Screen1 from '../../../screens/housescreen/Property Details';
import Screen2 from '../../../screens/housescreen/Outdoor Options';
import Screen3 from '../../../screens/housescreen/Indoor Options';
import Screen4 from '../../../screens/housescreen/maps';  // Ensure correct capitalization if necessary
import Screen5 from '../../../screens/housescreen/images';  // Ensure correct capitalization if necessary
import Screen6 from '../../../screens/housescreen/sabmut';  // Adjusted to 'Submit' for clarity
import Screen7 from '../../../screens/housescreen/Climate Control';
import Viewoptions from "../../../screens/housescreen/viewoptions";  // Ensure correct capitalization if necessary
import { API_AD } from '../../../../config';

function FullCreateHouse() {
    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        latitude: "",
        longitude: "",
        parking: false,
        houseAge: "All types",
        numberBedrooms: 0,
        numberBathrooms: 0,
        propertyType: "All types",
        garage: false,
        media: [],
        climateOptions: [],  // Initialize as an array
        indoorOptions: [],   // Initialize as an array
        outdoorOptions: [],  // Initialize as an array
        viewOptions: []      // Initialize as an array
    });
    const [userId, setUserId] = useState(null);
    const [screenIndex, setScreenIndex] = useState(1);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };
        fetchUserId();
    }, []);

    const handleChange = (name, value) => {
        console.log("Updated:", name, value); // More descriptive log
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const navigateToNext = () => {
        setScreenIndex(prevIndex => prevIndex + 1);
    };

    const handleSubmit = async () => {
        if (!userId) {
            Alert.alert('Error', 'User ID is missing.');
            return;
        }

        try {
            const payload = {
                ...formData,
                userId, // Include userId in the payload
                numberbathrooms: formData.numberBathrooms,
                numberbedrooms: formData.numberBedrooms,
                alt: formData.latitude,
                long: formData.longitude,
                climateOptions: formData.climateOptions,
                indoorOptions: formData.indoorOptions,
                outdoorOptions: formData.outdoorOptions,
                viewOptions: formData.viewOptions
            };

            console.log('Payload being sent:', JSON.stringify(payload, null, 2)); // Log payload

            const response = await axios.post(`${API_AD}/api/house/postHouse`, payload);

            if (response.status === 200 || response.status === 201) {
                Alert.alert("Success", "House has been listed successfully.");
            } else {
                throw new Error(`Failed to list the house. Status Code: ${response.status}`);
            }
        } catch (error) {
            console.error("Submission error:", error); // Log error
            if (error.response) {
                console.error("Response data:", error.response.data); // Log server response
            }
            Alert.alert("Error", `Submission failed: ${error.message}`);
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                {screenIndex === 1 && <Screen1 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
                {screenIndex === 2 && <Screen2 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
                {screenIndex === 3 && <Screen3 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
                {screenIndex === 4 && <Screen7 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
                {screenIndex === 5 && <Viewoptions formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
                {screenIndex === 6 && <Screen4 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
                {screenIndex === 7 && <Screen5 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
                {screenIndex === 8 && <Screen6 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default FullCreateHouse;
