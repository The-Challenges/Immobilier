import React, { useState } from 'react';
import Screen1 from '../../../screens/Landscreens/landscreen1'; // Information form
import Screen2 from '../../../screens/Landscreens/landsceen2'; // Map
import Screen3 from '../../../screens/Landscreens/landscreen3'; // Image Upload to Cloudinary
import Screen4 from '../../../screens/Landscreens/landscreen4'; // Verification
import Screen5 from '../../../screens/Landscreens/landscreen5'; // Confirmation Alert

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
        if (screenIndex < 5) {
            setScreenIndex(screenIndex + 1);
        }
    };

    const navigateToPrevious = () => {
        if (screenIndex > 1) {
            setScreenIndex(screenIndex - 1);
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
                    navigateToPrevious={navigateToPrevious}
                />
            )}
      
        </>
    );
}

export default FullAddLand;
