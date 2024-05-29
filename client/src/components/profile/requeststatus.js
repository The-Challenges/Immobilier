import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_AD } from '../../../config';
import storage from '../Authentification/storage';

const RequestStatus = ({ request, image }) => {
  const navigation = useNavigation();

  const getStatusColor = () => {
    switch (request.status) {
      case 'Confirmed': return '#4CAF50';
      case 'Rejected': return '#F44336';
      default: return '#2196F3'; 
    }
  };

  return (
    <Card style={styles.statusCard}>
      <Card.Cover source={{ uri: image }} style={styles.statusImage} />
      <LinearGradient colors={['#ffffff', '#e6e6e6']} style={styles.statusGradient}>
        <Card.Content>
          <Text style={styles.prefaceTitle}>Your request for:</Text>
          <Text style={styles.statusTitle}>House ID: {request.houseId}</Text>
          <View style={styles.statusFooter}>
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {request.status}
            </Text>
            {request.status === 'Confirmed' && (
              <View style={styles.iconsBelowStatus}>
                <TouchableOpacity onPress={() => navigation.navigate('chat')}>
                  <MaterialCommunityIcons name="message-text" size={30} color="#4CAF50" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MapPage')}>
                  <MaterialCommunityIcons name="map-marker-radius" size={30} color="#3F51B5" style={styles.icon} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card.Content>
      </LinearGradient>
    </Card>
  );
};

const TestRequestStatus = () => {
  const [houses, setHouses] = useState([]);
  const [userId, setUserId] = useState(null);  

  useEffect(() => {
    const getUserId = async () => {
      try {
        const userData = await storage.load({ key: 'loginState' });
        setUserId(userData.user.userId); 
      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {  
      axios.get(`${API_AD}/api/request/${userId}/house`)
        .then(response => {
          if (response.data && Array.isArray(response.data.Houses)) {
            const validHouses = response.data.Houses.filter(house => house.RequestHouse);
            setHouses(validHouses);
          } else {
            console.error("No houses data found:", response.data);
          }
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    }
  }, [userId]);  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {houses.length > 0 ? (
        houses.map(house => (
          <RequestStatus 
            key={house.id} 
            request={house.RequestHouse} 
            image={house.Media && house.Media.length > 0 ? house.Media[0].link : null} 
          />
        ))
      ) : (
        <Text style={styles.errorText}>No requests available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f9fafc', 
  },
  statusCard: {
    borderRadius: 20,
    marginBottom: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 15,
    elevation: 8, 
    backgroundColor: '#fff',
  },
  statusImage: {
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
  },
  statusGradient: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  prefaceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
    fontFamily: 'Lato-Regular',
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Lato-Bold',
  },
  statusFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  iconsBelowStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginLeft: 10,
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  icon: {
    width: 36,
    height: 36,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 20
  }
});

export default TestRequestStatus;
