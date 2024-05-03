import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';

const ChatDetail = ({ route }) => {
  // const { receiverName } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={require('../images/azert.jpg')} style={styles.receiverImageIcon} /> */}
        <Text style={styles.receiverName}></Text>
      </View>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        
      </ScrollView>
      <View style={styles.inputArea}>
        <Pressable style={styles.attachButton}>
        </Pressable>
        <TextInput
          style={styles.inputText}
          placeholder="Type your message..."
          onChangeText={(text) => {}}
        />
        <Pressable style={styles.sendButton}>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomColor: '#CCCCCC',
    borderRadius: 100,
    marginTop: 2
  },
  receiverImageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  receiverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
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
  attachButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0"
  },
  attachIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#F0F0F0'
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
    padding: 8,
    borderRadius: 25,
    backgroundColor: '#1976D2',
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default ChatDetail;
