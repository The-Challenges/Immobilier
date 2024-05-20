import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import COLORS from '../consts/colors';
import FilterHeader from '../components/FilterHeader/FilterHeader';
import PropertySelector from '../components/PropertySelector/PropertySelector';
import CustomDropdown from '../components/dropDown/dropDown';
import CustomCheckbox from '../components/checkBoxFilterScreen/customCheckBox';

const bedroomOptions = ['1 BR', '2 BR', '3 BR', '4 BR', '5 BR', '6 BR', '7 BR', '8 BR'];
const bathroomOptions = ['1 BA', '2 BA', '3 BA', '4 BA', '5 BA', '6 BA', '7 BA', '8 BA'];
const purchaseOptions = ['Finance', 'Cash'];
const propertyTypes = ['Villa', 'Rural', 'Retirement Living'];
const houseAges = ['Established', 'New'];

const FilterScreen = ({ navigation }) => {
  const [propertyType, setPropertyType] = useState('All types');
  const [priceMin, setPriceMin] = useState(100);
  const [priceMax, setPriceMax] = useState(1000);
  const [areaMin, setAreaMin] = useState(100);
  const [areaMax, setAreaMax] = useState(900);
  const [bedrooms, setBedrooms] = useState('1 BR');
  const [houses, setHouses] = useState([]);
  const [bathrooms, setBathrooms] = useState('1 BA');
  const [hasGarage, setHasGarage] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [purchaseOption, setPurchaseOption] = useState('Choose Option');
  const [houseAge, setHouseAge] = useState('All types');
  const [indoorOptions, setIndoorOptions] = useState([]);
  const [selectedIndoorOptions, setSelectedIndoorOptions] = useState({});

  useEffect(() => {
    const fetchIndoorOptions = async () => {
      try {
        const response = await axios.get('http://192.168.103.18:4000/api/indoor/allindoor');
        const options = response.data.map(option => ({
          label: option.options,
          icon: getIconForOption(option.options),
          color: getColorForOption(option.options)
        }));
        setIndoorOptions(options);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch indoor options');
      }
    };

    fetchIndoorOptions();
  }, []);

  const getIconForOption = (option) => {
    switch (option) {
      case 'Rumpus room': return 'room';
      case 'Study': return 'book';
      case 'Ensuite': return 'bath';
      case 'Workshop': return 'build';
      default: return 'home';
    }
  };

  const getColorForOption = (option) => {
    switch (option) {
      case 'Rumpus room': return '#ff6347';
      case 'Study': return '#4682b4';
      case 'Ensuite': return '#8a2be2';
      case 'Workshop': return '#32cd32';
      default: return '#808080';
    }
  };

  const fetchFilteredHouses = async () => {
    try {
      const indoorOptionsSelected = Object.keys(selectedIndoorOptions).filter(key => selectedIndoorOptions[key]);
      const params = {};

      if (priceMin !== 100) params.priceMin = priceMin;
      if (priceMax !== 1000) params.priceMax = priceMax;
      if (areaMin !== 100) params.areaMin = areaMin;
      if (areaMax !== 900) params.areaMax = areaMax;
      if (bedrooms !== '1 BR') params.bedrooms = bedrooms;
      if (bathrooms !== '1 BA') params.bathrooms = bathrooms;
      if (hasGarage) params.hasGarage = hasGarage;
      if (hasParking) params.hasParking = hasParking;
      if (isVerified) params.isVerified = isVerified;
      if (purchaseOption !== 'Choose Option') params.purchaseOption = purchaseOption;
      if (propertyType !== 'All types') params.propertyType = propertyType;
      if (houseAge !== 'All types') params.houseAge = houseAge;
      if (indoorOptionsSelected.length > 0) params.indoorOptions = indoorOptionsSelected.join(',');

      const response = await axios.get('http://192.168.103.18:4000/api/house/filterhouses', { params });

      console.log('Response Data:', response.data);

      setHouses(response.data);
      navigation.navigate('ResultsScreen', { houses: response.data });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch filtered houses');
    }
  };

  const applyFilters = async () => {
    await fetchFilteredHouses();
  };

  const resetFilters = () => {
    setPropertyType('home');
    setPriceMin(100);
    setPriceMax(1000);
    setAreaMin(100);
    setAreaMax(900);
    setBedrooms('1 BR');
    setBathrooms('1 BA');
    setHasGarage(false);
    setHasParking(false);
    setIsVerified(false);
    setPurchaseOption('cash');
    setHouseAge('All types');
    setSelectedIndoorOptions({});
  };

  const handleIndoorOptionChange = (option, value) => {
    setSelectedIndoorOptions(prevState => ({
      ...prevState,
      [option]: value
    }));
  };

  const renderHeader = () => (
    <>
      <FilterHeader onBackPress={() => navigation.goBack()} />
      <PropertySelector selectedType={propertyType} onSelectType={setPropertyType} />
      <CustomDropdown
        label="Bedrooms"
        options={bedroomOptions}
        selectedValue={bedrooms}
        onValueChange={setBedrooms}
      />
      <CustomDropdown
        label="Bathrooms"
        options={bathroomOptions}
        selectedValue={bathrooms}
        onValueChange={setBathrooms}
      />
      <View style={styles.priceContainer}>
        <Text style={styles.sectionTitle}>Price Range</Text>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={[priceMin, priceMax]}
            onValuesChange={values => {
              setPriceMin(values[0]);
              setPriceMax(values[1]);
            }}
            min={100}
            max={1000}
            step={50}
            allowOverlap={false}
            minMarkerOverlapDistance={10}
            snapped={true}
            selectedStyle={{ backgroundColor: '#1e90ff' }}
            unselectedStyle={{ backgroundColor: '#d3d3d3' }}
            containerStyle={{ height: 40 }}
            markerStyle={{ height: 16, width: 16, backgroundColor: '#1e90ff' }}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>${priceMin}</Text>
            <Text style={styles.sliderLabel}>${priceMax}</Text>
          </View>
        </View>
      </View>
      <View style={styles.areaContainer}>
        <Text style={styles.sectionTitle}>Area Range (sqft)</Text>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={[areaMin, areaMax]}
            onValuesChange={values => {
              setAreaMin(values[0]);
              setAreaMax(values[1]);
            }}
            min={100}
            max={900}
            step={50}
            allowOverlap={false}
            minMarkerOverlapDistance={10}
            snapped={true}
            selectedStyle={{ backgroundColor: '#1e90ff' }}
            unselectedStyle={{ backgroundColor: '#d3d3d3' }}
            containerStyle={{ height: 40 }}
            markerStyle={{ height: 16, width: 16, backgroundColor: '#1e90ff' }}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{areaMin} sqft</Text>
            <Text style={styles.sliderLabel}>{areaMax} sqft</Text>
          </View>
        </View>
      </View>
      <View style={styles.checkboxContainer}>
        <CustomCheckbox label="Garage" checked={hasGarage} onChange={setHasGarage} />
        <CustomCheckbox label="Parking" checked={hasParking} onChange={setHasParking} />
        <CustomCheckbox label="Verified" checked={isVerified} onChange={setIsVerified} />
      </View>
      <CustomDropdown
        label="Purchase Option"
        options={purchaseOptions}
        selectedValue={purchaseOption}
        onValueChange={setPurchaseOption}
      />
      <CustomDropdown
        label="Property Type"
        options={propertyTypes}
        selectedValue={propertyType}
        onValueChange={setPropertyType}
      />
      <CustomDropdown
        label="House Age"
        options={houseAges}
        selectedValue={houseAge}
        onValueChange={setHouseAge}
      />
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderHeader()}
      <View style={styles.indoorOptionsContainer}>
        <Text style={styles.sectionTitle}>Indoor Options</Text>
        {indoorOptions.map(option => (
          <View style={styles.indoorOption} key={option.label}>
            <CustomCheckbox
              label={option.label}
              checked={selectedIndoorOptions[option.label]}
              onChange={value => handleIndoorOptionChange(option.label, value)}
            />
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.buttonText}>Reset Filters</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  priceContainer: {
    marginBottom: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 16,
  },
  areaContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  indoorOptionsContainer: {
    marginBottom: 20,
  },
  indoorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FilterScreen;
