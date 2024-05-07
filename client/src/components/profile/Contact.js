import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, ImageBackground,handleReviewChange,handleSubmitReview } from 'react-native';

const Contact = () => {
  return (
    <ImageBackground
      source={require('../../images/img.jpg')} // Replace '../path/to/backgroundImage.jpg' with your actual image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
         <View style={styles.titleContainer}>

        <Text style={styles.title}>Find Your Place of Dream With Us</Text>
        </View>
  
        <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewLabel}>Add detailed review </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter here..."
            onChangeText={handleReviewChange}
            multiline
          />
          <Button title="Submit" onPress={handleSubmitReview} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'normal',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8, // Adjust the opacity as needed
  },
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: 'cover',
  //   justifyContent: 'center',
  // },
  reviewContainer: {
    width: '80%',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a semi-transparent background to make text readable
    padding: 25,
    borderRadius: 25,
  },
  reviewLabel: {
    marginBottom: 8,
    fontSize: 18,
    color: 'black',
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    backgroundColor: 'lightgray',
  },
});

export default Contact;
