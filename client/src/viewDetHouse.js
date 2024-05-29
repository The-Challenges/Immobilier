import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import COLORS from './consts/colors';
import { Button, Card } from 'react-native-elements';

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

// Component for displaying details with icons in a horizontal scroll view
const PropertyDetail = ({ category, details }) => (
  <Card containerStyle={styles.cardContainer}>
    <Text style={styles.categoryTitle}>{category}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollView}>
      {details.map((detail, index) => (
        <View key={index} style={styles.detailBox}>
          {getIcon(detail, category)}
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      ))}
    </ScrollView>
  </Card>
);

// Custom Skeleton Loader
const CustomSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonBox} />
    <View style={styles.skeletonBox} />
    <View style={styles.skeletonBox} />
  </View>
);

// Main component displaying the property details
const ViewHouseDetails = ({ route, navigation }) => {
  const { house, user } = route.params;
  const [hasRequested, setHasRequested] = useState(false);
  useEffect(() => {
    checkIfRequested();
  }, []);



  const checkIfRequested = async () => {
    try {
      const response = await axios.get(`http://192.168.103.4:4000/api/reqtest/check`, {
        params: {
          userId: parseInt(user.userId),
          landId: parseInt(house.id)
        }
      });
      setHasRequested(response.data.hasRequested);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to check if request has already been sent.');
      console.log('Error response data:', error.response ? error.response.data : 'No response data');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <CustomSkeleton />
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>General Information</Text>
        <Text style={styles.text}><Icon1 name="bed" size={18} /> Bedrooms: {house.numberbedrooms}</Text>
        <Text style={styles.text}><Icon1 name="bathtub" size={18} /> Bathrooms: {house.numberbathrooms}</Text>
        <Text style={styles.text}><Icon1 name="garage" size={18} /> Garage: {house.garage ? 'Yes' : 'No'}</Text>
        <Text style={styles.text}><Icon2 name="location-pin" size={18} /> Location: ({house.alt}, {house.long})</Text>
        <Text style={styles.text}><Icon name="money-check-alt" size={18} /> Purchase Option: {house.purchaseoption}</Text>
        <Text style={styles.text}><Icon name="building" size={18} /> Property Type: {house.propertyType}</Text>
        <Text style={styles.text}><Icon name="calendar-alt" size={18} /> House Age: {house.houseAge}</Text>

        <PropertyDetail category="Indoor" details={house.Indoors.map(indoor => indoor.options)} />
        <PropertyDetail category="Outdoor" details={house.Outdoors.map(outdoor => outdoor.options)} />
        <PropertyDetail category="Climate features" details={house.Climates.map(climate => climate.options)} />
        <PropertyDetail category="Views" details={house.Views.map(Views => Views.options)} />

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="heart" size={25} color={COLORS.red} />
        </TouchableOpacity>
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  location: {
    fontSize: 16,
    color: COLORS.light,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.light,
    textAlign: 'center',
  },
  imageContainer: {
    width: '90%',
    height: 200,
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
    lineHeight: 200,
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
    marginTop: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
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
  horizontalScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.dark,
  },
  favoriteButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 10,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
    textAlign: 'center',
  },
  modalLocation: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginVertical: 5,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'center',
    marginVertical: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  removeButton: {
    backgroundColor: COLORS.red,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skeletonContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },
  skeletonBox: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.light,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default ViewHouseDetails;
