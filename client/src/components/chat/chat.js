import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({ route }) => {
  const { roomId, userId, userName } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const flatListRef = useRef(null);
  

  useEffect(() => {
    // getUserId();
    const socket = io("http://192.168.11.234:4002", {
      transports: ['websocket'],
    });
    setSocket(socket);

    socket.emit('join_room', roomId, userId, userName);

    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => {
        // Eliminate duplicate messages
        if (prevMessages.some(msg => msg.timestamp === message.timestamp)) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
    });

    socket.on('user_joined', (data) => {
      console.log(`User joined: ${data.userName} (${data.userId})`);
      // Notify owner or handle as needed
      console.log(data,'&&&');
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        room: roomId,
        content: newMessage,
        sender: userName,
        senderId: userId,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.senderId === userId ? styles.myMessageContainer : styles.otherMessageContainer]}>
      <View style={[styles.message, item.senderId === userId ? styles.myMessage : styles.otherMessage]}>
        <Text style={item.senderId === userId ? styles.myMessageContent : styles.otherMessageContent}>{item.content}</Text>
        <Text style={item.senderId === userId ? styles.myMessageTimestamp : styles.otherMessageTimestamp}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon name="send" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrey,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    paddingLeft: 15,
    marginRight: 10,
    backgroundColor: COLORS.light,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '75%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  message: {
    padding: 10,
    borderRadius: 15,
  },
  myMessage: {
    backgroundColor: COLORS.primary,
  },
  otherMessage: {
    backgroundColor: COLORS.lightGrey,
    

  },
  myMessageContent: {
    color: COLORS.white,
  },
  otherMessageContent: {
    color: COLORS.black,
  },
  myMessageTimestamp: {
    fontSize: 10,
    color: COLORS.white,
    marginTop: 5,
    textAlign: 'right',
  },
  otherMessageTimestamp: {
    fontSize: 10,
    color: COLORS.grey,
    marginTop: 5,
    textAlign: 'right',
  },
});

export default ChatScreen;
