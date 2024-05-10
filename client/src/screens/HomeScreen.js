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
            const response = await axios.get('http://192.168.103.5:4000/api/house/allhouses');
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
            <Pressable onPress={() => navigation.navigate("Details", { house })}>
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
            <SafeAreaView
                style={{ backgroundColor: COLORS.white, flex: 1 }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={COLORS.white}
                    barStyle='dark-content'
                />
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <EntypoIcon style={{ marginTop: 7, marginRight: 8 }} name="location" size={30} color="gray" />
                        </View>
                        <View>
                            <Text style={{ color: COLORS.gray }}>Location</Text>
                            <Text style={{ color: COLORS.dark, fontSize: 19, fontWeight: 'bold' }}>
                                {location}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={{ marginTop: 7, fontSize: 12, marginRight: 5, textAlign: 'right' }}>Welcome Back</Text>
                            <Text style={{ fontSize: 16, fontweight: 'bold', marginRight: 5, textAlign: 'right', color: COLORS.dark }}   >{PersonName}</Text>
                        </View>
                        <Pressable onPress={() => navigation.navigate("UserProfile")}>
                            <View>
                                <Image source={require("../assets/house1.jpg")} style={styles.profileImage} />
                            </View>
                        </Pressable>
                    </View>
                </View>
                
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                        }}>
                        <View style={styles.searchInputContainer}>
                            <Icon name="search" size={30} color={COLORS.dark} />
                            <TextInput placeholder='Search address, city, location' />
                        </View>

                        <TouchableOpacity 
                        style={styles.sortbtn}
                        onPress={() => navigation.navigate('FilterScreen')}
                        >
                        <Icon name='tune' color={COLORS.white} size={27} />
                    </TouchableOpacity>

                    </View>
                    <ListOptions />
                    <ListCategories />

                    <FlatList
                        contentContainerStyle={{ paddingLeft: 20, marginVertical: 20 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={houses}
                        renderItem={({ item }) => <Card house={item} />}
                    />
                </ScrollView>


            </SafeAreaView>
        );
    };

    const styles = StyleSheet.create({
        header: {
            paddingVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,

        },
        profileImage: {
            height: 50,
            width: 50,
            borderRadius: 25,
        },
        searchInputContainer: {
            backgroundColor: COLORS.light,
            height: 50,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            borderRadius: 10,
        },
        sortbtn: {
            backgroundColor: COLORS.dark,
            height: 50,
            width: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
        },
        optionListContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            paddingHorizontal: 20,
        },
        optionCard: {
            height: 210,
            width: width / 2 - 30,
            elevation: 15,
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
        categoryListContainer: {
            marginTop: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 40,
        },
        categoryListText: {
            fontSize: 16,
            fontWeight: 'bold',
            paddingBottom: 5,
            color: COLORS.gray,
        },
        activeCategoryListText: {
            color: COLORS.dark,
            borderBottomWidth: 2,
            paddingBottom: 5,
        },
        card: {
            height: 320,
            backgroundColor: COLORS.white,
            elevation: 10,
            width: width - 40,
            marginBottom: 20,
            padding: 15,
            borderRadius: 20,
        },
        cardImage: {
            width: '100%',
            height: 200,
            borderRadius: 15,
        },
        facility: {
            flexDirection: 'row',
            marginRight: 15,
        },
        facilityText: {
            marginLeft: 5,
            color: COLORS.gray,
        }


    });

    export default HomeScreen;


