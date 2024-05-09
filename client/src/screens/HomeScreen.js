import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    StatusBar,
    FlatList,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
    Image,
    View,
    Text,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import axios from 'axios';

const { width } = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
    const [houses, setHouses] = useState([]);

    

    useEffect(() => {
        fetchHouses();
    }, []);

    const fetchHouses = async () => {
        try {
            const response = await axios.get('http://192.168.103.5:4000/api/house/allhouses');
            console.log("Houses fetched:", response.data);
            setHouses(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch houses');
            console.error("Failed to fetch houses:", error);
        }
    };
    

    const Card = ({ house }) => {
        const imageUrl = house.Media && house.Media.length > 0 ? house.Media[0].link : 'default_image_url';
        return (
            <Pressable onPress={() => navigation.navigate("DetailsScreen", { house })}>
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
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search address, city, location'
                />
                <TouchableOpacity style={styles.sortBtn} onPress={() => navigation.navigate('FilterScreen')}>
                    <Icon name='tune' color={COLORS.white} size={28} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={houses}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => <Card house={item} />}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.light
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        paddingLeft: 10,
        fontSize: 16,
        borderRadius: 10,
    },
    sortBtn: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 10,
    },
    listContainer: {
        padding: 10
    },
    card: {
        elevation: 2,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
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

export default HomeScreen;
