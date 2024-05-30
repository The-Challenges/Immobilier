import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Image, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import storage from '../Authentification/storage';
import { API_AD } from '../../../config';

const FadeInView = ({ children, style }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

const RequestItem = ({ request, onConfirm, onDecline, confirmationVisible, declineVisible }) => {
  const navigation = useNavigation();

  const handleChatPress = () => {
    navigation.navigate('ChatScreen');
  };

  const handleMapPress = () => {
    navigation.navigate('MapScreen');
  };

  return (
    <Card style={styles.requestItem}>
      <LinearGradient colors={['#ffffff', '#e6e6e6']} style={styles.gradient}>
        {request.Media && request.Media.length > 0 && (
          <Image
            style={styles.image}
            source={{ uri: request.Media[0].link }}
          />
        )}
        <Card.Content>
          <Text style={styles.title}>House ID: {request.id} - {request.title}</Text>
          {request.Users.map(user => (
            <View key={user.id} style={styles.iconContainer}>
              <Avatar.Icon size={24} icon="account" style={[styles.icon, { backgroundColor: '#87CEEB' }]} />
              <Text style={styles.description}>Request by: {user.firstName}</Text>
            </View>
          ))}
        </Card.Content>
        {!confirmationVisible && !declineVisible && (
          <Card.Actions style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => onConfirm(request.id)}
              style={[styles.confirmButton, { backgroundColor: '#4a90e2' }]}
              labelStyle={{ color: 'white' }}
            >
              Confirm
            </Button>
            <Button
              mode="contained"
              onPress={() => onDecline(request.id)}
              style={[styles.declineButton, { backgroundColor: '#4a90e2' }]}
              labelStyle={{ color: 'white' }}
            >
              Decline
            </Button>
          </Card.Actions>
        )}
        {confirmationVisible && (
          <FadeInView style={styles.messageContainer}>
            <MaterialCommunityIcons name="check-circle" size={24} color="green" />
            <Text style={styles.confirmationMessage}>Request confirmed!</Text>
            <TouchableOpacity onPress={handleChatPress}>
              <MaterialCommunityIcons name="message-text" size={24} color="#4CAF50" style={styles.iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMapPress}>
              <MaterialCommunityIcons name="map-marker-radius" size={24} color="#3F51B5" style={styles.iconStyle} />
            </TouchableOpacity>
          </FadeInView>
        )}
        {declineVisible && (
          <FadeInView style={styles.messageContainer}>
            <MaterialCommunityIcons name="close-circle" size={24} color="red" />
            <Text style={styles.declineMessage}>Request declined!</Text>
          </FadeInView>
        )}
      </LinearGradient>
    </Card>
  );
};

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserIdAndStatuses = async () => {
      try {
        const userData = await storage.load({ key: 'loginState' });
        setUserId(userData.user.userId);

        const savedStatuses = await storage.load({ key: 'requestStatuses' }).catch(() => ({}));
        if (userData.user.userId) {
          fetchRequests(userData.user.userId, savedStatuses);
        }
      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      }
    };

    getUserIdAndStatuses();
  }, []);

  const fetchRequests = async (userId, savedStatuses) => {
    try {
      const response = await axios.get(`http://192.168.11.234:4000/api/request/seller/${userId}/house`);
      if (Array.isArray(response.data)) {
        const housesWithRequests = response.data.map(house => ({
          ...house,
          confirmationVisible: savedStatuses[house.id]?.confirmationVisible || false,
          declineVisible: savedStatuses[house.id]?.declineVisible || false,
        }));
        setRequests(housesWithRequests);
      } else {
        console.log('Data received is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.post(`${API_AD}/api/request/updateStatus/${id}`, { status });
      const updatedRequests = requests.map((request) => {
        if (request.id === id) {
          return {
            ...request,
            confirmationVisible: status === 'Confirmed',
            declineVisible: status === 'Rejected',
          };
        }
        return request;
      });

      setRequests(updatedRequests);
      await storage.save({
        key: 'requestStatuses',
        data: updatedRequests.reduce((acc, curr) => ({
          ...acc,
          [curr.id]: {
            confirmationVisible: curr.confirmationVisible,
            declineVisible: curr.declineVisible
          }
        }), {})
      });
    } catch (error) {
      console.error(`Error ${status === 'Confirmed' ? 'confirming' : 'declining'} request:`, error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {requests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>No requests available at the moment.</Text>
        </View>
      ) : (
        requests.map(request => (
          <RequestItem
            key={request.id}
            request={request}
            onConfirm={() => handleStatusChange(request.id, 'Confirmed')}
            onDecline={() => handleStatusChange(request.id, 'Rejected')}
            confirmationVisible={request.confirmationVisible}
            declineVisible={request.declineVisible}
          />
        ))
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F9', 
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100, // Adjust the padding as needed
  },
  emptyMessage: {
    fontSize: 20,
    color: '#666666',
    fontFamily: 'Lato-Regular',
  },
  requestItem: {
    marginBottom: 20,
    elevation: 6,  
    borderRadius: 16,  
    backgroundColor: '#ffffff',
    shadowOpacity: 0.2, 
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 4, width: 0 },
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 25, 
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  image: {
    height: 220,  
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,  
    fontWeight: 'bold',
    marginBottom: 10,  
    fontFamily: 'Lato-Bold',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, 
  },
  icon: {
    backgroundColor: '#5C67F2',  
  },
  iconStyle: {
    marginLeft: 15,  
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,  
  },
  confirmButton: {
    flexGrow: 1,
    marginRight: 20,  
    borderRadius: 25,  
    elevation: 5,  
    backgroundColor: '#4CAF50',  
  },
  declineButton: {
    flexGrow: 1,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: '#F44336',  
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15, 
    backgroundColor: '#ffffff',
    borderRadius: 16, 
  },
  confirmationMessage: {
    marginLeft: 15,
    color: 'green',
    fontWeight: 'bold',
  },
  declineMessage: {
    marginLeft: 15,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default RequestsList;