// EditPostScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const EditPostScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [formData, setFormData] = useState(post);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const endpoint = post.type === 'land' ? `land/updateLand/${post.id}` : `house/updateHouse/${post.id}`;
      const response = await axios.put(`http://192.168.104.29:4000/api/${endpoint}`, formData);
      if (response.status === 200) {
        Alert.alert('Success', 'Post updated successfully');
        navigation.goBack();
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      Alert.alert('Error', 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Post</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => handleChange('title', text)}
          placeholder="Enter title"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price (USD):</Text>
        <TextInput
          style={styles.input}
          value={formData.price !== null ? formData.price.toString() : ''}
          onChangeText={(text) => handleChange('price', text)}
          placeholder="Enter price"
          keyboardType="numeric"
        />
      </View>

      {post.type === 'land' && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Size (m²):</Text>
            <TextInput
              style={styles.input}
              value={formData.size !== null ? formData.size.toString() : ''}
              onChangeText={(text) => handleChange('size', text)}
              placeholder="Enter size"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Purchase Option:</Text>
            <TextInput
              style={styles.input}
              value={formData.purchaseoption}
              onChangeText={(text) => handleChange('purchaseoption', text)}
              placeholder="Enter purchase option"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Terrain Type:</Text>
            <TextInput
              style={styles.input}
              value={formData.TerrainType}
              onChangeText={(text) => handleChange('TerrainType', text)}
              placeholder="Enter terrain type"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Zoning:</Text>
            <TextInput
              style={styles.input}
              value={formData.Zoning}
              onChangeText={(text) => handleChange('Zoning', text)}
              placeholder="Enter zoning"
            />
          </View>
        </>
      )}

      {post.type === 'house' && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Number of Bedrooms:</Text>
            <TextInput
              style={styles.input}
              value={formData.numberbedrooms !== null ? formData.numberbedrooms.toString() : ''}
              onChangeText={(text) => handleChange('numberbedrooms', text)}
              placeholder="Enter number of bedrooms"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Number of Bathrooms:</Text>
            <TextInput
              style={styles.input}
              value={formData.numberbathrooms !== null ? formData.numberbathrooms.toString() : ''}
              onChangeText={(text) => handleChange('numberbathrooms', text)}
              placeholder="Enter number of bathrooms"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Property Type:</Text>
            <TextInput
              style={styles.input}
              value={formData.propertyType}
              onChangeText={(text) => handleChange('propertyType', text)}
              placeholder="Enter property type"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>House Age:</Text>
            <TextInput
              style={styles.input}
              value={formData.houseAge}
              onChangeText={(text) => handleChange('houseAge', text)}
              placeholder="Enter house age"
            />
          </View>
        </>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Latitude:</Text>
        <TextInput
          style={styles.input}
          value={formData.alt !== null ? formData.alt.toString() : ''}
          onChangeText={(text) => handleChange('alt', text)}
          placeholder="Enter latitude"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Longitude:</Text>
        <TextInput
          style={styles.input}
          value={formData.long !== null ? formData.long.toString() : ''}
          onChangeText={(text) => handleChange('long', text)}
          placeholder="Enter longitude"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

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
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    fontSize: 16,
    color: '#333',
    marginTop: 5,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditPostScreen;
