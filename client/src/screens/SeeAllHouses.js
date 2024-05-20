import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, StatusBar, FlatList, View, Text, Image, Alert, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const SeeAllHouses = ({ navigation }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pressedCard, setPressedCard] = useState(null);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.103.18:4000/api/house/allhouses`);
      setHouses(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch houses');
      console.error('Failed to fetch houses:', error);
    }
  };

  const toggleCard = (id) => {
    setPressedCard(pressedCard === id ? null : id);
  };

  const toggleFavorite = (houseId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [houseId]: !prevFavorites[houseId],
    }));
  };

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
    const imageUrl = house.Media && house.Media.length > 0 ? house.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
    const isFavorite = favorites[house.id];

    return (
      <TouchableOpacity onPress={() => toggleCard(house.id)} style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardType}>{house.propertyType}</Text>
            <View style={styles.rating}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{house.rating || '4.5'}</Text>
            </View>
            <View>
              <TouchableWithoutFeedback
                onPress={(e) => {
                  e.stopPropagation();
                  toggleFavorite(house.id);
                }}
              >
                <View style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}>
                  <Icon name={isFavorite ? "favorite" : "favorite-border"} size={40} color={isFavorite ? "#FF0000" : "#FFD700"} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <Text style={styles.cardPrice}>${house.price}/month</Text>
          <Text style={styles.cardTitle}>{house.title}</Text>
          <Text style={styles.cardLocation}>{house.location}</Text>
          {pressedCard === house.id && (
            <View style={styles.iconsContainer}>
              <View style={styles.iconRow}>
                <Icon name="bathtub" size={20} color="#000" />
                <Text style={styles.iconText}>{house.numberbathrooms}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="king-bed" size={20} color="#000" />
                <Text style={styles.iconText}>{house.numberbedrooms}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="garage" size={20} color="#000" />
                <Text style={styles.iconText}>{house.garage}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="local-parking" size={20} color="#000" />
                <Text style={styles.iconText}>{house.parking ? 'Yes' : 'No'}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="check-circle" size={20} color={house.isVerified ? "#00FF00" : "#FF0000"} />
                <Text style={styles.iconText}>{house.isVerified ? 'Verified' : 'Not Verified'}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="attach-money" size={20} color="#000" />
                <Text style={styles.iconText}>{house.purchaseoption}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="home" size={20} color="#000" />
                <Text style={styles.iconText}>{house.houseAge}</Text>
              </View>
              {renderIconRow(house.Indoors, indoorIcons)}
              {renderIconRow(house.Outdoors, outdoorIcons)}
              {renderIconRow(house.Climates, climateIcons)}
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('DetailsScreen', { house })}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
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
  listContainer: {
    padding: width * 0.03,
  },
  card: {
    borderRadius: 10,
    elevation: 4,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 8,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 240,
  },
  ratingText: {
    marginLeft: 5,
    color: '#FFD700',
    fontSize: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: -10,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 5,
    marginTop: 37,
  },
  favoriteButtonActive: {
    backgroundColor: '#FFD700',
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardLocation: {
    fontSize: 14,
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});

export default SeeAllHouses;
