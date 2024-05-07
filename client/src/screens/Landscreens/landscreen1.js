import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function Screen1({ formData, handleChange, navigateToNext }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Land Details</Text>
      
      <Text style={styles.label}>Price Range:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={formData.priceRange}
          onValueChange={(itemValue) => handleChange('priceRange', itemValue)}
          mode="dropdown"  // Android only: specifies dropdown mode
        >
          <Picker.Item label="Select Price Range" value="" />
          <Picker.Item label="$50k - $100k" value="50k-100k" />
          <Picker.Item label="$100k - $500k" value="100k-500k" />
          <Picker.Item label="$500k and above" value="500k-above" />
        </Picker>
      </View>

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('location', text)}
        value={formData.location}
        placeholder="Enter location"
        placeholderTextColor="#8e8e8e"
      />

      <Text style={styles.label}>Land Size (acres):</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('landSize', text)}
        value={formData.landSize}
        placeholder="Land Size in acres"
        placeholderTextColor="#8e8e8e"
      />

      <Text style={styles.label}>Accessibility:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('accessibility', text)}
        value={formData.accessibility}
        placeholder="Describe access to the property"
        placeholderTextColor="#8e8e8e"
      />

      <TouchableOpacity onPress={navigateToNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  pickerContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },
  picker: {
    height: 50,
    width: '100%',
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
    marginBottom: 15,
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
