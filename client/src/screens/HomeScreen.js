import React, { useState, useEffect, useRef } from 'react';
import { API_AD } from '../../config';
import { SafeAreaView, StyleSheet, Dimensions, StatusBar, FlatList, ScrollView, Pressable, TextInput, TouchableOpacity, Image, View, Text, Alert, ActivityIndicator } from 'react-native';
import storage from '../components/Authentification/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import axios from 'axios';
import FeaturedScroller from '../components/featuredScroller'; // Adjust the import path as needed
// import PushNotification from 'react-native-push-notification';

// import socket from '../components/request/socketserv'

const { width } = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pressedCard, setPressedCard] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchHouses();
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const userData = await storage.load({ key: 'loginState' });
      console.log(userData);
      // socket.emit('receiver', userData.user.id); // Ensure socket is defined
      setUserId(userData.user.id);
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
    }
  };

  const fetchHouses = async () => {
    try {
      const response = await axios.get(`http://192.168.103.11:4000/api/house/allhouses`);
      setHouses(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch houses');
      console.error('Failed to fetch houses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://192.168.103.11:4000/api/favorites/${userId}/house`);
      const favoriteHouses = new Set(response.data.map(fav => fav.houseId));
      setFavorites(favoriteHouses);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  const toggleFavorite = async (houseId) => {
    if (!userId) {
      Alert.alert('Error', 'User ID not set');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`http://192.168.103.11:4000/api/favorite/toggle`, { userId, estateId: houseId, type: 'house' });
      setFavorites(prev => {
        const updated = new Set(prev);
        if (updated.has(houseId)) {
          updated.delete(houseId);
        } else {
          updated.add(houseId);
        }
        return updated;
      });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      Alert.alert('Error', 'Failed to update favorites');
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
            activeOpacity={0.8}
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

  const renderHouseItem = ({ item }) => {
    const isFavorite = favorites.has(item.id);
    return (
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
                <TouchableOpacity
                  style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Icon name={isFavorite ? "favorite" : "favorite-border"} size={20} color={isFavorite ? COLORS.red : COLORS.yellow} />
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

                  onPress={() => navigation.navigate('viewDetHouse', { house: item })}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

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
          <TouchableOpacity style={styles.favoriteBtn} onPress={() => navigation.navigate('FavoritesScreen')}>
            <Icon name="favorite" color={COLORS.white} size={28} />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Featured Properties</Text>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <FeaturedScroller
            houses={houses}
            navigation={navigation}
            toggleCard={toggleCard}
            pressedCard={pressedCard}
          />
        )}
        <ListOptions />
        <Text style={styles.sectionTitle}>All Properties</Text>
        <FlatList
          data={houses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderHouseItem}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
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
  favoriteBtn: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginLeft: 10,
  },
  sortBtn: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
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
  },
  favoriteButtonActive: {
    backgroundColor: 'white',
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
