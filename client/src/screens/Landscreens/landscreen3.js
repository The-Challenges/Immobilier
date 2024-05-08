import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Screen3({ formData, handleChange, navigateToNext }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Property Extras</Text>
      
      {/* View Options */}
      <Text style={styles.subtitle}>View Options</Text>
      <View style={styles.pickerContainer}>
        <Icon name="image-filter-hdr" size={24} color="#333" />
        <Picker
          style={styles.picker}
          selectedValue={formData.viewOption}
          onValueChange={(itemValue) => handleChange('viewOption', itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Select View" value="" />
          <Picker.Item label="Mountain" value="mountain" />
          <Picker.Item label="Water Views" value="waterViews" />
          <Picker.Item label="City Skyline" value="citySkyline" />
        </Picker>
      </View>

      {/* Access Options */}
      <Text style={styles.subtitle}>Access Options</Text>
      <View style={styles.pickerContainer}>
        <Icon name="road-variant" size={24} color="#333" />
        <Picker
          style={styles.picker}
          selectedValue={formData.accessOption}
          onValueChange={(itemValue) => handleChange('accessOption', itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Select Access" value="" />
          <Picker.Item label="Airport" value="airport" />
          <Picker.Item label="Public Transportation" value="publicTransportation" />
          <Picker.Item label="Highway" value="highway" />
          <Picker.Item label="Road Access" value="roadAccess" />
        </Picker>
      </View>

      {/* Navigation Button */}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },
  picker: {
    flex: 1,
    height: 50,
    fontSize: 16,  // Ensure fontSize is a number
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

export default Screen3;
