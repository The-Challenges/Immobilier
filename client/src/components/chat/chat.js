import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';
import { API_AD } from '../../../config';

const fakeUsers = [
  { name: "Alex Johnson", userID: "101", email: "alex.johnson@example.com", role: "Admin" },
  { name: "Maria Garcia", userID: "102", email: "maria.garcia@example.com", role: "Member" }
];

const ChatDetail = ({ route }) => {
  const { roomId } = route.params;
  const [currentUser, setCurrentUser] = useState(fakeUsers[0]);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const socket = io(API_AD);

  useEffect(() => {
    socket.emit('join_room', roomId);

    socket.on('message', (message) => {
        setChatMessages(prevMessages => [...prevMessages, message]);
    });

    // Receive message history when joining the room
    socket.on('message_history', (history) => {
        setChatMessages(history);
    });

    return () => {
        socket.emit('leave_room', roomId);
        socket.off('message');
    };
}, [roomId]);

const sendMessage = () => {
  if (message.trim() !== '') {
    const msgData = { roomId, message, senderId: currentUser.userID };
    socket.emit('chat_message', msgData);
    setMessage('');
   
  }
}

  const switchUser = () => {
    // Toggle between Alex and Maria
    setCurrentUser(prevUser => (prevUser.userID === "101" ? fakeUsers[1] : fakeUsers[0]));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableOpacity onPress={switchUser} style={styles.switchButton}>
        <Text>Switch User ({currentUser.name})</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatMessages.map((msg, index) => (
          <View key={index} style={[styles.messageContainer, msg.senderId === currentUser.userID ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{msg.senderId === currentUser.userID ? 'Me: ' : `${msg.senderId}: `}{msg.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.inputText}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  switchButton: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    textAlign: 'center',
  },
  chatContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  inputText: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: 'white',
  },
  sendButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#1976D2',
  },
  sendButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1976D2',
    borderRadius: 15,
    margin: 5,
    padding: 10,
    maxWidth: '80%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0f0',
    borderRadius: 15,
    margin: 5,
    padding: 10,
    maxWidth: '80%',
  },
  messageText: {
    color: 'white',
  },
  messageContainer: {
    marginBottom: 10,
  },
});

export default ChatDetail;
