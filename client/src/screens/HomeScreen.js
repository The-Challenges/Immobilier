import React, { useState, useEffect, useRef } from 'react';
import { API_AD } from '../../config';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import storage from '../components/Authentification/storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import axios from 'axios';

const { width } = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pressedCard, setPressedCard] = useState(null);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    if (!loading) {
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
    }
  }, [loading, houses]);

  const fetchHouses = async () => {
    try {
      const response = await axios.get(`${API_AD}/api/house/allhouses`);
      setHouses(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch houses');
      console.error('Failed to fetch houses:', error);
    } finally {
      setLoading(false);
    }
  };

  const ListOptions = () => {
    const optionsList = [
      {
        title: 'See all houses',
        img: require('../assets/villa.jpg'),
        action: () => navigation.navigate('SeeAllHouses'),
      },
      {
        title: 'See all lands',
        img: require('../assets/land2.jpg'),
        action: () => navigation.navigate('SeeAllLands'),
      },
    ];
    return (
      <View style={styles.optionListContainer}>
        {optionsList.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={option.action}
            style={styles.optionCard}
            activeOpacity={0.8} // Improve touchable responsiveness
          >
            <Image source={option.img} style={styles.optionCardImage} />
            <View style={styles.optionCardContent}>
              <Text style={styles.optionCardTitle}>{option.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const toggleCard = (id) => {
    setPressedCard(pressedCard === id ? null : id);
  };

  const renderHouseItem = ({ item }) => (
    <Pressable onPress={() => toggleCard(item.id)}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.Media[0]?.link || 'https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardType}>{item.propertyType}</Text>
            <View style={styles.iconContainer}>
              <View style={styles.rating}>
                <Icon name="star" size={20} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating || '4.5'}</Text>
              </View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Icon name="favorite-border" size={20} color="#FFD700" />
              </TouchableOpacity>
            </View>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" style={styles.searchIcon} />
            <TextInput
              placeholder="Search address, city, location"
              placeholderTextColor="#888"
              style={{ flex: 1 }}
            />
          </View>
          <TouchableOpacity style={styles.sortBtn} onPress={() => navigation.navigate('FilterScreen')}>
            <Icon name="tune" color={COLORS.white} size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationBtn} onPress={() => Alert.alert('Notifications', 'No new notifications')}>
            <Icon name="notifications" color={COLORS.white} size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('ProfileScreen')}>
            <Icon name="person" color={COLORS.white} size={28} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Featured Properties</Text>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
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
        )}

        <ListOptions />

        <Text style={styles.sectionTitle}>All Properties</Text>
        <FlatList
          data={houses}
          key={2} // Add a key prop to force re-render
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderHouseItem}
          contentContainerStyle={styles.listContainer}
          numColumns={2} // Use two columns
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
    color: '#888',
    fontSize: 27,
  },
  sortBtn: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  notificationBtn: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginLeft: 10,
  },
  profileBtn: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginLeft: 10,
  },
  optionListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  optionCard: {
    width: width / 2.3,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  optionCardImage: {
    width: '100%',
    height: 120,
  },
  optionCardContent: {
    padding: 10,
    alignItems: 'center',
  },
  optionCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
  },
  featuredListContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  listContainer: {
    padding: 10,
  },
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
    width: (width / 2) - 20, // Adjust the width of the card for two columns
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120, // Adjust the height of the card image
  },
  cardContent: {
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 14,
    color: '#888',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
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
    // marginLeft:10
  },
  cardPrice: {
    fontSize: 16, // Adjust the font size of the price
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 5,
  },
  cardTitle: {
    fontSize: 16, // Adjust the font size of the title
    fontWeight: 'bold',
  },
  cardLocation: {
    fontSize: 12, // Adjust the font size of the location
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
