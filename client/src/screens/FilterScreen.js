
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
  
} from 'react-native';



import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import FilterHeader from '../components/FilterHeader/FilterHeader';
import TransactionTypeSelector from '../components/TransactionTypeSelector/TransactionTypeSelector';
import PropertySelector from '../components/PropertySelector/PropertySelector';
import { Picker } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


import COLORS from '../consts/colors';


const bedroomOptions = [1, 2, 3, 4, 5, 6,7,8];
const bathroomOptions = [1, 2, 3, 4,5,6,7,8];

const FilterScreen = ({ navigation }) => {

 
  const [propertyType, setPropertyType] = useState('All types');
  const [priceMin, setPriceMin] = useState(100);
  const [priceMax, setPriceMax] = useState(1000);
  const [areaMin, setAreaMin] = useState(100);
  
  const [areaMax, setAreaMax] = useState(900);
  const [transactionType, setTransactionType] = useState('buy');

  const [bedrooms, setBedrooms] = useState(1);
  const [houses, setHouses] = useState([]);

  const [bathrooms, setBathrooms] = useState(1);
  const [hasGarage, setHasGarage] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [purchaseOption, setPurchaseOption] = useState('Choose Option');
  const [houseAge, setHouseAge] = useState('All types');

  const fetchFilteredHouses = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:4000/api/house/filterhouses', {
        params: {
          priceMin,    
          priceMax,   
          bedrooms,    
          bathrooms,   
          areaMin,     
          areaMax,     
          hasGarage,
          hasParking,  
          isVerified,
          purchaseOption, 
          propertyType,   
          houseAge,  
        }
      });
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
    setTransactionType('buy');
    setPropertyType('home');
    setPriceMin(100);
    setPriceMax(1000);
    setAreaMin(100);
    setAreaMax(900);
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
      selectedStyle={{
        backgroundColor:'#1e90ff',  
      }}
      unselectedStyle={{
        backgroundColor:'#d3d3d3',
      }}
      containerStyle={{
        height: 40,
      }}
      markerStyle={{
        
        height: 16,
        width: 16,
        borderRadius: 15,
        backgroundColor: '#bc8f8f',
      }}
      trackStyle={{
        height:3.8,
        borderRadius: 5,
      }}
    />
    <View style={styles.priceLabelsContainer}>
      <Text style={styles.priceLabel}>Min: ${priceMin}</Text>
      <Text style={styles.priceLabel}>Max: ${priceMax}</Text>
    </View>
  </View>
</View>


      <View style={styles.areaContainer}>
  <Text style={styles.sectionTitle}>Area (sqft)</Text>
  <View style={styles.sliderContainer}>
  <MultiSlider
  values={[areaMin, areaMax]}
  onValuesChange={(values) => {
    setAreaMin(values[0]);
    setAreaMax(values[1]);
  }}
  min={100}
  max={900}
  step={50}
  allowOverlap={false}
  snapped={true}
  selectedStyle={styles.selectedSlider}
  unselectedStyle={styles.unselectedSlider}
  containerStyle={styles.slider}
  markerStyle={styles.marker}
  trackStyle={styles.track}
/>

    <View style={styles.valueLabels}>
      <Text style={styles.labelText}>Min: {areaMin} sqft</Text>
      <Text style={styles.labelText}>Max: {areaMax} sqft</Text>
    </View>
      </View>
      </View>  


      <Text style={styles.sectionTitle}>Purchase Option</Text>
      <Picker
        selectedValue={purchaseOption}
        onValueChange={setPurchaseOption}
        style={styles.picker}>
        {['Finance', 'Cash'].map(option => (
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
        {['Established', 'New'].map(age => (
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
          onValueChange={(newValue) => setHasParking(newValue)}
          tintColors={{ true: COLORS.primary, false: COLORS.grey }}
      />
         </View>

      {/* <CheckBox
          value={isVerified}
          onValueChange={(newValue) => setIsVerified(newValue)}
          tintColors={{ true: COLORS.primary, false: COLORS.grey }}
      /> */}

        
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
    padding: 20,
    backgroundColor: COLORS.white,
  },
  
  
  
  priceContainer: {
    padding: 20,
    backgroundColor: '#ffffff',  // Consistent background for all slider sections
    borderRadius: 15,  // Rounded corners for a softer look
    shadowColor: "#000000",  // Subtle shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },

  valueLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Ensures labels are at each end
    width: '100%',  // Labels stretch to match slider width
    marginTop: 12,  // Space above the labels
  },
  

  marker: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: '#bc8f8f',  // Distinctive marker color
    borderWidth: 2,
    borderColor: '#ffffff',  // White border for visual pop
  },

  selectedSlider: {
    backgroundColor: '#1e90ff',  // Vibrant selection color
  },
  unselectedSlider: {
    backgroundColor: '#e6e6e6',  // Neutral unselected color
  },

  slider: {
    height: 40,  // Adequate touch area for usability
  },

  track: {
    height: 4,  // Visible but not overly thick
    borderRadius: 5,  // Soft rounded corners
  },

  areaContainer: {
    padding: 20,
    backgroundColor: '#ffffff',  // Consistent background for all slider sections
    borderRadius: 15,  // Match styling for both sliders
    shadowColor: "#000000",  // Consistent shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',  // Bold font for clear section titles
    color: '#333333',  // Dark color for high contrast
    marginBottom: 18,  // Space below the title
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 220,
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
    color: '#666666',  // Light grey for a softer look
    marginTop: 10,  // Space between the slider and the text
    textAlign: 'center',
  },

  sliderContainer: {
    paddingHorizontal: 10,  // Uniform padding for better alignment
    paddingBottom: 20,  // Padding below to space out from the next section
    alignItems: 'center',  // Center alignment for neat appearance
  },
  

  
  priceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',  // Light grey for a softer look
    marginTop: 10,  // Space between the slider and the text
    textAlign: 'center',
  },

  priceLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Ensures labels are at each end
    width: '100%',  // Labels stretch to match slider width
    paddingHorizontal: 20,
      // Aligns labels with slider padding
  },
  
  
  
});

export default FilterScreen;