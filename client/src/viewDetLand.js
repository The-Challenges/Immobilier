import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Button, Card, Overlay } from 'react-native-elements';
import COLORS from './consts/colors';
import { API_AD } from '../config';

const accessIcons = {
  "Airport": "plane",
  "Public transportation": "bus",
  "Highway": "road",
  "road access": "car",
  "Unknown": "question-circle"
};

const viewIcons = {
  "mountain": "mountain",
  "water views": "water",
  "city skyline": "city",
  "Unknown": "question-circle"
};

const getIcon = (detail, category) => {
  const iconSets = {
    Accesses: accessIcons,
    Views: viewIcons,
  };

  const icons = iconSets[category] || {};
  const iconName = icons[detail] || icons.Unknown;
  return <Icon name={iconName} size={20} color={COLORS.dark} />;
};

// Component for displaying details with icons
const PropertyDetail = ({ category, details }) => (
  <Card containerStyle={styles.cardContainer}>
    <Text style={styles.categoryTitle}>{category}</Text>
    <View style={styles.detailRow}>
      {(details || []).map((detail, index) => (
        <View key={index} style={styles.detailBox}>
          {getIcon(detail, category)}
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      ))}
    </View>
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
const ViewLandDetails = ({ route, navigation }) => {
  const { land, user } = route.params;
  const [hasRequested, setHasRequested] = useState(false);
  const [loading, setLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    checkIfRequested();
  }, []);

  const checkIfRequested = async () => {
    try {
      const response = await axios.get(`http://192.168.11.225:4000/api/reqtest/check`, {
        params: {
          userId: parseInt(user.userId),
          landId: parseInt(land.id)
        }
      });
      setHasRequested(response.data.hasRequested);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to check if request has already been sent.');
      setLoading(false);
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
      <View style={styles.headerContainer}>
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
        <Text style={styles.text}><Icon name="calendar-alt" size={18} /> Verified: {land.isVerified ? 'Yes' : 'No'}</Text>
      </View>

      <PropertyDetail category="View" details={land.Views.map(view => view.options)} />

      <Button
        icon={<Icon name="arrow-right" size={15} color="white" />}
        title={hasRequested ? 'You have already sent a request' : `Contact ${land.User.firstName}`}
        buttonStyle={styles.contactButton}
        onPress={() => setOverlayVisible(true)}
        disabled={hasRequested}
      />

      <Text style={styles.description}>{land.description}</Text>

      <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)}>
        <View style={styles.overlayContainer}>
          <Text style={styles.overlayText}>Contact {land.User.firstName}</Text>
          <Text style={styles.overlayText}>Email: {land.User.email}</Text>
          <Text style={styles.overlayText}>Phone: {land.User.phoneNumber}</Text>
          <Button title="Close" onPress={() => setOverlayVisible(false)} />
        </View>
      </Overlay>
    </ScrollView>
  );
};

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
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginVertical: 10,
    textAlign: 'center',
  },
  imageContainer: {
    width: '90%',
    height: 250,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.light,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 20,
    alignItems: 'center',
  },
  contactDetails: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
  contactButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  description: {
    fontSize: 18,
    color: COLORS.dark,
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: 'justify',
    backgroundColor: COLORS.light,
    padding: 15,
    borderRadius: 10,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  overlayContainer: {
    padding: 20,
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 18,
    color: COLORS.dark,
    marginBottom: 10,
  },
  cardContainer: {
    borderRadius: 15,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 10,
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

export default ViewLandDetails;
