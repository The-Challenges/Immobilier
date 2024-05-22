import React, { useState, useEffect } from 'react';

import {
    StyleSheet, View, FlatList, Text, Alert, ActivityIndicator, TouchableOpacity, Image
  } from 'react-native';


import axios from 'axios';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import COLORS from '../consts/colors';
import { API_AD } from '../../config';
import storage from '../components/Authentification/storage';

import socketserv from '../components/request/socketserv';

const SeeAllLands = ({ navigation }) => {
    const [lands, setLands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [userId, setUserId] = useState(null);
const navigateDetails=(item)=>{
    navigation.navigate('ViewDetailsLand', { land: item ,user ,landId:item.id,userId:item.UserId } )
    socketserv.emit("receiver",item.UserId)
}
    useEffect(() => {
        fetchLands();
        getUserId();
     
    }, [])

    const getUserId = async () => {
      try {
        const userData = await storage.load({ key: 'loginState' });
        console.log(userData)
        setUser(userData.user);
        setUserId(userData.user.userId);
        fetchLands();
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
    }


    const handleFetchError = () => {
        Alert.alert('Error', 'Failed to fetch lands. Please try again later.');
        
    };

    const LandCard = ({ land }) => {
        const isFavorite = favorites.has(land.id);
        const imageUrl = land.Media && land.Media.length > 0 ? land.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
        return (
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>{land.title}</Card.Title>
            <Card.Image source={{ uri: imageUrl }} style={styles.cardImage} />
            <View style={styles.detailContainer}>
              <View style={styles.priceContainer}>
                <Icon name="attach-money" size={24} color={COLORS.green} style={styles.iconStyle}/>
                <Text style={[styles.detailText, { color: COLORS.green }]}>{land.price}</Text>
              </View>
              <Text style={styles.cardType}>{land.TerrainType}</Text>
              <View style={styles.favoriteAndRatingContainer}>
                <TouchableOpacity onPress={() => toggleFavorite(land.id)}>
                  <View style={isFavorite ? styles.favoriteIconSelected : styles.favoriteIcon}>
                    <Icon
                      name={isFavorite ? "favorite" : "favorite-border"}
                      size={24}
                      color={isFavorite ? COLORS.red : COLORS.yellow}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.rating}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{land.rating || '4.5'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
            <Button
                        icon={<Icon name="arrow-right" size={15} color="white" />}
                        title=" View Details"
                        buttonStyle={styles.button}
                        onPress={() =>navigateDetails(land) }
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
      detailText: {
        fontSize: 18,
        fontWeight: '500'
      },
      cardType: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold'
      },
      priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10  // Adjust spacing to other elements
      },
      iconStyle: {
        marginRight: 5  // Reduce space between the icon and the price
      },
      detailText: {
        fontSize: 18,
        fontWeight: '500'
      },
      favoriteIconSelected: {
        backgroundColor: '#FFFFFF'
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
    })

    export default SeeAllLands;
    
