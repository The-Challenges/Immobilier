import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon set

// Function to handle the upload of images to Cloudinary
const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
        uri,
        type: 'image/jpeg', // Adjust the MIME type as necessary
        name: 'upload.jpg',
    });
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
        return response.data;
    } catch (error) {
        console.error('Error uploading image: ', error);
        throw error;
    }
};

function Screen5({ formData, handleChange, navigateToNext }) {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageUpload = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                setSelectedImages([...selectedImages, source]);

                uploadImage(response.uri).then((cloudinaryResponse) => {
                    console.log('Cloudinary response:', cloudinaryResponse);
                    // Handle Cloudinary response as needed
                }).catch(error => {
                    console.error('Upload failed:', error);
                    Alert.alert('Upload failed', 'Failed to upload image.');
                });
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Image Upload</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedImages.length === 0 ? (
                    <View style={styles.placeholderContainer}>
                        <Icon name="photo-library" size={100} color="#ccc" />
                        <Text style={styles.placeholderText}>No images selected</Text>
                    </View>
                ) : (
                    selectedImages.map((image, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image source={image} style={styles.image} />
                        </View>
                    ))
                )}
            </ScrollView>
            <TouchableOpacity style={styles.selectButton} onPress={handleImageUpload}>
                <Icon name="add-a-photo" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={navigateToNext}>
                <Icon name="navigate-next" size={24} color="#fff" />
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    placeholderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    placeholderText: {
        fontSize: 16,
        color: '#ccc',
    },
    imageContainer: {
        marginRight: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    selectButton: {
        backgroundColor: '#5A67D8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    nextButton: {
        backgroundColor: '#5A67D8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
});

export default Screen5;
