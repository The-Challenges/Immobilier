import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import axios from 'axios';
import COLORS from '../consts/colors';
import storage from '../components/Authentification/storage'; 
import { API_AD } from '../../config';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserIdAndFavorites = async () => {
      try {
        const userData = await storage.load({ key: 'loginState' });
        setUserId(userData.user.userId);
        fetchFavorites(userData.user.userId);
      } catch (error) {
        console.error('Error loading user data:', error);
        Alert.alert('Error', 'Unable to load user data');
      }
    };

    fetchUserIdAndFavorites();
  }, []);

  const fetchFavorites = async (userId) => {
    if (!userId) return; // Ensure we have a user ID before attempting to fetch
    setLoading(true);
    try {
      const [houseResponse, landResponse] = await Promise.all([
        axios.get(`http://192.168.11.234:4000/api/favorites/${userId}/house`),
        axios.get(`http://192.168.11.234:4000/api/favorites/${userId}/land`)
      ]);
      setFavorites([...houseResponse.data, ...landResponse.data]); // Combine house and land favorites
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      Alert.alert('Error', 'Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const imageUrl = item.Media && item.Media.length > 0 ? item.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('DetailsScreen', { estate: item, type: item.type })}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>Price: ${item.price}</Text>
        </View>
      </TouchableOpacity>
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
    <FlatList
      data={favorites}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}-${item.type}`}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  }
});


export default FavoritesScreen;
