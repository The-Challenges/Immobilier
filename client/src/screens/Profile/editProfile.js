import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'; // Make sure to install axios for HTTP requests

const EditProfile = ({ userId }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    age: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    const { firstName, oldPassword, newPassword, confirmPassword, age } = formData;

    if (newPassword !== confirmPassword) {
      Alert.alert("Password Mismatch", "New passwords do not match.");
      return;
    }

    // Assume a base URL and correct endpoint for updating user data
    try {
      const response = await axios.put(`http://192.168.11.62:4000/api/user/${userId}`, {
        firstName,
        oldPassword,
        newPassword,
        age
      }, {
        headers: {
          Authorization: `Bearer yourTokenHere` // You'll need to handle token management appropriately
        }
      });

      if (response.status === 200) {
        setModalMessage('Profile updated successfully!');
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
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16
  }
});

export default EditProfile;
