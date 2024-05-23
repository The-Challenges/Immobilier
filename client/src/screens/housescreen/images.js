import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                <Icon name="picture-as-pdf" size={100} color="#FF0000" />
            ) : (
                <Image source={{ uri: item }} style={styles.image} />
            )}
        </View>
    );

    const handleNext = () => {
        navigateToNext();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Image and PDF Upload</Text>
            <FlatList
                data={selectedFiles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderFileItem}
                ListEmptyComponent={
                    <View style={styles.placeholderContainer}>
                        <Icon name="photo-library" size={100} color="#ccc" />
                        <Text style={styles.placeholderText}>No files selected</Text>
                    </View>
                }
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.selectButton} onPress={pickImage} disabled={uploading}>
                    <Icon name="add-a-photo" size={24} color="#fff" />
                    {uploading && <Text>Uploading...</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectButton} onPress={openCamera} disabled={uploading}>
                    <Icon name="camera-alt" size={24} color="#fff" />
                    {uploading && <Text>Uploading...</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.selectButton} onPress={pickPDF} disabled={uploading}>
                    <Icon name="picture-as-pdf" size={24} color="#fff" />
                    {uploading && <Text>Uploading...</Text>}
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Icon name="navigate-next" size={24} color="#fff" />
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
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
    fileContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
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
    nextButton: {
        backgroundColor: '#5A67D8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    }
});

export default Screen5;
