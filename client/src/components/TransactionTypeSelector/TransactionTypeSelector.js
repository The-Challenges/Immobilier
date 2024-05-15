// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import COLORS from '../../consts/colors';

// const TransactionTypeSelector = ({ transactionType, onSelect }) => {
//   return (
//     <View style={styles.transactionTypeContainer}>
//       <TouchableOpacity
//         style={[
//           styles.transactionButton,
//           transactionType === 'buy' ? styles.transactionButtonActive : {}
//         ]}
//         onPress={() => onSelect('buy')}
//       >
//         <Text style={[
//           styles.transactionText,
//           { color: transactionType === 'buy' ? '#fff' : '#6495ed' }
//         ]}>
//           Buy
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[
//           styles.transactionButton,
//           transactionType === 'sell' ? styles.transactionButtonActive : {}
//         ]}
//         onPress={() => onSelect('sell')}
//       >
//         <Text style={[
//           styles.transactionText,
//           { color: transactionType === 'sell' ? '#fff' : '#6495ed' }
//         ]}>
//           Sell
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
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
//   }
// });

// export default TransactionTypeSelector;
