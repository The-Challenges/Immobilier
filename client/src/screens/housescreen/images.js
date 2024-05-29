import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/Ionicons'; // Using Ionicons for better icons
import Carousel from 'react-native-snap-carousel';

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('file', {
    uri: image.uri,
    type: image.type || 'image/jpeg',
    name: 'upload',
  });
  formData.append('upload_preset', 'pa4ezjqw');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dfsyqvvim/image/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading image: ', error);
    Alert.alert('Upload Error', 'Failed to upload image.');
    throw error;
  }
};

const uploadPDF = async (pdf) => {
  const formData = new FormData();
  formData.append('file', {
    uri: pdf.uri,
    type: pdf.type || 'application/pdf',
    name: pdf.name || 'upload.pdf',
  });
  formData.append('upload_preset', 'pa4ezjqw');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dfsyqvvim/raw/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading PDF: ', error);
    Alert.alert('Upload Error', 'Failed to upload PDF.');
    throw error;
  }
};
const Screen5 = ({ formData, handleChange, navigateToNext }) => {
    const [selectedFiles, setSelectedFiles] = useState(formData.media || []);
    const [uploading, setUploading] = useState(false);

    const pickImage = () => {
        try {
            launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
                selectionLimit: 5
            }, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    setUploading(true);
                    try {
                        const uploadPromises = response.assets.map(imageAsset => uploadImage(imageAsset));
                        const fileUris = await Promise.all(uploadPromises);
                        const updatedFiles = [...selectedFiles, ...fileUris];
                        setSelectedFiles(updatedFiles);
                        handleChange('media', updatedFiles);
                    } catch (error) {
                        console.error('Error uploading image:', error.message);
                    } finally {
                        setUploading(false);
                    }
                }
            });
        } catch (error) {
            console.error('Error picking image:', error.message);
            Alert.alert('Image Picker Error', 'Failed to pick image.');
        }
    };

    const openCamera = () => {
        try {
            launchCamera({
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200
            }, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled camera');
                } else if (response.error) {
                    console.log('Camera Error: ', response.error);
                } else {
                    setUploading(true);
                    try {
                        const uploadPromises = response.assets.map(imageAsset => uploadImage(imageAsset));
                        const fileUris = await Promise.all(uploadPromises);
                        const updatedFiles = [...selectedFiles, ...fileUris];
                        setSelectedFiles(updatedFiles);
                        handleChange('media', updatedFiles);
                    } catch (error) {
                        console.error('Error uploading image:', error.message);
                    } finally {
                        setUploading(false);
                    }
                }
            });
        } catch (error) {
            console.error('Error opening camera:', error.message);
            Alert.alert('Camera Error', 'Failed to open camera.');
        }
    };

    const pickPDF = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setUploading(true);
            try {
                const pdfUri = await uploadPDF(res[0]);
                const updatedFiles = [...selectedFiles, pdfUri];
                setSelectedFiles(updatedFiles);
                handleChange('media', updatedFiles);
            } catch (error) {
                console.error('Error uploading PDF:', error.message);
            } finally {
                setUploading(false);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled PDF picker');
            } else {
                console.error('PDF Picker Error: ', err);
                Alert.alert('PDF Picker Error', 'Failed to pick PDF.');
            }
        }
    };

    const renderFileItem = ({ item }) => (
        <View style={styles.fileContainer}>
            {item.endsWith('.pdf') ? (
                <Icon name="document-text-outline" size={150} color="#FF0000" />
            ) : (
                <Image source={{ uri: item }} style={styles.image} />
            )}
        </View>
    );

    const handleNext = () => {
        navigateToNext();
    };

    const { width } = Dimensions.get('window');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.nextButtonTop} onPress={handleNext}>
                <Text style={styles.nextButtonText}>&gt;</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.selectButton} onPress={pickImage} disabled={uploading}>
                    <Icon name="image-outline" size={32} color="#fff" />
                    {uploading && <ActivityIndicator size="small" color="#fff" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectButton} onPress={openCamera} disabled={uploading}>
                    <Icon name="camera-outline" size={32} color="#fff" />
                    {uploading && <ActivityIndicator size="small" color="#fff" />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectButton} onPress={pickPDF} disabled={uploading}>
                    <Icon name="document-text-outline" size={32} color="#fff" />
                    {uploading && <ActivityIndicator size="small" color="#fff" />}
                </TouchableOpacity>
            </View>
            {selectedFiles.length > 0 && (
                <View style={styles.carouselContainer}>
                    <Carousel
                        data={selectedFiles}
                        renderItem={renderFileItem}
                        sliderWidth={width}
                        itemWidth={width - 60}
                        loop={true}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    nextButtonTop: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#5A67D8',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    uploadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
    },
    fileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    selectButton: {
        backgroundColor: '#5A67D8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    carouselContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
});

export default Screen5;
