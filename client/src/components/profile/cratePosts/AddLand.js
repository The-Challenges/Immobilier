import React, { useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';

import Screen1 from '../../../screens/Landscreens/landDetails';
import Screen2 from '../../../screens/Landscreens/landmaps';
import Screen3 from '../../../screens/Landscreens/landimages';
import Screen5 from '../../../screens/Landscreens/landsabmut'; // Ensure correct spelling if there's a typo ('landsabout'?)
import Viewoptions from '../../../screens/Landscreens/landview';
import AccessScreen from '../../../screens/Landscreens/landaccess';

function FullAddLand() {
    // Initialize form data with default values
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        size: '',
        alt: '',
        long: '',
        purchaseoption: 'Unknown',
        TerrainType: 'Unknown',
        Zoning: 'Unknown',
        isVerified: false, // Corrected spelling from 'isVerifie'
    });

    // Track the current screen index for navigation
    const [screenIndex, setScreenIndex] = useState(1);

    // Function to handle changes to form data
    const handleChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    

    // Function to navigate to the next screen
    const navigateToNext = () => {
        if (screenIndex < 6) {
            setScreenIndex(screenIndex + 1);
        } else {
            // Optional: Perform final validation or submission here
            console.log('Final form data:', formData);
            Alert.alert('Submission', 'Form data is ready for submission!');
            // Example of submitting form data (implementation depends on your backend API)
            // submitFormData();
        }
    };

    // Function to navigate to the previous screen
    const navigateToPrevious = () => {
        if (screenIndex > 1) {
            setScreenIndex(screenIndex - 1);
        }
    };

    // Render the appropriate screen based on the current index
    return (
        <>
            {screenIndex === 1 && <Screen1 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
            {screenIndex === 2 && <Viewoptions formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 3 && <AccessScreen formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 4 && <Screen2 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 5 && <Screen3 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 6 && <Screen5 formData={formData} handleChange={handleChange} navigateToPrevious={navigateToPrevious} />}
        </>
    );
}

export default FullAddLand;

// Note: Ensure the spelling and paths to imported components are correct.
