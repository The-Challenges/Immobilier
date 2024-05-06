// import React, { useState } from 'react';
// import { View, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon2 from 'react-native-vector-icons/Entypo';
// import Icon3 from 'react-native-vector-icons/EvilIcons';
// import Icon4 from 'react-native-vector-icons/MaterialIcons';
// import Icon5 from 'react-native-vector-icons/FontAwesome5';
// import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons'
// import Icon7 from 'react-native-vector-icons/Ionicons'

// import Modal from 'react-native-modal';


// const SearchBar = () => {
//   const [searchText, setSearchText] = useState('');
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible)
//   }

// //   const categories = ['Beach', 'City', 'Compagne', 'Countryside', 'Tendance','Piscine','Ferme','Desert'];

//   const categories = [
//     { name: 'Beach', icon: <Icon5 name="umbrella-beach" size={16} color="#333" /> },
//     { name: 'City', icon: <Icon6 name="city" size={16} color="#333" /> },
//     { name: 'Land', icon: <Icon6 name="mountain" size={16} color="#333" /> },
//    { name: 'Tendance', icon: <Icon4 name="local-fire-department" size={16} color="#333" /> },
//    { name: 'Piscine', icon: <Icon4 name="houseboat" size={16} color="#333" /> },
//    { name: 'Ferme', icon: <Icon name="tree" size={16} color="#333" /> },
//    { name: 'Desert', icon: <Icon name="sun-o" size={16} color="#333" /> }
//   ];

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TouchableOpacity onPress={toggleModal}>
//           {/* <Icon3 name="search" size={24} color="#333" /> */}
//         </TouchableOpacity>
//         <TextInput
//           style={styles.input}
//           placeholder="Search"
//           onChangeText={setSearchText}
//           value={searchText}
//         />
//         <TouchableOpacity onPress={toggleModal}>
//           <Icon3 name="search" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
//         {categories.map((category, index) => (
//           <TouchableOpacity key={index} style={styles.category}>
//             {category.icon}
//             <Text style={styles.categoryText}>{category.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
//         <Text style={styles.filterButtonText}>Filters</Text>
//       </TouchableOpacity>
//       <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
//         <View style={styles.modalContent}>
//           <Text>Filter Modal</Text>
//           {/* Add your filter options here */}
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#eee',
//     borderRadius: 10,
//     padding: 5,
//   },
//   input: {
//     flex: 1,
//     marginLeft: 10,
//     marginRight: 10,
//     fontSize: 16,
//   },
//   categoriesContainer: {
//     marginTop: 10,
//     paddingBottom: 10,
//   },
//   category: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     marginRight: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//     marginTop:5,
//     marginBottom:550,
    
//   },
//   categoryText: {
//     fontSize: 16,
//   },
//   filterButton: {
//     backgroundColor: '#ff5a5f',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     alignItems: 'center',
//     marginTop: 10,
//     alignSelf: 'flex-end',
//   },
//   filterButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 4,
//     borderColor: 'rgba(0, 0, 0, 0.1)',
//   },
// });

// export default SearchBar;
