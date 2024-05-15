// import React from 'react';
// import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon1 from 'react-native-vector-icons/Feather'
// import Icon2 from 'react-native-vector-icons/AntDesign';
// import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

// import Search from './SearchBar';

// const Listings = () => {
//   const handleBuyPress = () => {
//     Alert.alert('sended succefully', 'You will receive an email!');
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>

//         <Text style={styles.title}>All Post</Text>

//         {/* First Image */}
//         <Search />
// <View style={styles.emptySpace} />
//         <View style={styles.listingContainer}>
//           <Image
//             source={require('../../images/ppp.jpg')}
//             style={styles.image}
//           />
//           <TouchableOpacity onPress={handleBuyPress} style={styles.buyButtonContainer}>
//             <Text style={styles.buyButton}>Buy</Text>
//           </TouchableOpacity>

//           <Text style={styles.imageTitle}>Dar Essallam</Text>

//           <View style={styles.iconContainer}>

//             <View style={styles.iconRow}>
//               <Icon name="map-marker" size={25} color="#666" />
//               <Text style={styles.iconText}>Hammamet</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon1 name="dollar-sign" size={20} color="#666" marginLeft={15} />
//               <Text style={styles.iconText}>1M</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon2 name="car" size={20} color="#666" marginLeft={15} />
//               <Text style={styles.iconText}>2</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon name="bathtub" size={20} color="#666" marginLeft={15} />
//               <Text style={styles.iconText}>2</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon3 name="slash-forward" size={20} color="#666" />
//               <Text style={styles.iconText}>House</Text>
//             </View>
//           </View>
//         </View>

//         {/* Second Image */}
        
//         <View style={styles.listingContainer}>
//           <Image
//             source={require('../../images/ppp.jpg')}
//             style={styles.image}
//           />
//           <TouchableOpacity onPress={handleBuyPress} style={styles.buyButtonContainer}>
//             <Text style={styles.buyButton}>Buy</Text>
//           </TouchableOpacity>

//           <Text style={styles.imageTitle}>Dar Essallam</Text>

//           <View style={styles.iconContainer}>

//             <View style={styles.iconRow}>
//               <Icon name="map-marker" size={25} color="#666" />
//               <Text style={styles.iconText}>Hammamet</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon1 name="dollar-sign" size={20} color="#666" marginLeft={15} />
//               <Text style={styles.iconText}>1M</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon2 name="car" size={20} color="#666" marginLeft={15} />
//               <Text style={styles.iconText}>2</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon name="bathtub" size={20} color="#666" marginLeft={15} />
//               <Text style={styles.iconText}>2</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon3 name="slash-forward" size={20} color="#666" />
//               <Text style={styles.iconText}>House</Text>
//             </View>
//           </View>
//         </View>

//         {/* Third Image */}
//         <View style={styles.listingContainer}>
//           <Image
//             source={require('../../images/ppp.jpg')}
//             style={styles.image}
//           />
//           <TouchableOpacity onPress={handleBuyPress} style={styles.buyButtonContainer}>
//             <Text style={styles.buyButton}>Buy</Text>
//           </TouchableOpacity>

//           <Text style={styles.imageTitle}>Dar Essallam</Text>

//           <View style={styles.iconContainer}>

//             <View style={styles.iconRow}>
//               <Icon name="map-marker" size={25} color="#666" />
//               <Text style={styles.iconText}>Hammamet</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon1 name="dollar-sign" size={20} color="#666" marginLeft={15} />
//               <Text style={styles.iconText}>1M</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon2 name="car" size={20} color="#666" marginLeft={15} />
//               <Text style={styles.iconText}>2</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon name="bathtub" size={20} color="#666" marginLeft={15} />
//               <Text style={styles.iconText}>2</Text>
//             </View>

//             <View style={styles.iconRow}>
//               <Icon3 name="slash-forward" size={20} color="#666" />
//               <Text style={styles.iconText}>House</Text>
//             </View>
//           </View>
//         </View>

//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
    
//   },
//   emptySpace: {
//     height: 15, // Adjust as needed
//   },
//   title: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign:'center'
//   },
//   listingContainer: {
//     marginBottom: 20,
//     alignItems:'center'
//   },
//   image: {
//     width: 600,
//     height: 230,
//     resizeMode: 'contain',
//     marginBottom: 10,
//     // borderRadius:10
//   },
//   buyButtonContainer: {
//     position: 'absolute',
//     bottom: 270,
//     right: 101,
//   },
//   buyButton: {
//     fontSize: 18,
//     color: 'white',
//     padding: 8,
//     borderRadius: 1,
//     backgroundColor: 'dodgerblue',
//     borderWidth: 3,
//     borderColor: 'dodgerblue',
//   },
//   imageTitle: {
//     fontSize: 20,
//     marginTop: 10,
//     marginRight: 250,
//     color: 'black',
//     fontFamily: 'sans-serif-medium',
//     fontWeight: 'normal',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 10,
//     width: '90%',
//   },
//   iconRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconText: {
//     fontSize: 18,
//     color: '#666',
//     marginLeft: 5,
//   },
// });

// export default Listings;
