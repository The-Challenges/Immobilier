import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: 'upload.jpg',
    });
    formData.append('upload_preset', '439219526765747'); // Use your actual preset
    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dpxdxp4fj/image/upload`, formData);
        return response.data.url;
    } catch (error) {
        console.error('Error uploading image: ', error);
        Alert.alert('Upload Error', 'Failed to upload image.');
        throw error;
    }
};

function Screen4({ navigateToNext }) {
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const pickImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
        }, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setUploading(true);
                try {
                    const imageUri = await uploadImage(response.assets[0]);
                    setSelectedImages(prev => [...prev, { uri: imageUri }]);
                } catch (error) {
                    console.error('Error uploading image:', error);
                } finally {
                    setUploading(false);
                }
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
            <TouchableOpacity style={styles.selectButton} onPress={pickImage} disabled={uploading}>
                <Icon name="add-a-photo" size={24} color="#fff" />
                {uploading && <Text>Uploading...</Text>}
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
