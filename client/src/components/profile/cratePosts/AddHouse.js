import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
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
        media: []
    });
    const [screenIndex, setScreenIndex] = useState(1);

    const handleChange = (name, value) => {
        console.log("Updated:", name, value);  // More descriptive log
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const navigateToNext = () => {
        setScreenIndex(prevIndex => prevIndex + 1);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://192.168.103.11:4000/api/house/postHouse', formData);
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
