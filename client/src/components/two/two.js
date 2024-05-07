import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView, Text, Button } from 'react-native';

const { width, height } = Dimensions.get('window');

const ImageSwiper = ({navigation}) => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      id: 1,
      uri: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_640.jpg',
      description: 'Beautiful family home with spacious garden.'
    },
    {
      id: 2,
      uri: 'https://st.hzcdn.com/simgs/pictures/exteriors/maryland-waterfront-estate-mason-construction-company-img~e7613f3709e16e8d_3-9758-1-8105de8.jpg',
      description: 'Beautiful family home with spacious garden.'
    },
    {
      id: 3,
      uri: 'https://st4.depositphotos.com/3418487/38952/i/450/depositphotos_389529602-stock-photo-aerial-view-land-positioning-point.jpg',
      description: 'Beautiful family home with spacious garden.'
    },
    
    {
        id:4,
        uri:'https://s3-alpha-sig.figma.com/img/afd9/c51e/8568c90af010f21200058b645454f2ea?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TIexDTFQozNVh1uG8~fKi-AEXTf5MXLPHjXPUA0eUlK5dyJ50c0C7UKjMRfVfMzLEWlchmRLSbyMmrT-XnopMoZNJrfIpaPqFMJz4n7stUfd6LjWkrbTJZaObPAl39dXd3vQaAvnarfg040-c8gJ5cjTQz3dGB0ZtDefEr1xq1CosAPD2K9cNr-njaQeZMrPSFkZKDWTpJCKvNE1Jh0reIdhHABeJazDYfmsDLTu09~oBS957OKS6AXMDDYlkDjBQliiHhgxx335CMuAizPZqBsv0-J1ZxlV0J0n-5gbcsH0cU5UJicJ6g8ByAGEG24Ei37hxlwtSk6glewdOvX03w__',
        description: 'Beautiful family home with spacious garden.'
    },
    {
        id:5,
        uri:'https://s3-alpha-sig.figma.com/img/57df/7cd7/025c966928acf36ffd8c9dddc2574ab2?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qu-CHwvOCmT49UiQYyhNmkIT~tPnsT3OBvAQD1aCgAupgbLQfIhcDBrZe3hlZLZaibjrIECl2194eigGVLM2hjjzIohsTudVwwmnj8-JdzPk9iuyVdkwuZh894b~qw7skM6es46Fvd9k3k77aPIWsQ2E7d76ynBpw5J39TKa57lRKCqVCRtLALzmhj5iCy4147IX7PgE45W13jbFhk2lB82IXJDfNJhnioOiY4aQwnekcyZ5pXX9uCh6y-5H6h2fWJS3AI0ANC-jnfyg7pbTY7wEMvQbgHlvafqYsqp7kh-bBbstzZpECbPnNkDslciC99TpMaojt5kAGj~WFvb3Vg__',
        description: 'Beautiful family home with spacious garden.'
    },
    {
        id:6,
        uri:'https://s3-alpha-sig.figma.com/img/e206/863a/9752050b77e1e38b87ece1b5aacfe5a6?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kJpSrNoWLsCKCR6Qu-~XCsQUMCJbaDmW9DruXYcIlKT8xhXHGe9alKoW22z-bBa-L26jsSkKUgGCqlT4v9bwTqiwhwVTF~GZaPTTfgSGNL-nf3-sh2ox0XEIJFSDdcAWmXND9Cgw~gjhh-UWfIP~1Lre2upQtIzAUznH2Txp2yG05wOEjGu4LhXzD8FNypdf2G9VvPm9cVseFcyE8gTc33cL12Z-149tXPinQ6PTch-yzb~NDZWpQFFoaRlHEKvPb-zqRdAWlCU8qzwVXOEAlSZx3iLJlWAYDGeRLF~C5u00LoLCownwcSUXclYdySvDumlzHh~T5LlFs0-ygl6sIg__',
        description: 'Beautiful family home with spacious garden.'
    }

  ];

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setCurrentIndex(index);

    // Check if the last image has been reached
    if (index === images.length - 1) {
      // Navigate to the next page after a delay
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000); 
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {images.map(image => (
          <View key={image.id} style={styles.imageContainer}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <Text style={styles.description}>{image.description}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://i.ibb.co/wWMcYf3/Screenshot-11.png' }}
          style={styles.logo}
        />
      </View>
      <Button onPress={() => navigation.navigate('Login')} title="Skip to login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    width,
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginVertical: 140,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  description: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
})

export default ImageSwiper;
