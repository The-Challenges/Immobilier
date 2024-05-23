import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import axios from 'axios';
import COLORS from './consts/colors';
import { API_AD } from '../config';

// Define icons for different categories
const featureIcons = {
  Garage: "car",
  Pool: "swimming-pool",
  Garden: "tree",
  Fireplace: "fire-alt",
  Unknown: "question-circle",
  "Outdoor area": "campground",
  "Outdoor spa": "hot-tub",
  "Fully fenced": "border-all",
  Balcony: "building",
  "Undercover parking": "car-port",
  Shed: "warehouse",
  "Tennis court": "table-tennis",
  "Swimming pool": "swimming-pool",
};

const indoorIcons = {
  Ensuite: "bath",
  Study: "book",
  "Alarm System": "bell",
  FloorBoards: "border-all",
  "Rumpus room": "couch",
  Dishwasher: "utensils",
  "Built in robe": "tshirt",
  Broadband: "wifi",
  Gym: "dumbbell",
  Workshop: "tools",
  Unknown: "question-circle",
};

const energyIcons = {
  "Air conditioning": "wind",
  Heating: "fire",
  "Solar panels": "solar-panel",
  "High energy efficiency": "bolt",
  Unknown: "battery-slash"
};

const viewIcons = {
  Mountain: "mountain",
  WaterViews: "water",
  CitySkyline: "city",
  Unknown: "question-circle"
};

// Function to retrieve the correct icon element
const getIcon = (name, category) => {
  const iconSets = {
    Features: featureIcons,
    Energy: energyIcons,
    Indoor: indoorIcons,
    Outdoor: featureIcons,
    View: viewIcons
  };

  const icons = iconSets[category] || {};
  const iconName = icons[name] || icons.Unknown;
  return <Icon name={iconName} size={20} color={COLORS.dark} />;
};

// Component for displaying details with icons
const PropertyDetail = ({ category, details }) => (
  <View style={styles.detailContainer}>
    <Text style={styles.categoryTitle}>{category}</Text>
    <View style={styles.detailRow}>
      {details.map((detail, index) => (
        <View key={index} style={styles.detailBox}>
          {getIcon(detail, category)}
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      ))}
    </View>
  </View>
);

// Main component displaying the property details
const ViewLandDetails = ({ route, navigation }) => {
  const { land, user } = route.params;
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    checkIfRequested();
  }, []);

  const checkIfRequested = async () => {
    try {
      const response = await axios.get(`${API_AD}/api/reqtest/check`, {
        params: {
          userId: user.id,
          landId: land.id
        }
      });
      setHasRequested(response.data.hasRequested);
    } catch (error) {
      console.error('Failed to check request status:', error);
      Alert.alert('Error', 'Failed to check if request has already been sent.');
    }
  };

  const uniqueViews = [...new Set(land.Views.map(view => view.options))];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {land.Media.length > 0 ? (
          <Image source={{ uri: land.Media[0].link }} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>No image available</Text>
        )}
      </View>
      <Text style={styles.title}>{land.title}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="heart" size={30} color={COLORS.dark} solid />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('chat', { roomId: `room_${land.id}`, userId: user.id, userName: user.username })}>
          <Icon name="comments" size={30} color={COLORS.dark} />
        </TouchableOpacity>
      </View>

      <View style={styles.contactDetails}>
        <Text style={styles.contactDetail}><Icon name="envelope" size={15} color="#FF9800" /> {land.User.email}</Text>
        <Text style={styles.contactDetail}><Icon2 name="phone" size={15} color="#2196F3" /> {land.User.phoneNumber}</Text>
        <Text style={styles.contactDetail}><Icon2 name="location-pin" size={15} color="#F44336" /> {land.User.location}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.price}>${land.price}</Text>
        <Text style={styles.type}>{land.TerrainType}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Information</Text>
        <Text style={styles.text}><Icon1 name="aspect-ratio" size={18} /> Size: {land.size} acres</Text>
        <Text style={styles.text}><Icon1 name="alt-route" size={18} /> Altitude: {land.alt}</Text>
        <Text style={styles.text}><Icon1 name="my-location" size={18} /> Longitude: {land.long}</Text>
        <Text style={styles.text}><Icon name="money-check-alt" size={18} /> Purchase Option: {land.purchaseoption}</Text>
        <Text style={styles.text}><Icon name="building" size={18} /> Zoning: {land.Zoning}</Text>
        <Text style={styles.text}><Icon name="calendar-alt" size={18} /> Verified: {land.isVerifie ? 'Yes' : 'No'}</Text>
      </View>

      <PropertyDetail category="View" details={uniqueViews} />

      <Button
        icon={<Icon name="arrow-right" size={15} color="white" />}
        title={hasRequested ? 'You have already sent a request' : `Contact ${land.User.firstName}`}
        buttonStyle={styles.contactButton}
        onPress={() => navigation.navigate('TermsAndConditions', { user, land })}
        disabled={hasRequested}
      />

      <Text style={styles.description}>{land.description}</Text>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.light,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  noImageText: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    lineHeight: 250,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 10,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginVertical: 20,
  },
  contactDetails: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  contactDetail: {
    fontSize: 18,
    color: COLORS.dark,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  type: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: COLORS.dark,
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.dark,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  description: {
    fontSize: 18,
    color: COLORS.dark,
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: 'justify',
  },
});

export default ViewLandDetails;
