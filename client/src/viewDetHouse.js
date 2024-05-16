import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import COLORS from './consts/colors';
import { Button } from 'react-native-elements';

const featureIcons = {
    Garage: "garage",
    Pool: "swimming-pool",
    Garden: "tree",
    Fireplace: "fire-alt",
    Unknown: "question-circle"
};

const energyIcons = {
    A: "battery-full",
    B: "battery-three-quarters",
    C: "battery-half",
    D: "battery-quarter",
    E: "battery-empty",
    Unknown: "battery-slash"
};

const viewIcons = {
    Mountain: "mountain",
    City: "city",
    Beach: "umbrella-beach",
    Unknown: "eye-slash"
};

const indoorIcons = {
    Kitchen: "kitchen",
    Bedroom: "bed",
    Bathroom: "bath",
    LivingRoom: "couch",
    Unknown: "question"
};

const getIcon = (detail, category) => {
    const iconSets = {
        Features: featureIcons,
        Energy: energyIcons,
        View: viewIcons,
        Indoor: indoorIcons
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

    const { house, info } = route.params;
    console.log(house.UserId,'aaa')

    

    // Ensure house.Views and house.Indoors are defined and default to empty array if not
    const uniqueViews = house.Views ? [...new Set(house.Views.map(view => view.options))] : [];
    const uniqueIndoors = house.Indoors ? [...new Set(house.Indoors.map(indoor => indoor.options))] : []
    return (
        
        <ScrollView style={styles.container}>
            <Image source={{ uri: house.image }} style={styles.image} />
            <Text style={styles.title}>{house.title}</Text>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => {}}>
                    <Icon name="heart" size={30} color={COLORS.dark} solid />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <Icon name="comments" size={30} color={COLORS.dark} />
                </TouchableOpacity>
            </View>

            <View style={styles.detailsSection}>
                <Text style={styles.price}>
                    <Icon1 name="monetization-on" size={15} color="#4CAF50" /> {house.price}
                </Text>
                <Text style={styles.price}>
                    <Icon name="envelope" size={15} color="#FF9800" /> {info.email}
                </Text>
                <Text style={styles.price}>
                    <Icon2 name="phone" size={15} color="#2196F3" /> {info.phoneNumber}
                </Text>
                <Text style={styles.location}>
                    <Icon2 name="location-pin" size={15} color="#F44336" /> {house.location}
                </Text>
                <Button
                    icon={<Icon name="arrow-right" size={15} color="white" />}
                    title={`Contact ${info.firstName}`}
                    buttonStyle={styles.contactButton}
                    onPress={() => navigation.navigate('TermsAndConditions', { UserId: house.UserId, houseId: house.id })}
                />
            </View>
            <HouseDetail category="View" details={uniqueViews} />
            <HouseDetail category="Indoor" details={uniqueIndoors} />

            <Text style={styles.description}>{house.description}</Text>
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
        borderWidth: 1,
        borderColor: '#ccc'
    },
    detailText: {
        marginLeft: 10,
        fontSize: 16,
        color: COLORS.dark
    },
    description: {
        fontSize: 16,
        marginHorizontal: 20,
        marginTop: 20,
    },
});

export default ViewHouseDetails;