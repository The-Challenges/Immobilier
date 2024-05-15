import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Alert, ActivityIndicator } from 'react-native';
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
const navigateDetails=(item)=>{
    navigation.navigate('ViewDetailsLand', { land: item ,user ,landId:item.id,userId:item.UserId } )
    socketserv.emit("receiver",item.UserId)
}
    useEffect(() => {
        fetchLands();
        getUserId();
     
    }, []);

    const getUserId = async () => {
      try {
        const userData = await storage.load({ key: 'loginState' });
        console.log(userData)
        setUser(userData.user);
      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      }
    };
   
    const fetchLands = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_AD}/api/land/alllands`);
            setLands(response.data);

        } catch (error) {
            handleFetchError();
        } finally {
            setLoading(false);
        }
    };

    const handleFetchError = () => {
        Alert.alert('Error', 'Failed to fetch lands. Please try again later.');
        // Additional error handling logic can be added here
    };

    const renderLandCard = ({ item }) => {
        const imageUrl = item.Media && item.Media.length > 0 ? item.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
        return (
            <Card>
                <Card.Title>{item.title}</Card.Title>
                <Card.Image source={{ uri: imageUrl }} style={styles.cardImage} />
                <LandDetailIcon icon="cash-multiple" color={COLORS.green} text={`Price: $${item.price}`} />
                <LandDetailIcon icon="texture" color={COLORS.orange} text={`Size: ${item.size} acres`} />
                <LandDetailIcon icon="image-area" color={COLORS.blue} text={`Terrain Type: ${item.TerrainType}`} />
                <LandDetailIcon icon="office-building" color={COLORS.purple} text={`Zoning: ${item.Zoning}`} />
                <LandDetailIcon icon="office-building" color={COLORS.purple} text={`purchaseoption: ${item.purchaseoption}`} />


                <Button
                    icon={<Icon name="arrow-right" size={15} color="white" />}
                    title=" View Details"
                    buttonStyle={styles.button}
                    onPress={() =>navigateDetails(item) }
                />
            </Card>
        );
    };

    const LandDetailIcon = ({ icon, color, text }) => (
        <View style={styles.detailContainer}>
            <Icon name={icon} size={20} color={color} />
            <Text style={[styles.detailText, { color }]}>{text}</Text>
        </View>
    );

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
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderLandCard}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

SeeAllLands.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailText: {
        marginLeft: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
});

export default SeeAllLands;
