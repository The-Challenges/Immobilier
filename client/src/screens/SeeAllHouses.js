import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, StatusBar, FlatList, View, Text, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Updated import
import storage from '../components/Authentification/storage'; // Ensure path correctness
import { Card, Button } from 'react-native-elements';
import socketserv from '../components/request/socketserv';


const { width } = Dimensions.get('window');

const SeeAllHouses = ({ navigation }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const [favorites, setFavorites] = useState(new Set());
  const navigateDetails=(house)=>{
    navigation.navigate('ViewDetailsHouse', { house: house ,user ,houseId:house.id,userId:house.UserId } )
    socketserv.emit("receiver",house.UserId)
}

  useEffect(() => {
    fetchHouses();
    getUserId()
  }, []);


  const fetchFavorites = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`${API_AD}/api/favorites/${userId}/house`);
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
      await axios.post(`${API_AD}/api/favorite/toggle`, { userId, estateId: houseId, type: 'house' });
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
      console.log(userData)
      setUser(userData.user.userId);
      fetchFavorites(userData.user.userId);
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
    }
  };

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.11.62:4000/api/house/allhouses');
      setHouses(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch houses');
      console.error('Failed to fetch houses:', error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchFavorites = async (userId) => {
  //   if (!userId) return;
  //   try {
  //     const response = await axios.get(`http://192.168.103.20:4000/api/favorites/${userId}/house`);
  //     const favoriteHouses = new Set(response.data.map(fav => fav.houseId));
  //     setFavorites(favoriteHouses);
  //   } catch (error) {
  //     console.error('Failed to fetch favorites:', error);
  //   }
  // };

  // const toggleFavorite = async (houseId) => {
  //   if (!userId) {
  //     Alert.alert('Error', 'User ID not set');
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     await axios.post(`http://192.168.103.20:4000/api/favorite/toggle`, { userId, estateId: houseId, type: 'house' });
  //     setFavorites(prev => {
  //       const updated = new Set(prev);
  //       if (updated.has(houseId)) {
  //         updated.delete(houseId);
  //       } else {
  //         updated.add(houseId);
  //       }
  //       return updated;
  //     });
  //   } catch (error) {
  //     console.error("Failed to toggle favorite:", error);
  //     Alert.alert('Error', 'Failed to update favorites');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const indoorIcons = {
    Broadband: 'wifi',
    Workshop: 'build',
    'Rumpus room': 'room',
    'Built in robe': 'wardrobe',
    FloorBoards: 'layers',
    Ensuite: 'bath',
    'Alarm System': 'alarm',
    Study: 'book',
    Gym: 'fitness-center',
  };

  const outdoorIcons = {
    Balcony: 'balcony',
    'Fully fenced': 'fence',
    'Swimming pool': 'pool',
    'Undercover parking': 'local-parking',
    'Outdoor spa': 'spa',
    'Outdoor area': 'park',
    Shed: 'store',
    Garage: 'garage',
  };



  const climateIcons = {
    // Add climate icon mappings here
  };

  const renderIconRow = (options, iconMapping) => (
    options.map((option, index) => (
      <View key={index} style={styles.iconRow}>
        <Icon name={iconMapping[option.options] || 'home'} size={20} color="#000" />
        <Text style={styles.iconText}>{option.options}</Text>
      </View>
    ))
  );

  const HouseCard = ({ house }) => {
    const isFavorite = favorites.has(house.id);
    const imageUrl = house.Media && house.Media.length > 0 ? house.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
    return (
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>{house.title}</Card.Title>
        <Card.Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <View style={styles.detailContainer}>
          <View style={styles.priceContainer}>
            <Icon name="attach-money" size={24} color={COLORS.green} style={styles.iconStyle} />
            <Text style={[styles.detailText, { color: COLORS.green }]}>{house.price}</Text>
          </View>
          <Text style={styles.cardType}>{house.TerrainType}</Text>
          <View style={styles.favoriteAndRatingContainer}>
            <TouchableOpacity onPress={() => toggleFavorite(house.id)}>
              <Icon
                name={isFavorite ? "favorite" : "favorite-border"}
                size={24}
                color={isFavorite ? COLORS.red : COLORS.yellow}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
            <View style={styles.rating}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{house.rating || '4.5'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
        <Button
            icon={<Icon name="arrow-right" size={15} color="white" />}
            title="View Details"
            buttonStyle={styles.button}
            onPress={() =>navigateDetails(house) }
          />
          <TouchableOpacity style={styles.allRequestsButton} onPress={() => navigation.navigate('Received')}>
            <Text style={styles.allRequestsText}>All Requests</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };


return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      <FlatList
        data={houses}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <HouseCard house={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  listContainer: {
    padding: 20
  },
  card: {
    borderRadius: 15,
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    marginVertical: 10,
    backgroundColor: COLORS.white
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark
  },
  cardImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 10
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 2,  // Adjust this value to control space between the dollar sign and the price
  },
  cardType: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  iconStyle: {
    marginRight: 5
  },
  favoriteIcon: {
    margin: 8
  },
  favoriteAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  ratingText: {
    marginLeft: 5,
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 120,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  allRequestsButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 120,
    height: 35,
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
