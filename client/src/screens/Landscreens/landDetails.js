import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';  // Correct import from the new package

function Screen1({ formData, handleChange, navigateToNext }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Land Details</Text>
      
      {/* Title Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="format-title" size={24} color="#000" />
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => handleChange('title', text)}
          value={formData.title}
          placeholder="Enter title of the land"
        />
      </View>

      {/* Price Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="cash-multiple" size={24} color="#4CAF50" />
        <Text style={styles.label}>Price (USD):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => handleChange('price', text)}
          value={formData.price}
          placeholder="Enter price in USD"
        />
      </View>

      {/* Location Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="map-marker-radius" size={24} color="#3F51B5" />
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => handleChange('location', text)}
          value={formData.location}
          placeholder="Enter location"
        />
      </View>

      {/* Land Size Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="image-area" size={24} color="#FF9800" />
        <Text style={styles.label}>Land Size (m²):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={text => handleChange('size', text)}
          value={formData.size}
          placeholder="Land Size in square meters"
        />
      </View>

      {/* Purchase Option Picker with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="finance" size={24} color="#333" />
        <Text style={styles.label}>Purchase Option:</Text>
        <Picker
          selectedValue={formData.purchaseOption}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => handleChange('purchaseOption', itemValue)}>
          <Picker.Item label="Finance" value="1" />
          <Picker.Item label="cash" value="2" />
          <Picker.Item label="Unknown" value="0" />
        </Picker>
      </View>

      {/* Terrain Type Picker with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="terrain" size={24} color="#009688" />
        <Text style={styles.label}>Terrain Type:</Text>
        <Picker
          selectedValue={formData.terrainType}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => handleChange('terrainType', itemValue)}>
          <Picker.Item label="Flat" value="1" />
          <Picker.Item label="Sloping" value="2" />
          <Picker.Item label="hilly" value="3" />
          <Picker.Item label="forested" value="4" />
          <Picker.Item label="Unknown" value="0" />
        </Picker>
      </View>

      {/* Zoning Picker with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="city" size={24} color="#9C27B0" />
        <Text style={styles.label}>Zoning:</Text>
        <Picker
          selectedValue={formData.zoning}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => handleChange('zoning', itemValue)}>
          <Picker.Item label="residential" value="1" />
          <Picker.Item label="commercial" value="2" />
          <Picker.Item label="agricultural" value="3" />
          <Picker.Item label="industrial" value="4" />
          <Picker.Item label="mixed-use" value="5" />
          <Picker.Item label="Unknown" value="0" />
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
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
