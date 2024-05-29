import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, StyleSheet, Image, Pressable, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

const { width } = Dimensions.get('screen');

const FeaturedScroller = ({ houses = [], navigation, toggleCard, pressedCard }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= houses.slice(0, 5).length) {
          flatListRef.current.scrollToIndex({ index: 0, animated: true });
          return 0;
        } else {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
          return nextIndex;
        }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [houses]);

  const renderHouseItem = ({ item }) => (
    <Pressable onPress={() => toggleCard(item.id)}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.Media[0]?.link || 'https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardType}>{item.propertyType}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Icon name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating || '4.5'}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="favorite-border" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardPrice}>${item.price}/month</Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardLocation}>{item.location}</Text>
          {pressedCard === item.id && (
            <View style={styles.iconsContainer}>
              <View style={styles.iconRow}>
                <Icon name="bathtub" size={20} color="#000" />
                <Text style={styles.iconText}>{item.numberbathrooms}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="king-bed" size={20} color="#000" />
                <Text style={styles.iconText}>{item.numberbedrooms}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="garage" size={20} color="#000" />
                <Text style={styles.iconText}>{item.garage}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="local-parking" size={20} color="#000" />
                <Text style={styles.iconText}>{item.parking ? 'Yes' : 'No'}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="check-circle" size={20} color={item.isVerified ? '#00FF00' : '#FF0000'} />
                <Text style={styles.iconText}>{item.isVerified ? 'Verified' : 'Not Verified'}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="attach-money" size={20} color="#000" />
                <Text style={styles.iconText}>{item.purchaseoption}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="home" size={20} color="#000" />
                <Text style={styles.iconText}>{item.houseAge}</Text>
              </View>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('DetailsScreen', { house: item })}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={houses.slice(0, 5)}
      renderItem={renderHouseItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width - 40}
      snapToAlignment="center"
      decelerationRate="fast"
      contentContainerStyle={styles.featuredListContainer}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: (width / 2) - 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 10,
  },
  cardType: {
    fontSize: 14,
    color: '#888',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: '#FFD700',
    fontSize: 16,
  },
  favoriteButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 5,
    alignSelf: 'flex-start',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardLocation: {
    fontSize: 12,
    color: '#888',
    marginVertical: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  featuredListContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
});

export default FeaturedScroller;
