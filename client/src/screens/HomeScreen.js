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

const HomeScreen= ({ navigation }) => {
    
    const [houses, setHouses] = useState([]);
    <ListOptions />

    useEffect(() => {
        fetchHouses();
        
    }, []);

    const fetchHouses = async () => {
        try {
            const response = await axios.get('http://192.168.103.10:4000/api/house/allhouses');
            console.log("Houses fetched:", response.data);
            setHouses(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch houses');
            console.error("Failed to fetch houses:", error);
        }
    };

    const ListOptions = () => {
        const optionsList = [
            { title: 'See all houses',
             img: require('../assets/villa.jpg'),
              action: () => navigation.navigate('SeeAllHouses')
             },

            { title: 'See all lands',
             img: require('../assets/land2.jpg'),
             action: () => navigation.navigate('SeeAllLands')
            },
        ];
        return (
            <View style={styles.optionListContainer}>
                {optionsList.map((option, index) => (
                    <TouchableOpacity key={index} onPress={option.action}>
                        <View style={styles.optionCard}>
                            <Image source={option.img} style={styles.optionCardImage} />
                            <Text style={{ marginTop: 11, fontSize: 18, fontWeight: 'bold', color: COLORS.dark }}>
                                {option.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }


    

    const Card = ({ house }) => {
        const imageUrl = house.Media && house.Media.length > 0 ? house.Media[0].link : 'https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg';
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
            <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.header}>
  <View style={styles.searchInputContainer}>
    <Icon name="search" style={styles.searchIcon} />
    <TextInput
      placeholder="Search address, city, location"
      placeholderTextColor="#888" 
      style={{ flex: 1 }} 
    />
  </View>
  <TouchableOpacity style={styles.sortBtn} onPress={() => navigation.navigate('FilterScreen')}>
    <Icon name='tune' color={COLORS.white} size={28} />
  </TouchableOpacity>
</View>


                <ListOptions />

                
                <FlatList
                    data={houses}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Card house={item} />}
                    contentContainerStyle={styles.listContainer}
                />
            </ScrollView>

        </SafeAreaView>
    );
    
};

const styles = StyleSheet.create({
    optionListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 23,
        paddingHorizontal: 20,
    },
    optionCard: {
        height: 180, 
        width: width / 2 - 40, 
        backgroundColor: COLORS.white,
        alignItems: 'center',
        borderRadius: 10,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    optionCardImage: {
        height: 110,
        borderRadius: 10,
        width: '120%',
    },
    
    
    
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#f8f8f8', 
      },
    

      searchInputContainer: {
        flex: 1, 
        flexDirection: 'row', 
        backgroundColor: '#ffffff', 
        borderRadius: 25, 
        paddingHorizontal: 20, 
        alignItems: 'center', 
        marginRight: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1, 
        shadowRadius: 10, 
        elevation: 3,
        borderWidth: 0.5, 
        borderColor: '#ddd', 
      },

      searchIcon: {
        marginRight: 10,
        color: '#888', 
        fontSize: 27,
        
      },
    sortBtn: {
    padding: 10, 
    backgroundColor: COLORS.primary, 
    borderRadius: 25,
    

  },
    navigationContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    navButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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