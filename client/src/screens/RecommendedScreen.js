// RecommendedScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler'; // Ensure import is correct

const houses = [
  {
    id: '1',
    images: [require('../assets/house1.jpg'), require('../assets/house4.jpg')],
    rating: 4.5,
    location: 'Toronto, Canada',
    price: '1,200',
    description: 'A beautiful house located in the heart of Toronto with stunning views.'
  },
  {
    id: '2',
    images: [require('../assets/house2.jpg'), require('../assets/house3.jpg')],
    rating: 4.8,
    location: 'Vancouver, Canada',
    price: '1,500',
    description: 'Luxurious living in Vancouver with top-notch amenities and breathtaking scenery.'
  },

  {
    id: '3',
    images: [require('../assets/house3.jpg'), require('../assets/house1.jpg')],
    rating: 4,
    location: 'Vancouver, Canada',
    price: '800',
    description: 'Luxurious living in Vancouver with top-notch amenities and breathtaking scenery.'
  },
];

const windowWidth = Dimensions.get('window').width;

const RecommendedScreen = () => {
  const renderHouseItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => console.log('House pressed:', item)}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageScrollView}>
        {item.images.map((image, index) => (
          <Image key={index} source={image} style={styles.cardImage} />
        ))}
      </ScrollView>
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.price}>{`$${item.price} / month`}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{`${item.rating}`}</Text>
            <Icon name="star" size={16} color={COLORS.yellow} />
          </View>
        </View>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          horizontal
          data={houses}
          keyExtractor={item => item.id}
          renderItem={renderHouseItem}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 130,
    width: windowWidth * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  imageScrollView: {
    height: 200,
  },
  cardImage: {
    width: windowWidth * 0.8,
    height: 400,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.blue,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    

  },
  rating: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.yellow,
    marginRight: 4,
  },
  location: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 10,
    fontWeight: 'italic',

  },
  detailsButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default RecommendedScreen;
