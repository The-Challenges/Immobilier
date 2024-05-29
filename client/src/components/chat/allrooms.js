// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

// import socketserv from '../request/socketserv';
// import { API_AD } from '../../../config';
// import axios from 'axios';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import io from 'socket.io-client'

// const ChatList = ({ navigation }) => {

//   const [chatData, setChatData] = useState([]);
//   const [newMessageNotification, setNewMessageNotification] = useState(false); // State for new message notification
//   const flatListRef = useRef(null); 
//   const socket = useRef(null); 
//   useEffect(() => {
  
     socket.current = io("http://192.168.104.7:4001");
     fetchChats();
     scrollToBottom();
  
//      socket.current.on('newMessage', () => {
//        fetchChats(); 
//        setNewMessageNotification(true); // Set new message notification flag
//      });
 

//      return () => {
       
//        socket.current.disconnect();
//      };
//    }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, []);

//   const fetchChats = async () => {
//     try {
//       const response = await axios.get(`${API_AD}/chat/${1}/conversations`);
//       const conversations = await Promise.all(response.data.map(async conversation => {
//         const lastMessageResponse = await axios.get(`${API_AD}/chat/lastmessage/${1}/${conversation.id}`);
//         const lastMessage = lastMessageResponse.data;
//         const id = conversation.id
//         if (conversation.user1Id === 1) {
//           return {...conversation.user2,lastMessage,...id};
//         }
//         if (conversation.user2Id === 1) {
//           return {...conversation.user1,lastMessage,...id};
//         }
//         return null;
//       }));
//       setChatData(conversations.filter(Boolean));
//     } catch (error) {
//       console.error('Error fetching chats:', error);
//     }
//   };

//   const handleDeleteConversation = async (conversationId) => {
//     try {
//       await axios.delete(`${API_AD}/chat/delteconversation/${conversationId}`);
//       fetchChats();
//     } catch (error) {
//       console.error('Error deleting conversation:', error);
//     }
//   };

//   const scrollToBottom = () => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToEnd({ animated: true });
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <TouchableOpacity
//         style={styles.itemContent}
//         onPress={() => {
//           navigation.navigate('Chat', { senderid: 1, user2Id: item.id, receiverName: item.firstname + " " + item.lastname });
//           scrollToBottom();
//         }}
//       >
//         {/* <Image source={require('../../assets/avatar.png')} style={styles.avatar} /> */}
//         <View style={styles.chatInfo}>
//           <Text style={styles.senderName}>{item.firstname} {item.lastname}</Text>
//           <Text style={styles.lastMessage}>{item.lastMessage.text}</Text>
//           <Text style={styles.timestamp}>{getTimeFromDate(item.lastMessage.createdAt)}</Text>
//         </View>
//       </TouchableOpacity>
//       {newMessageNotification && ( // Render notification if there's a new message
//         <View style={styles.notificationBadge} />
//       )}
//       <TouchableOpacity onPress={() => handleDeleteConversation(item.id)} style={styles.deleteButton}>
//         <MaterialCommunityIcons name="delete" size={24} color="#757575" />
//       </TouchableOpacity>
//     </View>
//   );

//   const getTimeFromDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         ref={flatListRef} 
//         data={chatData}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: '#F7F7F7',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//     padding: 16,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     elevation: 2,
//     shadowColor: 'black',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   itemContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 16,
//   },
//   chatInfo: {
//     flex: 1,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#757575',
//     marginTop: 8,
//   },
//   senderName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   lastMessage: {
//     fontSize: 14,
//     color: '#666',
//   },
//   deleteButton: {
//     marginLeft: 10,
//   },
//   notificationBadge: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: 'red',
//   },
// });

// export default ChatList;
