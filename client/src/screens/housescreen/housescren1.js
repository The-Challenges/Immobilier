import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function Screen1({ formData, handleChange, navigateToNext }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Property Details</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={formData.priceRange}
          onValueChange={(itemValue) => handleChange('priceRange', itemValue)}
        >
          <Picker.Item label="Select Price Range" value="" />
          <Picker.Item label="$2M - $5M" value="$2M-$5M" />
          <Picker.Item label="$5M - $10M" value="$5M-$10M" />
          <Picker.Item label="$10M and above" value="$10M-above" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={formData.bedrooms}
          onValueChange={(itemValue) => handleChange('bedrooms', itemValue)}
        >
          <Picker.Item label="Select Bedrooms" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={formData.bathrooms}
          onValueChange={(itemValue) => handleChange('bathrooms', itemValue)}
        >
          <Picker.Item label="Select Bathrooms" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="1.5" value="1.5" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="2.5" value="2.5" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="3.5" value="3.5" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="4.5" value="4.5" />
          <Picker.Item label="5" value="5" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={formData.carSpaces}
          onValueChange={(itemValue) => handleChange('carSpaces', itemValue)}
        >
          <Picker.Item label="Select Car Spaces" value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('purchaseTimeframe', text)}
        value={formData.purchaseTimeframe}
        placeholder="Purchase Timeframe"
        placeholderTextColor="#8e8e8e"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('landSize', text)}
        value={formData.landSize}
        placeholder="Land Size"
        placeholderTextColor="#8e8e8e"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('location', text)}
        value={formData.location}
        placeholder="Location"
        placeholderTextColor="#8e8e8e"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('address', text)}
        value={formData.address}
        placeholder="Address"
        placeholderTextColor="#8e8e8e"
      />
      <TouchableOpacity onPress={navigateToNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#5A67D8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Screen1;