import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

const AddLand = () => {
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [idCard, setIdCard] = useState('');
  const [certificate, setCertificate] = useState('');
  const [description, setDescription] = useState('');

  const uploadImageToCloudinary = async (uri) => {
    const data = new FormData();
    data.append('file', {
      uri: uri,
      type: 'image/jpeg', // or your image type
      name: 'upload.jpg',
    });
    data.append('upload_preset', 'your_preset_here'); // Replace 'your_preset_here' with your actual upload preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      return result.secure_url;
    } catch (err) {
      console.error('Upload Error:', err);
    }
  };

  const handleUploadPhotos = () => {
    launchImageLibrary({ mediaType: 'photo', multiple: true }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        for (const asset of response.assets) {
          const { uri } = asset;
          if (uri) {
            const url = await uploadImageToCloudinary(uri);
            if (url) {
              setPhotos(prevPhotos => [...prevPhotos, url]);
            }
          }
        }
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Add Land</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Photos:</Text>
          <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
              photo ? <Image key={index} source={{ uri: photo }} style={styles.photo} /> : null
            ))}
          </View>
          <TouchableOpacity onPress={handleUploadPhotos} style={styles.uploadButton}>
            <Text style={styles.uploadText}>Select Photos</Text>
          </TouchableOpacity>
        </View>
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location:</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID Card:</Text>
          <TextInput
            style={styles.input}
            value={idCard}
            onChangeText={setIdCard}
            placeholder="Enter ID card details"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Certificate of Ownership:</Text>
          <TextInput
            style={styles.input}
            value={certificate}
            onChangeText={setCertificate}
            placeholder="Enter certificate details"
          />
        </View>
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
        <View style={styles.buttonsContainer}>
          <IconButton
            icon="content-save"
            color="#F5F7C4"
            size={24}
            onPress={() => console.log('Save functionality not implemented')}
            style={styles.button}
          />
          <IconButton
            icon="close"
            color="#F5F7C4"
            size={24}
            onPress={() => console.log('Cancel functionality not implemented')}
            style={styles.button}
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
      backgroundColor: '#fff',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      fontSize: 18,
      marginBottom: 5,
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      fontSize: 16,
      borderRadius: 5,
    },
    photosContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10,
    },
    photo: {
      width: 90,
      height: 90,
      marginRight: 10,
      marginBottom: 10,
    },
    uploadButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
    uploadText: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 16,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20,
    },
    button: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  export default AddLand;