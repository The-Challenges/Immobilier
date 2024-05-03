import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CreateHouse = () => {
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [carSpaces, setCarSpaces] = useState('');
  const [purchaseTimeframe, setPurchaseTimeframe] = useState('');
  const [landSize, setLandSize] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.heading}>Create Post</Text>

        <Text style={styles.label}>Price Range ($):</Text>
        <Picker
          selectedValue={priceRange}
          onValueChange={(itemValue, itemIndex) => setPriceRange(itemValue)}
          style={styles.picker}>
          <Picker.Item label="2M-5M" value="2M-5M" />
        </Picker>

        <Text style={styles.label}>Bedrooms:</Text>
        <Picker
          selectedValue={bedrooms}
          onValueChange={(itemValue, itemIndex) => setBedrooms(itemValue)}
          style={styles.picker}>
          <Picker.Item label="3" value="3" />
        </Picker>

        <Text style={styles.label}>Bathrooms:</Text>
        <Picker
          selectedValue={bathrooms}
          onValueChange={(itemValue, itemIndex) => setBathrooms(itemValue)}
          style={styles.picker}>
          <Picker.Item label="2" value="2" />
        </Picker>

        <Text style={styles.label}>Car Spaces:</Text>
        <Picker
          selectedValue={carSpaces}
          onValueChange={(itemValue, itemIndex) => setCarSpaces(itemValue)}
          style={styles.picker}>
          <Picker.Item label="2" value="2" />
        </Picker>

        <Text style={styles.label}>Purchase Timeframe:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPurchaseTimeframe}
          value={purchaseTimeframe}
          placeholder="Enter purchase timeframe"
        />

        <Text style={styles.label}>Expected Land size (m²):</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLandSize}
          value={landSize}
          placeholder="Enter expected land size"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Purchase Location:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
          placeholder="Enter purchase location"
        />

        <Text style={styles.label}>Full Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
          placeholder="Enter full address"
        />

        <Button
          title="Submit"
          onPress={() => console.log("Submit Form")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
});

export default CreateHouse;
