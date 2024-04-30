import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, Button } from 'react-native';

const AddPosts = () => {
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [idCard, setIdCard] = useState('');
  const [certificate, setCertificate] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    // Implement save logic here
  };

  const handleCancel = () => {
    // Implement cancel logic here
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Add Post</Text>
        {/* Photos */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Photos:</Text>
          {/* Add logic to upload photos */}
          {/* Display uploaded photos */}
        </View>
        {/* Price */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="Enter price"
          />
        </View>
        {/* Location */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location:</Text>
          {/* Add map component for selecting location */}
        </View>
        {/* ID Card */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID Card:</Text>
          {/* Add logic to upload ID card image */}
          {/* Display uploaded ID card image */}
        </View>
        {/* Certificate of Ownership */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Certificate of Ownership:</Text>
          {/* Add logic to upload certificate image */}
          <Image source={{ uri: certificate }} style={styles.certificateImage} />
        </View>
        {/* Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder="Enter description"
          />
        </View>
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <Button title="Save" onPress={handleSave} color="#F5F7C4" />
          <Button title="Cancel" onPress={handleCancel} color="#F5F7C4" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    color: 'black',
  },
  certificateImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default AddPosts;
