import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

const ResultsScreen = ({ route, navigation }) => {
  const { houses } = route.params;
  const [pressedCard, setPressedCard] = useState(null);

  const toggleCard = (id) => {
    setPressedCard(pressedCard === id ? null : id);
  };

  const getIconForOption = (option) => {
    switch (option) {
      case 'Rumpus room': return 'room';
      case 'Study': return 'book';
      case 'Ensuite': return 'bath';
      case 'Workshop': return 'build';
      default: return 'home';
    }
  };

  const renderHouseItem = ({ item }) => (
    <Pressable onPress={() => toggleCard(item.id)}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.Media[0]?.link || 'https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg' }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardType}>{item.propertyType}</Text>
            <View style={styles.rating}>
              <Icon name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating || '4.5'}</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Icon name="favorite-border" size={24} color="#FFD700" />
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
                <Icon name="check-circle" size={20} color={item.isVerified ? "#00FF00" : "#FF0000"} />
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
              {/* Render Indoor Options */}
              {item.Indoors && item.Indoors.map((indoorOption, index) => (
                <View style={styles.iconRow} key={index}>
                  <Icon name={getIconForOption(indoorOption.options)} size={20} color="#000" />
                  <Text style={styles.iconText}>{indoorOption.options}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('DetailsScreen', { house: item })}
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
        data={houses}
        keyExtractor={item => item.id.toString()}
        renderItem={renderHouseItem}
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default ResultsScreen;
