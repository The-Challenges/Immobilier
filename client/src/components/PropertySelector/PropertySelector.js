import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import COLORS from '../../consts/colors';
import { useNavigation } from '@react-navigation/native';


const PropertySelector = ({ selectedType, onSelectType }) => {
    const navigation = useNavigation();  // Get navigation object using the hook

    const propertyTypes = [
        { label: 'House', value: 'house', icon: require('../../assets/maison.png') },
        { label: 'Land', value: 'land', icon: require('../../assets/land.png') },
    ];

    const handlePress = (type) => {
        onSelectType(type.value);
        if (type.value === 'land') {
            navigation.navigate('FilterScreenLands'); 
          }
    };

    return (
        <View style={styles.typeContainer}>
            {propertyTypes.map((type, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.typeButton,
                        selectedType === type.value ? styles.typeButtonSelected : {}
                    ]}
                    onPress={() => handlePress(type)}
                >
                    <Image source={type.icon} style={styles.typeIcon} />
                    <Text style={styles.typeText}>
                        {type.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    typeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    typeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    typeButtonSelected: {
        backgroundColor: COLORS.lightgrey,
    },
    typeIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    typeText: {
        fontSize: 17,
        color: COLORS.dark,
    }
});

export default PropertySelector;
