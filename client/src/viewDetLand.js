import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import COLORS from './consts/colors';
import axios from 'axios';
import { API_AD } from '../config';

const ViewLandDetails = ({ route, navigation }) => {
    const { land, user } = route.params;
    const [hasRequested, setHasRequested] = useState(false);

    useEffect(() => {
        checkIfRequested();
    }, []);

    const checkIfRequested = async () => {
        try {
            const response = await axios.get(`http://192.168.11.62:4000/api/reqtest/check`, {
                params: {
                    userId: parseInt(user.id),
                    landId: parseInt(land.id)
                }
            });
            console.log(response.data.hasRequested);
            setHasRequested(response.data.hasRequested);
        } catch (error) {
           
            Alert.alert('Error', 'Failed to check if request has already been sent.');
            console.log('Error response data:', error.response ? error.response.data : 'No response data');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: land.image }} style={styles.image} />
            <Text style={styles.title}>{land.title}</Text>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => {}}>
                    <Icon name="heart" size={30} color={COLORS.dark} solid />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('chat', { roomId: `room_${land.id}`, userId: user.id, userName: user.username })}>
                    <Icon name="comments" size={30} color={COLORS.dark} />
                </TouchableOpacity>
            </View>
            <View style={styles.detailsSection}>
                <Text style={styles.price}>
                    <Icon1 name="monetization-on" size={15} color="#4CAF50" /> {land.price}
                </Text>
                <Text style={styles.price}>
                    <Icon name="envelope" size={15} color="#FF9800" /> {land.User.email}
                </Text>
                <Text style={styles.price}>
                    <Icon2 name="phone" size={15} color="#2196F3" /> {land.User.phoneNumber}
                </Text>
                <Text style={styles.location}>
                    <Icon2 name="location-pin" size={15} color="#F44336" /> {land.User.location}
                </Text>
                <Button
                    icon={<Icon name="arrow-right" size={15} color="white" />}
                    title={hasRequested ? 'You have already sent a request' : `Contact ${land.User.firstName}`}
                    buttonStyle={styles.contactButton}
                    onPress={() => navigation.navigate('TermsAndConditions', { user, land })}
                    disabled={hasRequested}
                />
            </View>
            <Text style={styles.description}>{land.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    image: {
        width: '100%',
        height: 300,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 10,
    },
    detailsSection: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    price: {
        fontSize: 22,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 18,
        color: COLORS.dark,
        marginVertical: 5,
    },
    contactButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
    },
    description: {
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20,
    },
});

export default ViewLandDetails;
