import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

const {width} = Dimensions.get('screen');

const DetailsScreen = ({navigation, route: {params: house}}) => {
  // Component for rendering each interior image
  const InteriorCard = ({interior}) => {
    return <Image source={interior} style={styles.interiorImage} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}
        <View style={styles.backgroundImageContainer}>
        <ImageBackground style={styles.backgroundImage} source={{ uri: 'https://www.homelane.com/blog/wp-content/uploads/2022/11/common-house-style-in-America.jpg' }}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerBtn} onPress={navigation.goBack}>
                <Icon name="arrow-back-ios" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerBtn}>
                <Icon name="favorite" size={20} color={COLORS.red} />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          {/* Virtual Tag View */}
          <View style={styles.virtualTag}>
            <Text style={styles.virtualTagText}>Virtual tour</Text>
          </View>
        </View>

        {/* Details container */}
        <View style={styles.detailsContainer}>
          {/* Name and rating view container */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{house.title}</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingTag}>
                <Text style={styles.ratingText}>4.8</Text>
              </View>
              <Text style={styles.ratingCount}>155 ratings</Text>
            </View>
          </View>

          {/* Location text */}
          <Text style={styles.location}>{house.location}</Text>

          {/* Facilities container */}
          <View style={styles.facilityContainer}>
            <View style={styles.facility}>
              <Icon name="hotel" size={18} />
              <Text style={styles.facilityText}>2</Text>
            </View>
            <View style={styles.facility}>
              <Icon name="bathtub" size={18} />
              <Text style={styles.facilityText}>2</Text>
            </View>
            <View style={styles.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={styles.facilityText}>100m area</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{house.details}</Text>

          {/* Interior list */}
          <FlatList
            contentContainerStyle={styles.interiorList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
            data={house.interiors}
            renderItem={({item}) => <InteriorCard interior={item} />}
          />

          {/* Footer container */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.price}>$1,500</Text>
              <Text style={styles.totalPrice}>Total Price</Text>
            </View>
            <TouchableOpacity style={styles.bookNowBtn}>
              <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 350,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualTagText: {
    color: COLORS.white,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.white,
  },
  ratingCount: {
    fontSize: 13,
    marginLeft: 5,
    color: COLORS.grey,
  },
  location: {
    fontSize: 16,
    color: COLORS.grey,
    marginTop: 10,
  },
  facilityContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  facility: {
    flexDirection: 'row',
    marginRight: 15,
  },
  facilityText: {
    marginLeft: 5,
    color: COLORS.grey,
  },
  description: {
    marginTop: 20,
    color: COLORS.grey,
  },
  interiorList: {
    marginTop: 20,
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  price: {
    color: COLORS.blue,
    fontWeight: 'bold',
    fontSize: 18,
  },
  totalPrice: {
    fontSize: 12,
    color: COLORS.grey,
    fontWeight: 'bold',
  },
  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  bookNowText: {
    color: COLORS.white,
  },
});

export default DetailsScreen;
