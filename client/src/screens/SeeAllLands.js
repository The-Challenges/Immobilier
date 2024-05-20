import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/colors';
import storage from '../components/Authentification/storage'; // Ensure the path to your storage module is correct

export default function SeeAllLands({ navigation }) {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const userData = await storage.load({ key: 'loginState' });
        setUserId(userData.user.userId);
        fetchLands();
        fetchFavorites(userData.user.userId);
      } catch (error) {
        console.error('Error loading user data:', error);
        Alert.alert('Error', 'Unable to load user data');
      }
    };

    initializeData();
  }, []);

  const fetchLands = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.103.20:4000/api/land/all');
      setLands(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch lands');
      console.error("Failed to fetch lands:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://192.168.103.20:4000/api/favorites/${userId}/land`);
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
      await axios.post(`http://192.168.103.20:4000/api/favorite/toggle`, { userId, estateId: landId, type: 'land' });
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

  const LandCard = ({ land }) => {
    const isFavorite = favorites.has(land.id);
    const imageUrl = land.Media && land.Media.length > 0 ? land.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
    return (
      <Card containerStyle={styles.card}>
        <Card.Title>{land.title}</Card.Title>
        <Card.Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <View style={styles.detailContainer}>
          <Icon name="cash-multiple" size={20} color={COLORS.green} />
          <Text style={[styles.detailText, {color: COLORS.green}]}>Price: ${land.price}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(land.id)}>
            <View style={[styles.favoriteIconContainer, isFavorite && styles.favoriteIconSelected]}>
              <Icon name="heart" size={20} color={isFavorite ? COLORS.red : COLORS.grey} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon={<Icon name="arrow-right" size={15} color="white" />}
            title=" View Details"
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('LandDetailsScreen', { land })}
          />
          <TouchableOpacity style={styles.allRequestsButton} onPress={() => navigation.navigate('requestreceivedlands')}>
            <Text style={styles.allRequestsText}>All Requests</Text>
          </TouchableOpacity>
        </View>
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
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
    listContainer: {
        padding: 10
    },
    card: {
        borderRadius: 10,
        elevation: 4,
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        marginVertical: 8
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    detailText: {
        marginLeft: 10,
        fontSize: 16
    },
    favoriteIconContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: 5,
        borderWidth: 1,
        borderColor: COLORS.grey,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 170,
        marginTop:10
      },
    favoriteIconSelected: {
        borderColor: COLORS.red,
        backgroundColor: '#ffebee'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    allRequestsButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    allRequestsText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    }
});
