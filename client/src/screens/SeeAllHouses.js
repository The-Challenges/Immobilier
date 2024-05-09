import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  View,
  Text,
  Image,
  Alert,
  Pressable
} from 'react-native';
import axios from 'axios';
import COLORS from '../consts/colors';

const { width } = Dimensions.get("screen");

const SeeAllHouses = ({ navigation }) => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:4000/api/house/allhouses');
      setHouses(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch houses');
      console.error("Failed to fetch houses:", error);
    }
  };

  const HouseCard = ({ house }) => {
    const imageUrl = house.Media && house.Media.length > 0 ? house.Media[0].link : 'default_image_url';
    return (
      <Pressable onPress={() => navigation.navigate('DetailsScreen', { house })}>
        <View style={styles.card}>
          <Image source={{ uri: imageUrl }} style={styles.cardImage} />
          <Text style={styles.title}>{house.title}</Text>
          <Text style={styles.detailText}>Price: ${house.price}</Text>
          <Text style={styles.detailText}>Bedrooms: {house.numberbedrooms}</Text>
          <Text style={styles.detailText}>Bathrooms: {house.numberbathrooms}</Text>
        </View>
      </Pressable>
    );
  };

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
    padding: 10
  },
  card: {
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: width - 20,
    alignSelf: 'center'
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5
  }
});

export default SeeAllHouses;
