import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, FlatList, Text, Alert, ActivityIndicator, TouchableOpacity, Dimensions, Image
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
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [userId, setUserId] = useState(null);

  const navigateDetails = (item) => {
    navigation.navigate('ViewDetailsLand', { land: item, user, landId: item.id, userId: item.UserId });
    socketserv.emit("receiver", item.UserId);
  };

  useEffect(() => {
    fetchLands();
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

  const toggleFavorite = async (landId) => {
    if (!userId) {
      Alert.alert('Error', 'User ID not set');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_AD}/api/favorite/toggle`, { userId, estateId: landId, type: 'land' });
      setFavorites(prev => {
        const updated = new Set(prev);
        if (updated.has(landId)) {
          updated.delete(landId);
        } else {
          updated.add(landId);
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

  const fetchLands = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_AD}/api/land/all`);
      setLands(response.data);
    } catch (error) {
      handleFetchError();
    } finally {
      setLoading(false);
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
            onPress={() => navigateDetails(house)}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            View Details
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Received')}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            All Requests
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  if (loading) {
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  listContainer: {
    padding: 10
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
});

export default SeeAllLands;