import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const ResultsScreen = ({ route }) => {
  const { houses } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={houses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.titleText}>{item.title}</Text>
            <View style={styles.detailContainer}>
              <Icon name="cash" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>Price: ${item.price}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="toilet" size={20} color="#607D8B" />
              <Text style={styles.detailText}>Bathrooms: {item.numberbathrooms}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="bed-king-outline" size={20} color="#3F51B5" />
              <Text style={styles.detailText}>Bedrooms: {item.numberbedrooms}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="garage" size={20} color="#795548" />
              <Text style={styles.detailText}>Garage: {item.garage ? `${item.garage} car(s)` : 'No'}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="car" size={20} color="#FF5722" />
              <Text style={styles.detailText}>Parking: {item.parking ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="check-circle-outline" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>Verified: {item.isVerifie ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="map-marker-radius" size={20} color="#009688" />
              <Text style={styles.detailText}>Coordinates: Latitude {item.alt}, Longitude {item.long}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="tag-heart" size={20} color="#E91E63" />
              <Text style={styles.detailText}>Purchase Option: {item.purchaseoption}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="city" size={20} color="#9C27B0" />
              <Text style={styles.detailText}>Property Type: {item.propretyType}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="history" size={20} color="#FFC107" />
              <Text style={styles.detailText}>House Age: {item.houseAge}</Text>
            </View>
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
    backgroundColor: '#fff',
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default ResultsScreen;
