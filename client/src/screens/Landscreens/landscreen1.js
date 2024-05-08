import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Screen1({ formData, handleChange, navigateToNext }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Land Details</Text>
      
      {/* Price Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="cash-multiple" size={24} color="#4CAF50" />
        <Text style={styles.label}>Price (USD):</Text>
      </View>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={text => handleChange('price', text)}
        value={formData.price}
        placeholder="Enter price in USD"
      />

      {/* Location Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="map-marker-radius" size={24} color="#3F51B5" />
        <Text style={styles.label}>Location:</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange('location', text)}
        value={formData.location}
        placeholder="Enter location"
      />

      {/* Land Size Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="image-area" size={24} color="#FF9800" />
        <Text style={styles.label}>Land Size (m²):</Text>
      </View>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={text => handleChange('size', text)}
        value={formData.size}
        placeholder="Land Size in square meters"
      />

      {/* Purchase Option Picker with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="finance" size={24} color="#333" />
        <Text style={styles.label}>Purchase Option:</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange('purchaseOption', text)}
        value={formData.purchaseOption}
        placeholder="Enter purchase option (e.g., Finance, Cash)"
      />

      {/* Terrain Type Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="terrain" size={24} color="#009688" />
        <Text style={styles.label}>Terrain Type:</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange('terrainType', text)}
        value={formData.terrainType}
        placeholder="Enter terrain type (e.g., Flat, Sloping)"
      />

      {/* Zoning Input with Icon */}
      <View style={styles.inputContainer}>
        <Icon name="city" size={24} color="#9C27B0" />
        <Text style={styles.label}>Zoning:</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => handleChange('zoning', text)}
        value={formData.zoning}
        placeholder="Enter zoning type (e.g., Residential, Commercial)"
      />

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
