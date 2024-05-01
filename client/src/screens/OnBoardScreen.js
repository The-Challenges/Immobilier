import React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import COLORS from '../consts/colors';

const { width } = Dimensions.get('window');

const OnBoardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {/* Image carousel */}
        <Image
          source={require('../assets/onboardImage.jpg')}
          style={[style.image, {width}]}
        />
        <Image
          source={require('../assets/sell-land.jpg')}
          style={[style.image, {width}]}
        />
        <Image
          source={require('../assets/sell-land2.jpg')}
          style={[style.image, {width}]}
        />

        <Image
          source={require('../assets/house12.jpg')}
          style={[style.image, {width}]}
        />


        {/* Add more images here as needed */}
      </ScrollView>

      {/* Indicator container */}
      <View style={style.indicatorContainer}>
        <View style={style.indicator}/>
        <View style={style.indicator}/>
        <View style={[style.indicator, style.indicatorActive]} />
      </View>

      {/* Title and text container */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {/* Title container */}
        <View>
          <Text style={style.title}>Find your</Text>
          <Text style={style.title}>sweet home</Text>
          <Text style={style.title}>Explore vast landscapes and opportunities.</Text>

        </View>

        {/* Text container */}
        <View style={{ marginTop: 10 }}>
          <Text style={style.textStyle}>
            Schedule visits in just a few clicks
          </Text>
          <Text style={style.textStyle}>Visit in just a few clicks</Text>
        </View>
      </View>

      {/* Button container */}
      <View style={{ justifyContent: 'flex-end', paddingBottom: 40 }}>
        {/* button */}
        <Pressable onPress={() => navigation.navigate('HomeScreen')}>
          <View style={style.btn}>
            <Text style={{ color: 'white' }}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: 420,
    borderBottomLeftRadius: 200,
  },
  indicatorContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -20, 
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.dark,
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 32, fontWeight: 'bold' },
  textStyle: {fontSize: 19, color: COLORS.black},
});

export default OnBoardScreen;
