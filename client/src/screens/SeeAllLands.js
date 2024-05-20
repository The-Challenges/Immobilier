import React, { useState, useEffect } from 'react';
import { API_AD } from '../../config';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Image,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/colors';

const { width } = Dimensions.get('window');

export default function SeeAllLands({ navigation }) {
    const [lands, setLands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pressedCard, setPressedCard] = useState(null);
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        fetchLands();
    }, []);

    const fetchLands = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_AD}/api/land/alllands`);
            setLands(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Failed to fetch lands');
            console.error("Failed to fetch lands:", error);
        }
    };

    const toggleCard = (id) => {
        setPressedCard(pressedCard === id ? null : id);
    };

    const toggleFavorite = (landId) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [landId]: !prevFavorites[landId],
        }));
    };

    const LandCard = ({ land }) => {
        const imageUrl = land.Media && land.Media.length > 0 ? land.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
        const isFavorite = favorites[land.id];
        return (
            <TouchableOpacity onPress={() => toggleCard(land.id)} style={styles.card}>
                <Image source={{ uri: imageUrl }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardType}>{land.TerrainType}</Text>
                        <View style={styles.rating}>
                            <Icon name="star" size={16} color="#FFD700" />
                            <Text style={styles.ratingText}>{land.rating || '4.5'}</Text>
                        </View>
                        <View>
                        <TouchableOpacity
                            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
                            onPress={(e) => {
                                e.stopPropagation();
                                toggleFavorite(land.id);
                            }}
                        >
                            <Icon name="heart-outline" size={24} color="#FFD700" />
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                    <Text style={styles.cardPrice}>${land.price}</Text>
                    <Text style={styles.cardTitle}>{land.title}</Text>
                    <Text style={styles.cardLocation}>{land.location}</Text>
                    {pressedCard === land.id && (
                        <View style={styles.iconsContainer}>
                            <View style={styles.iconRow}>
                                <Icon name="cash-multiple" size={20} color={COLORS.green} />
                                <Text style={[styles.iconText, { color: COLORS.green }]}>Price: ${land.price}</Text>
                            </View>
                            <View style={styles.iconRow}>
                                <Icon name="ruler-square" size={20} color={COLORS.blue} />
                                <Text style={[styles.iconText, { color: COLORS.blue }]}>Size: {land.size} acres</Text>
                            </View>
                            <View style={styles.iconRow}>
                                <Icon name="image-area" size={20} color={COLORS.orange} />
                                <Text style={[styles.iconText, { color: COLORS.orange }]}>Terrain Type: {land.TerrainType}</Text>
                            </View>
                            <View style={styles.iconRow}>
                                <Icon name="office-building" size={20} color={COLORS.purple} />
                                <Text style={[styles.iconText, { color: COLORS.purple }]}>Zoning: {land.Zoning}</Text>
                            </View>
                            <View style={styles.iconRow}>
                                <Icon name="check-circle" size={20} color={land.isVerifie ? COLORS.green : COLORS.red} />
                                <Text style={[styles.iconText, { color: land.isVerifie ? COLORS.green : COLORS.red }]}>
                                    {land.isVerifie ? 'Verified' : 'Not Verified'}
                                </Text>
                            </View>
                            <View style={styles.iconRow}>
                                <Icon name="handshake" size={20} color={COLORS.brown} />
                                <Text style={[styles.iconText, { color: COLORS.brown }]}>Purchase Option: {land.purchaseoption}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.detailsButton}
                                onPress={() => navigation.navigate('LandDetailsScreen', { land })}
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
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <FlatList
                data={lands}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => <LandCard land={item} />}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

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
        // left:135
        marginLeft:240


    },
    ratingText: {
        marginLeft: 5,
        color: '#FFD700',
        fontSize: 14,
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
