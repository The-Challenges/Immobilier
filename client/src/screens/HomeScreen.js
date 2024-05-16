import React, { useState, useEffect, useRef } from 'react';
import { API_AD } from '../../config';
import {SafeAreaView,StyleSheet,Dimensions,StatusBar,FlatList,ScrollView,Pressable,TextInput,TouchableOpacity,Image,View,Text,Alert,ActivityIndicator,
} from 'react-native';
import storage from '../components/Authentification/storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import axios from 'axios';

// import socket from '../components/request/socketserv'


const { width } = Dimensions.get('screen');


const HomeScreen = ({ navigation }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);




  
    useEffect(() => {
        fetchHouses();
        getUserId()
    }, []);
  
    const getUserId = async () => {
        try {
          const userData = await storage.load({ key: 'loginState' });
          console.log(userData)
          socket.emit('receiver', userData.user.id)

        } catch (error) {
          console.error('Failed to retrieve user data:', error);
        }
      };


    



  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= houses.slice(0, 5).length) {
            flatListRef.current.scrollToIndex({ index: 0, animated: true });
            return 0;
          } else {
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
            return nextIndex;
          }
        });
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [loading, houses]);

  const fetchHouses = async () => {
    try {
      const response = await axios.get(`${API_AD}/api/house/allhouses`);
      setHouses(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch houses');
      console.error('Failed to fetch houses:', error);
    } finally {
      setLoading(false);
    }
  };


  const ListOptions = () => {
    const optionsList = [
      {
        title: 'See all houses',
        img: require('../assets/villa.jpg'),
        action: () => navigation.navigate('SeeAllHouses'),
      },
      {
        title: 'See all lands',
        img: require('../assets/land2.jpg'),
        action: () => navigation.navigate('SeeAllLands'),
      },
    ];
    return (
      <View style={styles.optionListContainer}>
        {optionsList.map((option, index) => (
          <TouchableOpacity key={index} onPress={option.action} style={styles.optionCard}>
            <Image source={option.img} style={styles.optionCardImage} />
            <View style={styles.optionCardContent}>
              <Text style={styles.optionCardTitle}>{option.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderHouseItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate('DetailsScreen', { house: item })}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.Media[0]?.link || 'https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796_1280.jpg' }}
          style={styles.cardImage}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.detailText}>Price: ${item.price}</Text>
        <Text style={styles.detailText}>Bedrooms: {item.numberbedrooms}</Text>
        <Text style={styles.detailText}>Bathrooms: {item.numberbathrooms}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
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
            <Icon name="tune" color={COLORS.white} size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationBtn} onPress={() => Alert.alert('Notifications', 'No new notifications')}>
            <Icon name="notifications" color={COLORS.white} size={28} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('ProfileScreen')}>
            <Icon name="person" color={COLORS.white} size={28} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Featured Properties</Text>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={houses.slice(0, 5)}
            renderItem={renderHouseItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={true}
            snapToInterval={width - 40}
            snapToAlignment="center"
            decelerationRate="fast"
            contentContainerStyle={styles.featuredListContainer}
          />
        )}

        <ListOptions />

        <Text style={styles.sectionTitle}>All Properties</Text>
        <FlatList
          data={houses}
          keyExtractor={item => item.id.toString()}
          renderItem={renderHouseItem}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
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
  notificationBtn: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginLeft: 10,
  },
  profileBtn: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginLeft: 10,
  },
  optionListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  optionCard: {
    width: width / 2.3 ,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  optionCardImage: {
    width: '100%',
    height: 120,
  },
  optionCardContent: {
    padding: 10,
    alignItems: 'center',
  },
  optionCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
  },
  featuredListContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  listContainer: {
    padding: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: width - 40,
    marginRight: 20,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default HomeScreen