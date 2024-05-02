// RecommendedScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const houses = [
  {
    id: '1',
    images: [require('../assets/house1.jpg'), require('../assets/house2.jpg')],
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
  // More houses...
];

const RecommendedScreen = () => {
  const renderHouseItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => console.log('House pressed:', item)}>
      <FlatList
        horizontal
        data={item.images}
        renderItem={({ item }) => <Image source={item} style={styles.cardImage} />}
        showsHorizontalScrollIndicator={false}
      />
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
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        data={houses}
        keyExtractor={item => item.id}
        renderItem={renderHouseItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.yellow,
    marginRight: 5,
  },
  location: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: COLORS.dark,
  },
});

export default RecommendedScreen;
