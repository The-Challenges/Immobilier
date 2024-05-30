import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, FlatList, Image, Alert } from 'react-native';
import axios from 'axios';
import { getUserId } from '../../../utils/authUtils'; // Correct path to the authUtils.js
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polygon } from 'react-native-maps';

import Screen1 from '../../../screens/Landscreens/landDetails';
import Screen2 from '../../../screens/Landscreens/landmaps';
import Screen3 from '../../../screens/Landscreens/landimages';
import Screen5 from '../../../screens/Landscreens/landsabmut';
import Viewoptions from '../../../screens/Landscreens/landview';
import AccessScreen from '../../../screens/Landscreens/landaccess';
import Screen8 from '../../../screens/Landscreens/landsabmut';

function FullAddLand() {
    const [formData, setFormData] = useState({
        title: '',
        price: null,
        size: null,
        alt: '',
        long: '',
        purchaseoption: 'Unknown',
        TerrainType: 'Unknown',
        Zoning: 'Unknown',
        isVerified: false,
        media: [],
        location: null,
        polygon: [],
        viewOptions: [],
        accessOptions: []
    });
    const [userId, setUserId] = useState(null);
    const [screenIndex, setScreenIndex] = useState(1);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };
        fetchUserId();
    }, []);

    const handleChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const navigateToNext = () => {
        if (screenIndex < 7) {
            setScreenIndex(screenIndex + 1);
        } else {
            console.log('Final form data:', formData);
            Alert.alert('Submission', 'Form data is ready for submission!');
        }
    };

    const navigateToPrevious = () => {
        if (screenIndex > 1) {
            setScreenIndex(screenIndex - 1);
        }
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
                viewOptions: formData.viewOptions,
                accessOptions: formData.accessOptions,
            };

            console.log('Payload being sent:', JSON.stringify(payload, null, 2));

            const response = await axios.post('http://192.168.11.234:4000/api/land/AddLand', payload);

            if (response.status === 200 || response.status === 201) {
                Alert.alert("Success", "Land has been listed successfully.");
                navigation.navigate('HomeTabs'); // Adjust the route name as necessary
            } else {
                throw new Error(`Failed to submit data: Status Code ${response.status}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            Alert.alert('Error', `Submission failed: ${error.message}`);
        }
    };

    return (
        <>
            {screenIndex === 1 && <Screen1 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
            {screenIndex === 2 && <Viewoptions formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 3 && <AccessScreen formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 4 && <Screen2 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 5 && <Screen3 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 6 && <Screen5 formData={formData} handleChange={handleChange} navigateToPrevious={navigateToPrevious} navigateToNext={navigateToNext} />}
            {screenIndex === 7 && <Screen8 formData={formData} navigateToPrevious={navigateToPrevious} handleSubmit={handleSubmit} />}
        </>
    );
}

export default FullAddLand;
