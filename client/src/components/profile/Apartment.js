import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';

import Search from './SearchBar'; 

const PropertyItem = ({ image, category, price, address, bedrooms, bathrooms, area, floor, parking }) => {
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
          <TouchableOpacity onPress={toggleFavorite}>
            <IconButton icon={isFavorite ? 'heart' : 'heart-outline'} size={30} color={isFavorite ? 'black' : '#000'} />
          </TouchableOpacity>
        </View>
        <Paragraph>Price: {price}</Paragraph>
        <Paragraph>Address: {address}</Paragraph>
        <View style={styles.iconContainer}>
          <IconButton icon="bed" size={20} color="#000" />
          <Text>{bedrooms}</Text>
          <IconButton icon="toilet" size={20} color="#000" />
          <Text>{bathrooms}</Text>
          <IconButton icon="home-city" size={20} color="#000" />
          <Text>{area}</Text>
          <IconButton icon="floor-plan" size={20} color="#000" />
          <Text>{floor}</Text>
          <IconButton icon="car" size={20} color="#000" />
          <Text>{parking}</Text>
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

const Apartment = () => {
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.emptySpace} /> */}
      <View style={styles.pageHeading}>
        <Text style={styles.logo}>All Post</Text>
      </View>
      <View style={styles.emptySpace} />
      <Search /> 
      <View style={styles.pageHeading}>
        {/* <Text>Properties</Text> */}
      </View>
      <PropertyItem
        image={require('../../images/prop1.png')}
        category="Luxury Villa"
        price="$2.264.000"
        address="18 Old Street Miami, OR 97219"
        bedrooms={8}
        bathrooms={8}
        area="545m2"
        floor={3}
        parking="6 spots"
      />
      <PropertyItem
        image={require('../../images/prop2.png')}
        category="Luxury Villa"
        price="$1.180.000"
        address="54 New Street Florida, OR 27001"
        bedrooms={6}
        bathrooms={5}
        area="450m2"
        floor={3}
        parking="8 spots"
      />
      <PropertyItem
        image={require('../../images/prop3.png')}
        category="Apartment"
        price="$584.500"
        address="12 Hope Street Portland, OR 12650"
        bedrooms={4}
        bathrooms={3}
        area="125m2"
        floor="25th"
        parking="2 cars"
      />
      {/* Add more PropertyItem components as needed */}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menu: {
    flexDirection: 'row',
  },
  pageHeading: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteButton: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
   
  },
  visit: {
    color:'dodgerblue'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Apartment;
