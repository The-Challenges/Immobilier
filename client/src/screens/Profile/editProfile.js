import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Image } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dfsyqvvim/image/upload';

const EditProfile = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();

  console.log('EditProfile received userId:', userId);

  const [formData, setFormData] = useState({
    firstName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    age: '',
    media: '' // Store media as a string
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        uploadImageToCloudinary(selectedImage.uri);
      }
    });
  };

  const uploadImageToCloudinary = async (imageUri) => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg'
    });
    data.append('upload_preset', 'pa4ezjqw');

    try {
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: data,
      });

      const responseData = await response.json();

      if (response.ok && responseData.secure_url) {
        handleChange('media', responseData.secure_url); // Store media URL as a string
        Alert.alert('Image Uploaded', 'Profile image uploaded successfully.');
      } else {
        console.error('Failed to upload image:', responseData);
        Alert.alert('Upload Error', 'Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Image Upload Error', 'Failed to upload image.');
    }
  };

  const handleSave = async () => {
    const { firstName, oldPassword, newPassword, confirmPassword, age, media } = formData;

    if (newPassword !== confirmPassword) {
      Alert.alert("Password Mismatch", "New passwords do not match.");
      return;
    }

    try {
      console.log('Updating profile with userId:', userId);
      const response = await fetch(`http://192.168.104.29:4000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          oldPassword,
          newPassword,
          age,
          media // Pass media as a string
        }),
      });

      const responseData = await response.json();
      console.log('API response:', responseData);

      if (response.ok) {
        setModalMessage('Profile updated successfully!');
        // Navigate back to UserProfile after a successful update
        navigation.navigate('UserProfile');
      } else {
        setModalMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setModalMessage('Error updating profile: ' + error.message);
    }
    setModalVisible(true);
  };

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={styles.container}>
          <Text style={styles.heading}>Edit Profile</Text>
          <TouchableOpacity onPress={handleImagePicker}>
            <View style={styles.imageContainer}>
              <Image
                source={formData.media ? { uri: formData.media } : require('../../components/profile/profileDetails')}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry
            value={formData.oldPassword}
            onChangeText={(text) => handleChange('oldPassword', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={formData.newPassword}
            onChangeText={(text) => handleChange('newPassword', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={formData.age}
            onChangeText={(text) => handleChange('age', text)}
          />
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Icon name="check-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      }
      ListFooterComponent={
        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      }
      renderItem={null}
    />
  );
};

EditProfile.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d8d8d8', // Background color for the circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circle shape for the image
  },
  input: {
    width: '90%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#3498db', // Blue color for the button
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  buttonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 18
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center'
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#3498db', // Blue color for the close button
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16
  }
});

export default EditProfile;
