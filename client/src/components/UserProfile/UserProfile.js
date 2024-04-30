import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native';
import editProfile from './editProfile';
const UserProfile = () => {
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('editProfile');
  };

  const handleAddPost = () => {
    navigation.navigate('AddPosts');
  };

  const handleMyPosts = () => {
    console.log('Navigating to My Posts');
    // Here you could implement the logic to navigate to the My Posts screen.
  };

  const [profile, setProfile] = useState({
    name: '',
    email: '', 
    password: '', 
    dateOfBirth: '',
    phone:'',
    imageUrl2: "",
    imageUrl: '',
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  });

  const { name, email,phone,imageUrl, imageUrl2 } = profile;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}></Text>
        <View style={styles.profileInfo}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.label}>Name: {name}</Text>
          <Text style={styles.label}>Email: {email}</Text>
          <Text style={styles.label}>Phone: {phone}</Text>
          {/* Additional profile information could go here */}
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            icon="account-edit"
            mode="contained"
            onPress={handleEditProfile}
            color='#FFD700' // Gold color
            style={styles.button}
            labelStyle={{ color: 'white' }}
          >
            Edit Profile
          </Button>
          <Button
            title="Add Post"
            onPress={handleAddPost}
            icon="plus"
            mode="contained"
            color='#FFD700' // Gold color
            style={styles.button}
            labelStyle={{ color: 'white' }}
          >
            Add Post
          </Button>
          <Button
            icon="file-document"
            mode="contained"
            onPress={handleMyPosts}
            color='#FFD700' // Gold color
            style={styles.button}
            labelStyle={{ color: 'white' }}
          >
            My Posts
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',  // White background for a clean look
  },
  heading: {
    fontSize: 24,
    fontWeight: '700', // Bold text for headings
    textAlign: 'center',
    marginVertical: 20, // Consistent vertical margin
    color: '#333', // Dark grey for text to reduce harshness
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20, // Padding to add space around content
    backgroundColor: '#f0f0f0',  // Light grey background for section
    borderRadius: 10, // Rounded corners for the container
    shadowColor: '#000', // Shadow for 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Android shadow
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60, // Fully rounded corners for circular image
    borderWidth: 3,
    borderColor: '#ddd', // Light grey border
    marginBottom: 10, // Space below the image
  },
  label: {
    fontSize: 16,
    fontWeight: '500', // Medium boldness for readability
    color: '#666', // Soft black for text
    marginBottom: 5, // Space between text items
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    width: '100%', // Button takes full width of the container
    marginBottom: 10, // Margin bottom to separate each button
    borderRadius: 20, // Rounded corners for buttons
    paddingVertical: 10, // Vertical padding for taller buttons
    backgroundColor: '#007BFF', // A vibrant blue for buttons
    elevation: 2, // Shadow effect for buttons
  },
});






export default UserProfile;
