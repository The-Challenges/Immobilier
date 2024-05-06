import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can choose any icon set

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState('');

  const handleSave = () => {
    // Handle saving profile details to database or API
    console.log('editProfile!');
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Canceled editing profile!');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Edit Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={[styles.input, styles.bioInput]}
          placeholder="Bio/About Me"
          value={bio}
          onChangeText={setBio}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={[styles.input, styles.interestsInput]}
          placeholder="Interests"
          value={interests}
          onChangeText={setInterests}
          multiline
        />

        <View style={styles.buttonsContainer}>
          <IconButton
            icon={() => <Icon name="content-save" size={24} color="#ffffff" />}
            color="#F5F7C4"
            size={30}
            onPress={handleSave}
            style={styles.saveButton}
          />
          <IconButton
            icon={() => <Icon name="cancel" size={24} color="#ffffff" />}
            color="#F5F7C4"
            size={30}
            onPress={handleCancel}
            style={styles.cancelButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  bioInput: {
    height: 100, // Increase height for bio input
  },
  interestsInput: {
    height: 100, // Increase height for interests input
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#F5F7C4', // A vibrant blue for the button
    borderRadius: 30, // Rounded corners for the button
  },
  cancelButton: {
    backgroundColor: '#FF6B6B', // A vibrant red for the button
    borderRadius: 30, // Rounded corners for the button
  },
});

export default EditProfile;
