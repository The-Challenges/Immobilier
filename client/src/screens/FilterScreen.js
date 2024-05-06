// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Button,
//   Dimensions
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon1 from 'react-native-vector-icons/AntDesign';
// import Slider from '@react-native-community/slider';
// import COLORS from '../consts/colors';

// const { width } = Dimensions.get('screen');
// const getImageSource = (type) => {
//   switch (type) {
//     case 'house':
//       return require('../assets/maison.png');
//     case 'land':
//       return require('../assets/land.png');
//     default:
//       return require('../assets/house1.jpg');
//   }
// };

// const FilterScreen = ({ navigation }) => {
//   const [propertyType, setPropertyType] = useState('home');
//   const [price, setPrice] = useState([400, 3400]);
//   const [area, setArea] = useState([500, 2000]);
//   const [transactionType, setTransactionType] = useState('buy');

//   const applyFilters = () => {
//     console.log('Filters:', { transactionType, propertyType, price, area });
//     navigation.goBack();
//   };

//   const resetFilters = () => {
//     setTransactionType('buy');
//     setPropertyType('home');
//     setPrice([400, 3400]);
//     setArea([500, 2000]);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Icon1 name="arrowleft" size={30} color="#6495ed" onPress={() => navigation.goBack()} style={styles.backIcon} />
//         <Text style={styles.headerTitle}>Filter</Text>
//       </View>

//       <View style={styles.transactionTypeContainer}>
//         <TouchableOpacity
//           style={[styles.transactionButton, transactionType === 'buy' ? styles.transactionButtonActive : {}]}
//           onPress={() => setTransactionType('buy')}>
//           <Text style={[styles.transactionText, { color: transactionType === 'buy' ? '#fff' : '#6495ed' }]}>Buy</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.transactionButton, transactionType === 'sell' ? styles.transactionButtonActive : {}]}
//           onPress={() => setTransactionType('sell')}>
//           <Text style={[styles.transactionText, { color: transactionType === 'sell' ? '#fff' : '#6495ed' }]}>Sell</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.sectionTitle}>Type</Text>
//       <View style={styles.typeContainer}>
//         {['house', 'land'].map((type, index) => (
//           <TouchableOpacity key={index} style={styles.typeButton} onPress={() => setPropertyType(type)}>
//             <Image source={getImageSource(type)} style={styles.typeIcon} />
//             <Text style={styles.typeText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Text style={styles.sectionTitle}>Price Range</Text>
//       <Slider
//         style={styles.slider}
//         minimumValue={400}
//         maximumValue={3400}
//         step={100}
//         value={price[0]}
//         onValueChange={(value) => setPrice([value, price[1]])}
//         minimumTrackTintColor={COLORS.primary}
//         maximumTrackTintColor={COLORS.light}
//         thumbTintColor={COLORS.primary}
//       />
//       <Text style={styles.valueText}>{`$${price[0]} - $${price[1]}`}</Text>

//       <Text style={styles.sectionTitle}>Area (sqft)</Text>
//       <Slider
//         style={styles.slider}
//         minimumValue={100}
//         maximumValue={5000}
//         step={50}
//         value={area[0]}
//         onValueChange={(value) => setArea([value, area[1]])}
//         minimumTrackTintColor={COLORS.primary}
//         maximumTrackTintColor={COLORS.light}
//         thumbTintColor={COLORS.primary}
//       />
//       <Text style={styles.valueText}>{`${area[0]} sqft - ${area[1]} sqft`}</Text>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={resetFilters}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button, { backgroundColor:'#1e90ff' }]} onPress={applyFilters}>
//           <Text style={[styles.buttonText, { color: COLORS.white }]}>Apply</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: COLORS.white,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   backIcon: {
//     marginRight: 20,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#8b4513',
//   },
//   transactionTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 30,
//   },

//   transactionButton: {
//     backgroundColor: COLORS.white,
//     padding: 10,
//     borderRadius: 30,
//     width: '45%',
//     alignItems: 'center',
//     borderColor: '#1e90ff',
//     borderWidth:1.5,
//   },

//   transactionButtonActive: {
//     backgroundColor: '#1e90ff',
//   },

//   transactionText: {
//     fontWeight: 'bold',
//     fontSize:17,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#8b4513',
//   },

//   typeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 30,
//   },

//   typeButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   typeIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//   },

//   typeText: {
//     fontSize: 17,
//     color: COLORS.dark,
//     fontWeight: 'italic',

//   },

//   slider: {
//     width: '100%',
//     height: 20,
//   },

//   valueText: {
//     textAlign: 'center',
//     fontSize: 19,
//     marginVertical: 10,
//     color:'grey'
//   },

//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },

//   button: {
//     flex: 1,
//     backgroundColor: COLORS.light,
//     paddingVertical: 14,
//     marginHorizontal: 9,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default FilterScreen;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions
// } from 'react-native';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon1 from 'react-native-vector-icons/AntDesign';
// import { Picker } from '@react-native-picker/picker';
// import COLORS from '../consts/colors';

// const { width } = Dimensions.get('screen');

// const priceOptions = [400, 800, 1200, 1600, 2000, 2400, 2800, 3200, 3600];
// const areaOptions = [500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500];


// function getImageSource(type) {
//   switch (type) {
//     case 'house':
//       return require('../assets/maison.png');
//     case 'land':
//       return require('../assets/land.png');
//     default:
//       return require('../assets/house1.jpg');
//   }
// }


// const FilterScreen = ({ navigation }) => {
//   const [propertyType, setPropertyType] = useState('home');
//   const [priceMin, setPriceMin] = useState(400);
//   const [priceMax, setPriceMax] = useState(3400);
//   const [areaMin, setAreaMin] = useState(500);
//   const [areaMax, setAreaMax] = useState(2000);
//   const [transactionType, setTransactionType] = useState('buy');

//   const applyFilters = () => {
//     console.log('Filters:', { transactionType, propertyType, priceMin, priceMax, areaMin, areaMax });
//     navigation.goBack();
//   };

//   const resetFilters = () => {
//     setTransactionType('buy');
//     setPropertyType('home');
//     setPriceMin(400);
//     setPriceMax(3400);
//     setAreaMin(500);
//     setAreaMax(2000);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Icon1 name="arrowleft" size={30} color="#6495ed" onPress={() => navigation.goBack()} style={styles.backIcon} />
//         <Text style={styles.headerTitle}>Filter</Text>
//       </View>

//       {/* Transaction Type Buttons */}
//       <View style={styles.transactionTypeContainer}>
//         <TouchableOpacity
//           style={[styles.transactionButton, transactionType === 'buy' ? styles.transactionButtonActive : {}]}
//           onPress={() => setTransactionType('buy')}>
//           <Text style={[styles.transactionText, { color: transactionType === 'buy' ? '#fff' : '#6495ed' }]}>Buy</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.transactionButton, transactionType === 'sell' ? styles.transactionButtonActive : {}]}
//           onPress={() => setTransactionType('sell')}>
//           <Text style={[styles.transactionText, { color: transactionType === 'sell' ? '#fff' : '#6495ed' }]}>Sell</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Property Type Selection */}
//       <Text style={styles.sectionTitle}>Type</Text>
//       <View style={styles.typeContainer}>
//         {['house', 'land'].map((type, index) => (
//           <TouchableOpacity key={index} style={styles.typeButton} onPress={() => setPropertyType(type)}>
//             <Image source={getImageSource(type)} style={styles.typeIcon} />
//             <Text style={styles.typeText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Price Range Selection */}
//       <Text style={styles.sectionTitle}>Price Range</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={priceMin}
//           onValueChange={(itemValue) => setPriceMin(itemValue)}
//           style={styles.picker}>
//           {priceOptions.map((option) => (
//             <Picker.Item label={`$${option}`} value={option} key={option} />
//           ))}
//         </Picker>
//         <Picker
//           selectedValue={priceMax}
//           onValueChange={(itemValue) => setPriceMax(itemValue)}
//           style={styles.picker}>
//           {priceOptions.map((option) => (
//             <Picker.Item label={`$${option}`} value={option} key={option} />
//           ))}
//         </Picker>
//       </View>
//       <Text style={styles.valueText}>{`$${priceMin} - $${priceMax}`}</Text>

//       {/* Area Range Selection */}
//       <Text style={styles.sectionTitle}>Area (sqft)</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={areaMin}
//           onValueChange={(itemValue) => setAreaMin(itemValue)}
//           style={styles.picker}>
//           {areaOptions.map((option) => (
//             <Picker.Item label={`${option} sqft`} value={option} key={option} />
//           ))}
//         </Picker>
//         <Picker
//           selectedValue={areaMax}
//           onValueChange={(itemValue) => setAreaMax(itemValue)}
//           style={styles.picker}>
//           {areaOptions.map((option) => (
//             <Picker.Item label={`${option} sqft`} value={option} key={option} />
//           ))}
//         </Picker>
//       </View>
//       <Text style={styles.valueText}>{`${areaMin} sqft - ${areaMax} sqft`}</Text>

//       {/* Filter Buttons */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={resetFilters}>
//           <Text style={styles.buttonText}>Reset</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button, { backgroundColor: '#1e90ff' }]} onPress={applyFilters}>
//           <Text style={[styles.buttonText, { color: COLORS.white }]}>Apply</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// // Add StyleSheet updates here



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: COLORS.white,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   backIcon: {
//     marginRight: 20,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#8b4513',
//   },
//   transactionTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 30,
//   },
//   transactionButton: {
//     backgroundColor: COLORS.white,
//     padding: 10,
//     borderRadius: 30,
//     width: '45%',
//     alignItems: 'center',
//     borderColor: '#1e90ff',
//     borderWidth: 1.5,
//   },
//   transactionButtonActive: {
//     backgroundColor: '#1e90ff',
//   },
//   transactionText: {
//     fontWeight: 'bold',
//     fontSize: 17,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#8b4513',
//   },
//   typeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 30,
//   },
//   typeButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   typeIcon: {
//     width: 50,
//     height: 50,
//     marginBottom: 10,
//   },
//   typeText: {
//     fontSize: 17,
//     color: COLORS.dark,
//     fontWeight: 'italic',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   picker: {
//     flex: 1,
//   },
//   valueText: {
//     textAlign: 'center',
//     fontSize: 19,
//     marginVertical: 10,
//     color: 'grey'
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   button: {
//     flex: 1,
//     backgroundColor: COLORS.light,
//     paddingVertical: 14,
//     marginHorizontal: 9,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default FilterScreen;


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import COLORS from '../consts/colors';

const { width } = Dimensions.get('screen');

const priceOptions = [400, 800, 1200, 1600, 2000, 2400, 2800, 3200, 3600];
const areaOptions = [500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500];
const bedroomOptions = [1, 2, 3, 4, 5, 6];
const bathroomOptions = [1, 2, 3, 4];

function getImageSource(type) {
  switch (type) {
    case 'house':
      return require('../assets/maison.png');
    case 'land':
      return require('../assets/land.png');
    default:
      return require('../assets/house1.jpg');
  }
}

const FilterScreen = ({ navigation }) => {
  const [propertyType, setPropertyType] = useState('home');
  const [priceMin, setPriceMin] = useState(400);
  const [priceMax, setPriceMax] = useState(3400);
  const [areaMin, setAreaMin] = useState(500);
  const [areaMax, setAreaMax] = useState(2000);
  const [transactionType, setTransactionType] = useState('buy');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const applyFilters = () => {
    console.log('Filters:', { transactionType, propertyType, priceMin, priceMax, areaMin, areaMax, bedrooms, bathrooms });
    navigation.goBack();
  };

  const resetFilters = () => {
    setTransactionType('buy');
    setPropertyType('home');
    setPriceMin(400);
    setPriceMax(3400);
    setAreaMin(500);
    setAreaMax(2000);
    setBedrooms(1);
    setBathrooms(1);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon1 name="arrowleft" size={30} color="#6495ed" onPress={() => navigation.goBack()} style={styles.backIcon} />
        <Text style={styles.headerTitle}>Filter</Text>
      </View>

      {/* Transaction Type Buttons */}
      <View style={styles.transactionTypeContainer}>
        <TouchableOpacity
          style={[styles.transactionButton, transactionType === 'buy' ? styles.transactionButtonActive : {}]}
          onPress={() => setTransactionType('buy')}>
          <Text style={[styles.transactionText, { color: transactionType === 'buy' ? '#fff' : '#6495ed' }]}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.transactionButton, transactionType === 'sell' ? styles.transactionButtonActive : {}]}
          onPress={() => setTransactionType('sell')}>
          <Text style={[styles.transactionText, { color: transactionType === 'sell' ? '#fff' : '#6495ed' }]}>Sell</Text>
        </TouchableOpacity>
      </View>

      {/* Property Type Selection */}
      <Text style={styles.sectionTitle}>Type</Text>
      <View style={styles.typeContainer}>
        {['house', 'land'].map((type, index) => (
          <TouchableOpacity key={index} style={styles.typeButton} onPress={() => setPropertyType(type)}>
            <Image source={getImageSource(type)} style={styles.typeIcon} />
            <Text style={styles.typeText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bedroom and Bathroom Selection */}
      <Text style={styles.sectionTitle}>Bedrooms</Text>
      <Picker
        selectedValue={bedrooms}
        onValueChange={(itemValue) => setBedrooms(itemValue)}
        style={styles.picker}>
        {bedroomOptions.map(option => (
          <Picker.Item label={`${option}+ BR`} value={option} key={option} />
        ))}
      </Picker>

      <Text style={styles.sectionTitle}>Bathrooms</Text>
      <Picker
        selectedValue={bathrooms}
        onValueChange={(itemValue) => setBathrooms(itemValue)}
        style={styles.picker}>
        {bathroomOptions.map(option => (
          <Picker.Item label={`${option}+ BA`} value={option} key={option} />
        ))}
      </Picker>

      {/* Price and Area Range Selection */}
      <Text style={styles.sectionTitle}>Price Range</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priceMin}
          onValueChange={(itemValue) => setPriceMin(itemValue)}
          style={styles.picker}>
          {priceOptions.map(option => (
            <Picker.Item label={`$${option}`} value={option} key={option} />
          ))}
        </Picker>
        <Picker
          selectedValue={priceMax}
          onValueChange={(itemValue) => setPriceMax(itemValue)}
          style={styles.picker}>
          {priceOptions.map(option => (
            <Picker.Item label={`$${option}`} value={option} key={option} />
          ))}
        </Picker>
      </View>
      <Text style={styles.valueText}>{`$${priceMin} - $${priceMax}`}</Text>

      <Text style={styles.sectionTitle}>Area (sqft)</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={areaMin}
          onValueChange={(itemValue) => setAreaMin(itemValue)}
          style={styles.picker}>
          {areaOptions.map(option => (
            <Picker.Item label={`${option} sqft`} value={option} key={option} />
          ))}
        </Picker>
        <Picker
          selectedValue={areaMax}
          onValueChange={(itemValue) => setAreaMax(itemValue)}
          style={styles.picker}>
          {areaOptions.map(option => (
            <Picker.Item label={`${option} sqft`} value={option} key={option} />
          ))}
        </Picker>
      </View>
      <Text style={styles.valueText}>{`${areaMin} sqft - ${areaMax} sqft`}</Text>

      {/* Filter Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={resetFilters}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#1e90ff' }]} onPress={applyFilters}>
          <Text style={[styles.buttonText, { color: COLORS.white }]}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styling for the FilterScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8b4513',
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  transactionButton: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
    borderColor: '#1e90ff',
    borderWidth: 1.5,
  },
  transactionButtonActive: {
    backgroundColor: '#1e90ff',
  },
  transactionText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8b4513',
    // just add it now 
    textAlign: 'center'
    // just add it now
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  typeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  typeText: {
    fontSize: 17,
    color: COLORS.dark,
    fontWeight: 'italic',
  },

  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30, // Add more space below the pickers
    paddingHorizontal: 20, // Increase horizontal padding for better spacing
    backgroundColor: '#f0f0f0', // Light grey background for the container
    borderRadius: 10, // Rounded corners for the container
    borderWidth: 1,
    borderColor: '#d1d1d1',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  picker: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#ffffff', // White background for the picker
    borderRadius: 10, // Rounded corners for the picker
  },

  valueText: {
    textAlign: 'center',
    fontSize: 19,
    marginVertical: 10,
    color: 'grey'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.light,
    paddingVertical: 14,
    marginHorizontal: 9,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: COLORS.white,
  },
});

export default FilterScreen;
