import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure this package is installed

function Screen1({ formData, handleChange, navigateToNext }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 20 }}>
      <Text style={styles.title}>Property Details</Text>
      
      {/* Price */}
      <View style={styles.inputContainer}>
        <Icon name="cash-multiple" size={24} color="#333" />
        <Text style={styles.label}>Price:</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('price', text)}
        keyboardType="numeric"
        value={formData.price}
        placeholder="Enter price"
      />

      {/* Number of Bedrooms */}
      <View style={styles.inputContainer}>
        <Icon name="bed-king-outline" size={24} color="#333" />
        <Text style={styles.label}>Number of Bedrooms:</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('numberBedrooms', text)}
        keyboardType="numeric"
        value={formData.numberBedrooms}
        placeholder="Enter number of bedrooms"
      />

      {/* Number of Bathrooms */}
      <View style={styles.inputContainer}>
        <Icon name="shower-head" size={24} color="#333" />
        <Text style={styles.label}>Number of Bathrooms:</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('numberBathrooms', text)}
        keyboardType="numeric"
        value={formData.numberBathrooms}
        placeholder="Enter number of bathrooms"
      />

      {/* Garage Spaces */}
      <View style={styles.inputContainer}>
        <Icon name="garage" size={24} color="#333" />
        <Text style={styles.label}>Garage Spaces:</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('garage', text)}
        keyboardType="numeric"
        value={formData.garage}
        placeholder="Enter number of garage spaces"
      />

      {/* Parking Available */}
      <View style={styles.inputContainer}>
        <Icon name="parking" size={24} color="#333" />
        <Text style={styles.label}>Parking Available:</Text>
      </View>
      <Switch
        onValueChange={(value) => handleChange('parking', value)}
        value={formData.parking}
      />

      {/* House Age */}
      <View style={styles.inputContainer}>
        <Icon name="home-city-outline" size={24} color="#333" />
        <Text style={styles.label}>House Age:</Text>
      </View>
      <Picker
        style={styles.picker}
        selectedValue={formData.houseAge}
        onValueChange={(itemValue) => handleChange('houseAge', itemValue)}
      >
        <Picker.Item label="Established" value="Established" />
        <Picker.Item label="New" value="New" />
        <Picker.Item label="All Types" value="All types" />
      </Picker>

      {/* Property Type */}
      <View style={styles.inputContainer}>
        <Icon name="office-building" size={24} color="#333" />
        <Text style={styles.label}>Property Type:</Text>
      </View>
      <Picker
        style={styles.picker}
        selectedValue={formData.propertyType}
        onValueChange={(itemValue) => handleChange('propertyType', itemValue)}
      >
        <Picker.Item label="Villa" value="Villa" />
        <Picker.Item label="Rural" value="Rural" />
        <Picker.Item label="Retirement Living" value="Retirement Living" />
        <Picker.Item label="All Types" value="All types" />
      </Picker>

      {/* Purchase Option */}
      <View style={styles.inputContainer}>
        <Icon name="cash-plus" size={24} color="#333" />
        <Text style={styles.label}>Purchase Option:</Text>
      </View>
      <Picker
        style={styles.picker}
        selectedValue={formData.purchaseOption}
        onValueChange={(itemValue) => handleChange('purchaseOption', itemValue)}
      >
        <Picker.Item label="Finance" value="Finance" />
        <Picker.Item label="Cash" value="Cash" />
      </Picker>

      {/* Is Verified */}
      <View style={styles.inputContainer}>
        <Icon name="check-circle-outline" size={24} color="#333" />
        <Text style={styles.label}>Is Verified:</Text>
      </View>
      <Switch
        onValueChange={(value) => handleChange('isVerified', value)}
        value={formData.isVerified}
      />

      {/* Next Button */}
      <TouchableOpacity onPress={navigateToNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  input: {
    height: 50,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
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
