import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Pressable,
    Alert
} from 'react-native';
import axios from 'axios';
import COLORS from '../consts/colors';

export default function SeeAllLands({ navigation }) {
    const [lands, setLands] = useState([]);

    useEffect(() => {
        fetchLands();
    }, []);
    
    const fetchLands = async () => {
      try {
        const response = await axios.get('http://192.168.1.3:4000/api/land/alllands');
        console.log("Lands fetched:", response.data);
        setLands(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch lands');
            console.error("failed to fetch lands:", error);
          }
        };
        
        const LandCard = ({ land }) => {
          const imageUrl = land.Media && land.Media.length > 0 ? land.Media[0].link : 'https://via.placeholder.com/200';
          console.log("land details:", land)

          console.log("image url:", imageUrl)
          
          return (
            <Pressable onPress={() => navigation.navigate("LandDetailsScreen", { land })}>
                <View style={styles.card}>
                    <Image source={{ uri: imageUrl }} style={styles.cardImage} />
                    <Text style={styles.title}>{land.title}</Text>
                    <Text style={styles.detailText}>Price: ${land.price}</Text>
                    <Text style={styles.detailText}>Size: {land.size} acres</Text>
                    <Text style={styles.detailText}>Terrain Type: {land.TerrainType}</Text>
                    <Text style={styles.detailText}>Zoning: {land.Zoning}</Text>
                </View>
            </Pressable>
        );
    };

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
        padding: 10,
        backgroundColor: COLORS.white
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
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
    },
    listContainer: {
        paddingBottom: 20
    }
});
