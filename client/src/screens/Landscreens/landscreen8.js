import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function Screen8({ formData }) {
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://yourapi.com/submit', formData);
      Alert.alert('Success', 'Your information has been successfully submitted.', [
        { text: 'OK', onPress: () => navigation.navigate('UserProfile') }
      ]);
    } catch (error) {
      console.error('Submission Error:', error);
      Alert.alert('Error', 'Failed to submit data.');
    }
  };

  // Helper function to format the location object
  const formatLocation = (location) => {
    if (!location) return 'Not specified';
    return `Lat: ${location.latitude.toFixed(3)}, Long: ${location.longitude.toFixed(3)}`;
  };

  // Component to display each form data item with status symbol
  const DetailItem = ({ label, value, iconName }) => {
    const hasValue = value && value !== 'Not specified';
    return (
      <View style={styles.detailItem}>
        <Icon name={iconName} size={30} color={hasValue ? "#4CAF50" : "#F44336"} />
        <Text style={styles.detailText}>{label}: {value || 'Not specified'}</Text>
        <Icon name={hasValue ? "check" : "close"} size={20} color={hasValue ? "#4CAF50" : "#F44336"} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <DetailItem label="Price Range" value={formData.priceRange} iconName="currency-usd" />
      <DetailItem label="Location" value={formatLocation(formData.location)} iconName="map-marker-radius" />
      <DetailItem label="Land Size" value={formData.size} iconName="ruler-square" />
      <DetailItem label="Purchase Option" value={formData.purchaseOption} iconName="finance" />
      <DetailItem label="Terrain Type" value={formData.terrainType} iconName="terrain" />
      <DetailItem label="Zoning" value={formData.zoning} iconName="city" />
      <DetailItem label="View Option" value={formData.viewOption} iconName="image-filter-hdr" />
      <DetailItem label="Access Option" value={formData.accessOption} iconName="road-variant" />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Icon name="check" size={20} color="#fff" />
        <Text style={styles.buttonText}>Submit</Text>
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
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  detailText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Screen8;
