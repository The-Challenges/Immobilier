import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Platform,Text, PermissionsAndroid } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location'


const GoogleMaps = () => {
    const mapRef = useRef(null);
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [persmissionGranter, setPersmissionGranter] = useState(false);


    useEffect(()=>{
        _getLoactionPersmission();
    },[])  

    async function _getLoactionPersmission(){
        if(Platform.OS==='android'){
            try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  {
                    title: 'location Permission',
                    message:
                      'Please Allow location permission to Continue..',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED){
                    setPersmissionGranter(true);
                    _getCurrentLocation()
                } else {
                  console.log('Camera permission denied');
                }
              } catch (err) {
                console.warn(err);
              }
        }
    }


        function _getCurrentLocation(){
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 60000,
            })
            .then(location => {
                console.log('my current location',location);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
        }





    async function moveToLocation(latitude, longitude) {
        mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        }, 2000);
    }


    if (!persmissionGranter) return <View><Text>Please Allow location permission to Continue..</Text></View>



    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <View style={{ flex: 0.5, marginHorizontal: 5 }}>
                    <GooglePlacesAutocomplete
                        fetchDetails={true}
                        placeholder='Origin'
                        onPress={(data, details = null) => {
                            let originCoordinates = {
                                latitude: details?.geometry?.location.lat,
                                longitude: details?.geometry?.location.lng,
                            };
                            setOrigin(originCoordinates);
                            moveToLocation(originCoordinates.latitude, originCoordinates.longitude);
                        }}
                        query={{
                            key: 'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o',
                            language: 'en',
                        }}
                        onFail={error => console.log(error)}
                        styles={{
                            textInputContainer: {
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                            },
                            textInput: {
                                marginLeft: 0,
                                marginRight: 0,
                                height: 38,
                                color: '#5d5d5d',
                                fontSize: 16
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            },
                        }}
                    />
                </View>

                <View style={{ flex: 0.5, marginLeft: 6 }}>
                    <GooglePlacesAutocomplete
                        fetchDetails={true}
                        placeholder='Destination'
                        onPress={(data, details = null) => {
                            let destinationCoordinates = {
                                latitude: details?.geometry?.location.lat,
                                longitude: details?.geometry?.location.lng,
                            };
                            setDestination(destinationCoordinates);
                            moveToLocation(destinationCoordinates.latitude, destinationCoordinates.longitude);
                        }}
                        query={{
                            key: 'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o',
                            language: 'en',
                        }}
                        onFail={error => console.log(error)}
                        styles={{
                            textInputContainer: {
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                            },
                            textInput: {
                                marginLeft: 0,
                                marginRight: 0,
                                height: 38,
                                color: '#5d5d5d',
                                fontSize: 16
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            },
                        }}
                    />
                </View>
            </View>

            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 36.894136,
                    longitude: 10.187458,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}>
                {origin && (
                    <Marker
                        coordinate={origin}
                        pinColor="red" // Custom color for the marker
                    />
                )}
                {destination && (
                    <Marker
                        coordinate={destination}
                        pinColor="red" // Custom color for the marker
                    />
                )}
                {origin && destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        strokeWidth={3}
                        strokeColor="hotpink" // Custom color for the path
                        apikey={'AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o'}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: 'row',
        marginHorizontal: 10,
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default GoogleMaps;
