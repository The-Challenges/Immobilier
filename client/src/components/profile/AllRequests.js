import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import RequestItem from './requestreceived'; // Assuming RequestReceived component file name
import { Card } from 'react-native-paper';

const AllRequests = () => {
  const [allRequests, setAllRequests] = useState([]);

  const handleRequestUpdate = (id, status) => {
    setAllRequests(prevRequests => {
      const updatedRequests = [...prevRequests];
      const index = updatedRequests.findIndex(request => request.id === id);
      if (index !== -1) {
        updatedRequests[index].status = status;
      }
      return updatedRequests;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {allRequests.map(request => (
        <Card key={request.id} style={styles.requestItem}>
          <Card.Content>
            <Text>House ID: {request.houseId}</Text>
            <Text>Buyer: {request.buyerName}</Text>
            <Text>Offer: ${request.offerPrice}</Text>
            <Text>Status: {request.status}</Text>
          </Card.Content>
        </Card>
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
  },
});

export default AllRequests;
