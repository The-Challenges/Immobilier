import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

const ResultsScreenLand = ({ route, navigation }) => {
  const { lands } = route.params;
  const [pressedCard, setPressedCard] = useState(null);

  const toggleCard = (id) => {
    setPressedCard(pressedCard === id ? null : id);
  };

  const renderLandItem = ({ item }) => (
    <Pressable onPress={() => toggleCard(item.id)}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.Media && item.Media.length > 0 ? item.Media[0].link : 'https://via.placeholder.com/100' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardType}>{item.TerrainType}</Text>
            <View style={styles.rating}>
              <Icon name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating || '4.5'}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Icon name="favorite-border" size={24} color="#FFD700" />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardPrice}>${item.price}</Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardLocation}>Size: {item.size} sqft</Text>
          {pressedCard === item.id && (
            <View style={styles.iconsContainer}>
              <View style={styles.iconRow}>
                <Icon name="terrain" size={20} color="#000" />
                <Text style={styles.iconText}>Terrain Type: {item.TerrainType}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="domain" size={20} color="#000" />
                <Text style={styles.iconText}>Zoning: {item.Zoning}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="area-chart" size={20} color="#000" />
                <Text style={styles.iconText}>Coordinates: Latitude {item.alt}, Longitude {item.long}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="check-circle" size={20} color={item.isVerified ? "#00FF00" : "#FF0000"} />
                <Text style={styles.iconText}>{item.isVerified ? 'Verified' : 'Not Verified'}</Text>
              </View>
              <View style={styles.iconRow}>
                <Icon name="attach-money" size={20} color="#000" />
                <Text style={styles.iconText}>{item.purchaseoption}</Text>
              </View>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('DetailsScreen', { land: item })}
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
    <View style={styles.container}>
      <FlatList
        data={lands}
        keyExtractor={item => item.id.toString()}
        renderItem={renderLandItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
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
});

export default ResultsScreenLand;
