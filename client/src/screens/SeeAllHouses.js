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
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import COLORS from '../consts/colors';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get("window");

const SeeAllHouses = ({ navigation }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.103.5:4000/api/house/allhouses');
      setHouses(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch houses');
      console.error("Failed to fetch houses:", error);
    }
  };

  const HouseCard = ({ house }) => {
    const imageUrl = house.Media && house.Media.length > 0 ? house.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
    return (
      <Card containerStyle={styles.card}>
        <Card.Title>{house.title}</Card.Title>
        <Card.Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <View style={styles.detailContainer}>
          <Icon name="cash-multiple" size={20} color={COLORS.green} />
          <Text style={[styles.detailText, {color: COLORS.green}]}>Price: ${house.price}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Icon name="bed-empty" size={20} color={COLORS.blue} />
          <Text style={[styles.detailText, {color: COLORS.blue}]}>Bedrooms: {house.numberbedrooms}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Icon name="shower" size={20} color={COLORS.purple} />
          <Text style={[styles.detailText, {color: COLORS.purple}]}>Bathrooms: {house.numberbathrooms}</Text>
        </View>
        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          title=" View Details"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('DetailsScreen', { house })}
        />
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
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={COLORS.dark} />
      </TouchableOpacity>
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
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 5
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 10  // Ensure it's clickable over other elements if necessary
  }
});

export default SeeAllHouses;
