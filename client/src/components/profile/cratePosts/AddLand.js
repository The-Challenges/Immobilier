import React, { useState } from 'react';
import { Alert } from 'react-native';

import Screen1 from '../../../screens/Landscreens/landDetails';
import Screen2 from '../../../screens/Landscreens/landmaps';
import Screen3 from '../../../screens/Landscreens/landimages';
import Screen5 from '../../../screens/Landscreens/landsabmut'; // Ensure correct spelling if there's a typo ('landsabout'?)
import Viewoptions from '../../../screens/Landscreens/landview';
import AccessScreen from '../../../screens/Landscreens/landaccess';
import Screen8 from '../../../screens/Landscreens/landsabmut';

function FullAddLand() {
    const [formData, setFormData] = useState({
        title: '',
        price: null,  // Initialize as null for better type handling
        size: null,   // Initialize as null for better type handling
        alt: '',
        long: '',
        purchaseoption: 'Unknown',
        TerrainType: 'Unknown',
        Zoning: 'Unknown',
        isVerified: false,
        media: [],
        location: null,
        polygon: [],
    });
    

    const [screenIndex, setScreenIndex] = useState(1);

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

    return (
        <>
            {screenIndex === 1 && <Screen1 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} />}
            {screenIndex === 2 && <Viewoptions formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 3 && <AccessScreen formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 4 && <Screen2 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 5 && <Screen3 formData={formData} handleChange={handleChange} navigateToNext={navigateToNext} navigateToPrevious={navigateToPrevious} />}
            {screenIndex === 6 && <Screen5 formData={formData} handleChange={handleChange} navigateToPrevious={navigateToPrevious} navigateToNext={navigateToNext} />}
            {screenIndex === 7 && <Screen8 formData={formData} navigateToPrevious={navigateToPrevious} />}
        </>
    );
}

export default FullAddLand;
