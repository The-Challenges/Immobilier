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
// import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get("screen");

const HomeScreen= ({ navigation }) => {
    
    const [houses, setHouses] = useState([]);
    <ListOptions />

    useEffect(() => {
        fetchHouses();
        
    }, []);

    const fetchHouses = async () => {
        try {
            const response = await axios.get('http://192.168.1.3:4000/api/house/allhouses');
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
             img: require('../assets/house1.jpg'),
              action: () => navigation.navigate('SeeAllHouses')
             },

            { title: 'See all lands',
             img: require('../assets/land.jpg'),
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
      placeholderTextColor="#888" // Color for placeholder text
      style={{ flex: 1 }} // Ensures text input uses the remaining space
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
        height: 200,
        width: width / 2  - 30,
        // elevation: 15,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        borderRadius: 10,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    optionCardImage: {
        height: 150,
        borderRadius: 10,
        width: '100%',
    },
    
    
    
    header: {
        flexDirection: 'row', // Aligns the search input and sort button horizontally
        justifyContent: 'space-between', // Spaces out the search input and sort button
        padding: 10,
        backgroundColor: '#f8f8f8', // A light grey background for the header section
      },
    

      searchInputContainer: {
        flex: 1, // Takes up all available space except for what the button needs
        flexDirection: 'row', // Ensures icon aligns with text
        backgroundColor: '#ffffff', // Pure white background for the input
        borderRadius: 25, // Fully rounded ends
        paddingHorizontal: 20, // Horizontal padding for text inside input
        alignItems: 'center', // Centers items vertically
        marginRight: 10, // Adds some margin to the right for spacing from the button
        shadowColor: '#000', // Black color for shadow to create depth
        shadowOffset: { width: 0, height: 10 }, // Position of shadow
        shadowOpacity: 0.1, // Light shadow for subtlety
        shadowRadius: 10, // Smooth shadow edges
        elevation: 3, // Elevation for Android to create shadow effect
        borderWidth: 0.5, // Slight border to define edges
        borderColor: '#ddd', // Soft grey border color
      },

      searchIcon: {
        marginRight: 10, // Space between icon and text
        color: '#888', // Icon color
        fontSize: 27, // Icon size
        
      },
    sortBtn: {
    padding: 10, // Adequate padding for touch area
    backgroundColor: COLORS.primary, // Uses the primary color from your constants
    borderRadius: 25, // Rounded edges
    

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
