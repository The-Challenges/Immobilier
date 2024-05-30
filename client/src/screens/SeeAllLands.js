import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet, View, FlatList, Text, Alert, ActivityIndicator, Dimensions, Image, TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { Card, Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';
import COLORS from '../consts/colors';
import storage from '../components/Authentification/storage';
import socketserv from '../components/request/socketserv';
import { API_AD } from '../../config';

const { width } = Dimensions.get('window');

const SeeAllLands = ({ navigation }) => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigateDetails = (item) => {
    navigation.navigate('viewDetLand', { land: item, user, landId: item.id, userId: item.UserId });
    socketserv.emit("receiver", item.UserId);
  };

  useEffect(() => {
    fetchLands(1);
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const userData = await storage.load({ key: 'loginState' });
      setUser(userData.user);
      setUserId(userData.user.userId);
      fetchFavorites(userData.user.userId);
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
    }
  };

  const fetchFavorites = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`${API_AD}/api/favorites/${userId}/land`);
      const favoriteLands = new Set(response.data.map(fav => fav.landId));
      setFavorites(favoriteLands);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  const toggleFavorite = useCallback(async (landId) => {
    if (!userId) {
      Alert.alert('Error', 'User ID not set');
      return;
    }
    try {
      await axios.post(`${API_AD}/api/favorite/toggle`, { userId, estateId: landId, type: 'land' });
      setFavorites((prevFavorites) => {
        const updatedFavorites = new Set(prevFavorites);
        if (updatedFavorites.has(landId)) {
          updatedFavorites.delete(landId);
        } else {
          updatedFavorites.add(landId);
        }
        return updatedFavorites;
      });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      Alert.alert('Error', 'Failed to update favorites');
    }
  }, [userId, favorites]);
  const fetchLands = async (page) => {
    if (!hasMore && page !== 1) return;
    setLoading(page === 1);
    setLoadingMore(page !== 1)
    try {
      const response = await axios.get(`${API_AD}/api/land/all?page=${page}&limit=15`);
      const fetchedLands = response.data;
      if (fetchedLands.length < 15) {
        setHasMore(false);
      }
      setLands((prevLands) => page === 1 ? fetchedLands : [...prevLands, ...fetchedLands]);
    } catch (error) {
      handleFetchError();
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleFetchError = () => {
    Alert.alert('Error', 'Failed to fetch lands. Please try again later.');
  };

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.link }} style={styles.carouselImage} />
    </View>
  );

  const LandCard = ({ land }) => {
    const isFavorite = favorites.has(land.id);
    const images = land.Media && land.Media.length > 0 ? land.Media : [{ link: 'https://via.placeholder.com/400x200.png?text=No+Image+Available' }];

    return (
      <Card style={styles.card}>
        <Carousel
          data={images}
          renderItem={renderCarouselItem}
          sliderWidth={width - 40}
          itemWidth={width - 40}
          loop
        />
        <Card.Title title={land.title} titleStyle={styles.cardTitle} />
        <Card.Content>
          <View style={styles.detailContainer}>
            <View style={styles.priceContainer}>
              <Icon1 name="dollar" size={21} color={COLORS.green} />
              <Text style={styles.priceText}>{land.price}</Text>
            </View>
            <Text style={styles.cardType}>{land.TerrainType}</Text>
            <View style={styles.favoriteAndRatingContainer}>
              <IconButton
                icon={isFavorite ? "heart" : "heart-outline"}
                color={isFavorite ? COLORS.red : COLORS.grey}
                size={24}
                onPress={() => toggleFavorite(land.id)}
              />
              <View style={styles.rating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{land.rating || '4.5'}</Text>
              </View>
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            icon="eye"
            onPress={() => navigateDetails(land)}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            View Details
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchLands(nextPage);
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

  if (loading && page === 1) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lands}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <LandCard land={item} />}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={renderFooter}
      />
    </View>
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
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 5,
    color: COLORS.green,
  },
  cardType: {
    fontSize: 24,
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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

export default SeeAllLands;
