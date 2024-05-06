import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';

import Search from './SearchBar';

const PropertyItem = ({ image, category, price, address, size, terrain, water, electricity }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card style={styles.propertyItem}>
      <Image
        source={image}
        style={styles.image}
      />
      <Card.Content>
        <View style={styles.titleContainer}>
          <Title>{category}</Title>
          <IconButton 
            icon={isFavorite ? 'heart' : 'heart-outline'} 
            size={30} 
            color={isFavorite ? 'black' : '#000'} 
            onPress={toggleFavorite}
          />
        </View>
        <Paragraph>Price: {price}</Paragraph>
        <Paragraph>Address: {address}</Paragraph>
        <View style={styles.iconContainer}>
          <View style={styles.iconItem}>
            <IconButton icon="ruler" size={20} color="#000" />
            <Text>{size}</Text>
          </View>
          <View style={styles.iconItem}>
            <IconButton icon="terrain" size={20} color="#000" />
            <Text>{terrain}</Text>
          </View>
          <View style={styles.iconItem}>
            <IconButton icon="water" size={20} color="#000" />
            <Text>{water}</Text>
          </View>
          <View style={styles.iconItem}>
            <IconButton icon="flash" size={20} color="#000" />
            <Text>{electricity}</Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.visit}>Schedule a visit</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const Lands = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.pageHeading}>
        <Text style={styles.logo}>All Lands</Text>
      </View>
      <View style={styles.emptySpace} />
      <Search />
      <View style={styles.pageHeading}>
        {/* <Text>Properties</Text> */}
      </View>
      <PropertyItem
        image={require('../../images/land1.webp')}
        category="Residential Land"
        price="$120,000"
        address="123 Main Street, City, Country"
        size="1000 sqm"
        terrain="Flat"
        water="Nearby"
        electricity="Available"
      />
      <PropertyItem
        image={require('../../images/land2.webp')}
        category="Farm Land"
        price="$500,000"
        address="456 Elm Street, City, Country"
        size="10 acres"
        terrain="Rolling hills"
        water="River frontage"
        electricity="Off-grid"
      />
      <PropertyItem
        image={require('../../images/land3.webp')}
        category="Commercial Land"
        price="$1,200,000"
        address="789 Oak Street, City, Country"
        size="5000 sqm"
        terrain="Urban"
        water="Municipal"
        electricity="Available"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptySpace: {
    height: 15, // Adjust as needed
  },
  pageHeading: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  propertyItem: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  iconItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  visit: {
    color: 'dodgerblue',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Lands;
