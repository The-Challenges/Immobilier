import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import COLORS from '../consts/colors';
import FilterHeader from '../components/FilterHeader/FilterHeader';
import PropertySelector from '../components/PropertySelector/PropertySelector';
import CustomDropdown from '../components/dropDown/dropDown';
import CustomCheckbox from '../components/checkBoxFilterScreen/customCheckBox';
import AdvancedSlider from '../components/AdvancedSlider/AdvancedSlider';

const bedroomOptions = ['1 BR', '2 BR', '3 BR ', '4 BR', '5 BR', '6 BR', '7 BR', '8 BR'];
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
  const [outdoorOptions, setOutdoorOptions] = useState([]);
  const [selectedOutdoorOptions, setSelectedOutdoorOptions] = useState({});

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

    const fetchOutdoorOptions = async () => {
      try {
        const response = await axios.get('http://192.168.103.18:4000/api/outdoor/alloutdoor');
        const options = response.data.map(option => ({
          label: option.options,
          icon: getIconForOption(option.options),
          color: getColorForOption(option.options)
        }));
        setOutdoorOptions(options);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch outdoor options');
      }
    };

    fetchIndoorOptions();
    fetchOutdoorOptions();
  }, []);

  const getIconForOption = (option) => {
    switch (option) {
      case 'Rumpus room': return 'room';
      case 'Study': return 'book';
      case 'Ensuite': return 'bath';
      case 'Workshop': return 'build';
      case 'Pool': return 'pool'; // Example outdoor option icon
      case 'Garden': return 'nature'; // Example outdoor option icon
      default: return 'home';
    }
  };

  const getColorForOption = (option) => {
    switch (option) {
      case 'Rumpus room': return '#ff6347';
      case 'Study': return '#4682b4';
      case 'Ensuite': return '#8a2be2';
      case 'Workshop': return '#32cd32';
      case 'Pool': return '#1e90ff'; // Example outdoor option color
      case 'Garden': return '#32cd32'; // Example outdoor option color
      default: return '#808080';
    }
  };

  const fetchFilteredHouses = async () => {
    try {
      const indoorOptionsSelected = Object.keys(selectedIndoorOptions).filter(key => selectedIndoorOptions[key]);
      const outdoorOptionsSelected = Object.keys(selectedOutdoorOptions).filter(key => selectedOutdoorOptions[key]);
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
      if (outdoorOptionsSelected.length > 0) params.outdoorOptions = outdoorOptionsSelected.join(',');

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
    setPropertyType('All types');
    setPriceMin(100);
    setPriceMax(1000);
    setAreaMin(100);
    setAreaMax(900);
    setBedrooms('1 BR');
    setBathrooms('1 BA');
    setHasGarage(false);
    setHasParking(false);
    setIsVerified(false);
    setPurchaseOption('Choose Option');
    setHouseAge('All types');
    setSelectedIndoorOptions({});
    setSelectedOutdoorOptions({});
  };

  const handleIndoorOptionChange = (option, value) => {
    setSelectedIndoorOptions(prevState => ({
      ...prevState,
      [option]: value
    }));
  };

  const handleOutdoorOptionChange = (option, value) => {
    setSelectedOutdoorOptions(prevState => ({
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
      <AdvancedSlider
        label="Price Range"
        values={[priceMin, priceMax]}
        onValuesChange={(values) => {
          setPriceMin(values[0]);
          setPriceMax(values[1]);
        }}
        min={100}
        max={1000}
        step={50}
        unit="$"
      />
      <AdvancedSlider
        label="Area Range (sqft)"
        values={[areaMin, areaMax]}
        onValuesChange={(values) => {
          setAreaMin(values[0]);
          setAreaMax(values[1]);
        }}
        min={100}
        max={900}
        step={50}
        unit="sqft"
      />
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
      <View style={styles.checkboxContainer}>
        <CustomCheckbox
          label="Garage"
          icon="garage"
          color="#1e90ff"
          checked={hasGarage}
          onChange={setHasGarage}
        />
        <CustomCheckbox
          label="Parking"
          icon="local-parking"
          color="#32cd32"
          checked={hasParking}
          onChange={setHasParking}
        />
        <CustomCheckbox
          label="Verified"
          icon="verified"
          color="#ff6347"
          checked={isVerified}
          onChange={setIsVerified}
        />
      </View>
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderHeader()}
      <Text style={styles.sectionTitle}>Indoor Options</Text>
      {indoorOptions.map(option => (
        <CustomCheckbox
          key={option.label}
          label={option.label}
          icon={option.icon}
          color={option.color}
          checked={!!selectedIndoorOptions[option.label]}
          onChange={value => handleIndoorOptionChange(option.label, value)}
        />
      ))}
      <Text style={styles.sectionTitle}>Outdoor Options</Text>
      {outdoorOptions.map(option => (
        <CustomCheckbox
          key={option.label}
          label={option.label}
          icon={option.icon}
          color={option.color}
          checked={!!selectedOutdoorOptions[option.label]}
          onChange={value => handleOutdoorOptionChange(option.label, value)}
        />
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetButtonText}>Reset Filters</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  priceContainer: {
    marginBottom: 20,
  },
  sliderContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 14,
    color: '#333',
  },
  areaContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FilterScreen;
