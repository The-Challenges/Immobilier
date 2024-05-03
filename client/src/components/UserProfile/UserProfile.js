import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '123456',
    dateOfBirth: '1990-01-01',
    phone: '123-456-7890',
    imageUrl: '',
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  });

  const CLOUD_NAME = 'your_cloud_name';
  const UPLOAD_PRESET = 'your_preset_here';

  const uploadImage = async (uri, imageKey) => {
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
      if (response.data.secure_url) {
        setProfile(prevState => ({ ...prevState, [imageKey]: response.data.secure_url }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Upload Failed', 'Failed to upload image. Please try again later.');
    }
  };

  const handleImageUpload = (imageKey) => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Image Picker Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const path = response.assets[0].uri;
        await uploadImage(path, imageKey);
      }
    });
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

 
  const handleAddLand = () => {
    navigation.navigate('AddLand');
  };

  const handleAddHouse = () => {
    navigation.navigate('AddHouse'); // Ensure you have a screen named 'AddPost' in your navigator setup
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>User Profile</Text>
        <View style={styles.profileInfo}>
          <Image source={{ uri: profile.imageUrl || 'https://via.placeholder.com/150' }} style={styles.image} />
          <TouchableOpacity onPress={() => handleImageUpload('imageUrl')} style={styles.uploadButton}>
            <IconButton icon="image" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.label}>Name: {profile.name}</Text>
          <Text style={styles.label}>Email: {profile.email}</Text>
          <Text style={styles.label}>Phone: {profile.phone}</Text>
          <Text style={styles.label}>Date of Birth: {profile.dateOfBirth}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <IconButton
            icon="account-edit"
            size={30}
            onPress={handleEditProfile}
            style={styles.iconButtonContainer}
          />
          <IconButton
            icon="plus"
            size={30}
            onPress={handleAddHouse}
            style={styles.iconButtonContainer}
          />
        
          <IconButton
            icon="terrain"
            size={30}
            onPress={handleAddLand}
            style={styles.iconButtonContainer}
          />
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
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default UserProfile;
