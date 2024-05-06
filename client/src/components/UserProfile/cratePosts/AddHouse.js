import React, { useState } from 'react';
import Screen1 from '../../../screens/housescreen/housescren1';
import Screen2 from '../../../screens/housescreen/housescren2';
import Screen3 from '../../../screens/housescreen/housescren3';
import Screen4 from '../../../screens/housescreen/housescren4';
import Screen5 from '../../../screens/housescreen/housescren5';
import Screen6 from '../../../screens/housescreen/housescren6';
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
        // Handle form submission
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
                <Screen4
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                />
            )}
            {screenIndex === 5 && (
                <Screen5
                    formData={formData}
                    handleChange={handleChange}
                    navigateToNext={navigateToNext}
                />
            )}
             {screenIndex === 6 && (
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
