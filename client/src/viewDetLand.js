import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import COLORS from './consts/colors';
import axios from 'axios';
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

const LandDetail = ({ category, details }) => (
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
const ViewLandDetails = ({ route, navigation }) => {
  const { land, user } = route.params;
  const [hasRequested, setHasRequested] = useState(false);

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
    } catch (error) {
      Alert.alert('Error', 'Failed to check if request has already been sent.');
      console.log('Error response data:', error.response ? error.response.data : 'No response data');
    }
  };

  

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
          <Icon name="heart" size={30} color={COLORS.primary} solid />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('chat', { roomId: `room_${land.id}`, userId: user.userId })}>
          <Icon name="comments" size={30} color={COLORS.primary} />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 10,
    textAlign: 'center',
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
