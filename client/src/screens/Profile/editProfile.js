import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');  // Age state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSave = async () => {
    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setModalMessage('New passwords do not match!');
      setModalVisible(true);
      return;
    }

    // Verify old password and update profile
    try {
      const verifyResponse = await axios.post('https://your-api-url.com/api/users/verify-password', {
        username: firstName,
        password: oldPassword,
      });

      if (verifyResponse.data.isValid) {
        const updateResponse = await axios.put('https://your-api-url.com/api/users/update', {
          firstName,
          password: newPassword,
          age  // Include age in the update
        });

        if (updateResponse.status === 200) {
          setModalMessage('Profile updated successfully!');
          setModalVisible(true);
        } else {
          throw new Error('Failed to update profile');
        }
      } else {
        setModalMessage('Old password is incorrect!');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setModalMessage('Error updating profile: ' + error.message);
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={styles.container}>
        <Text style={styles.heading}>Edit Profile</Text>
        
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Icon name="check-circle" size={20} color="#fff" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0'
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    width: '90%',
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  }
});

export default EditProfile;
