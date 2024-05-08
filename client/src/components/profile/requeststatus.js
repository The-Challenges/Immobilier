import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; 

const RequestStatus = ({ request }) => {
  const navigation = useNavigation(); 

  const getStatusColor = () => {
    if (request.confirmationVisible) return '#4CAF50';
    if (request.declineVisible) return '#F44336';
    return '#2196F3';
  };

  return (
    <Card style={styles.statusCard}>
      <Card.Cover source={{ uri: request.image }} style={styles.statusImage} />
      <LinearGradient colors={['#ffffff', '#e6e6e6']} style={styles.statusGradient}>
        <Card.Content>
          <Text style={styles.prefaceTitle}>Your request for:</Text>
          <Text style={styles.statusTitle}>House ID: {request.houseId}</Text>
          <View style={styles.statusFooter}>
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {request.confirmationVisible ? 'Confirmed' : request.declineVisible ? 'Declined' : 'Pending'}
            </Text>
            {request.confirmationVisible && (
              <View style={styles.iconsBelowStatus}>
                <TouchableOpacity onPress={() => navigation.navigate('ChatPage')}>
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
  const fakeRequest = {
    houseId: '9988',
    image: 'https://img.staticmb.com/mbcontent/images/crop/uploads/2022/12/Most-Beautiful-House-in-the-World_0_1200.jpg', 
    confirmationVisible: true, 
    declineVisible: false 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RequestStatus request={fakeRequest} />
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
  });
  
  
export default TestRequestStatus;
