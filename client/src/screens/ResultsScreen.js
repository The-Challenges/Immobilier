import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ResultsScreen = ({ route }) => {
  const { houses } = route.params;

  console.log("received houses in ResultsScreen:", houses);


  return (
    <View style={styles.container}>
      <FlatList
        data={houses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.detailText}>Price: ${item.price}</Text>
            <Text style={styles.detailText}>Bathrooms: {item.numberbathrooms}</Text>
            <Text style={styles.detailText}>Bedrooms: {item.numberbedrooms}</Text>
            <Text style={styles.detailText}>Garage: {item.garage ? `${item.garage} car(s)` : 'No'}</Text>
            <Text style={styles.detailText}>Parking: {item.parking ? 'Yes' : 'No'}</Text>
            <Text style={styles.detailText}>Coordinates: Latitude {item.alt}, Longitude {item.long}</Text>
            <Text style={styles.detailText}>Purchase Option: {item.purchaseoption}</Text>
            <Text style={styles.detailText}>Property Type: {item.propretyType}</Text>
            <Text style={styles.detailText}>House Age: {item.houseAge}</Text>
            <Text style={styles.detailText}>Verified: {item.isVerifie ? 'Yes' : 'No'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  }
});

export default ResultsScreen;
