import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import COLORS from '../consts/colors';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import storage from '../components/Authentification/storage';  // Ensure path correctness

const { width } = Dimensions.get("window");

const SeeAllHouses = ({ navigation }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const userData = await storage.load({ key: 'loginState' });
        setUserId(userData.user.userId);
        fetchHouses();
        fetchFavorites(userData.user.userId);
      } catch (error) {
        console.error('Error loading user data:', error);
        Alert.alert('Error', 'Unable to load user data');
      }
    };

    initializeData();

    // Adding focus listener to refresh favorites when returning to the screen
    const unsubscribe = navigation.addListener('focus', () => {
      if (userId) {
        fetchFavorites(userId);
      }
    });

    // Cleanup on unmount
    return unsubscribe;
  }, [navigation, userId]);

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.103.20:4000/api/house/allhouses');
      setHouses(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch houses');
      console.error("Failed to fetch houses:", error);
    }
  };

  const fetchFavorites = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://192.168.103.20:4000/api/favorites/${userId}/house`);
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
      await axios.post(`http://192.168.103.20:4000/api/favorite/toggle`, { userId, estateId: houseId, type: 'house' });
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
    }
    setLoading(false);
  };

  const HouseCard = ({ house }) => {
    const isFavorite = favorites.has(house.id);
    const imageUrl = house.Media && house.Media.length > 0 ? house.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
    return (
      <Card containerStyle={styles.card}>
        <Card.Title>{house.title}</Card.Title>
        <Card.Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <View style={styles.detailContainer}>
          <Icon name="attach-money" size={20} color={COLORS.green} />
          <Text style={[styles.detailText, { color: COLORS.green }]}>Price: ${house.price}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(house.id)}>
            <View style={[styles.favoriteIconContainer, isFavorite && styles.favoriteIconSelected]}>
              <Icon name="favorite" size={20} color={isFavorite ? COLORS.red : COLORS.grey} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>
          <Icon name="bed" size={20} color={COLORS.blue} />
          <Text style={[styles.detailText, { color: COLORS.blue }]}>Bedrooms: {house.numberbedrooms}</Text>
          <Icon name="shower" size={20} color={COLORS.purple} />
          <Text style={[styles.detailText, { color: COLORS.purple }]}>Bathrooms: {house.numberbathrooms}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon={<Icon name="arrow-forward" size={15} color="white" />}
            title=" View Details"
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('DetailsScreen', { house })}
          />
          <TouchableOpacity style={styles.allRequestsButton} onPress={() => navigation.navigate('Received')}>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.white} barStyle='dark-content' />
      <FlatList
        data={houses}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <HouseCard house={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: width * 0.03
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
    marginLeft: 170, // Adds space between the text and the icon
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

export default SeeAllHouses;
