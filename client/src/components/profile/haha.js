import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const Rating = () => {
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  const handleRate = (rate) => {
    setRating(rate);
  };

  return (
    // <ImageBackground
    //   source={require('../../images/maa.jpg')}
    //   style={styles.backgroundImage}
    //   resizeMode="cover"
    // >
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require('../../images/aaa.png')} style={styles.image} />
        <Text style={styles.name}>raj kumar</Text>
        <View style={styles.contactContainer}>
          <View style={styles.contactItem}>
            <Icon name="phone-call" size={30} color="#666" />
            <Text style={styles.contactText}>+216 28153955</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon1 name="gmail" size={30} color="#666" />
            <Text style={styles.contactText}>NailiYoussef01@gmail.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Listings')} style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Icon2 name="list" size={25} color="dodgerblue" />
          </View>
          <Text style={styles.menuText}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')} style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Icon1 name="phone" size={25} color="dodgerblue" />
          </View>
          <Text style={styles.menuText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Icon2 name="notifications" size={25} color="dodgerblue" />
          </View>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()} style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Icon2 name="exit" size={25} color="red" />
          </View>
          <Text style={styles.menuText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 50, // Adjust the top padding as needed
  },
  image: {
    width: 120,
    height: 140,
    borderRadius: 50,
    borderWidth: 0,
    borderColor: '#4CAF50',
  },
  name: {
    fontSize: 19,
    color: 'black',
    marginTop: 10,
  },
  contactContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#666',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconContainer: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 22,
    fontWeight: 'bold',
    // borderBottomWidth: 2,
    // borderBottomColor: 'dodgerblue', // adjust the color to your liking
    paddingBottom: 5, // adjust the padding to your liking
    paddingRight:200
  },
});

export default Rating;