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
  Button,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
const {width} = Dimensions.get('screen');
const DetailsScreen = ({ navigation, route }) => {
  const { house } = route.params;  // Ensure 'house' is destructured correctly

  // Continue with the rest of your component setup...


  
  const InteriorCard = ({interior}) => {
    return <Image source={interior} style={style.interiorImage} />;
  };
  const navig=()=>{
    navigation.navigate('DetailsScreen', { house: houseData })
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* House image */}

        <View style={style.backgroundImageContainer}>
          <ImageBackground style={style.backgroundImage} source={house.image}>
            <View style={style.header}>
              <View style={style.headerBtn}>
                <Icon
                  name="arrow-back-ios"
                  size={20}
                  onPress={navigation.goBack}
                />
              </View>
              <View style={style.headerBtn}>
                <Icon name="favorite" size={20} color={COLORS.red} />
              </View>
            </View>
          </ImageBackground>

          {/* Virtual Tag View */}
          <View style={style.virtualTag}>
            <Text style={{color: COLORS.white}}>Virtual tour</Text>
          </View>
        </View>


        <View style={style.detailsContainer}>
          {/* Name and rating view container */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {house.title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={style.ratingTag}>
                <Text style={{color: COLORS.white}}>4.8</Text>
              </View>
              <Text style={{fontSize: 13, marginLeft: 5}}>155 ratings</Text>
            </View>
          </View>

          {/* Location text */}
          <Text style={{fontSize: 16, color: COLORS.grey}}>
            {house.location}
          </Text>

          {/* Facilities container */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={style.facility}>
              <Icon name="hotel" size={18} />
              <Text style={style.facilityText}>2</Text>
            </View>
            <View style={style.facility}>
              <Icon name="bathtub" size={18} />
              <Text style={style.facilityText}>2</Text>
            </View>
            <View style={style.facility}>
              <Icon name="aspect-ratio" size={18} />
              <Text style={style.facilityText}>100m area</Text>
            </View>
          </View>
          <Text style={{marginTop: 20, color: COLORS.grey}}>
            {house.details}
          </Text>

          {/* Interior list */}
          <FlatList
            contentContainerStyle={{marginTop: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => key.toString()}
            data={house.interiors}
            renderItem={({item}) => <InteriorCard interior={item} />}
          />

          {/* footer container */}
<View style={style.footer}>
  <View>
    <Text
      style={{color: COLORS.blue, fontWeight: 'bold', fontSize: 18}}>
      $1,500
    </Text>
    <Text
      style={{fontSize: 12, color: COLORS.grey, fontWeight: 'bold'}}>
      Total Price
    </Text>
  </View>
  <View style={style.bookNowBtn}>
  <TouchableOpacity 
    onPress={navig} 
    style={{
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%', 
    }}>
    <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Book Now</Text>
  </TouchableOpacity>
</View>

</View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
    elevation: 3, // Added elevation for a subtle shadow effect
  },

  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Added shadow for depth
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    shadowColor: '#000', // Added shadow for a more pronounced look
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },

  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1, // Added border to define image boundaries
    borderColor: COLORS.lightGrey,
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
    shadowColor: '#000', // Added shadow for a floating effect
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  bookNowBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary, // Changed to primary color for consistency
    borderRadius: 10,
    paddingHorizontal: 20,
    shadowColor: '#000', // Added shadow for button prominence
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },

detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    backgroundColor: COLORS.veryLightGrey, // Added a very light background color for a cleaner look
  },
  facility: {
    flexDirection: 'row',
    marginRight: 15,
    backgroundColor: COLORS.white, // Added background color for each facility icon
    padding: 5, // Added padding for better spacing
    borderRadius: 5, // Rounded edges for a smoother look
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  facilityText: {
    marginLeft: 5,
    color: COLORS.darkGrey, // Adjusted text color for better readability
    fontWeight: 'bold', // Bolded text for emphasis
  },});

export default DetailsScreen;