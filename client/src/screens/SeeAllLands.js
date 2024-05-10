import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Image,
    Alert,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import axios from 'axios';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/colors';

export default function SeeAllLands({ navigation }) {
    const [lands, setLands] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLands();
    }, []);

    const fetchLands = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://192.168.103.10:4000/api/land/alllands');
            setLands(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Failed to fetch lands');
            console.error("Failed to fetch lands:", error);
        }
    };

    const LandCard = ({ land }) => {
        const imageUrl = land.Media && land.Media.length > 0 ? land.Media[0].link : 'https://via.placeholder.com/400x200.png?text=No+Image+Available';
        return (
            <Card>
                <Card.Title>{land.title}</Card.Title>
                <Card.Image source={{ uri: imageUrl }} style={styles.cardImage} />
                <View style={styles.detailContainer}>
                    <Icon name="cash-multiple" size={20} color={COLORS.green} />
                    <Text style={[styles.detailText, {color: COLORS.green}]}>Price: ${land.price}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Icon name="texture" size={20} color={COLORS.orange} />
                    <Text style={[styles.detailText, {color: COLORS.orange}]}>Size: {land.size} acres</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Icon name="image-area" size={20} color={COLORS.blue} />
                    <Text style={[styles.detailText, {color: COLORS.blue}]}>Terrain Type: {land.terrainType}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Icon name="office-building" size={20} color={COLORS.purple} />
                    <Text style={[styles.detailText, {color: COLORS.purple}]}>Zoning: {land.zoning}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        icon={<Icon name="arrow-right" size={15} color="white" />}
                        title=" View Details"
                        buttonStyle={styles.button}
                        onPress={() => navigation.navigate('LandDetailsScreen', { land })}
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
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
    listContainer: {
        padding: 10
    },
    cardImage: {
        width: '100%',
        height: 200
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        width: '48%'
    },
    allRequestsButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        width: '48%',
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
