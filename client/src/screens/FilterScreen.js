import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Icon1 from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';

import { Picker } from '@react-native-picker/picker';
import COLORS from '../consts/colors';

const { width } = Dimensions.get('screen');

const priceOptions = [400, 800, 1200, 1600, 2000, 2400, 2800, 3200, 3600];
const areaOptions = [500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500];
const bedroomOptions = [1, 2, 3, 4, 5, 6];
const bathroomOptions = [1, 2, 3, 4];

function getImageSource(type) {
  switch (type) {
    case 'house':
      return require('../assets/maison.png');
    case 'land':
      return require('../assets/land.png');
    default:
      return require('../assets/house1.jpg');
  }
}

const FilterScreen = ({ navigation }) => {
  const [propertyType, setPropertyType] = useState('All types');
  const [priceMin, setPriceMin] = useState(400);
  const [priceMax, setPriceMax] = useState(3400);
  const [areaMin, setAreaMin] = useState(500);
  const [areaMax, setAreaMax] = useState(2000);
  const [transactionType, setTransactionType] = useState('buy');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [hasGarage, setHasGarage] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
const [purchaseOption, setPurchaseOption] = useState('Unknown');
const [houseAge, setHouseAge] = useState('All types');


  const applyFilters = () => {
    console.log('Filters:', {
       transactionType,
        propertyType,
         priceMin,
          priceMax,
           areaMin,
            areaMax,
             bedrooms,
              bathrooms,
              hasGarage,
                hasParking,
                  isVerified
     });
    navigation.goBack();
  };

  const resetFilters = () => {
    setTransactionType('buy');
    setPropertyType('home');
    setPriceMin(400);
    setPriceMax(3400);
    setAreaMin(500);
    setAreaMax(2000);
    setBedrooms(1);
    setBathrooms(1);
    setHasGarage(false);
    setHasParking(false);
    setIsVerified(false);
    setPurchaseOption('cash')
    setHouseAge()
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Icon1 name="arrowleft" size={30} color="#6495ed" onPress={() => navigation.goBack()} style={styles.backIcon} />
        <Text style={styles.headerTitle}>Filter</Text>
      </View>

      {/* Transaction Type Buttons */}
      <View style={styles.transactionTypeContainer}>
        <TouchableOpacity
          style={[styles.transactionButton, transactionType === 'buy' ? styles.transactionButtonActive : {}]}
          onPress={() => setTransactionType('buy')}>
          <Text style={[styles.transactionText, { color: transactionType === 'buy' ? '#fff' : '#6495ed' }]}>Buy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.transactionButton, transactionType === 'sell' ? styles.transactionButtonActive : {}]}
          onPress={() => setTransactionType('sell')}>
          <Text style={[styles.transactionText, { color: transactionType === 'sell' ? '#fff' : '#6495ed' }]}>Sell</Text>
        </TouchableOpacity>
      </View>

      {/* Property Type Selection */}
      <Text style={styles.sectionTitle}>Type</Text>
      <View style={styles.typeContainer}>
        {['house', 'land'].map((type, index) => (
          <TouchableOpacity key={index} style={styles.typeButton} onPress={() => setPropertyType(type)}>
            <Image source={getImageSource(type)} style={styles.typeIcon} />
            <Text style={styles.typeText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bedroom and Bathroom Selection */}
      <Text style={styles.sectionTitle}>Bedrooms</Text>
      <Picker
        selectedValue={bedrooms}
        onValueChange={(itemValue) => setBedrooms(itemValue)}
        style={styles.picker}>
        {bedroomOptions.map(option => (
          <Picker.Item label={`${option}+ BR`} value={option} key={option} />
        ))}
      </Picker>

      <Text style={styles.sectionTitle}>Bathrooms</Text>
      <Picker
        selectedValue={bathrooms}
        onValueChange={(itemValue) => setBathrooms(itemValue)}
        style={styles.picker}>
        {bathroomOptions.map(option => (
          <Picker.Item label={`${option}+ BA`} value={option} key={option} />
        ))}
      </Picker>
                      
                      {/* Bedroom and Bathroom Selection */}


      {/* Price and Area Range Selection */}
      <Text style={styles.sectionTitle}>Price Range</Text>
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priceMin}
          onValueChange={(itemValue) => setPriceMin(itemValue)}
          style={styles.picker}>
          {priceOptions.map(option => (
            <Picker.Item label={`$${option}`} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={priceMax}
          onValueChange={(itemValue) => setPriceMax(itemValue)}
          style={styles.picker}>
          {priceOptions.map(option => (
            <Picker.Item label={`$${option}`} value={option} key={option} />
          ))}
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>Area (sqft)</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={areaMin}
          onValueChange={(itemValue) => setAreaMin(itemValue)}
          style={styles.picker}>
          {areaOptions.map(option => (
            <Picker.Item label={`${option} sqft`} value={option} key={option} />
          ))}
        </Picker>
        <Picker
          selectedValue={areaMax}
          onValueChange={(itemValue) => setAreaMax(itemValue)}
          style={styles.picker}>
          {areaOptions.map(option => (
            <Picker.Item label={`${option} sqft`} value={option} key={option} />
          ))}
        </Picker>
      </View>
            {/* Price and Area Range Selection */}


      {/* // Add purchase option section here */}
<Text style={styles.sectionTitle}>Purchase Option</Text>
<Picker
  selectedValue={purchaseOption}
  onValueChange={(itemValue) => setPurchaseOption(itemValue)}
  style={styles.picker}>
  {['Finance', 'Cash', 'Unknown'].map(option => (
    <Picker.Item label={option} value={option} key={option} />
  ))}
</Picker>



  {/* // Add property type selection here */}
<Text style={styles.sectionTitle}>Property Type</Text>
<Picker
  selectedValue={propertyType}
  onValueChange={(itemValue) => setPropertyType(itemValue)}
  style={styles.picker}>
  {['Villa', 'Rural', 'Retirement Living'].map(type => (
    <Picker.Item label={type} value={type} key={type} />
  ))}
</Picker>


{/* // Add house age selection here */}
<Text style={styles.sectionTitle}>House Age</Text>
<Picker
  selectedValue={houseAge}
  onValueChange={(itemValue) => setHouseAge(itemValue)}
  style={styles.picker}>
  {['Established', 'New', 'All types'].map(age => (
    <Picker.Item label={age} value={age} key={age} />
  ))}
</Picker>




      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Garage</Text>
          <CheckBox
            value={hasGarage}
            onValueChange={setHasGarage}
            tintColors={{ true: COLORS.primary, false: COLORS.grey }}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Parking</Text>
          <CheckBox
            value={hasParking}
            onValueChange={setHasParking}
            tintColors={{ true: COLORS.primary, false: COLORS.grey }}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Verified</Text>
          <CheckBox
            value={isVerified}
            onValueChange={setIsVerified}
            tintColors={{ true: COLORS.primary, false: COLORS.grey }}
          />
        </View>
        

        {/* Filter Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={resetFilters}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#1e90ff' }]} onPress={applyFilters}>
          <Text style={[styles.buttonText, { color: COLORS.white }]}>Apply</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

// Styling for the FilterScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8b4513',
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  transactionButton: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
    borderColor: '#1e90ff',
    borderWidth: 1.5,
  },
  transactionButtonActive: {
    backgroundColor: '#1e90ff',
  },
  transactionText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color:  '#8b4513', 
    // just add it now 
    textAlign: 'center'
    // just add it now
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  typeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  typeText: {
    fontSize: 17,
    color: COLORS.dark,
    fontWeight: 'italic',
  },

  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30, 
    paddingHorizontal: 20, 
    backgroundColor: '#ffffff', // Use a clean white background
    borderRadius: 25, 
    borderWidth: 1,
    borderColor: '#e1e1e1', // Soften the border color
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  picker: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#eaeaea', 
},

  valueText: {
    textAlign: 'center',
    fontSize: 19,
    marginVertical: 10,
    color: 'grey'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  button: {
  flex: 1,
  backgroundColor: COLORS.primary, // Use primary color for button background
  paddingVertical: 14, // More padding for a better touch area
  marginHorizontal: 3, // Adjust margins for spacing between buttons
  borderRadius: 15, // Rounded corners for buttons
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
  },

  buttonText: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#ffffff', 
  },

  section: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f8f8f8', 
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff', // White background for each checkbox option
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  checkboxLabel: {
    fontSize: 17,
    color: COLORS.dark,
    fontWeight: '500',
  },
  
});

export default FilterScreen;
