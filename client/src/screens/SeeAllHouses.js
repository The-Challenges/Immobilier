import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, Dimensions, StatusBar, FlatList, View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Card, Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import COLORS from '../consts/colors';
import Carousel from 'react-native-snap-carousel';
import storage from '../components/Authentification/storage';
import socketserv from '../components/request/socketserv';

const { width } = Dimensions.get('window');

const SeeAllHouses = ({ navigation }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchHouses(1);
    getUserId();
  }, []);

  const fetchFavorites = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://192.168.1.3:4000/api/favorites/${userId}/house`);
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
      await axios.post(`http://192.168.1.3:4000/api/favorite/toggle`, { userId, estateId: houseId, type: 'house' });
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

  const getUserId = async () => {
    try {
      const userData = await storage.load({ key: 'loginState' });
      setUserId(userData.user.userId);
      fetchFavorites(userData.user.userId);
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
    }
  };

  const fetchHouses = async (page) => {
    if (!hasMore && page !== 1) return;
    setLoadingMore(true);
    try {
      const response = await axios.get(`http://192.168.1.3:4000/api/house/allhouses?page=${page}&limit=20`);
      const fetchedHouses = response.data;
      if (fetchedHouses.length < 20) {
        setHasMore(false);
      }
      setHouses((prevHouses) => [...prevHouses, ...fetchedHouses]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch houses');
      console.error('Failed to fetch houses:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.link }} style={styles.carouselImage} />
    </View>
  );

  const HouseCard = ({ house }) => {
    const isFavorite = favorites.has(house.id);
    const images = house.Media && house.Media.length > 0 ? house.Media : [{ link: 'https://via.placeholder.com/400x200.png?text=No+Image+Available' }];

    return (
      <Card style={styles.card}>
        <Carousel
          data={images}
          renderItem={renderCarouselItem}
          sliderWidth={width - 40}
          itemWidth={width - 40}
          loop
        />
        <Card.Title title={house.title} titleStyle={styles.cardTitle} />
        <Card.Content>
          <View style={styles.detailContainer}>
            <View style={styles.priceContainer}>
              <Icon1 name="dollar" size={21} color={COLORS.green} />
              <Text style={styles.priceText}>{house.price}</Text>
            </View>
            <Text style={styles.cardType}>{house.propertyType}</Text>
            <View style={styles.favoriteAndRatingContainer}>
              <IconButton
                icon={isFavorite ? "heart" : "heart-outline"}
                color={isFavorite ? COLORS.red : COLORS.grey}
                size={24}
                onPress={() => toggleFavorite(house.id)}
              />
              <View style={styles.rating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{house.rating || '4.5'}</Text>
              </View>
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            icon="eye"
            onPress={() => navigateDetails(house)}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            View Details
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const navigateDetails = (house) => {
    navigation.navigate('ViewDetailsHouse', { house });
    socketserv.emit("receiver", house.UserId);
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchHouses(nextPage);
    }
  };

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
        {loadingMore ? (
          <ActivityIndicator size="small" color={COLORS.white} />
        ) : (
          <Text style={styles.loadMoreButtonText}>Load More</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={houses}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => <HouseCard house={item} />}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 10,
  },
  card: {
    margin: 10,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: COLORS.white,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginVertical: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 27,
    fontWeight: '700',
    marginLeft: 5,
    color: COLORS.green,
  },
  cardType: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  favoriteAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  ratingText: {
    marginLeft: 5,
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardActions: {
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    width: '100%',
    height: 250,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  loadMoreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default SeeAllHouses;
