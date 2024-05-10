import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

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
      <Card.Cover source={{ uri: request.image }} style={styles.image} />
      <LinearGradient colors={['#ffffff', '#e6e6e6']} style={styles.gradient}>
        <Card.Content>
          <Text style={styles.title}>House ID: {request.houseId}</Text>
          <View style={styles.iconContainer}>
            <Avatar.Icon size={24} icon="account" style={[styles.icon, { backgroundColor: '#87CEEB' }]} />
            <Text style={styles.description}>Buyer: {request.buyerName}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Avatar.Icon size={24} icon="cash" style={[styles.icon, { backgroundColor: '#87CEEB' }]} />
            <Text style={styles.description}>Offer: ${request.offerPrice}</Text>
          </View>
        </Card.Content>
        {!confirmationVisible && !declineVisible && (
          <Card.Actions style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => onConfirm(request.id)}
              style={[styles.confirmButton, { backgroundColor: '#F5F7C4' }]}
              labelStyle={{ color: 'black' }}
            >
              Confirm
            </Button>
            <Button
              mode="contained"
              onPress={() => onDecline(request.id)}
              style={[styles.declineButton, { backgroundColor: '#F5F7C4' }]}
              labelStyle={{ color: 'black' }}
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
  const [requestList, setRequestList] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const userId = 16; 
    const url = `http://192.168.103.7:4000/api/request/${userId}/house`;

    axios.get(url)
      .then(response => {
        setRequestList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleConfirm = id => {
    setRequestList(requestList.map(request =>
      request.id === id ? { ...request, confirmationVisible: true } : request
    ));
  };

  const handleDecline = id => {
    setRequestList(requestList.map(request =>
      request.id === id ? { ...request, declineVisible: true } : request
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <Button
          mode="contained"
          onPress={() => setFilter('all')}
          style={[filter === 'all' ? styles.activeFilterButton : styles.filterButton, { backgroundColor: '#F5F7C4' }]} 
          labelStyle={{ color: 'black' }} 
        >
          All
        </Button>
        <Button
          mode="contained"
          onPress={() => setFilter('confirmed')}
          style={[filter === 'confirmed' ? styles.activeFilterButton : styles.filterButton, { backgroundColor: '#F5F7C4' }]} 
          labelStyle={{ color: 'black' }} 
          color="#4CAF50"
        >
          Confirmed
        </Button>
        <Button
          mode="contained"
          onPress={() => setFilter('declined')}
          style={[filter === 'declined' ? styles.activeFilterButton : styles.filterButton, { backgroundColor: '#F5F7C4' }]} 
          labelStyle={{ color: 'black' }} 
          color="#F44336"
        >
          Declined
        </Button>
      </View>
      {requestList.filter(request => {
        if (filter === 'confirmed') return request.confirmationVisible;
        if (filter === 'declined') return request.declineVisible;
        return true;
      }).map(request => (
        <RequestItem
          key={request.id}
          request={request}
          onConfirm={handleConfirm}
          onDecline={handleDecline}
          confirmationVisible={request.confirmationVisible}
          declineVisible={request.declineVisible}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  requestItem: {
    marginBottom: 20,
    elevation: 3,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 0 },
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  image: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
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
    marginBottom: 12,
  },
  icon: {
    backgroundColor: '#4CAF50',
  },
  iconStyle: {
    marginLeft: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  filterButton: {
    marginHorizontal: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
  },
  activeFilterButton: {
    marginHorizontal: 8,
    backgroundColor: '#2196F3',
    borderRadius: 15,
  },
  confirmButton: {
    flexGrow: 1,
    marginRight: 15,
    borderRadius: 20,
    elevation: 4,
  },
  declineButton: {
    flexGrow: 1,
    borderRadius: 20,
    elevation: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  confirmationMessage: {
    marginLeft: 12,
    color: 'green',
    fontWeight: 'bold',
  },
  declineMessage: {
    marginLeft: 12,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default RequestsList;
