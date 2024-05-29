import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import COLORS from './consts/colors';
import { Button } from 'react-native-elements';
import { API_AD } from '../config';

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

const getIcon = (detail, category) => {
  const iconSets = {
    Features: featureIcons,
    Energy: energyIcons,
    Indoor: indoorIcons,
    Outdoor: featureIcons
  };

  const icons = iconSets[category] || {};
  const iconName = icons[detail] || icons.Unknown;
  return <Icon name={iconName} size={20} color={COLORS.dark} />;
};

const HouseDetail = ({ category, details }) => (
  <View style={styles.detailContainer}>
    <Text style={styles.categoryTitle}>{category}</Text>
    <View style={styles.detailRow}>
      {(details || []).map((detail, index) => (
        <View key={index} style={styles.detailBox}>
          {getIcon(detail, category)}
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      ))}
    </View>
  </View>
);

const ViewHouseDetails = ({ route, navigation }) => {
  const { house, user } = route.params;
  const [hasRequested, setHasRequested] = useState(false);
  useEffect(() => {
    checkIfRequested();
  }, []);



  const checkIfRequested = async () => {
    try {
      const response = await axios.get(`http://192.168.1.11:4000/api/reqtest/check`, {
        params: {
          userId: parseInt(user.userId),
          landId: parseInt(house.id)
        }
      });
      setHasRequested(response.data.hasRequested);
    } catch (error) {
      Alert.alert('Error', 'Failed to check if request has already been sent.');
      console.log('Error response data:', error.response ? error.response.data : 'No response data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {house.Media.length > 0 ? (
          <Image source={{ uri: house.Media[0].link }} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>No image available</Text>
        )}
      </View>
      <Text style={styles.title}>{house.title}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="heart" size={30} color={COLORS.primary} solid />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('chat')}>
          <Icon name="comments" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.contactDetails}>
        <Text style={styles.contactDetail}><Icon name="envelope" size={15} color="#FF9800" /> {house.User.email}</Text>
        <Text style={styles.contactDetail}><Icon2 name="phone" size={15} color="#2196F3" /> {house.User.phoneNumber}</Text>
        <Text style={styles.contactDetail}><Icon2 name="location-pin" size={15} color="#F44336" /> {house.User.location}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.price}>${house.price}</Text>
        <Text style={styles.type}>{house.propertyType}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Information</Text>
        <Text style={styles.text}><Icon1 name="bed" size={18} /> Bedrooms: {house.numberbedrooms}</Text>
        <Text style={styles.text}><Icon1 name="bathtub" size={18} /> Bathrooms: {house.numberbathrooms}</Text>
        <Text style={styles.text}><Icon1 name="garage" size={18} /> Garage: {house.garage ? 'Yes' : 'No'}</Text>
        <Text style={styles.text}><Icon2 name="location-pin" size={18} /> Location: ({house.alt}, {house.long})</Text>
        <Text style={styles.text}><Icon name="money-check-alt" size={18} /> Purchase Option: {house.purchaseoption}</Text>
        <Text style={styles.text}><Icon name="building" size={18} /> Property Type: {house.propertyType}</Text>
        <Text style={styles.text}><Icon name="calendar-alt" size={18} /> House Age: {house.houseAge}</Text>
      </View>

      <HouseDetail category="Indoor Features" details={house.Indoors.map(indoor => indoor.options)} />
      <HouseDetail category="Outdoor Features" details={house.Outdoors.map(outdoor => outdoor.options)} />
      <HouseDetail category="Climate Features" details={house.Climates.map(climate => climate.options)} />
      <HouseDetail category="Views" details={house.Views.map(view => view.options)} />

      <Button
        icon={<Icon name="arrow-right" size={15} color="white" />}
        title={hasRequested ? 'You have already sent a request' : `Contact ${house.User.firstName}`}
        buttonStyle={styles.contactButton}
        onPress={() => navigation.navigate('TermsAndConditions', { user, house })}
        disabled={hasRequested}
      />

      <Text style={styles.description}>{house.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 10,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.light,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImageText: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    lineHeight: 250,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    alignItems: 'center',
  },
  contactDetails: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  contactDetail: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
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
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: COLORS.primary,
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
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
});

export default ViewHouseDetails;
