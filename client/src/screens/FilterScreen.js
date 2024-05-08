
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
  ScrollView
  
} from 'react-native';

import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import FilterHeader from '../components/FilterHeader/FilterHeader';
import TransactionTypeSelector from '../components/TransactionTypeSelector/TransactionTypeSelector';
import PropertySelector from '../components/PropertySelector/PropertySelector';
import { Picker } from '@react-native-picker/picker';

import COLORS from '../consts/colors';

const { width } = Dimensions.get('screen');

const priceOptions = [100, 300, 400, 500, 600, 700, 800, 900, 950];
const areaOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const bedroomOptions = [1, 2, 3, 4, 5, 6];
const bathroomOptions = [1, 2, 3, 4];

const FilterScreen = ({ navigation }) => {

 
  const [propertyType, setPropertyType] = useState('All types');
  const [priceMin, setPriceMin] = useState(100);
  const [priceMax, setPriceMax] = useState(1000);
  const [areaMin, setAreaMin] = useState(1);
  const [areaMax, setAreaMax] = useState(10);
  const [transactionType, setTransactionType] = useState('buy');

  const [bedrooms, setBedrooms] = useState(1);
  const [houses, setHouses] = useState([]);

  const [bathrooms, setBathrooms] = useState(1);
  const [hasGarage, setHasGarage] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [purchaseOption, setPurchaseOption] = useState('Unknown');
  const [houseAge, setHouseAge] = useState('All types');

  const fetchFilteredHouses = async () => {
    try {
      const response = await axios.get('http://192.168.103.5:4000/api/house/filterhouses', {
        params: {
          priceMin,    
          priceMax,   
          areaMin,     
          areaMax,     
          bedrooms,    
          bathrooms,   
          hasGarage,   
          hasParking,  
          isVerified,  
          purchaseOption, 
          propertyType,   
          houseAge,    
        }
      });
      setHouses(response.data);  
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch filtered houses');
    }
  };
  


  
  

  const applyFilters = async () => {
    await fetchFilteredHouses(); 
     navigation.navigate('ResultsScreen', { houses });
  };
  

  const resetFilters = () => {
    setTransactionType('buy');
    setPropertyType('home');
    setPriceMin(100);
    setPriceMax(1000);
    setAreaMin(1);
    setAreaMax(10);
    setBedrooms(1);
    setBathrooms(1);
    setHasGarage(false);
    setHasParking(false);
    setIsVerified(false);
    setPurchaseOption('cash');
    setHouseAge();
  };

  const renderHeader = () => (
    <>
      <FilterHeader onBackPress={() => navigation.goBack()} />
      <TransactionTypeSelector transactionType={transactionType} onSelect={setTransactionType} />
      <PropertySelector selectedType={propertyType} onSelectType={setPropertyType} />
      <Text style={styles.sectionTitle}>Bedrooms</Text>
      <Picker
        selectedValue={bedrooms}
        onValueChange={setBedrooms}
        style={styles.picker}>
        {bedroomOptions.map(option => (
          <Picker.Item label={`${option}+ BR`} value={option} key={option} />
        ))}
      </Picker>

      <Text style={styles.sectionTitle}>Bathrooms</Text>
      <Picker
        selectedValue={bathrooms}
        onValueChange={setBathrooms}
        style={styles.picker}>
        {bathroomOptions.map(option => (
          <Picker.Item label={`${option}+ BA`} value={option} key={option} />
        ))}
      </Picker>

      <Text style={styles.sectionTitle}>Price Range</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priceMin}
          onValueChange={setPriceMin}
          style={styles.picker}>
          {priceOptions.map(option => (
            <Picker.Item label={`$${option}`} value={option} key={option} />
          ))}
        </Picker>

        <Picker
          selectedValue={priceMax}
          onValueChange={setPriceMax}
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
          onValueChange={setAreaMin}
          style={styles.picker}>
          {areaOptions.map(option => (
            <Picker.Item label={`${option} sqft`} value={option} key={option} />
          ))}
        </Picker>
        <Picker
          selectedValue={areaMax}
          onValueChange={setAreaMax}
          style={styles.picker}>
          {areaOptions.map(option => (
            <Picker.Item label={`${option} sqft`} value={option} key={option} />
          ))}
        </Picker>
      </View>
      <Text style={styles.sectionTitle}>Purchase Option</Text>
      <Picker
        selectedValue={purchaseOption}
        onValueChange={setPurchaseOption}
        style={styles.picker}>
        {['Finance', 'Cash', 'Unknown'].map(option => (
          <Picker.Item label={option} value={option} key={option} />
        ))}
      </Picker>
      <Text style={styles.sectionTitle}>Property Type</Text>
      <Picker
        selectedValue={propertyType}
        onValueChange={setPropertyType}
        style={styles.picker}>
        {['Villa', 'Rural', 'Retirement Living'].map(type => (
          <Picker.Item label={type} value={type} key={type} />
        ))}
      </Picker>
      <Text style={styles.sectionTitle}>House Age</Text>
      <Picker
        selectedValue={houseAge}
        onValueChange={setHouseAge}
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
      </View>
    </>
  );

  const renderFooter = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={resetFilters}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#1e90ff' }]} onPress={applyFilters}>
        <Text style={styles.buttonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      {renderFooter()}
    </ScrollView>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#8b4513',
    textAlign: 'center'
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e1e1e1',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    marginHorizontal: 3,
    borderRadius: 15,
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
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
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
  listItem: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  listText: {
    fontSize: 18,
  },
});

export default FilterScreen;