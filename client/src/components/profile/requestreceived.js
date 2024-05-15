import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Animated } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  return (
    <Card style={styles.requestItem}>
      <Card.Cover source={{ uri: request.image }} style={styles.image} />
      <LinearGradient colors={['#ffffff', '#e6e6e6']} style={styles.gradient}>
        <Card.Content>
          <Text style={styles.title}>House ID: {request.houseId}</Text>
          <View style={styles.iconContainer}>
            <Avatar.Icon size={24} icon="account" style={styles.icon} />
            <Text style={styles.description}>Buyer: {request.buyerName}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Avatar.Icon size={24} icon="cash" style={styles.icon} />
            <Text style={styles.description}>Offer: ${request.offerPrice}</Text>
          </View>
        </Card.Content>
        <Card.Actions style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => onConfirm(request.id)}
            style={styles.confirmButton}
            color="#4CAF50"
          >
            Confirm
          </Button>
          <Button
            mode="contained"
            onPress={() => onDecline(request.id)}
            style={styles.declineButton}
            color="#F44336"
          >
            Decline
          </Button>
        </Card.Actions>
        {confirmationVisible && (
          <FadeInView style={styles.messageContainer}>
            <MaterialCommunityIcons name="check-circle" size={24} color="green" />
            <Text style={styles.confirmationMessage}>Request confirmed!</Text>
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
  const [requestList, setRequestList] = useState([
    {
      id: '1',
      houseId: '1234',
      buyerName: 'John Doe',
      offerPrice: '200000',
      image: 'https://img.staticmb.com/mbcontent/images/crop/uploads/2022/12/Most-Beautiful-House-in-the-World_0_1200.jpg',
      confirmationVisible: false,
      declineVisible: false,
    },
    {
      id: '2',
      houseId: '5678',
      buyerName: 'Jane Smith',
      offerPrice: '250000',
      image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/01/10145854/most-beautiful-houses2.png',
      confirmationVisible: false,
      declineVisible: false,
    },
    {
      id: '3',
      houseId: '9012',
      buyerName: 'Bob Johnson',
      offerPrice: '300000',
      image: 'https://img.staticmb.com/mbcontent/images/crop/uploads/2022/12/Most-Beautiful-House-in-the-World_0_1200.jpg',
      confirmationVisible: false,
      declineVisible: false,
    }
  ]);

  const handleConfirm = id => {
    setRequestList(requestList.map(request =>
      request.id === id ? { ...request, confirmationVisible: true } : request
    ));
    setTimeout(() => {
      setRequestList(requestList.filter(request => request.id !== id));
    }, 2000);
  };

  const handleDecline = id => {
    setRequestList(requestList.map(request =>
      request.id === id ? { ...request, declineVisible: true } : request
    ));
    setTimeout(() => {
      setRequestList(requestList.filter(request => request.id !== id));
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {requestList.map(request => (
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
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    requestItem: {
      marginBottom: 20,
      elevation: 4,
      borderRadius: 8,
      overflow: 'hidden',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowColor: '#000',
      shadowOffset: { height: 2, width: 0 },
    },
    gradient: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 12,
    },
    image: {
      height: 200,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      fontFamily: 'Lato-Bold',
    },
    description: {
      fontSize: 16,
      fontFamily: 'Lato-Regular',
      marginLeft: 8,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    icon: {
      backgroundColor: 'black',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 10,
      paddingHorizontal: 10,
    },
    confirmButton: {
      flex: 1,
      marginRight: 8,
      borderRadius: 20,
      elevation: 3,
    },
    declineButton: {
      flex: 1,
      borderRadius: 20,
      elevation: 3,
    },
    messageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    confirmationMessage: {
      marginLeft: 10,
      color: 'green',
      fontWeight: 'bold',
    },
    declineMessage: {
      marginLeft: 10,
      color: 'red',
      fontWeight: 'bold',
    },
  });
  
export default RequestsList;
