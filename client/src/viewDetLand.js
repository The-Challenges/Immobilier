import React ,{useEffect,useState}from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { IconButton, Snackbar } from 'react-native-paper';
import COLORS from './consts/colors';
import { Button } from 'react-native-elements';
import { API_AD } from '../config';
import axios from 'axios';

// Color and icon definitions (assuming FontAwesome5 supports all needed icons, replace if needed)
const accessIcons = {
    Airport: "plane-departure",
    PublicTransportation: "bus-alt",
    Highway: "road",
    RoadAccess: "car-side",
    Unknown: "question-circle"
};

const viewIcons = {
    Mountain: "mountain",
    WaterViews: "water",
    CitySkyline: "city",
    Unknown: "question-circle"
};

// Function to retrieve the correct icon element
const getIcon = (name, category) => (
    <Icon name={name} size={20} color={category === 'Access' ? COLORS.primary : COLORS.dark} />
);

// Component for displaying details with icons
const PropertyDetail = ({ category, details }) => (
    <View style={styles.detailContainer}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <View style={styles.detailRow}>
            {details.map((detail, index) => (
                <View key={index} style={styles.detailBox}>
                    {getIcon((category === 'Access' ? accessIcons[detail] : viewIcons[detail]), category)}
                    <Text style={styles.detailText}>{detail}</Text>
                </View>
            ))}
        </View>
    </View>
);

// Main component displaying the property details
const ViewLandDetails = ({ route, navigation }) => {
    const { land , user } = route.params;
    const [hasRequested, setHasRequested] = useState(false);
    // const [showSnackbar, setShowSnackbar] = useState(false);
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


    // const handleRequest = () => {
    //     if (hasRequested) {
    //         setShowSnackbar(true);
    //     } else {
    //         setShowSnackbar(false);
    //     }
    // };

    // const closeSnackbar = () => setShowSnackbar(false);
    // const uniqueAccesses = [...new Set(land.Accesses.map(access => access.options))];
    // const uniqueViews = [...new Set(land.Views.map(view => view.options))];


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
        onPress={() => navigation.navigate('TermsAndConditions', { user,land })}
        disabled={hasRequested}
    />
</View>
            {/* <PropertyDetail category="Access" details={land.Accesses} />
            <PropertyDetail category="View" details={land.Views} /> */}
            <Text style={styles.description}>{land.description}</Text>
            
        </ScrollView>
    );
};

// Styles
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
    detailContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
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
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    detailText: {
        marginLeft: 10,
        fontSize: 16,
    },
    description: {
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20,
    },
});

export default ViewLandDetails;