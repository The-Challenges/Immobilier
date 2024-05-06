import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView, Animated } from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
// import Header from '../components/RecommendedHeader.js/Header';


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
    description: 'Comfortable and affordable living with essential amenities.'
  },
];

const windowWidth = Dimensions.get('window').width;

const RecommendedScreen = () => {
  const scrollX = new Animated.Value(0); // Animated value for smooth scrolling of images

  const renderHouseItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => console.log('House pressed:', item)}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageScrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {item.images.map((image, index) => (
          <Image key={index} source={image} style={styles.cardImage} />
        ))}
      </ScrollView>
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.price}>{`$${item.price} / month`}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color={COLORS.gold} />
            <Text style={styles.rating}>{`${item.rating}`}</Text>
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
      {/* <Header /> */}
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
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    width: windowWidth * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  imageScrollView: {
    height: 250,
  },
  cardImage: {
    width: windowWidth * 0.85,
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gold,
    marginLeft: 5,
  },
  location: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  detailsButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  detailsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecommendedScreen;
