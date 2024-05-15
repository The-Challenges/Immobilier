import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Correct import for updated image picker
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have linked this library

// Function to handle the upload of images to Cloudinary
const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image.uri,
        type: image.type || 'image/jpeg', // Default to jpeg if type not specified
        name: 'upload.jpg',
    });
    formData.append('upload_preset', '2-xRNBOw4EyPDc33a22zd4s8Yqg'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'Riadh88'); // Ensure you include cloud_name if required by your setup
    try {

        const response = await axios.post(`https://api.cloudinary.com/v1_1/dpxdxp4fj/image/upload`, formData);
        console.log("response", response);
        return response.data.url; // Assuming URL is the image path you need
    } catch (error) {
        console.error('Error uploading image: ', error);
        throw error;
    }
};

function Screen4({ formData, handleChange, navigateToNext }) {
    const [selectedImages, setSelectedImages] = useState([]);

    const pickImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // Assuming you are handling the response and uploading to Cloudinary in uploadImage
                uploadImage(response.assets[0])
                    .then(imageUri => {
                        console.log('Uploaded image URI:', imageUri);
                        // Here you can update your state or do whatever is needed next
                    })
                    .catch(error => {
                        console.error('Error uploading image:', error);
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
                            <Image source={{ uri: image.uri }} style={styles.image} />
                        </View>
                    ))
                )}
            </ScrollView>
            <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
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

export default Screen4;
