import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ResultsScreenLand = ({ route }) => {
  const { lands } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={lands}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              source={{ uri: item.Media && item.Media.length > 0 ? item.Media[0].link : 'https://via.placeholder.com/100' }}
              style={styles.image}
            />
            <Text style={styles.titleText}>{item.title}</Text>
            <View style={styles.detailContainer}>
              <Icon name="cash" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>Price: ${item.price}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="map" size={20} color="#607D8B" />
              <Text style={styles.detailText}>Size: {item.size} sqft</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="terrain" size={20} color="#8BC34A" />
              <Text style={styles.detailText}>Terrain Type: {item.TerrainType}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="domain" size={20} color="#FF9800" />
              <Text style={styles.detailText}>Zoning: {item.Zoning}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="map-marker-radius" size={20} color="#009688" />
              <Text style={styles.detailText}>Coordinates: Latitude {item.alt}, Longitude {item.long}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="check-circle-outline" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>Verified: {item.isVerified ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Icon name="tag-heart" size={20} color="#E91E63" />
              <Text style={styles.detailText}>Purchase Option: {item.purchaseoption}</Text>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default ResultsScreenLand;
