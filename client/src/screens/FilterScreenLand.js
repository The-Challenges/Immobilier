import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import FilterHeader from '../components/FilterHeader/FilterHeader';
import { Picker } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import COLORS from '../consts/colors';

const terrainOptions = ['Flat', 'Sloping', 'Hilly', 'Forested'];
const zoningOptions = ['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Mixed-use'];

const FilterScreenLand = ({ navigation }) => {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000);
  const [sizeMin, setSizeMin] = useState(100);
  const [sizeMax, setSizeMax] = useState(10000);
  const [altMin, setAltMin] = useState(0);
  const [altMax, setAltMax] = useState(1000);
  const [longMin, setLongMin] = useState(100);
  const [longMax, setLongMax] = useState(1000);
  const [terrainType, setTerrainType] = useState('Unknown');
  const [zoning, setZoning] = useState('Unknown');
  const [purchaseOption, setPurchaseOption] = useState('Unknown');
  const [isVerified, setIsVerified] = useState(false);

  const fetchFilteredLands = async () => {
    try {
      const params = {};
      
      if (priceMin !== 0) params.priceMin = priceMin;
      if (priceMax !== 10000) params.priceMax = priceMax;
      if (sizeMin !== 100) params.sizeMin = sizeMin;
      if (sizeMax !== 10000) params.sizeMax = sizeMax;
      if (altMin !== 0) params.altMin = altMin;
      if (altMax !== 1000) params.altMax = altMax;
      if (longMin !== 100) params.longMin = longMin;
      if (longMax !== 1000) params.longMax = longMax;
      if (terrainType !== 'Unknown') params.terrainType = terrainType;
      if (zoning !== 'Unknown') params.zoning = zoning;
      if (purchaseOption !== 'Unknown') params.purchaseOption = purchaseOption;
      if (isVerified) params.isVerifie = isVerified;

      const response = await axios.get(`http://192.168.104.7:4000/api/land/filterlands`, { params });
      console.log('Fetched data:', response.data);
      navigation.navigate('ResultsScreenLand', { lands: response.data });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch filtered lands');
      console.error('Failed to fetch filtered lands:', error);
    }
  };

  const applyFilters = async () => {
    await fetchFilteredLands();
  };

  const resetFilters = () => {
    setPriceMin(0);
    setPriceMax(10000);
    setSizeMin(100);
    setSizeMax(10000);
    setAltMin(0);
    setAltMax(1000);
    setLongMin(100);
    setLongMax(1000);
    setTerrainType('Unknown');
    setZoning('Unknown');
    setPurchaseOption('Unknown');
    setIsVerified(false);
  };

  const renderHeader = () => (
    <>
      <FilterHeader onBackPress={() => navigation.goBack()} />
      <View style={styles.priceContainer}>
        <Text style={styles.sectionTitle}>Price Range</Text>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={[priceMin, priceMax]}
            onValuesChange={(values) => {
              setPriceMin(values[0]);
              setPriceMax(values[1]);
            }}
            min={0}
            max={10000}
            step={100}
            allowOverlap={false}
            snapped
            selectedStyle={styles.selectedSlider}
            unselectedStyle={styles.unselectedSlider}
            containerStyle={styles.slider}
            markerStyle={styles.marker}
            trackStyle={styles.track}
            customMarkerLeft={() => <Text style={styles.markerLabel}>{priceMin}</Text>}
            customMarkerRight={() => <Text style={styles.markerLabel}>{priceMax}</Text>}
          />
          <View style={styles.valueLabels}>
            <Text style={styles.labelText}>Min: ${priceMin}</Text>
            <Text style={styles.labelText}>Max: ${priceMax}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Terrain Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={terrainType}
          onValueChange={setTerrainType}
          style={styles.picker}>
          {terrainOptions.map(option => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>Zoning</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={zoning}
          onValueChange={setZoning}
          style={styles.picker}>
          {zoningOptions.map(option => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.areaContainer}>
        <Text style={styles.sectionTitle}>Size (sqft)</Text>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={[sizeMin, sizeMax]}
            onValuesChange={values => { setSizeMin(values[0]); setSizeMax(values[1]); }}
            min={100}
            max={10000}
            step={100}
            allowOverlap={false}
            snapped
            selectedStyle={styles.selectedSlider}
            unselectedStyle={styles.unselectedSlider}
            containerStyle={styles.slider}
            markerStyle={styles.marker}
            trackStyle={styles.track}
            customMarkerLeft={() => <Text style={styles.markerLabel}>{sizeMin}</Text>}
            customMarkerRight={() => <Text style={styles.markerLabel}>{sizeMax}</Text>}
          />
          <View style={styles.valueLabels}>
            <Text style={styles.labelText}>Min: {sizeMin} sqft</Text>
            <Text style={styles.labelText}>Max: {sizeMax} sqft</Text>
          </View>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.sectionTitle}>Altitude Range (meters)</Text>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={[altMin, altMax]}
            onValuesChange={values => { setAltMin(values[0]); setAltMax(values[1]); }}
            min={0}
            max={1000}
            step={10}
            allowOverlap={false}
            snapped
            selectedStyle={styles.selectedSlider}
            unselectedStyle={styles.unselectedSlider}
            containerStyle={styles.slider}
            markerStyle={styles.marker}
            trackStyle={styles.track}
            customMarkerLeft={() => <Text style={styles.markerLabel}>{altMin}</Text>}
            customMarkerRight={() => <Text style={styles.markerLabel}>{altMax}</Text>}
          />
          <View style={styles.valueLabels}>
            <Text style={styles.labelText}>Min: {altMin} meters</Text>
            <Text style={styles.labelText}>Max: {altMax} meters</Text>
          </View>
        </View>
      </View>

      <View style={styles.areaContainer}>
        <Text style={styles.sectionTitle}>Longitude Range (degrees)</Text>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={[longMin, longMax]}
            onValuesChange={values => { setLongMin(values[0]); setLongMax(values[1]); }}
            min={100}
            max={1000}
            step={1}
            allowOverlap={false}
            snapped
            selectedStyle={styles.selectedSlider}
            unselectedStyle={styles.unselectedSlider}
            containerStyle={styles.slider}
            markerStyle={styles.marker}
            trackStyle={styles.track}
            customMarkerLeft={() => <Text style={styles.markerLabel}>{longMin}</Text>}
            customMarkerRight={() => <Text style={styles.markerLabel}>{longMax}</Text>}
          />
          <View style={styles.valueLabels}>
            <Text style={styles.labelText}>Min: {longMin}°</Text>
            <Text style={styles.labelText}>Max: {longMax}°</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Purchase Option</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={purchaseOption}
          onValueChange={setPurchaseOption}
          style={styles.picker}>
          {['Finance', 'Cash', 'Unknown'].map(option => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Verified</Text>
        <CheckBox
          value={isVerified}
          onValueChange={setIsVerified}
          tintColors={{ true: COLORS.primary, false: COLORS.grey }}
        />
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
    padding: 20,
    backgroundColor: COLORS.white,
  },
  priceContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },
  areaContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 18,
    textAlign: 'center',
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
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 10,
    textAlign: 'center',
  },
  sliderContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: '#bc8f8f',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  selectedSlider: {
    backgroundColor: '#1e90ff',
  },
  unselectedSlider: {
    backgroundColor: '#e6e6e6',
  },
  slider: {
    height: 40,
  },
  track: {
    height: 4,
    borderRadius: 5,
  },
  valueLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  markerLabel: {
    color: COLORS.dark,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FilterScreenLand;