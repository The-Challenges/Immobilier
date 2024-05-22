import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Animated } from 'react-native';
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
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    fetchOptions('indoor', setIndoorOptions);
    fetchOptions('outdoor', setOutdoorOptions);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchOptions = async (type, setOptions) => {
    try {
      const response = await axios.get(`http://192.168.103.18:4000/api/${type}/all${type}`);
      const options = response.data.map(option => ({
        label: option.options,
        icon: getIconForOption(option.options),
        color: getColorForOption(option.options)
      }));
      setOptions(options);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch ${type} options`);
    }
  };

  const getIconForOption = (option) => {
    switch (option) {
      case 'Rumpus room': return 'room';
      case 'Study': return 'book';
      case 'Ensuite': return 'bath';
      case 'Workshop': return 'build';
      case 'Pool': return 'pool';
      case 'Garden': return 'nature';
      default: return 'home';
    }
  };

  const getColorForOption = (option) => {
    switch (option) {
      case 'Rumpus room': return '#ff6347';
      case 'Study': return '#4682b4';
      case 'Ensuite': return '#8a2be2';
      case 'Workshop': return '#32cd32';
      case 'Pool': return '#1e90ff';
      case 'Garden': return '#32cd32';
      default: return '#808080';
    }
  };

  const fetchFilteredHouses = async () => {
    try {
      const indoorOptionsSelected = Object.keys(selectedIndoorOptions).filter(key => selectedIndoorOptions[key]);
      const outdoorOptionsSelected = Object.keys(selectedOutdoorOptions).filter(key => selectedOutdoorOptions[key]);
      const params = buildFilterParams(indoorOptionsSelected, outdoorOptionsSelected);

      const response = await axios.get('http://192.168.11.62:4000/api/house/filterhouses', { params });

      console.log('Response Data:', response.data);

      setHouses(response.data);
      navigation.navigate('ResultsScreen', { houses: response.data });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch filtered houses');
    }
  };

  const buildFilterParams = (indoorOptionsSelected, outdoorOptionsSelected) => {
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

    return params;
  };

  const applyFilters = useCallback(async () => {
    await fetchFilteredHouses();
  }, [priceMin, priceMax, areaMin, areaMax, bedrooms, bathrooms, hasGarage, hasParking, isVerified, purchaseOption, propertyType, houseAge, selectedIndoorOptions, selectedOutdoorOptions]);

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

  const handleOptionChange = (setSelectedOptions) => (option) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [option]: !prevState[option]
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
          checked={hasGarage}
          onChange={(newValue) => setHasGarage(newValue)}
        />
        <CustomCheckbox
          label="Parking"
          checked={hasParking}
          onChange={(newValue) => setHasParking(newValue)}
        />
        <CustomCheckbox
          label="Verified"
          checked={isVerified}
          onChange={(newValue) => setIsVerified(newValue)}
        />
      </View>
    </>
  );

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderHeader()}
        <Text style={styles.sectionTitle}>Indoor Options</Text>
        <View style={styles.optionsContainer}>
          {indoorOptions.map(option => (
            <CustomCheckbox
              key={option.label}
              label={option.label}
              checked={!!selectedIndoorOptions[option.label]}
              onChange={() => handleOptionChange(setSelectedIndoorOptions)(option.label)}
              style={styles.optionItem}
            />
          ))}
        </View>
        <Text style={styles.sectionTitle}>Outdoor Options</Text>
        <View style={styles.optionsContainer}>
          {outdoorOptions.map(option => (
            <CustomCheckbox
              key={option.label}
              label={option.label}
              checked={!!selectedOutdoorOptions[option.label]}
              onChange={() => handleOptionChange(setSelectedOutdoorOptions)(option.label)}
              style={styles.optionItem}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContainer: {
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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionItem: {
    width: '48%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FilterScreen;
