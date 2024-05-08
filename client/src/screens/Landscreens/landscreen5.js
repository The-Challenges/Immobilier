import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or any other preferred icon set
import { launchImageLibrary } from 'react-native-image-picker';
import { Cloudinary } from 'cloudinary-react-native'; // Assuming you have Cloudinary properly set up
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook to navigate

function Screen5({ formData, setFormData, navigateToNext }) {
  const [description, setDescription] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const navigation = useNavigation(); // Initialize useNavigation hook

  const handleChooseImage = (type) => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        if (type === 'certificate') {
          setCertificate(uri);
          uploadImage(uri, 'certificate');
        } else if (type === 'idCard') {
          setIdCard(uri);
          uploadImage(uri, 'idCard');
        }
      }
    });
  };

  const uploadImage = async (uri, type) => {
    try {
      // Your Cloudinary upload logic here
      // Example:
      // const cloudinaryResponse = await Cloudinary.upload(uri, "YOUR_CLOUD_NAME", "YOUR_UPLOAD_PRESET");
      // console.log('Uploaded image URL:', cloudinaryResponse.secure_url);
      // if (type === 'certificate') {
      //   setFormData({ ...formData, certificate: cloudinaryResponse.secure_url });
      // } else if (type === 'idCard') {
      //   setFormData({ ...formData, idCard: cloudinaryResponse.secure_url });
      // }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Documents</Text>

      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Add a description"
        multiline
      />

      <TouchableOpacity style={styles.iconContainer} onPress={() => handleChooseImage('certificate')}>
        <Icon name="file-document-outline" size={50} color="#007AFF" />
        <Text style={styles.iconLabel}>Upload Certificate</Text>
      </TouchableOpacity>
      {certificate && <Image source={{ uri: certificate }} style={styles.uploadedImage} resizeMode="cover" />}

      <TouchableOpacity style={styles.iconContainer} onPress={() => handleChooseImage('idCard')}>
        <Icon name="identification" size={50} color="#007AFF" />
        <Text style={styles.iconLabel}>Upload ID Card</Text>
      </TouchableOpacity>
      {idCard && <Image source={{ uri: idCard }} style={styles.uploadedImage} resizeMode="cover" />}

      <TouchableOpacity style={styles.nextButton} onPress={navigateToNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Back Button with Icon */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    minHeight: 100,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 18,
    marginTop: 5,
    color: '#007AFF',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: '#5A67D8',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
});

export default Screen5;
