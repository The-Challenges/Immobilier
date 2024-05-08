import React, { useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';

import Screen1 from '../../../screens/Landscreens/landscreen1'; // Information form
import Screen2 from '../../../screens/Landscreens/landsceen2'; // Map
import Screen3 from '../../../screens/Landscreens/landscreen3'; // Image Upload to Cloudinary
import Screen4 from '../../../screens/Landscreens/landscreen4'; // Verification
import Screen5 from '../../../screens/Landscreens/landscreen5'; // Confirmation Alert
import Screen8 from '../../../screens/Landscreens/landscreen8';
function FullAddLand() {
    const [formData, setFormData] = useState({
        photos: [],
        price: '',
        location: '',
        idCard: '',
        certificate: '',
        description: ''
    });
    const [screenIndex, setScreenIndex] = useState(1);

    const handleChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const navigateToNext = () => {
        if (screenIndex < 6) {
            setScreenIndex(screenIndex + 1);
        }
    };

    const navigateToPrevious = () => {
        if (screenIndex > 1) {
            setScreenIndex(screenIndex - 1);
        }
    };
    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://your-api-url.com/lands', formData);
            if (response.status === 200) {
                Alert.alert("Success", "Land details have been successfully submitted.");
                // Reset the form or handle further actions after submission
                setFormData({
                    photos: [],
                    price: '',
                    location: '',
                    idCard: '',
                    certificate: '',
                    description: ''
                });
                setScreenIndex(1); // Reset to the first screen or navigate to a success screen
            } else {
                throw new Error('Failed to submit land details');
            }
        } catch (error) {
            Alert.alert("Error", error.message || 'Failed to submit land details');
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
                    navigateToPrevious={navigateToPrevious}
                />
            )}
            {screenIndex === 3 && (
                <Screen3
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                    navigateToPrevious={navigateToPrevious}
                />
            )}
            {screenIndex === 4 && (
                <Screen4
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                    navigateToPrevious={navigateToPrevious}
                />
            )}
            {screenIndex === 5 && (
                <Screen5
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                    navigateToPrevious={navigateToPrevious}
                />
            )}
            {screenIndex === 6 && (
                <Screen8
                    formData={formData}
                    handleChange={handleChange}
                    navigateToPrevious={navigateToPrevious}
                />
            )}
       
        </>
    );
}

export default FullAddLand;
