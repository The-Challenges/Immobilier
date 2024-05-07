import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  // Choose your preferred icon pack
import { useNavigation } from '@react-navigation/native';
import UserProfile from '../../components/UserProfile/UserProfile';
function Screen5({ formData }) {
  const navigation = useNavigation();

  const handleSubmit = () => {
    Alert.alert(
      'Submit Confirmation',
      'Your post is about to be submitted. Wait for a notification from admin.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Submission cancelled'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('Post submitted');
            navigation.navigate('UserProfile'); 
          }
        }
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.detailItem}>
        <Icon name="currency-usd" size={30} color="#4CAF50" />
        <Text style={styles.detailText}>Price Range: {formData.priceRange}</Text>
      </View>
      <View style={styles.detailItem}>
        <Icon name="map-marker-radius" size={30} color="#4CAF50" />
        <Text style={styles.detailText}>Location: {formData.location}</Text>
      </View>
      <View style={styles.detailItem}>
        <Icon name="ruler-square" size={30} color="#4CAF50" />
        <Text style={styles.detailText}>Land Size: {formData.landSize}</Text>
      </View>
      <View style={styles.detailItem}>
        <Icon name="road-variant" size={30} color="#4CAF50" />
        <Text style={styles.detailText}>Accessibility: {formData.accessibility}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Icon name="check" size={20} color="#fff" />
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Screen5;
