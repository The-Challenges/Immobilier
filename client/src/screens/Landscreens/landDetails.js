import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomPicker from './pk';

const Screen1 = ({ formData, handleChange, navigateToNext }) => {
  const purchaseOptions = [
    { label: 'Finance', value: 'Finance', icon: 'finance' },
    { label: 'Cash', value: 'Cash', icon: 'cash' },
  ];

  const terrainTypes = [
    { label: 'Flat', value: 'Flat', icon: 'terrain' },
    { label: 'Sloping', value: 'Sloping', icon: 'terrain' },
    { label: 'Hilly', value: 'Hilly', icon: 'terrain' },
    { label: 'Forested', value: 'Forested', icon: 'forest' },
  ];

  const zoningOptions = [
    { label: 'Residential', value: 'Residential', icon: 'home-city' },
    { label: 'Commercial', value: 'Commercial', icon: 'office-building' },
    { label: 'Agricultural', value: 'Agricultural', icon: 'tractor' },
    { label: 'Industrial', value: 'Industrial', icon: 'factory' },
    { label: 'Mixed-use', value: 'Mixed-use', icon: 'city' },
  ];

  const handleSizeChange = (text) => {
    const value = text.trim() === '' ? null : parseFloat(text);
    handleChange('size', value);
  };

  const handlePriceChange = (text) => {
    const value = text.trim() === '' ? null : parseInt(text, 10);
    handleChange('price', value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Land Details</Text>

      <View style={styles.inputContainer}>
        <Icon name="format-title" size={24} color="#000" />
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange('title', text)}
          value={formData.title}
          placeholder="Enter title of the land"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="cash-multiple" size={24} color="#4CAF50" />
        <Text style={styles.label}>Price (USD):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handlePriceChange}
          value={formData.price !== null ? formData.price.toString() : ''}
          placeholder="Enter price in USD"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="image-area" size={24} color="#FF9800" />
        <Text style={styles.label}>Land Size (m²):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleSizeChange}
          value={formData.size !== null ? formData.size.toString() : ''}
          placeholder="Land Size in square meters"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="finance" size={24} color="#333" />
        <Text style={styles.label}>Purchase Option:</Text>
        <CustomPicker
          data={purchaseOptions}
          selectedValue={formData.purchaseoption}
          onValueChange={(value) => handleChange('purchaseoption', value)}
          placeholder="Select a purchase option"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="terrain" size={24} color="#009688" />
        <Text style={styles.label}>Terrain Type:</Text>
        <CustomPicker
          data={terrainTypes}
          selectedValue={formData.TerrainType}
          onValueChange={(value) => handleChange('TerrainType', value)}
          placeholder="Select a terrain type"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="city" size={24} color="#9C27B0" />
        <Text style={styles.label}>Zoning:</Text>
        <CustomPicker
          data={zoningOptions}
          selectedValue={formData.Zoning}
          onValueChange={(value) => handleChange('Zoning', value)}
          placeholder="Select a zoning type"
        />
      </View>

      <TouchableOpacity onPress={navigateToNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#5A67D8',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
