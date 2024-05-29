
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  Platform,
  PermissionsAndroid,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';
import mapStyle from '../components/mapStyle/mapStyle';
import { debounce } from 'lodash';
import { API_AD } from '../../config';

const GoogleMaps = () => {
  const [houses, setHouses] = useState([]);
  const [lands, setLands] = useState([]);
  const [region, setRegion] = useState({
    latitude: 36.894163,
    longitude: 10.186983,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [filter, setFilter] = useState('all'); // New state for filtering markers

  const mapRef = useRef(null);

  useEffect(() => {
    _getLocationPermission();
    fetchHouses();
    fetchLands();
  }, []);

  async function _getLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          _getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      _getCurrentLocation(); // Direct call on iOS devices
    }
  }

  function _getCurrentLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        const newRegion = {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        setCurrentLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setRegion(newRegion);
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 2000);
        }
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }

  async function fetchHouses() {
    try {
      const response = await fetch(`${API_AD}/api/house/allhouses`);
      const json = await response.json();
      setHouses(
        json.map((house) => ({
          ...house,
          latitude: parseFloat(house.alt),
          longitude: parseFloat(house.long),
          id: house.id,
          title: house.title,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch houses', error);
      setHouses([]);
    }
  }

  async function fetchLands() {
    try {
      const response = await fetch(`${API_AD}/api/land/alllands`);
      const json = await response.json();
      setLands(
        json.map((land) => ({
          ...land,
          latitude: parseFloat(land.alt),
          longitude: parseFloat(land.long),
          id: land.id,
          title: land.title,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch lands', error);
      setLands([]);
    }
  }

  const handleMarkerPress = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setModalVisible(true);
  };

  const handleOptionPress = (option) => {
    if (option === 'details') {
      setShowDetails(true);
      setShowDirections(false);
    } else if (option === 'direction') {
      setShowDirections(true);
      setShowDetails(false);
    }
    setModalVisible(false);
  };

  const changeLocation = (lat, long) => {
    const newLocation = {
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    setCurrentLocation(newLocation);
    setRegion(newLocation);
    if (mapRef.current) {
      mapRef.current.animateToRegion(newLocation, 1000);
    }
  };

  const debouncedSetRegion = useCallback(
    debounce((newRegion) => setRegion(newRegion), 1000),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <TouchableOpacity
          style={styles.sidebarButton}
          onPress={() => setFilter('house')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3307/3307713.png' }}
            style={styles.sidebarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarButton}
          onPress={() => setFilter('land')}
        >
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4350/4350287.png' }}
            style={styles.sidebarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sidebarButton}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.sidebarIconText}>All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Current Location" onPress={() => changeLocation(36.894125, 10.186898)} />
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        region={region}
        onRegionChangeComplete={(newRegion) => debouncedSetRegion(newRegion)}
      >
        {(filter === 'all' || filter === 'house') &&
          houses.map((house) => (
            <Marker
              key={house.id}
              coordinate={{ latitude: house.latitude, longitude: house.longitude }}
              title={house.title}
              onPress={() => handleMarkerPress(house, 'house')}
            >
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3307/3307713.png' }}
                style={{ width: 40, height: 40 }}
                onError={(e) => console.log('Failed to load image:', e.nativeEvent.error)}
              />
            </Marker>
          ))}
        {(filter === 'all' || filter === 'land') &&
          lands.map((land) => (
            <Marker
              key={land.id}
              coordinate={{ latitude: land.latitude, longitude: land.longitude }}
              title={land.title}
              onPress={() => handleMarkerPress(land, 'land')}
            >
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4350/4350287.png' }}
                style={{ width: 40, height: 40 }}
                onError={(e) => console.log('Failed to load image:', e.nativeEvent.error)}
              />
            </Marker>
          ))}
        {currentLocation && selectedItem && showDirections && (
          <MapViewDirections
            origin={currentLocation}
            destination={{
              latitude: selectedItem.latitude,
              longitude: selectedItem.longitude,
            }}
            radius={3000}
            apikey={'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'} // Replace YOUR_API_KEY with your actual Google Maps API key
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={(result) => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
              });
            }}
          />
        )}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>What would you like to do?</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleOptionPress('details')}
            >
              <Text style={styles.modalButtonText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleOptionPress('direction')}
            >
              <Text style={styles.modalButtonText}>Get Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {selectedItem && showDetails && !showDirections && (
        <DetailCard
          item={selectedItem}
          type={selectedType}
          onClose={() => {
            setSelectedItem(null);
            setShowDetails(false);
          }}
        />
      )}
    </View>
  );
};

const DetailCard = ({ item, type, onClose }) => {
  return (
    <View style={styles.detailCard}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <ScrollView>
        {item.Media && item.Media.length > 0 && (
          <Image
            source={{ uri: item.Media[0].link }}
            style={styles.detailImage}
          />
        )}
        <Text style={styles.detailTitle}>{item.title}</Text>
        {type === 'house' ? (
          <>
            <Text style={styles.detailText}>Price: ${item.price}</Text>
            <Text style={styles.detailText}>Bedrooms: {item.numberbedrooms}</Text>
            <Text style={styles.detailText}>Bathrooms: {item.numberbathrooms}</Text>
            <Text style={styles.detailText}>Garage: {item.garage}</Text>
            <Text style={styles.detailText}>Parking: {item.parking ? 'Yes' : 'No'}</Text>
            <Text style={styles.detailText}>Property Type: {item.propertyType}</Text>
            <Text style={styles.detailText}>House Age: {item.houseAge}</Text>
            <Text style={styles.detailText}>Purchase Option: {item.purchaseoption}</Text>
            <Text style={styles.detailText}>Verified: {item.isVerified ? 'Yes' : 'No'}</Text>
            <Text style={styles.detailText}>Indoors:</Text>
            {item.Indoors.map((indoor, index) => (
              <Text key={index} style={styles.detailText}>- {indoor.options}</Text>
            ))}
          </>
        ) : (
          <>
            <Text style={styles.detailText}>Price: ${item.price}</Text>
            <Text style={styles.detailText}>Size: {item.size} sqm</Text>
            <Text style={styles.detailText}>Terrain Type: {item.TerrainType}</Text>
            <Text style={styles.detailText}>Zoning: {item.Zoning}</Text>
            <Text style={styles.detailText}>Purchase Option: {item.purchaseoption}</Text>
            <Text style={styles.detailText}>Verified: {item.isVerifie ? 'Yes' : 'No'}</Text>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 80, // Add padding to avoid overlapping with status bar or notch
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute', // Position the button container absolutely
    top: 10, // Place it at the top of the screen
    width: '100%', // Make it full width
    zIndex: 1, // Ensure it's on top of other components
    paddingHorizontal: 10, // Add some horizontal padding
  },
  sidebar: {
    position: 'absolute',
    top: 80,
    left: 10,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 2,
  },
  sidebarButton: {
    marginBottom: 20,
  },
  sidebarIcon: {
    width: 30,
    height: 30,
  },
  sidebarIconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  detailCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    maxHeight: 400, 
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GoogleMaps;
